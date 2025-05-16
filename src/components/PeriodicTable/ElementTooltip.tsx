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
    const tooltipWidth = 300; // Estimated width
    const tooltipHeight = 250; // Estimated height
    const cellWidth = 60; // Approximated cell width
    const cellHeight = 60; // Approximated cell height
    
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
    maxWidth: '300px',
  };

  return (
    <div 
      className="absolute bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-700 tooltip-enter-active"
      style={tooltipStyle}
    >
      <div className="flex justify-between mb-2">
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">Atomic #{element.atomic_number}</span>
          <span className="text-xl font-bold">{element.name}</span>
        </div>
        <div className="text-3xl font-bold">{element.symbol}</div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm">
          <span>Atomic Mass</span>
          <span className="font-mono">{element.atomic_mass.toFixed(4)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Category</span>
          <span>{element.category.replace(/_/g, ' ')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>State</span>
          <span>{element.state_at_room_temp}</span>
        </div>
      </div>
      
      <div className="mb-3">
        <h4 className="text-xs uppercase text-gray-400 mb-1">Electron Configuration</h4>
        <div className="font-mono text-sm bg-gray-700 rounded p-1">{element.electron_configuration}</div>
      </div>
      
      <div>
        <h4 className="text-xs uppercase text-gray-400 mb-1">Fun Fact</h4>
        <p className="text-sm italic">{element.fun_fact}</p>
      </div>
    </div>
  );
};

export default ElementTooltip;