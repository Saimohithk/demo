import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TastingTrayItem } from '../types/cafe';
import { api } from '../services/api';

interface TastingTrayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: TastingTrayItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const TastingTrayDrawer: React.FC<TastingTrayDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [confirmedTotal, setConfirmedTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const estimatedSubtotal = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const estimatedTipAmount = (estimatedSubtotal * tipPercent) / 100;
  const estimatedTotal = estimatedSubtotal + estimatedTipAmount;

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const payloadItems = items.map((it) => ({
        itemId: it.item.id,
        quantity: it.quantity,
        milkOption: it.milkOption,
        tempOption: it.tempOption,
        sweetness: it.sweetness,
      }));

      const response = await api.createOrder({
        items: payloadItems,
        tipPercent,
      });

      if (response.success && response.order) {
        setOrderNumber(response.order.orderNumber);
        setConfirmedTotal(response.order.total);
        setIsOrdered(true);
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#C58B52', '#F4EBDD', '#74765A'],
        });
      } else {
        setErrorMessage(response.error || 'Failed to dispatch order.');
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Unable to reach the ordering server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = () => {
    setIsOrdered(false);
    setConfirmedTotal(null);
    setErrorMessage(null);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md bg-[#1C1815] border-l border-white/10 h-full flex flex-col justify-between text-[#F4EBDD] p-6 sm:p-8 shadow-2xl relative overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#C58B52]" />
            <span className="font-serif text-2xl font-normal text-[#F4EBDD]">Tasting Tray</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-[#F4EBDD]/60 hover:text-[#F4EBDD] transition-colors cursor-pointer"
            aria-label="Close tray"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        {isOrdered ? (
          <div className="my-auto py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#C58B52]/15 border border-[#C58B52] text-[#C58B52] flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#C58B52] font-sans">
              Tray Prepared for Service
            </span>
            <h2 className="font-serif text-3xl font-medium mt-2">
              Order {orderNumber} Sent
            </h2>
            <p className="text-xs text-[#F4EBDD]/70 font-sans mt-3 leading-relaxed">
              Our baristas are preparing your extractions. Ready for counter pickup or table delivery in approximately 4–6 minutes.
            </p>

            <div className="mt-8 p-5 rounded-2xl bg-[#14110E] border border-white/10 text-xs font-sans text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-[#F4EBDD]/50">Order Total</span>
                <span className="font-mono tabular-nums text-[#F4EBDD] font-bold">€{(confirmedTotal ?? estimatedTotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4EBDD]/50">Estimated Time</span>
                <span className="text-[#C58B52]">4 mins (Active Bloom)</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="mt-8 w-full py-3.5 bg-[#F4EBDD] hover:bg-[#C58B52] text-[#171411] font-semibold text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer"
            >
              Close Tray
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="my-auto py-16 text-center">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#F4EBDD]/40">
              <ShoppingBag size={20} />
            </div>
            <p className="font-serif text-xl text-[#F4EBDD]/80">Your tray is currently empty.</p>
            <p className="text-xs text-[#F4EBDD]/50 font-sans mt-2 max-w-xs mx-auto">
              Explore our single origin espressos, velvet flat whites, and laminated pastries on the menu.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {items.map((cartItem) => (
              <div
                key={cartItem.cartId}
                className="p-4 rounded-2xl bg-[#171411] border border-white/5 flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-lg text-[#F4EBDD]">{cartItem.item.name}</h4>
                    <span className="font-mono tabular-nums text-xs font-semibold text-[#F4EBDD]">
                      €{(cartItem.item.price * cartItem.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Options tags */}
                  {(cartItem.milkOption || cartItem.tempOption) && (
                    <p className="text-[11px] text-[#C58B52] font-sans mt-1">
                      {cartItem.milkOption} · {cartItem.tempOption}
                    </p>
                  )}

                  {/* Steppers */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center border border-white/10 rounded-full overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartId, -1)}
                        className="p-1 px-2.5 text-xs text-[#F4EBDD]/70 hover:text-[#F4EBDD] hover:bg-white/5"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2 text-xs font-mono tabular-nums text-[#F4EBDD]">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartId, 1)}
                        className="p-1 px-2.5 text-xs text-[#F4EBDD]/70 hover:text-[#F4EBDD] hover:bg-white/5"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(cartItem.cartId)}
                      className="text-[#F4EBDD]/40 hover:text-red-400 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Checkout Summary */}
        {!isOrdered && items.length > 0 && (
          <div className="pt-6 border-t border-white/10 space-y-4">
            {/* Gratuity */}
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#F4EBDD]/60 font-sans block mb-2">
                Barista Craft Gratuity
              </span>
              <div className="grid grid-cols-4 gap-2 text-xs font-sans">
                {[0, 10, 15, 20].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipPercent(t)}
                    className={`py-1.5 rounded-lg border text-center transition-all ${
                      tipPercent === t
                        ? 'border-[#C58B52] bg-[#C58B52]/15 text-[#F4EBDD]'
                        : 'border-white/5 text-[#F4EBDD]/60 hover:border-white/20'
                    }`}
                  >
                    {t === 0 ? 'None' : `${t}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs font-sans">
              <div className="flex justify-between text-[#F4EBDD]/70">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">€{estimatedSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#F4EBDD]/70">
                <span>Gratuity ({tipPercent}%)</span>
                <span className="font-mono tabular-nums">€{estimatedTipAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-serif text-[#F4EBDD] pt-2 border-t border-white/5">
                <span>Total Amount</span>
                <span className="font-mono tabular-nums font-semibold text-[#C58B52]">
                  €{estimatedTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 flex items-center gap-2">
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full py-4 bg-[#C58B52] hover:bg-[#F4EBDD] text-[#171411] font-semibold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Preparing Order Ahead...</span>
                </>
              ) : (
                <>
                  <span>Dispatch Order Ahead</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
