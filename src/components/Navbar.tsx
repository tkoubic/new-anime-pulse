
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4 relative z-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-anime-primary">Anime<span className="text-anime-secondary">Pulse</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-anime-primary transition-colors">Home</Link>
            <Link to="/upcoming" className="font-medium hover:text-anime-primary transition-colors">Upcoming</Link>
            <Link to="/popular" className="font-medium hover:text-anime-primary transition-colors">Popular</Link>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search size={20} className="text-gray-600" />
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 z-10">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="font-medium hover:text-anime-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/upcoming" 
                className="font-medium hover:text-anime-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Upcoming
              </Link>
              <Link 
                to="/popular" 
                className="font-medium hover:text-anime-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Popular
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
