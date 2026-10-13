import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import healthRouter from './server/routes/health';
import menuRouter from './server/routes/menu';
import reservationsRouter from './server/routes/reservations';
import ordersRouter from './server/routes/orders';
import newsletterRouter from './server/routes/newsletter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  // Request body parsing with strict size limits
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));

  // Minimal request logging
  app.use((req: Request, _res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.path}`);
    }
    next();
  });

  // Mount API Endpoints
  app.use('/api', healthRouter);
  app.use('/api', menuRouter);
  app.use('/api', reservationsRouter);
  app.use('/api', ordersRouter);
  app.use('/api', newsletterRouter);

  // Fallback 404 handler for API routes
  app.use('/api/*', (_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: 'Endpoint not found',
    });
  });

  // Global Error Handler for API
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[SERVER ERROR]', err);
    res.status(500).json({
      success: false,
      error: 'An unexpected internal server error occurred.',
      message: isProduction ? undefined : err.message,
    });
  });

  // Frontend Integration: Vite middlewares in dev, static files in production
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Atelier d'Or Full-Stack Server running at http://0.0.0.0:${PORT}`);
    console.log(`📡 API Endpoints ready under /api/*`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server boot error:', err);
  process.exit(1);
});
