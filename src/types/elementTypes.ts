export interface Element {
  atomic_number: number;
  symbol: string;
  name: string;
  atomic_mass: number;
  category: ElementCategory;
  group: string;
  period: number;
  block: string;
  electron_configuration: string;
  state_at_room_temp: 'solid' | 'liquid' | 'gas' | 'unknown';
  discovery_year?: number;
  fun_fact: string;
  x: number; // grid position x
  y: number; // grid position y
}

export type ElementCategory = 
  | 'alkali_metal'
  | 'alkaline_earth_metal'
  | 'transition_metal'
  | 'post_transition_metal'
  | 'metalloid'
  | 'nonmetal'
  | 'noble_gas'
  | 'lanthanide'
  | 'actinide'
  | 'unknown';

export type FilterOption = {
  id: string;
  label: string;
  category: 'type' | 'state' | 'group' | 'block';
  value: string;
};

export interface ElementContextType {
  elements: Element[];
  filteredElements: Element[];
  activeFilters: FilterOption[];
  searchTerm: string;
  selectedElement: Element | null;
  setSearchTerm: (term: string) => void;
  toggleFilter: (filter: FilterOption) => void;
  clearFilters: () => void;
  selectElement: (element: Element | null) => void;
}