
import React from 'react';
import { Database } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Database size={24} className="text-blue-400" />
          <span className="font-bold text-xl">Stock Maintenance System</span>
        </div>
        <div>
          <span className="text-sm text-slate-300">TypeScript In-Memory System</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
