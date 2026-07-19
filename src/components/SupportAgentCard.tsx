import supportAgent from '../assets/images/support_agent_1784480597301.jpg';
import { MessageSquare, MessageCircle, Clock, Heart } from 'lucide-react';

interface SupportAgentCardProps {
  onOpenChat: () => void;
  onOpenWhatsApp: () => void;
  categoryName: string;
}

export default function SupportAgentCard({ onOpenChat, onOpenWhatsApp, categoryName }: SupportAgentCardProps) {
  return (
    <div
      id="support-agent-card"
      className="bg-slate-50/80 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
    >
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-50/30 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10" id="support-agent-content">
        {/* Dynamic Title based on Active Category */}
        <div className="space-y-1 mb-6" id="support-header-text">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight font-heading">
            {categoryName} Questions
          </h3>
          <p className="text-sm text-slate-500">
            Top questions from our customers.
          </p>
        </div>

        {/* Support Agent Avatar Container */}
        <div className="relative flex justify-center mb-6" id="agent-avatar-wrapper">
          <div className="w-[180px] h-[180px] rounded-full border-4 border-white shadow-lg overflow-hidden bg-blue-50 relative group">
            <img
              src={supportAgent}
              alt="NeaPure Support Agent"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              id="support-agent-image"
            />
            {/* Online indicator badge */}
            <div className="absolute bottom-2 right-4 bg-emerald-500 text-white p-1 rounded-full border-2 border-white flex items-center justify-center animate-bounce" id="online-badge">
              <span className="w-2.5 h-2.5 rounded-full bg-white block" />
            </div>
          </div>
        </div>

        {/* Buttons List */}
        <div className="space-y-3 mb-6" id="support-buttons-group">
          {/* Live Chat Button */}
          <button
            onClick={onOpenChat}
            id="btn-live-chat"
            className="w-full bg-[#0A58CA] hover:bg-blue-700 text-white p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:rotate-6 transition-transform">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="block font-bold text-[15px] leading-tight">Live Chat</span>
              <span className="block text-xs text-blue-100 leading-none mt-0.5">We reply in seconds</span>
            </div>
          </button>

          {/* WhatsApp Button */}
          <button
            onClick={onOpenWhatsApp}
            id="btn-whatsapp"
            className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:rotate-6 transition-transform">
              <MessageCircle className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="text-left">
              <span className="block font-bold text-[15px] leading-tight">WhatsApp Us</span>
              <span className="block text-xs text-emerald-100 leading-none mt-0.5">Quick response</span>
            </div>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-slate-100 pt-5 mt-auto relative z-10" id="support-footer">
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between items-start sm:items-center md:items-start lg:items-center gap-4" id="support-stats">
          <div className="space-y-1" id="support-footer-text">
            <h4 className="text-xs font-bold text-slate-700 tracking-wider uppercase">Still need help?</h4>
            <p className="text-xs text-slate-400">Our support team is available 24/7.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-xl px-3 py-2 flex items-center gap-2 shadow-xs shrink-0" id="response-time-pill">
            <Clock className="w-4 h-4 text-emerald-500 animate-pulse" />
            <div className="text-left">
              <span className="block text-[10px] text-slate-400 font-medium leading-none">Avg. Response</span>
              <span className="block text-xs font-bold text-slate-700 leading-none mt-1 font-mono">1 Min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
