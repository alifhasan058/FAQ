import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, ArrowLeft, Check, Sparkles, Smile } from 'lucide-react';
import { ChatMessage } from '../types';
import supportAgent from '../assets/images/support_agent_1784480597301.jpg';

interface LiveChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_REPLIES = [
  'Is installation free?',
  'When will my order arrive?',
  'How do I pay via bKash?',
  'Can I book a technician?',
];

export default function LiveChatDrawer({ isOpen, onClose }: LiveChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      text: 'Hi there! 👋 I am Alif from NeaPure Support. Welcome!',
      sender: 'agent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: 'welcome-2',
      text: 'How can I help you with your water purifier today? Feel free to ask me anything or click one of the quick options below!',
      sender: 'agent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat list
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Clean state when closed/opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'auto' });
      }, 100);
    }
  }, [isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add User Message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      text: text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Agent Response with dynamic answer extraction
    setTimeout(() => {
      let replyText = '';
      const cleanedText = text.toLowerCase();

      // Simple keywords matcher representing NeaPure Support Bot Alif
      if (cleanedText.includes('free') || cleanedText.includes('install') || cleanedText.includes('charge')) {
        replyText = 'Yes, installation is completely FREE for all NeaPure purifiers! Once delivered, our certified technician will visit your location within 24-48 hours to set up your device perfectly. Would you like me to book an appointment?';
      } else if (cleanedText.includes('delivery') || cleanedText.includes('dhaka') || cleanedText.includes('arrive') || cleanedText.includes('shipping') || cleanedText.includes('when')) {
        replyText = 'Inside Dhaka, delivery is completed within 24-48 hours! Outside Dhaka, it takes 2-4 business days. We also offer full Cash on Delivery (COD) across all 64 districts in Bangladesh! 🇧🇩';
      } else if (cleanedText.includes('bkash') || cleanedText.includes('pay') || cleanedText.includes('payment') || cleanedText.includes('emi') || cleanedText.includes('nagad')) {
        replyText = 'We accept Cash on Delivery (COD), cards, bKash, and Nagad. Plus, we offer 0% interest EMI options up to 12 months with major Bangladeshi banks on purchases over BDT 12,000! 💳';
      } else if (cleanedText.includes('filter') || cleanedText.includes('change') || cleanedText.includes('replace') || cleanedText.includes('often') || cleanedText.includes('membrane')) {
        replyText = 'Generally, sediment and carbon filters last around 6 months, while the high-efficiency RO membrane lasts 12-18 months. Our smart companion app and SMS alert system will automatically notify you before your filters are due! 💧';
      } else if (cleanedText.includes('warranty') || cleanedText.includes('claim') || cleanedText.includes('cover')) {
        replyText = 'All NeaPure purifiers include a 1-year comprehensive warranty on all electrical parts (booster pump, adapter, solenoid valve) and a 3-year warranty on the core RO membrane filter. If you ever need help, we will fix it for free!';
      } else if (cleanedText.includes('technician') || cleanedText.includes('book') || cleanedText.includes('service') || cleanedText.includes('schedule') || cleanedText.includes('repair')) {
        replyText = 'I would be happy to coordinate a service visit! Could you please share your 11-digit mobile number? Our service coordinator will call you back within 10 minutes to schedule the technician visit.';
      } else if (/^(?:\+88|01)?\d{9}$/.test(cleanedText.replace(/[-\s]/g, '')) || (cleanedText.match(/\d/g) || []).length >= 11) {
        // Detect phone numbers
        const num = cleanedText.match(/\d+/g)?.join('') || '';
        replyText = `Excellent! I have logged your phone number (${num}) with our service team. 📝 A NeaPure customer care officer will call you back within 5-10 minutes to finalize your booking. We are on it!`;
      } else {
        replyText = "That's a great question! I want to make sure you get the most accurate answer. Could you please share your mobile number or email? I will have a senior customer support manager call you back directly in 5 minutes! 📞";
      }

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        text: replyText,
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 cursor-pointer"
            id="chat-overlay"
          />

          {/* Sliding Chat Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col h-full border-l border-slate-100"
            id="chat-drawer"
          >
            {/* Header section with Support Agent Details */}
            <div className="bg-[#0A58CA] text-white p-5 flex items-center justify-between shadow-md shrink-0" id="chat-header">
              <div className="flex items-center gap-3" id="chat-header-info">
                <button
                  onClick={onClose}
                  className="p-1 -ml-1 rounded-full hover:bg-white/10 transition-colors sm:hidden"
                  id="chat-back-btn"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="relative" id="chat-header-avatar">
                  <div className="w-11 h-11 rounded-full border-2 border-white/20 overflow-hidden bg-white/10">
                    <img
                      src={supportAgent}
                      alt="Alif Support Avatar"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-[16px] tracking-tight leading-tight flex items-center gap-1.5 font-heading">
                    Alif <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-normal">Support Agent</span>
                  </h3>
                  <p className="text-xs text-blue-100/90 flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                    Always online • Replies in seconds
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/10 transition-all outline-none cursor-pointer hidden sm:block"
                id="chat-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat message content view */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50" id="chat-messages-container">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    id={`chat-msg-row-${msg.id}`}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
                  >
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 bg-slate-100 shadow-xs border border-white">
                        <img
                          src={supportAgent}
                          alt="Alif"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div
                      id={`chat-bubble-${msg.id}`}
                      className={`max-w-[78%] p-3.5 rounded-2xl text-[14px] leading-relaxed shadow-xs
                        ${isUser
                          ? 'bg-[#0A58CA] text-white rounded-br-none'
                          : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                        }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <span
                        className={`block text-[9px] mt-1.5 text-right
                          ${isUser ? 'text-blue-200' : 'text-slate-400'}`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Typing Animation State */}
              {isTyping && (
                <div className="flex justify-start items-end gap-2" id="typing-indicator">
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 bg-slate-100 shadow-xs border border-white">
                    <img
                      src={supportAgent}
                      alt="Alif"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-bl-none shadow-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick replies block */}
            <div className="p-4 bg-white border-t border-slate-100 shrink-0" id="quick-replies-panel">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Frequently Asked</span>
              <div className="flex flex-wrap gap-2" id="quick-replies-list">
                {QUICK_REPLIES.map((reply, index) => (
                  <button
                    key={index}
                    id={`quick-reply-${index}`}
                    onClick={() => handleSendMessage(reply)}
                    className="text-xs bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 text-slate-600 hover:text-[#0A58CA] px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer text-left"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Input Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-4 bg-white border-t border-slate-100 shrink-0 flex items-center gap-2"
              id="chat-input-form"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 bg-slate-50 border border-slate-150 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                id="chat-input-field"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer select-none outline-none
                  ${inputValue.trim()
                    ? 'bg-[#0A58CA] text-white hover:bg-blue-700 hover:scale-105 shadow-md active:scale-95'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                id="chat-submit-btn"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
