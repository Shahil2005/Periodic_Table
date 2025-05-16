import React from 'react';
import { Atom } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Atom size={32} className="text-blue-500" />
            <div className="text-white">
              <h1 className="text-xl font-bold">Periodic Table</h1>
              <p className="text-xs text-gray-400">Interactive Explorer</p>
            </div>
          </div>
          <nav>
            <ul className="flex space-x-4 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">Table</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">About</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;