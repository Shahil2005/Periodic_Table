import React, { useContext } from 'react';
import { ElementContext } from '../../context/ElementContext';
import { FilterOption } from '../../types/elementTypes';
import { X } from 'lucide-react';

// Define filter options
const filters: FilterOption[] = [
  // Element Types
  { id: 'type-metal-alkali', category: 'type', label: 'Alkali Metals', value: 'alkali_metal' },
  { id: 'type-metal-alkaline', category: 'type', label: 'Alkaline Earth Metals', value: 'alkaline_earth_metal' },
  { id: 'type-metal-transition', category: 'type', label: 'Transition Metals', value: 'transition_metal' },
  { id: 'type-metal-post', category: 'type', label: 'Post-Transition Metals', value: 'post_transition_metal' },
  { id: 'type-metalloid', category: 'type', label: 'Metalloids', value: 'metalloid' },
  { id: 'type-nonmetal', category: 'type', label: 'Nonmetals', value: 'nonmetal' },
  { id: 'type-noble-gas', category: 'type', label: 'Noble Gases', value: 'noble_gas' },
  { id: 'type-lanthanide', category: 'type', label: 'Lanthanides', value: 'lanthanide' },
  { id: 'type-actinide', category: 'type', label: 'Actinides', value: 'actinide' },
  
  // States at room temperature
  { id: 'state-solid', category: 'state', label: 'Solid', value: 'solid' },
  { id: 'state-liquid', category: 'state', label: 'Liquid', value: 'liquid' },
  { id: 'state-gas', category: 'state', label: 'Gas', value: 'gas' },
  
  // Blocks
  { id: 'block-s', category: 'block', label: 's-block', value: 's' },
  { id: 'block-p', category: 'block', label: 'p-block', value: 'p' },
  { id: 'block-d', category: 'block', label: 'd-block', value: 'd' },
  { id: 'block-f', category: 'block', label: 'f-block', value: 'f' },
];

// Group filters by category
const filtersByCategory = filters.reduce((acc, filter) => {
  if (!acc[filter.category]) {
    acc[filter.category] = [];
  }
  acc[filter.category].push(filter);
  return acc;
}, {} as Record<string, FilterOption[]>);

const FilterBar: React.FC = () => {
  const { activeFilters, toggleFilter, clearFilters, filteredElements } = useContext(ElementContext);
  
  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case 'type': return 'Element Type';
      case 'state': return 'State at Room Temp';
      case 'group': return 'Group';
      case 'block': return 'Block';
      default: return category;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Filters</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">
            Showing {filteredElements.length} elements
          </span>
          {activeFilters.length > 0 && (
            <button 
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
            >
              <X size={14} />
              Clear all
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(filtersByCategory).map(([category, categoryFilters]) => (
          <div key={category} className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">{getCategoryLabel(category)}</h4>
            <div className="flex flex-wrap gap-2">
              {categoryFilters.map(filter => {
                const isActive = activeFilters.some(f => f.id === filter.id);
                return (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter)}
                    className={`
                      text-xs px-3 py-1.5 rounded-full transition-colors
                      ${isActive 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }
                    `}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;