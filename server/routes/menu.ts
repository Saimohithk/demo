import { Router, Request, Response } from 'express';
import { db } from '../data/store';

const router = Router();

router.get('/menu', (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined;
    let items = db.getMenu();

    if (category && category !== 'all') {
      items = items.filter((item) => item.category === category);
    }

    res.status(200).json({
      success: true,
      count: items.length,
      items,
      currency: 'EUR',
      currencySymbol: '€',
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve menu catalog.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
