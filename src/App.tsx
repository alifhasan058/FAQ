import { useState, useEffect } from 'react';
import { Search, X, HelpCircle, Sparkles, MessageCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { FAQItem } from './types';
import { CATEGORIES, INITIAL_FAQS } from './data/faqs';

import CategoryTabs from './components/CategoryTabs';
import FAQItemRow from './components/FAQItem';
import SupportAgentCard from './components/SupportAgentCard';
import LiveChatDrawer from './components/LiveChatDrawer';
import WhatsAppModal from './components/WhatsAppModal';
import SubmitQuestionModal from './components/SubmitQuestionModal';

export default function App() {
  // Load FAQs from LocalStorage or fallback to INITIAL_FAQS
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('neapure_faqs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved FAQs', e);
      }
    }
    return INITIAL_FAQS;
  });

  const [selectedCategory, setSelectedCategory] = useState('most-asked');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Set the first FAQ (ma-1) to open by default to match the exact image look
  const [openFaqId, setOpenFaqId] = useState<string | null>('ma-1');

  // Modals / Drawers state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // Sync FAQs with LocalStorage whenever changed
  useEffect(() => {
    localStorage.setItem('neapure_faqs', JSON.stringify(faqs));
  }, [faqs]);

  // Handle adding a custom question
  const handleSubmitCustomQuestion = (newFAQ: FAQItem) => {
    setFaqs((prev) => [newFAQ, ...prev]);
    setSelectedCategory(newFAQ.category);
    setOpenFaqId(newFAQ.id);
    setSearchQuery(''); // Clear search so they can see their new question
  };

  // Toggle single accordion item
  const handleToggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  // Filter FAQs based on category AND search query
  // If search query is active, search across ALL categories!
  const isSearching = searchQuery.trim().length > 0;
  
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (isSearching) {
      return matchesSearch;
    } else {
      return faq.category === selectedCategory;
    }
  });

  const activeCategoryName = CATEGORIES.find((cat) => cat.id === selectedCategory)?.name || 'Most Asked';

  return (
    <div className="min-h-screen bg-slate-100/50 flex flex-col items-center justify-start text-slate-800 antialiased py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-100 selection:text-blue-800" id="app-root">
      
      {/* Decorative top header banner/announcement bar */}
      <div className="w-full max-w-6xl mb-4 bg-[#0A58CA]/10 border border-[#0A58CA]/15 rounded-2xl px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left" id="banner-announcement">
        <div className="flex items-center gap-2 text-sm text-[#0A58CA] font-medium" id="banner-text">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
          <span>Need quick offline help? Call our official Bangladesh helpline at <strong>+880 1999-555222</strong></span>
        </div>
        <div className="flex gap-2 shrink-0" id="banner-actions">
          <button
            onClick={() => setIsChatOpen(true)}
            className="text-xs bg-[#0A58CA] hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg transition-all"
            id="banner-btn-chat"
          >
            Start Chat
          </button>
        </div>
      </div>

      {/* Main Widget Card wrapper */}
      <main 
        id="help-widget-card"
        className="w-full max-w-6xl bg-white border border-slate-100 shadow-xl rounded-[28px] p-6 md:p-10 flex flex-col relative overflow-hidden"
      >
        
        {/* Header section with brand logo, title, and search bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100" id="header-section">
          <div className="space-y-2 text-left" id="header-brand-titles">
            {/* Water Droplet brand icon logo */}
            <div className="flex items-center gap-2 mb-1" id="logo-wrapper">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100" id="logo-icon">
                <span className="w-3.5 h-3.5 rounded-full bg-blue-600 rounded-tl-none rotate-45 transform origin-center animate-pulse" />
              </div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">
                Nea<span className="text-[#0A58CA]">Pure</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full text-slate-400 font-bold ml-1">Support</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-none font-heading">
              Have Questions? We Have Answers.
            </h1>
            <p className="text-slate-500 text-sm md:text-base tracking-tight font-medium">
              Everything you need to know about NeaPure.
            </p>
          </div>

          {/* FAQ Search input */}
          <div className="relative w-full md:w-[320px] lg:w-[360px]" id="search-box-wrapper">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full bg-slate-50/80 hover:bg-slate-50 border border-slate-150 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs"
              id="search-input"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" id="search-icon" />
            {isSearching && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                id="search-clear-btn"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic sliding category tabs row */}
        <div className="pt-4" id="tabs-section">
          <CategoryTabs
            categories={CATEGORIES}
            selectedId={selectedCategory}
            onSelect={(id) => {
              setSelectedCategory(id);
              setSearchQuery(''); // Clear search when clicking another category
              setOpenFaqId(null); // Close accordion on tab change
            }}
          />
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pt-4" id="content-columns-grid">
          
          {/* Left Column Support Agent details (3.5 columns on large screen, 4 columns on mid) */}
          <div className="md:col-span-4 lg:col-span-3.5 flex flex-col justify-start h-full" id="left-column">
            <SupportAgentCard
              categoryName={isSearching ? 'Search' : activeCategoryName}
              onOpenChat={() => setIsChatOpen(true)}
              onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
            />
          </div>

          {/* Right Column FAQ list (8 columns or 8.5 columns) */}
          <div className="md:col-span-8 lg:col-span-8.5" id="right-column">
            
            {/* Search feedback headers */}
            {isSearching && (
              <div className="mb-6 flex items-center justify-between text-sm bg-blue-50/50 border border-blue-50 p-4 rounded-2xl" id="search-results-feedback">
                <span className="text-slate-600 font-medium">
                  Found <strong className="text-blue-600 font-bold">{filteredFaqs.length}</strong> {filteredFaqs.length === 1 ? 'answer' : 'answers'} matching "{searchQuery}"
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#0A58CA] hover:text-blue-700 font-bold flex items-center gap-1 cursor-pointer"
                  id="reset-search-btn"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Accordion list */}
            <div className="space-y-1" id="faqs-list-container">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <FAQItemRow
                    key={faq.id}
                    item={faq}
                    isOpen={openFaqId === faq.id}
                    onToggle={() => handleToggleFaq(faq.id)}
                    searchQuery={searchQuery}
                  />
                ))
              ) : (
                /* Empty search / category suggestions */
                <div className="text-center py-12 px-6 border-2 border-dashed border-slate-100 rounded-3xl space-y-5" id="empty-state-box">
                  <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400" id="empty-state-icon">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5 max-w-sm mx-auto" id="empty-state-texts">
                    <h3 className="font-bold text-slate-800 text-[16px] font-heading">No matching questions found</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      We couldn't find any results matching "{searchQuery}". Try using other keywords or submit your question to our help desk!
                    </p>
                  </div>
                  <div className="flex justify-center gap-3" id="empty-state-actions">
                    <button
                      onClick={() => setSearchQuery('')}
                      className="bg-slate-50 border border-slate-150 hover:bg-slate-100 text-slate-600 text-xs font-bold px-4 py-2.5 rounded-full transition-all cursor-pointer"
                      id="empty-btn-reset"
                    >
                      Browse All FAQs
                    </button>
                    <button
                      onClick={() => setIsSubmitOpen(true)}
                      className="bg-[#0A58CA] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all shadow-md cursor-pointer"
                      id="empty-btn-submit"
                    >
                      Submit Custom Question
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom auxiliary card: Can't find help block */}
            {filteredFaqs.length > 0 && (
              <div className="mt-8 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all" id="footer-cta-box">
                <div className="flex items-center gap-3 text-center sm:text-left" id="cta-text-wrapper">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#0A58CA] border border-slate-100 shrink-0 hidden sm:flex">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 font-heading">Still couldn't find what you need?</h4>
                    <p className="text-xs text-slate-400">Submit your customized query to our customer success team.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSubmitOpen(true)}
                  className="bg-white hover:bg-[#0A58CA] text-slate-700 hover:text-white border border-slate-200 hover:border-[#0A58CA] text-xs font-bold px-5 py-3 rounded-xl transition-all duration-300 shadow-xs cursor-pointer hover:-translate-y-0.5"
                  id="cta-submit-btn"
                >
                  Submit a Question
                </button>
              </div>
            )}
          </div>

        </div>

      </main>

      {/* Footer Branding and Social Proof line */}
      <footer className="text-center py-6 space-y-1 text-[11px] text-slate-400" id="app-footer">
        <p className="font-semibold text-slate-500">NeaPure Water Technology Ltd. © {new Date().getFullYear()}</p>
        <p className="max-w-md mx-auto leading-relaxed">
          ISO 9001:2015 Certified Purifiers • Trusted by over 100,000 families across Dhaka & Bangladesh divisional headquarters.
        </p>
      </footer>

      {/* Drawers and Modals Assemblies */}
      <LiveChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
      />

      <SubmitQuestionModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        categories={CATEGORIES}
        onSubmitQuestion={handleSubmitCustomQuestion}
      />

    </div>
  );
}
