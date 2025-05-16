import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Element, ElementContextType, FilterOption } from '../types/elementTypes';
import { elementsData } from '../data/elementsData';

const defaultContextValue: ElementContextType = {
  elements: [],
  filteredElements: [],
  activeFilters: [],
  searchTerm: '',
  selectedElement: null,
  setSearchTerm: () => {},
  toggleFilter: () => {},
  clearFilters: () => {},
  selectElement: () => {},
};

export const ElementContext = createContext<ElementContextType>(defaultContextValue);

interface ElementProviderProps {
  children: ReactNode;
}

export const ElementProvider: React.FC<ElementProviderProps> = ({ children }) => {
  const [elements] = useState<Element[]>(elementsData);
  const [filteredElements, setFilteredElements] = useState<Element[]>(elementsData);
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  useEffect(() => {
    let results = [...elements];
    
    // Apply filters
    if (activeFilters.length > 0) {
      results = results.filter(element => {
        return activeFilters.every(filter => {
          switch (filter.category) {
            case 'type':
              return element.category === filter.value;
            case 'state':
              return element.state_at_room_temp === filter.value;
            case 'group':
              return element.group === filter.value;
            case 'block':
              return element.block === filter.value;
            default:
              return true;
          }
        });
      });
    }
    
    // Apply search
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      results = results.filter(
        element => 
          element.name.toLowerCase().includes(term) || 
          element.symbol.toLowerCase().includes(term) ||
          element.atomic_number.toString().includes(term)
      );
    }
    
    setFilteredElements(results);
  }, [elements, activeFilters, searchTerm]);

  const toggleFilter = (filter: FilterOption) => {
    setActiveFilters(prev => {
      // Check if filter is already active
      const isActive = prev.some(f => f.id === filter.id);
      
      if (isActive) {
        // Remove filter
        return prev.filter(f => f.id !== filter.id);
      } else {
        // Add filter
        return [...prev, filter];
      }
    });
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchTerm('');
  };

  const selectElement = (element: Element | null) => {
    setSelectedElement(element);
  };

  return (
    <ElementContext.Provider
      value={{
        elements,
        filteredElements,
        activeFilters,
        searchTerm,
        selectedElement,
        setSearchTerm,
        toggleFilter,
        clearFilters,
        selectElement,
      }}
    >
      {children}
    </ElementContext.Provider>
  );
};