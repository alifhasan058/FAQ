import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, MessageCircle, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleClose = () => {
    onClose();
    // Reset state after transition finishes
    setTimeout(() => {
      setIsSubmitted(false);
      setPhoneNumber('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 cursor-pointer"
            id="whatsapp-overlay"
          />

          {/* Modal Card */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none" id="whatsapp-modal-container">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl pointer-events-auto border border-slate-100"
              id="whatsapp-modal-inner"
            >
              {/* Header and Close */}
              <div className="bg-[#25D366] text-white p-6 relative" id="whatsapp-modal-header">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white transition-all outline-none cursor-pointer"
                  id="whatsapp-modal-close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3" id="whatsapp-header-badge">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 text-white fill-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg tracking-tight font-heading">NeaPure WhatsApp Desk</h3>
                    <p className="text-xs text-emerald-100/90 font-medium">Instant replies & callback service</p>
                  </div>
                </div>
              </div>

              {/* Form / Content */}
              <div className="p-6" id="whatsapp-modal-body">
                {!isSubmitted ? (
                  <div className="space-y-5" id="whatsapp-form-wrapper">
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Connect with our certified water experts instantly. You can scan our official QR code, or submit your mobile number for an immediate callback on WhatsApp!
                    </p>

                    {/* Quick Call details */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between" id="whatsapp-direct-box">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                          <Phone className="w-4 h-4 fill-emerald-600/10" />
                        </div>
                        <div>
                          <span className="block text-[11px] text-slate-400 font-medium leading-none">Official Hotline</span>
                          <span className="block text-sm font-bold text-slate-700 mt-1 font-mono">+880 1999-555222</span>
                        </div>
                      </div>
                      <a
                        href="https://wa.me/8801999555222"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200"
                        id="whatsapp-link-external"
                      >
                        Open WhatsApp
                      </a>
                    </div>

                    <div className="relative flex items-center justify-center" id="whatsapp-divider">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                      <span className="relative bg-white px-3 text-xs text-slate-400 font-semibold uppercase tracking-wider">Or Request Callback</span>
                    </div>

                    {/* Submit Number Form */}
                    <form onSubmit={handleSubmit} className="space-y-4" id="whatsapp-form">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Your Mobile Number (Dhaka/Bangladesh)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold font-mono">+880</span>
                          <input
                            type="tel"
                            required
                            placeholder="1XXXXXXXX"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="w-full bg-slate-50 border border-slate-150 rounded-xl pl-16 pr-4 py-3.5 text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#25D366] focus:bg-white transition-all"
                            id="whatsapp-input-number"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading || phoneNumber.length < 10}
                        className={`w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all flex items-center justify-center gap-2 cursor-pointer select-none outline-none
                          ${phoneNumber.length >= 10
                            ? 'bg-[#25D366] hover:bg-[#20ba59] shadow-md hover:scale-[1.01] active:scale-95'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }`}
                        id="whatsapp-submit-btn"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Request Callback</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>

                    <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5" id="whatsapp-privacy">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                      Your data is encrypted & secured under NeaPure Privacy Policy.
                    </p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                    id="whatsapp-success-box"
                  >
                    <div className="flex justify-center" id="success-icon-wrapper">
                      <CheckCircle2 className="w-16 h-16 text-emerald-500 fill-emerald-50" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-slate-900 tracking-tight font-heading">Callback Scheduled!</h4>
                      <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                        Thank you! We've received your request. An expert from NeaPure Support will reach you on WhatsApp at <strong className="font-mono text-slate-700">+880 {phoneNumber}</strong> within 10 minutes.
                      </p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={handleClose}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-5 py-2.5 rounded-full transition-all cursor-pointer"
                        id="whatsapp-success-done"
                      >
                        Got It, Thanks!
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
