import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Category, FAQItem } from '../types';

interface SubmitQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSubmitQuestion: (newQuestion: FAQItem) => void;
}

export default function SubmitQuestionModal({ isOpen, onClose, categories, onSubmitQuestion }: SubmitQuestionModalProps) {
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || 'most-asked');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !email.trim()) return;

    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);

      // Create a local FAQ item
      const newFAQ: FAQItem = {
        id: `custom-${Date.now()}`,
        category: selectedCategory,
        question: question.trim(),
        answer: description.trim() || 'Our team is currently reviewing this query. We will update you via email and add the answer to this dashboard within 24 hours!',
      };
      
      onSubmitQuestion(newFAQ);
    }, 1200);
  };

  const handleClose = () => {
    onClose();
    // Reset state after transition finishes
    setTimeout(() => {
      setIsSubmitted(false);
      setQuestion('');
      setDescription('');
      setEmail('');
      setSelectedCategory(categories[0]?.id || 'most-asked');
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
            id="submit-overlay"
          />

          {/* Modal Card */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none" id="submit-modal-container">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl pointer-events-auto border border-slate-100"
              id="submit-modal-inner"
            >
              {/* Header */}
              <div className="bg-[#0A58CA] text-white p-6 relative" id="submit-modal-header">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white transition-all outline-none cursor-pointer"
                  id="submit-modal-close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3" id="submit-header-badge">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <HelpCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg tracking-tight font-heading">Submit Your Question</h3>
                    <p className="text-xs text-blue-100/90 font-medium">Can't find the answer? Let our experts answer it!</p>
                  </div>
                </div>
              </div>

              {/* Form / Content */}
              <div className="p-6 overflow-y-auto max-h-[75vh]" id="submit-modal-body">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4" id="submit-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="submit-form-grid">
                      {/* Select Category */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Category</label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-150 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
                          id="submit-select-cat"
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* User Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Your Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-150 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                          id="submit-input-email"
                        />
                      </div>
                    </div>

                    {/* Question Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Your Question</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. How do I order a spare sediment filter?"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-150 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        id="submit-input-question"
                      />
                    </div>

                    {/* Description Details */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Context / Details (Optional)</label>
                      <textarea
                        rows={3}
                        placeholder="Provide any extra details about your specific water model or concern..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-150 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
                        id="submit-input-desc"
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 text-blue-700 text-xs leading-relaxed" id="submit-notice-box">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p>
                        <strong>Note:</strong> Since you have added a question, it will be instant-saved to your local session and display under the selected category so you can see how it looks! A custom agent response will also be sent to your email.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || !question.trim() || !email.trim()}
                      className={`w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all flex items-center justify-center gap-2 cursor-pointer select-none outline-none
                        ${question.trim() && email.trim()
                          ? 'bg-[#0A58CA] hover:bg-blue-700 shadow-md hover:scale-[1.01] active:scale-95'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      id="submit-send-btn"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Submit Question</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                    id="submit-success-box"
                  >
                    <div className="flex justify-center" id="success-icon-wrapper-submit">
                      <CheckCircle2 className="w-16 h-16 text-blue-600 fill-blue-50" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-slate-900 tracking-tight font-heading">Question Received!</h4>
                      <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                        Thank you! Your question has been submitted successfully and saved to your current dashboard view under the <strong>{categories.find(c => c.id === selectedCategory)?.name}</strong> category. We will email your verified solution to <strong className="text-slate-700 font-semibold">{email}</strong> shortly.
                      </p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={handleClose}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-5 py-2.5 rounded-full transition-all cursor-pointer"
                        id="submit-success-done"
                      >
                        View Dashboard
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
