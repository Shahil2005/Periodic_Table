import React, { useEffect, useState } from 'react';
import { Element } from '../../types/elementTypes';

interface ElementTooltipProps {
  element: Element;
  position: { x: number; y: number };
}

const ElementTooltip: React.FC<ElementTooltipProps> = ({ element, position }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Small delay before showing tooltip to prevent flickering
    const timer = setTimeout(() => {
      setVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [element]);

  // Calculate position to prevent tooltip from going off-screen
  const getTooltipPosition = () => {
    const tooltipWidth = 320;
    const tooltipHeight = 280;
    const cellWidth = 60;
    const cellHeight = 60;
    
    // Get container dimensions (adjust the selector as needed)
    const container = document.querySelector('.periodic-table-container');
    const containerRect = container?.getBoundingClientRect() || { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
    
    // Calculate initial position
    let posX = position.x * (cellWidth + 4) + containerRect.left; // 4px for gap
    let posY = position.y * (cellHeight + 4) + containerRect.top;
    
    // Adjust for right edge
    if (posX + tooltipWidth > containerRect.left + containerRect.width) {
      posX = posX - tooltipWidth + cellWidth;
    }
    
    // Adjust for bottom edge
    if (posY + tooltipHeight > containerRect.top + containerRect.height) {
      posY = posY - tooltipHeight - 10; // 10px offset
    } else {
      posY = posY + cellHeight + 10; // Display below by default with offset
    }
    
    return {
      left: `${posX}px`,
      top: `${posY}px`,
    };
  };

  if (!visible) return null;

  const tooltipStyle = {
    ...getTooltipPosition(),
    zIndex: 30,
    maxWidth: '320px',
  };

  return (
    <div 
      className={`
        absolute bg-gray-900/95 rounded-xl shadow-2xl p-5
        border border-gray-700/50
        backdrop-blur-lg
        tooltip-enter-active
        glass-effect
      `}
      style={tooltipStyle}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className="text-sm text-blue-400 font-medium">Atomic #{element.atomic_number}</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {element.name}
          </span>
        </div>
        <div className={`
          text-4xl font-bold p-3 rounded-lg
          element-${element.category}
          animate-float
        `}>
          {element.symbol}
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center p-2 bg-gray-800/50 rounded-lg">
          <span className="text-sm text-gray-400">Atomic Mass</span>
          <span className="font-mono text-sm font-medium text-white">{element.atomic_mass.toFixed(4)}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-gray-800/50 rounded-lg">
          <span className="text-sm text-gray-400">Category</span>
          <span className="text-sm font-medium text-white capitalize">{element.category.replace(/_/g, ' ')}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-gray-800/50 rounded-lg">
          <span className="text-sm text-gray-400">State</span>
          <span className="text-sm font-medium text-white capitalize">{element.state_at_room_temp}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="text-xs uppercase text-blue-400 font-semibold mb-2">Electron Configuration</h4>
          <div className="font-mono text-sm bg-gray-800/80 rounded-lg p-2 border border-gray-700/50">
            {element.electron_configuration}
          </div>
        </div>
        
        <div>
          <h4 className="text-xs uppercase text-blue-400 font-semibold mb-2">Fun Fact</h4>
          <p className="text-sm italic text-gray-300 bg-gray-800/50 rounded-lg p-2">
            {element.fun_fact}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElementTooltip;