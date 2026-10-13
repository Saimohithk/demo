import { TRUSTED_MENU_ITEMS, ServerMenuItem } from '../data/menuData';

export interface OrderItemInput {
  itemId: string;
  quantity: number;
  milkOption?: string;
  tempOption?: string;
  sweetness?: string;
}

export interface CalculatedLineItem {
  itemId: string;
  name: string;
  basePrice: number;
  surcharge: number;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  milkOption?: string;
  tempOption?: string;
  sweetness?: string;
}

export interface CalculationResult {
  lineItems: CalculatedLineItem[];
  subtotal: number;
  tipPercent: number;
  tipAmount: number;
  total: number;
}

export function calculateOrder(items: OrderItemInput[], tipPercent = 0): CalculationResult {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Order must contain at least one item.');
  }

  const menuMap = new Map<string, ServerMenuItem>(
    TRUSTED_MENU_ITEMS.map((item) => [item.id, item])
  );

  let subtotal = 0;
  const lineItems: CalculatedLineItem[] = [];

  for (const itemInput of items) {
    if (!itemInput.itemId || typeof itemInput.itemId !== 'string') {
      throw new Error('Invalid or missing item ID in order payload.');
    }

    const menuItem = menuMap.get(itemInput.itemId);
    if (!menuItem) {
      throw new Error(`Menu item '${itemInput.itemId}' does not exist in our catalog.`);
    }

    const quantity = Math.floor(Number(itemInput.quantity));
    if (isNaN(quantity) || quantity < 1 || quantity > 20) {
      throw new Error(`Invalid quantity for ${menuItem.name}. Must be between 1 and 20.`);
    }

    // Server-enforced surcharge for specialty plant milk
    let surcharge = 0;
    if (itemInput.milkOption && itemInput.milkOption.toLowerCase().includes('oat')) {
      surcharge = 0.50;
    }

    const unitPrice = Number((menuItem.price + surcharge).toFixed(2));
    const lineTotal = Number((unitPrice * quantity).toFixed(2));
    subtotal += lineTotal;

    lineItems.push({
      itemId: menuItem.id,
      name: menuItem.name,
      basePrice: menuItem.price,
      surcharge,
      unitPrice,
      quantity,
      lineTotal,
      milkOption: itemInput.milkOption,
      tempOption: itemInput.tempOption,
      sweetness: itemInput.sweetness,
    });
  }

  // Sanitize tip percent (0% to 30%)
  const sanitizedTipPercent = Math.min(Math.max(Number(tipPercent) || 0, 0), 30);
  const rawSubtotal = Number(subtotal.toFixed(2));
  const tipAmount = Number(((rawSubtotal * sanitizedTipPercent) / 100).toFixed(2));
  const total = Number((rawSubtotal + tipAmount).toFixed(2));

  return {
    lineItems,
    subtotal: rawSubtotal,
    tipPercent: sanitizedTipPercent,
    tipAmount,
    total,
  };
}
