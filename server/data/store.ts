import { TRUSTED_MENU_ITEMS, ServerMenuItem } from './menuData';
import { CalculatedLineItem } from '../services/orderCalculator';

export interface StoredReservation {
  id: string;
  code: string;
  experience: string;
  guests: string;
  date: string;
  time: string;
  name: string;
  email: string;
  notes?: string;
  status: 'confirmed' | 'cancelled' | 'seated';
  createdAt: string;
}

export interface StoredOrder {
  id: string;
  orderNumber: string;
  items: CalculatedLineItem[];
  subtotal: number;
  tipPercent: number;
  tipAmount: number;
  total: number;
  customerNotes?: string;
  status: 'received' | 'in_preparation' | 'ready' | 'completed';
  createdAt: string;
}

export interface StoredNewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  ipHash?: string;
}

class CafeDatabaseStore {
  private reservations: StoredReservation[] = [];
  private orders: StoredOrder[] = [];
  private subscribers: StoredNewsletterSubscriber[] = [];
  private recentSubmissions = new Map<string, number>();

  // Rate/Spam limiter: returns false if exact same hash was submitted within cooldownMs
  public checkRateLimit(key: string, cooldownMs = 5000): boolean {
    const now = Date.now();
    const last = this.recentSubmissions.get(key);
    if (last && now - last < cooldownMs) {
      return false;
    }
    this.recentSubmissions.set(key, now);
    return true;
  }

  // Menu items
  public getMenu(): ServerMenuItem[] {
    return TRUSTED_MENU_ITEMS;
  }

  // Reservations
  public createReservation(data: {
    experience: string;
    guests: string;
    date: string;
    time: string;
    name: string;
    email: string;
    notes?: string;
  }): StoredReservation {
    const id = `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const code = `AO-${Math.floor(1000 + Math.random() * 9000)}`;
    const reservation: StoredReservation = {
      id,
      code,
      experience: data.experience,
      guests: data.guests,
      date: data.date,
      time: data.time,
      name: data.name,
      email: data.email,
      notes: data.notes || '',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    this.reservations.unshift(reservation);
    return reservation;
  }

  public getReservations(): StoredReservation[] {
    return [...this.reservations];
  }

  // Orders
  public createOrder(data: {
    items: CalculatedLineItem[];
    subtotal: number;
    tipPercent: number;
    tipAmount: number;
    total: number;
    customerNotes?: string;
  }): StoredOrder {
    const id = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const orderNumber = `ORD-${Math.floor(100 + Math.random() * 900)}`;
    const order: StoredOrder = {
      id,
      orderNumber,
      items: data.items,
      subtotal: data.subtotal,
      tipPercent: data.tipPercent,
      tipAmount: data.tipAmount,
      total: data.total,
      customerNotes: data.customerNotes,
      status: 'received',
      createdAt: new Date().toISOString(),
    };
    this.orders.unshift(order);
    return order;
  }

  public getOrders(): StoredOrder[] {
    return [...this.orders];
  }

  public getOrderById(id: string): StoredOrder | undefined {
    return this.orders.find((o) => o.id === id || o.orderNumber === id);
  }

  // Newsletter
  public addSubscriber(email: string, ipHash?: string): { subscriber: StoredNewsletterSubscriber; isNew: boolean } {
    const normalizedEmail = email.toLowerCase().trim();
    const existing = this.subscribers.find((s) => s.email === normalizedEmail);
    if (existing) {
      return { subscriber: existing, isNew: false };
    }

    const subscriber: StoredNewsletterSubscriber = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      ipHash,
    };
    this.subscribers.push(subscriber);
    return { subscriber, isNew: true };
  }

  public getSubscribers(): StoredNewsletterSubscriber[] {
    return [...this.subscribers];
  }
}

export const db = new CafeDatabaseStore();
