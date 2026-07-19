export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  isHot?: boolean;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: string;
}
