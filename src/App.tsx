import React from 'react';
import PeriodicTable from './components/PeriodicTable/PeriodicTable';
import Header from './components/UI/Header';
import { ElementProvider } from './context/ElementContext';
import './App.css';

function App() {
  return (
    <ElementProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full filter blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <PeriodicTable />
          </main>
          <footer className="text-center py-6 text-gray-400 text-sm backdrop-blur-sm border-t border-white/5">
            <p>© {new Date().getFullYear()} Periodic Table Explorer • Interactive Chemistry Learning</p>
          </footer>
        </div>
      </div>
    </ElementProvider>
  );
}

export default App;