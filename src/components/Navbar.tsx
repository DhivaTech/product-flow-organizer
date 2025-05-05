
import React from 'react';
import { Database, LogIn, LogOut, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  
  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <Database size={24} className="text-blue-400" />
            <span className="font-bold text-xl">Stock Maintenance System</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm bg-slate-700 px-3 py-1 rounded-full">
                {user?.role}
              </span>
              <span className="text-sm hidden md:inline">
                {user?.name}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                className="text-white border-white hover:text-slate-800 flex items-center"
                onClick={logout}
              >
                <LogOut size={16} className="mr-2" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-white hover:text-slate-800 flex items-center"
                asChild
              >
                <Link to="/auth">
                  <LogIn size={16} className="mr-2" />
                  <span>Login</span>
                </Link>
              </Button>
              <Button 
                variant="default" 
                size="sm"
                className="flex items-center"
                asChild
              >
                <Link to="/auth?tab=signup">
                  <UserPlus size={16} className="mr-2" />
                  <span>Sign Up</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
