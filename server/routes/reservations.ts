import { Router, Request, Response } from 'express';
import { db } from '../data/store';

const router = Router();

// Simple, strict RFC-compliant email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/reservations', (req: Request, res: Response) => {
  try {
    const { experience, guests, date, time, name, email, notes } = req.body || {};

    // 1. Required field validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      res.status(400).json({
        success: false,
        error: 'Please provide a valid full name (minimum 2 characters).',
      });
      return;
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
      return;
    }

    if (!date || typeof date !== 'string' || date.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Please specify a reservation date.',
      });
      return;
    }

    if (!time || typeof time !== 'string' || time.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Please specify a preferred time slot.',
      });
      return;
    }

    if (!guests || typeof guests !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Please indicate party size.',
      });
      return;
    }

    // 2. Anti-spam / duplicate prevention
    const rateLimitKey = `res_${email.toLowerCase().trim()}_${date}_${time}`;
    if (!db.checkRateLimit(rateLimitKey, 10000)) {
      res.status(429).json({
        success: false,
        error: 'A reservation request for this email and time slot was recently received. Please wait a moment.',
      });
      return;
    }

    // 3. Create reservation in store
    const reservation = db.createReservation({
      experience: typeof experience === 'string' && experience ? experience.trim() : 'Morning Table',
      guests: guests.trim(),
      date: date.trim(),
      time: time.trim(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      notes: typeof notes === 'string' ? notes.trim() : '',
    });

    res.status(201).json({
      success: true,
      message: 'Reservation successfully confirmed.',
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your reservation.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/reservations for admin or verification
router.get('/reservations', (_req: Request, res: Response) => {
  const all = db.getReservations();
  res.status(200).json({
    success: true,
    count: all.length,
    reservations: all,
  });
});

export default router;
