import React from 'react';
import { Atom, Book, Info } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="backdrop-blur-md bg-gray-900/50 border-b border-white/5 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Atom size={32} className="text-blue-400 animate-float" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full filter blur-xl"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Periodic Table
              </h1>
              <p className="text-xs text-blue-400 font-medium">Interactive Explorer</p>
            </div>
          </div>
          
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <Book size={16} />
                  <span>Learn</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <Info size={16} />
                  <span>About</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;