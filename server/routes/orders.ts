import { Router, Request, Response } from 'express';
import { db } from '../data/store';
import { calculateOrder, OrderItemInput } from '../services/orderCalculator';

const router = Router();

router.post('/orders', (req: Request, res: Response) => {
  try {
    const { items, tipPercent, customerNotes } = req.body || {};

    // 1. Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({
        success: false,
        error: 'Order must contain at least one item.',
      });
      return;
    }

    // 2. Compute trusted pricing on server
    let calculation;
    try {
      calculation = calculateOrder(items as OrderItemInput[], tipPercent);
    } catch (calcError) {
      res.status(400).json({
        success: false,
        error: calcError instanceof Error ? calcError.message : 'Invalid order item parameters.',
      });
      return;
    }

    // 3. Store the order
    const order = db.createOrder({
      items: calculation.lineItems,
      subtotal: calculation.subtotal,
      tipPercent: calculation.tipPercent,
      tipAmount: calculation.tipAmount,
      total: calculation.total,
      customerNotes: typeof customerNotes === 'string' ? customerNotes.trim() : undefined,
    });

    res.status(201).json({
      success: true,
      message: 'Order received and being prepared.',
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your order.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/orders/:id
router.get('/orders/:id', (req: Request, res: Response) => {
  const order = db.getOrderById(req.params.id);
  if (!order) {
    res.status(404).json({
      success: false,
      error: `Order '${req.params.id}' not found.`,
    });
    return;
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// GET /api/orders (all orders for testing/verification)
router.get('/orders', (_req: Request, res: Response) => {
  const orders = db.getOrders();
  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

export default router;
