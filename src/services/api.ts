import { MenuItem } from '../types/cafe';

export interface ReservationPayload {
  experience: string;
  guests: string;
  date: string;
  time: string;
  name: string;
  email: string;
  notes?: string;
}

export interface ReservationResponse {
  success: boolean;
  message?: string;
  error?: string;
  reservation?: {
    id: string;
    code: string;
    experience: string;
    guests: string;
    date: string;
    time: string;
    name: string;
    email: string;
    notes?: string;
    status: string;
    createdAt: string;
  };
}

export interface OrderPayloadItem {
  itemId: string;
  quantity: number;
  milkOption?: string;
  tempOption?: string;
  sweetness?: string;
}

export interface OrderPayload {
  items: OrderPayloadItem[];
  tipPercent: number;
  customerNotes?: string;
}

export interface OrderResponse {
  success: boolean;
  message?: string;
  error?: string;
  order?: {
    id: string;
    orderNumber: string;
    items: Array<{
      itemId: string;
      name: string;
      basePrice: number;
      surcharge: number;
      unitPrice: number;
      quantity: number;
      lineTotal: number;
      milkOption?: string;
      tempOption?: string;
    }>;
    subtotal: number;
    tipPercent: number;
    tipAmount: number;
    total: number;
    status: string;
    createdAt: string;
  };
}

export interface NewsletterResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface MenuResponse {
  success: boolean;
  count: number;
  items: MenuItem[];
  currency: string;
  currencySymbol: string;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...options.headers,
  };

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({
    success: false,
    error: `HTTP error ${response.status}`,
  }));

  if (!response.ok) {
    const errorMsg = data.error || `Server responded with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data as T;
}

export const api = {
  async getHealth() {
    return request<{ status: string; version: string }>('/api/health');
  },

  async getMenu(category?: string): Promise<MenuResponse> {
    const query = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
    return request<MenuResponse>(`/api/menu${query}`);
  },

  async createReservation(payload: ReservationPayload): Promise<ReservationResponse> {
    return request<ReservationResponse>('/api/reservations', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async createOrder(payload: OrderPayload): Promise<OrderResponse> {
    return request<OrderResponse>('/api/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async subscribeNewsletter(email: string): Promise<NewsletterResponse> {
    return request<NewsletterResponse>('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};
