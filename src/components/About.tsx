import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const text = textRef.current;
      const words = text.textContent?.split(' ') || [];
      
      // Clear original text and create spans for each word
      text.innerHTML = '';
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.opacity = '0.3';
        text.appendChild(span);
      });

      const wordSpans = text.querySelectorAll('span');

      // Animate words on scroll
      ScrollTrigger.create({
        trigger: text,
        start: 'top 80%',
        end: 'bottom 20%',
        onUpdate: (self) => {
          const progress = self.progress;
          const wordsToReveal = Math.floor(progress * wordSpans.length);
          
          wordSpans.forEach((span, index) => {
            if (index <= wordsToReveal) {
              gsap.to(span, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            }
          });
        },
      });
    }

    if (aboutRef.current) {
      gsap.fromTo(aboutRef.current.querySelectorAll('.about-element'), 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <section id="about" ref={aboutRef} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="about-element text-3xl md:text-5xl font-light text-gray-900 mb-8">
            Pure Beauty, Pure Science
          </h2>
          
          <p 
            ref={textRef}
            className="about-element text-lg md:text-xl text-gray-600 leading-relaxed mb-12"
          >
            Our commitment to excellence drives us to create skincare products that deliver visible results while honoring the natural beauty of your skin. Every formula is crafted with premium ingredients, sustainable practices, and innovative technology to provide you with the ultimate skincare experience.
          </p>
          
          <div className="about-element grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Natural Ingredients</h3>
              <p className="text-gray-600">Sourced from the finest botanical extracts worldwide</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧪</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Science-Backed</h3>
              <p className="text-gray-600">Formulated with cutting-edge research and testing</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-gray-600">Clinically tested for visible improvements</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;