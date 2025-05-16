import React, { useContext, useState } from 'react';
import { ElementContext } from '../../context/ElementContext';
import ElementCard from './ElementCard';
import ElementTooltip from './ElementTooltip';
import FilterBar from '../Filters/FilterBar';
import SearchBar from '../Filters/SearchBar';
import { Element } from '../../types/elementTypes';
import { Search, Filter } from 'lucide-react';

const PeriodicTable: React.FC = () => {
  const { filteredElements, selectedElement, selectElement } = useContext(ElementContext);
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Calculate grid dimensions based on the max x and y values
  const maxX = Math.max(...filteredElements.map(el => el.x));
  const maxY = Math.max(...filteredElements.map(el => el.y));

  // Create a grid template with empty cells
  const grid = Array(maxY + 1).fill(null).map(() => Array(maxX + 1).fill(null));

  // Fill the grid with elements
  filteredElements.forEach(element => {
    if (element.x >= 0 && element.y >= 0) {
      grid[element.y][element.x] = element;
    }
  });

  const handleMouseEnter = (element: Element) => {
    setHoveredElement(element);
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Periodic Table of Elements</h2>
          <p className="text-gray-400">Explore and filter all known chemical elements</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <SearchBar />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 transition-colors py-2 px-4 rounded-lg"
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-gray-800 rounded-lg p-4 animate-fade-in">
          <FilterBar />
        </div>
      )}

      <div className="relative overflow-x-auto pb-8">
        <div 
          className="periodic-table-container"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${maxX + 1}, minmax(60px, 1fr))`,
            gridTemplateRows: `repeat(${maxY + 1}, minmax(60px, auto))`,
            gap: '4px',
            minWidth: '100%',
            overflowX: 'auto'
          }}
        >
          {grid.map((row, y) => 
            row.map((element, x) => (
              <div key={`${y}-${x}`} style={{ gridRow: y + 1, gridColumn: x + 1 }}>
                {element && (
                  <ElementCard 
                    element={element}
                    onMouseEnter={() => handleMouseEnter(element)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => selectElement(element)}
                  />
                )}
              </div>
            ))
          )}
        </div>
        
        {hoveredElement && (
          <ElementTooltip 
            element={hoveredElement} 
            position={{ x: hoveredElement.x, y: hoveredElement.y }}
          />
        )}
      </div>

      {selectedElement && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedElement.name}</h2>
              <button 
                onClick={() => selectElement(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className={`w-32 h-32 flex flex-col items-center justify-center rounded-lg mb-4 element-${selectedElement.category}`}>
                  <span className="text-xs">{selectedElement.atomic_number}</span>
                  <span className="text-4xl font-bold">{selectedElement.symbol}</span>
                  <span className="text-sm">{selectedElement.atomic_mass.toFixed(2)}</span>
                </div>
                <div className="space-y-2">
                  <p><span className="font-semibold">Category:</span> {selectedElement.category.replace(/_/g, ' ')}</p>
                  <p><span className="font-semibold">State at room temperature:</span> {selectedElement.state_at_room_temp}</p>
                  <p><span className="font-semibold">Group:</span> {selectedElement.group}</p>
                  <p><span className="font-semibold">Period:</span> {selectedElement.period}</p>
                  <p><span className="font-semibold">Block:</span> {selectedElement.block}</p>
                  {selectedElement.discovery_year && (
                    <p><span className="font-semibold">Discovered:</span> {selectedElement.discovery_year}</p>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Electron Configuration</h3>
                  <p className="font-mono bg-gray-700 p-2 rounded">{selectedElement.electron_configuration}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Fun Fact</h3>
                  <p className="bg-gray-700 p-3 rounded-lg italic">{selectedElement.fun_fact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;