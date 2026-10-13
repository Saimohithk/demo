import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [experience, setExperience] = useState('Morning Table');
  const [guests, setGuests] = useState('2 Guests');
  const [time, setTime] = useState('10:00 AM');
  const [date, setDate] = useState('Tomorrow');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confCode, setConfCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await api.createReservation({
        experience,
        guests,
        date,
        time,
        name,
        email,
        notes,
      });

      if (response.success && response.reservation) {
        setConfCode(response.reservation.code);
        setIsSubmitted(true);
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C58B52', '#F4EBDD', '#74765A', '#6F4935'],
        });
      } else {
        setErrorMessage(response.error || 'Failed to confirm reservation.');
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Unable to reach the reservation server.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetModal = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#201C18] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl text-[#F4EBDD] my-auto">
        <button
          onClick={resetModal}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-black/60 backdrop-blur-md text-[#F4EBDD]/70 hover:text-[#F4EBDD] hover:bg-black/90 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#C58B52]/15 border border-[#C58B52] text-[#C58B52] flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#C58B52] font-sans">
              Reservation Confirmed
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#F4EBDD] mt-2">
              We look forward to hosting you.
            </h2>

            <div className="mt-6 p-6 rounded-2xl bg-[#171411] border border-white/10 text-left space-y-2 text-xs font-sans">
              <div className="flex justify-between">
                <span className="text-[#F4EBDD]/50 uppercase tracking-wider">Confirmation ID</span>
                <span className="font-mono text-[#C58B52] font-bold">{confCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4EBDD]/50 uppercase tracking-wider">Experience</span>
                <span className="text-[#F4EBDD] font-medium">{experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4EBDD]/50 uppercase tracking-wider">Schedule</span>
                <span className="text-[#F4EBDD]">{date} at {time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4EBDD]/50 uppercase tracking-wider">Party Size</span>
                <span className="text-[#F4EBDD]">{guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4EBDD]/50 uppercase tracking-wider">Guest Name</span>
                <span className="text-[#F4EBDD]">{name}</span>
              </div>
            </div>

            <p className="mt-6 text-xs text-[#F4EBDD]/60 font-sans font-light">
              A discreet confirmation and calendar invitation have been dispatched to <span className="text-[#F4EBDD]">{email}</span>.
            </p>

            <button
              onClick={resetModal}
              className="mt-8 px-8 py-3 bg-[#F4EBDD] hover:bg-[#C58B52] text-[#171411] text-xs uppercase tracking-widest font-semibold rounded-full transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 sm:p-10">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#C58B52] font-sans flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>Saint-Germain Atelier</span>
              </span>
              <h2 className="font-serif text-3xl font-medium text-[#F4EBDD] mt-1">
                Table & Tasting Reservation
              </h2>
              <p className="text-xs text-[#F4EBDD]/60 font-sans mt-1">
                Complimentary table holding for 15 minutes. No reservation deposit required.
              </p>
            </div>

            <div className="space-y-5">
              {/* Experience Type */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#F4EBDD]/70 block mb-2 font-sans">
                  Select Experience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'Morning Table', label: 'Morning Table', desc: 'Espresso & Pastries' },
                    { id: 'Cupping Flight', label: 'Cupping Flight', desc: '3 Single Origins' },
                    { id: 'Brew Masterclass', label: 'Masterclass', desc: '1-on-1 Pour-over' },
                  ].map((exp) => (
                    <button
                      type="button"
                      key={exp.id}
                      onClick={() => setExperience(exp.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        experience === exp.id
                          ? 'border-[#C58B52] bg-[#C58B52]/10 text-[#F4EBDD]'
                          : 'border-white/5 bg-[#171411] text-[#F4EBDD]/70 hover:border-white/20'
                      }`}
                    >
                      <span className="font-medium block">{exp.label}</span>
                      <span className="text-[10px] text-[#F4EBDD]/50 block mt-0.5">{exp.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#F4EBDD]/70 block mb-2 font-sans flex items-center gap-1.5">
                    <Calendar size={13} /> Date
                  </label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#171411] border border-white/10 text-xs text-[#F4EBDD] focus:outline-none focus:border-[#C58B52]"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Friday">This Friday</option>
                    <option value="This Saturday">This Saturday</option>
                    <option value="This Sunday">This Sunday</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#F4EBDD]/70 block mb-2 font-sans flex items-center gap-1.5">
                    <Clock size={13} /> Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#171411] border border-white/10 text-xs text-[#F4EBDD] focus:outline-none focus:border-[#C58B52]"
                  >
                    <option value="08:30 AM">08:30 AM (Dawn Pour)</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:30 PM">05:30 PM (Sunset)</option>
                  </select>
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#F4EBDD]/70 block mb-2 font-sans flex items-center gap-1.5">
                  <Users size={13} /> Guests
                </label>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {['1 Guest', '2 Guests', '3-4 Guests', '5+ Guests'].map((g) => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => setGuests(g)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        guests === g
                          ? 'border-[#C58B52] bg-[#C58B52]/10 text-[#F4EBDD]'
                          : 'border-white/5 bg-[#171411] text-[#F4EBDD]/70 hover:border-white/20'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#F4EBDD]/70 block mb-1.5 font-sans">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Camille Laurent"
                    className="w-full p-3 rounded-xl bg-[#171411] border border-white/10 text-xs text-[#F4EBDD] placeholder:text-[#F4EBDD]/40 focus:outline-none focus:border-[#C58B52]"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#F4EBDD]/70 block mb-1.5 font-sans">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="camille@domain.com"
                    className="w-full p-3 rounded-xl bg-[#171411] border border-white/10 text-xs text-[#F4EBDD] placeholder:text-[#F4EBDD]/40 focus:outline-none focus:border-[#C58B52]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#F4EBDD]/70 block mb-1.5 font-sans">
                  Dietary / Cupping Notes (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Prefer decaf filter or oat milk only"
                  className="w-full p-3 rounded-xl bg-[#171411] border border-white/10 text-xs text-[#F4EBDD] placeholder:text-[#F4EBDD]/40 focus:outline-none focus:border-[#C58B52]"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="mt-4 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 flex items-center gap-2">
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#F4EBDD]/40 font-sans">Instant Confirmation</span>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-[#C58B52] hover:bg-[#F4EBDD] text-[#171411] text-xs uppercase tracking-widest font-semibold rounded-full transition-all cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading && <Loader2 size={14} className="animate-spin" />}
                <span>{isLoading ? 'Confirming...' : 'Confirm Table'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
