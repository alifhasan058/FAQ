import { Category } from '../types';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';

interface CategoryTabsProps {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function CategoryTabs({ categories, selectedId, onSelect }: CategoryTabsProps) {
  // Safe helper to render Lucide icons dynamically
  const renderIcon = (iconName: string, isSelected: boolean) => {
    switch (iconName) {
      case 'Star':
        return <Icons.Star className={`w-4 h-4 ${isSelected ? 'text-blue-600 fill-blue-600' : 'text-gray-400'}`} id={`icon-star-${selectedId}`} />;
      case 'LayoutGrid':
        return <Icons.LayoutGrid className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} id={`icon-grid-${selectedId}`} />;
      case 'Wrench':
        return <Icons.Wrench className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} id={`icon-wrench-${selectedId}`} />;
      case 'Shield':
        return <Icons.Shield className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} id={`icon-shield-${selectedId}`} />;
      case 'Truck':
        return <Icons.Truck className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} id={`icon-truck-${selectedId}`} />;
      case 'CreditCard':
        return <Icons.CreditCard className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} id={`icon-card-${selectedId}`} />;
      default:
        return <Icons.HelpCircle className="w-4 h-4" id={`icon-help-${selectedId}`} />;
    }
  };

  return (
    <div className="border-b border-gray-100 mb-8 overflow-x-auto scrollbar-none" id="category-tabs-container">
      <div className="flex gap-2 min-w-max px-2 md:px-0 py-1" id="category-tabs-inner">
        {categories.map((category) => {
          const isSelected = selectedId === category.id;
          return (
            <button
              key={category.id}
              id={`tab-${category.id}`}
              onClick={() => onSelect(category.id)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer outline-none select-none
                ${isSelected 
                  ? 'text-blue-600 bg-blue-50/40 md:bg-transparent font-semibold' 
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50/80 md:hover:bg-transparent'
                }`}
            >
              {renderIcon(category.iconName, isSelected)}
              <span>{category.name}</span>
              
              {isSelected && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-t-full hidden md:block"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  id="active-tab-underline"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
