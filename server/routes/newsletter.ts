import { Router, Request, Response } from 'express';
import { db } from '../data/store';

const router = Router();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/newsletter', (req: Request, res: Response) => {
  try {
    const { email } = req.body || {};

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.',
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const rateLimitKey = `sub_${normalizedEmail}`;
    if (!db.checkRateLimit(rateLimitKey, 5000)) {
      res.status(429).json({
        success: false,
        error: 'Subscription already submitted. Please wait a moment.',
      });
      return;
    }

    const { subscriber, isNew } = db.addSubscriber(normalizedEmail);

    res.status(200).json({
      success: true,
      message: isNew
        ? 'Welcome to the Atelier Dispatch. First release arriving next week.'
        : 'You are already registered for the Atelier Dispatch.',
      subscriber: {
        id: subscriber.id,
        email: subscriber.email,
        subscribedAt: subscriber.subscribedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your subscription.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/newsletter for verification
router.get('/newsletter', (_req: Request, res: Response) => {
  const all = db.getSubscribers();
  res.status(200).json({
    success: true,
    count: all.length,
    subscribers: all.map((s) => ({ id: s.id, email: s.email, subscribedAt: s.subscribedAt })),
  });
});

export default router;
