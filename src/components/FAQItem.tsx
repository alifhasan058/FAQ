import { FAQItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Star } from 'lucide-react';

interface FAQItemProps {
  key?: string;
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  searchQuery: string;
}

export default function FAQItemRow({ item, isOpen, onToggle, searchQuery }: FAQItemProps) {
  // Highlight matching search text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-yellow-100 text-yellow-900 rounded-[2px] px-0.5 font-semibold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div
      id={`faq-item-${item.id}`}
      className={`border border-gray-100 rounded-xl mb-4 overflow-hidden transition-all duration-300 bg-white
        ${isOpen ? 'ring-1 ring-blue-500/10 shadow-sm border-blue-500/20' : 'hover:border-gray-200'}`}
    >
      {/* Question Header */}
      <button
        onClick={onToggle}
        id={`faq-btn-${item.id}`}
        className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-800 hover:text-blue-600 transition-colors cursor-pointer select-none outline-none"
      >
        <div className="flex items-center gap-3 pr-4" id={`faq-q-wrapper-${item.id}`}>
          {item.isHot && (
            <Star className="w-4 h-4 text-blue-600 fill-blue-600 shrink-0" id={`star-hot-${item.id}`} />
          )}
          <span className={`text-[15px] md:text-[16px] leading-relaxed tracking-tight font-medium ${isOpen ? 'text-blue-600 font-semibold' : 'text-gray-800'}`}>
            {highlightText(item.question, searchQuery)}
          </span>
        </div>
        <div className="shrink-0" id={`faq-icon-wrapper-${item.id}`}>
          {isOpen ? (
            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600" id={`minus-icon-${item.id}`}>
              <Minus className="w-4 h-4 stroke-[3]" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-100" id={`plus-icon-${item.id}`}>
              <Plus className="w-4 h-4 stroke-[3]" />
            </div>
          )}
        </div>
      </button>

      {/* Answer Section */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            id={`faq-answer-container-${item.id}`}
          >
            <div className="p-5 pt-0 border-t border-gray-50 bg-gray-50/20" id={`faq-answer-inner-${item.id}`}>
              {item.image ? (
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start pt-4" id={`faq-image-layout-${item.id}`}>
                  {/* Answer Text */}
                  <div className="flex-1 text-[14px] md:text-[15px] text-gray-600 leading-relaxed space-y-2" id={`faq-text-col-${item.id}`}>
                    <p>{highlightText(item.answer, searchQuery)}</p>
                    <div className="pt-2 flex items-center gap-2" id="verified-tag">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Verified Solution
                      </span>
                    </div>
                  </div>
                  {/* Product Image */}
                  <div className="w-full md:w-[160px] h-[120px] md:h-[110px] shrink-0 bg-white rounded-2xl p-1 shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden" id={`faq-image-wrapper-${item.id}`}>
                    <img
                      src={item.image}
                      alt="Water Filter Cartridge Set"
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full object-contain rounded-xl hover:scale-105 transition-transform duration-300"
                      id={`faq-img-${item.id}`}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed pt-4 space-y-2" id={`faq-text-only-${item.id}`}>
                  <p>{highlightText(item.answer, searchQuery)}</p>
                  <div className="pt-2 flex items-center gap-2" id="helpful-tag">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      Official Guide
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
