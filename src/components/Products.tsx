import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import toast from 'react-hot-toast';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: string;
  priceNumber: number;
  image: string;
  description: string;
}

const Products: React.FC = () => {
  const productsRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { dispatch } = useCart();

  const products: Product[] = [
    {
      id: 1,
      name: "Vitamin C Serum",
      price: "$89",
      priceNumber: 89,
      image: "https://images.pexels.com/photos/7755515/pexels-photo-7755515.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
      description: "Brightening serum with 20% Vitamin C"
    },
    {
      id: 2,
      name: "Hyaluronic Moisturizer",
      price: "$76",
      priceNumber: 76,
      image: "https://images.pexels.com/photos/6621374/pexels-photo-6621374.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
      description: "Deep hydration with hyaluronic acid"
    },
    {
      id: 3,
      name: "Retinol Night Cream",
      price: "$95",
      priceNumber: 95,
      image: "https://images.pexels.com/photos/7755516/pexels-photo-7755516.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
      description: "Anti-aging night treatment"
    },
    {
      id: 4,
      name: "Gentle Cleanser",
      price: "$54",
      priceNumber: 54,
      image: "https://images.pexels.com/photos/6621371/pexels-photo-6621371.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
      description: "Gentle daily face cleanser"
    },
    {
      id: 5,
      name: "Niacinamide Serum",
      price: "$68",
      priceNumber: 68,
      image: "https://images.pexels.com/photos/7755517/pexels-photo-7755517.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
      description: "Pore minimizing and oil control"
    },
    {
      id: 6,
      name: "Peptide Eye Cream",
      price: "$112",
      priceNumber: 112,
      image: "https://images.pexels.com/photos/6621372/pexels-photo-6621372.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
      description: "Anti-aging eye treatment"
    },
    {
      id: 7,
      name: "AHA/BHA Exfoliant",
      price: "$82",
      priceNumber: 82,
      image: "https://images.pexels.com/photos/6621373/pexels-photo-6621373.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
      description: "Chemical exfoliant for smooth skin"
    },
    {
      id: 8,
      name: "Ceramide Barrier Cream",
      price: "$91",
      priceNumber: 91,
      image: "https://images.pexels.com/photos/7755518/pexels-photo-7755518.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
      description: "Skin barrier repair and protection"
    },
    {
      id: 9,
      name: "Vitamin E Face Oil",
      price: "$73",
      priceNumber: 73,
      image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
      description: "Nourishing facial oil blend"
    },
    {
      id: 10,
      name: "Collagen Mask Set",
      price: "$45",
      priceNumber: 45,
      image: "https://images.pexels.com/photos/4465830/pexels-photo-4465830.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
      description: "Hydrating sheet mask collection"
    },
    {
      id: 11,
      name: "Sunscreen SPF 50",
      price: "$38",
      priceNumber: 38,
      image: "https://images.pexels.com/photos/4465544/pexels-photo-4465544.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
      description: "Broad spectrum UV protection"
    },
    {
      id: 12,
      name: "Rose Hip Toner",
      price: "$56",
      priceNumber: 56,
      image: "https://images.pexels.com/photos/4465659/pexels-photo-4465659.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
      description: "Hydrating and balancing toner"
    }
  ];

  const itemsPerPage = {
    mobile: 1,
    tablet: 2,
    desktop: 4
  };

  const [currentBreakpoint, setCurrentBreakpoint] = useState('desktop');
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCurrentBreakpoint('mobile');
        setItemsToShow(1);
      } else if (width < 1024) {
        setCurrentBreakpoint('tablet');
        setItemsToShow(2);
      } else {
        setCurrentBreakpoint('desktop');
        setItemsToShow(4);
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  useEffect(() => {
    if (productsRef.current) {
      gsap.fromTo(productsRef.current.querySelectorAll('.product-element'), 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: productsRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  const maxIndex = Math.max(0, products.length - itemsToShow);

  const nextProduct = () => {
    if (isAnimating || currentIndex >= maxIndex) return;
    
    setIsAnimating(true);
    const newIndex = Math.min(currentIndex + itemsToShow, maxIndex);
    setCurrentIndex(newIndex);
    
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        x: -newIndex * (100 / itemsToShow) + '%',
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => setIsAnimating(false)
      });
    }
  };

  const prevProduct = () => {
    if (isAnimating || currentIndex <= 0) return;
    
    setIsAnimating(true);
    const newIndex = Math.max(currentIndex - itemsToShow, 0);
    setCurrentIndex(newIndex);
    
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        x: -newIndex * (100 / itemsToShow) + '%',
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => setIsAnimating(false)
      });
    }
  };

  const addToCart = (product: Product) => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        priceNumber: product.priceNumber,
        image: product.image
      }
    });
    
    toast.success(`${product.name} added to cart!`, {
      icon: '🛍️',
      duration: 2000,
    });
  };

  return (
    <section id="products" ref={productsRef} className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="product-element text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Best Selling Products
          </h2>
          <p className="product-element text-lg text-gray-600">
            Discover our most loved skincare essentials
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="product-element group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-600">{product.price}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-400"
              style={{ width: `${(products.length / itemsToShow) * 100}%` }}
            >
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="px-2"
                  style={{ width: `${100 / products.length * itemsToShow}%` }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-emerald-600">{product.price}</span>
                        <button 
                          onClick={() => addToCart(product)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button 
              onClick={prevProduct}
              disabled={currentIndex <= 0 || isAnimating}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-50 transition-all duration-300 transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <ChevronLeft className="w-6 h-6 text-emerald-600" />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(products.length / itemsToShow) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setCurrentIndex(index * itemsToShow);
                      if (carouselRef.current) {
                        gsap.to(carouselRef.current, {
                          x: -(index * itemsToShow) * (100 / itemsToShow) + '%',
                          duration: 0.4,
                          ease: 'power2.out'
                        });
                      }
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / itemsToShow) === index ? 'bg-emerald-600 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextProduct}
              disabled={currentIndex >= maxIndex || isAnimating}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-50 transition-all duration-300 transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <ChevronRight className="w-6 h-6 text-emerald-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;