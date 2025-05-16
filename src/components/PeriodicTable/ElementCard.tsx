import React from 'react';
import { Element } from '../../types/elementTypes';

interface ElementCardProps {
  element: Element;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const ElementCard: React.FC<ElementCardProps> = ({ 
  element, 
  onMouseEnter, 
  onMouseLeave, 
  onClick 
}) => {
  // Function to determine background color based on category
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'alkali_metal':
        return 'bg-red-500 hover:bg-red-400';
      case 'alkaline_earth_metal':
        return 'bg-orange-500 hover:bg-orange-400';
      case 'transition_metal':
        return 'bg-yellow-500 hover:bg-yellow-400';
      case 'post_transition_metal':
        return 'bg-green-500 hover:bg-green-400';
      case 'metalloid':
        return 'bg-teal-500 hover:bg-teal-400';
      case 'nonmetal':
        return 'bg-blue-500 hover:bg-blue-400';
      case 'noble_gas':
        return 'bg-purple-500 hover:bg-purple-400';
      case 'lanthanide':
        return 'bg-pink-500 hover:bg-pink-400';
      case 'actinide':
        return 'bg-rose-500 hover:bg-rose-400';
      default:
        return 'bg-gray-500 hover:bg-gray-400';
    }
  };

  // Function to determine state indicator
  const getStateIndicator = (state: string): string => {
    switch (state) {
      case 'solid':
        return 'border-t-2 border-white';
      case 'liquid':
        return 'border-t-2 border-blue-300';
      case 'gas':
        return 'border-t-2 border-green-300';
      default:
        return '';
    }
  };

  return (
    <div
      className={`
        element-card
        ${getCategoryColor(element.category)}
        ${getStateIndicator(element.state_at_room_temp)}
        flex flex-col items-center justify-center
        w-full h-16 sm:h-20
        rounded-md shadow-md
        cursor-pointer
        element-hover
        transition-all duration-200
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="text-xs leading-none opacity-70">{element.atomic_number}</div>
      <div className="text-base sm:text-xl font-bold leading-none mt-1">{element.symbol}</div>
      <div className="text-[9px] sm:text-[10px] truncate max-w-full px-1 mt-1 text-center leading-none">
        {element.name}
      </div>
    </div>
  );
};

export default ElementCard;