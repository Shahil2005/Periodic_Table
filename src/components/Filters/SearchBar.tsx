import React, { useContext, useState } from 'react';
import { ElementContext } from '../../context/ElementContext';
import { Search, X } from 'lucide-react';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useContext(ElementContext);
  const [isFocused, setIsFocused] = useState(false);
  
  const handleClearSearch = () => {
    setSearchTerm('');
  };
  
  return (
    <div 
      className={`
        flex items-center bg-gray-700 rounded-lg overflow-hidden transition-all
        ${isFocused ? 'ring-2 ring-blue-500' : ''}
      `}
    >
      <div className="flex-shrink-0 pl-3">
        <Search size={18} className="text-gray-400" />
      </div>
      
      <input
        type="text"
        placeholder="Search elements..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="py-2 px-3 bg-transparent flex-grow outline-none text-sm min-w-[200px]"
      />
      
      {searchTerm && (
        <button 
          onClick={handleClearSearch}
          className="flex-shrink-0 pr-3 text-gray-400 hover:text-white"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;