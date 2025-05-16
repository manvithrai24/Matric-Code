
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold text-analyzer-primary">
                  CodeAnalyzer<span className="text-analyzer-secondary">Pro</span>
                </h1>
              </Link>
            </div>
            <div className="ml-4">
              <Badge variant="outline" className="text-xs font-medium text-gray-500">
                v1.0.0
              </Badge>
            </div>
          </div>
          <nav className="flex space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-medium ${
                location.pathname === '/' 
                  ? 'text-analyzer-primary border-b-2 border-analyzer-primary' 
                  : 'text-gray-700 hover:text-analyzer-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className={`px-3 py-2 text-sm font-medium ${
                location.pathname === '/dashboard' 
                  ? 'text-analyzer-primary border-b-2 border-analyzer-primary' 
                  : 'text-gray-700 hover:text-analyzer-primary'
              }`}
            >
              Dashboard
            </Link>
            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-analyzer-primary">
              Settings
            </a>
            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-analyzer-primary">
              Help
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
