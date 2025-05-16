import React from 'react';
import PeriodicTable from './components/PeriodicTable/PeriodicTable';
import Header from './components/UI/Header';
import { ElementProvider } from './context/ElementContext';
import './App.css';

function App() {
  return (
    <ElementProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <PeriodicTable />
        </main>
        <footer className="text-center py-6 text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Periodic Table Explorer</p>
        </footer>
      </div>
    </ElementProvider>
  );
}

export default App;