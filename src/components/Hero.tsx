import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll('.hero-element');
      
      gsap.set(elements, { opacity: 0, y: 30 });
      
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 3.5,
      });
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
    <section id="hero" ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-emerald-50 to-white overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="hero-element text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 mb-6">
            Radiant Skin
            <span className="block text-emerald-600">Naturally</span>
          </h1>
          
          <p className="hero-element text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover the perfect blend of nature and science with our premium skincare collection. 
            Transform your daily routine into a luxurious self-care ritual.
          </p>
          
          <div className="hero-element flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => scrollToSection('products')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Shop Collection
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Learn More
            </button>
          </div>
          
          <div className="hero-element">
            <ArrowDown className="w-6 h-6 text-emerald-600 mx-auto animate-bounce" />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;