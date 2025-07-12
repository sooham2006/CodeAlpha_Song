import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const headerRef = useRef<HTMLElement>(null);
  const { state } = useCart();

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 4, ease: 'power2.out' }
      );
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: elementPosition, autoKill: false },
        ease: 'power2.inOut'
      });
    }
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <h1 className="text-2xl font-light tracking-wide text-gray-900">SKINCARE</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium"
            >
              FAQ
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-emerald-600 transition-all duration-300 transform hover:scale-110"
            >
              <ShoppingBag className="w-6 h-6" />
              {state.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                  {state.totalItems}
                </span>
              )}
            </button>
            
            <button className="md:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-300">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;