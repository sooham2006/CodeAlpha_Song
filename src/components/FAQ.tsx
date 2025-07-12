import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const faqRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What makes your skincare products different from others?",
      answer: "Our products combine the best of nature and science, using premium botanical extracts with clinically proven active ingredients. Each formula is developed by dermatologists and tested for safety and efficacy."
    },
    {
      question: "How long does it take to see results?",
      answer: "Most customers notice improvements in their skin within 2-4 weeks of consistent use. However, significant changes in skin texture and appearance typically occur after 6-8 weeks of regular application."
    },
    {
      question: "Are your products suitable for sensitive skin?",
      answer: "Yes, all our products are formulated to be gentle and suitable for sensitive skin. We use hypoallergenic ingredients and avoid harsh chemicals, sulfates, and parabens."
    },
    {
      question: "Do you offer international shipping?",
      answer: "We currently ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. Free shipping is available for orders over $75 within the continental United States."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, you can return the product for a full refund within 30 days of delivery."
    }
  ];

  useEffect(() => {
    if (faqRef.current) {
      gsap.fromTo(faqRef.current.querySelectorAll('.faq-element'), 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: faqRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  const toggleFAQ = (index: number) => {
    const newActiveIndex = activeIndex === index ? null : index;
    setActiveIndex(newActiveIndex);

    const answerElement = document.getElementById(`answer-${index}`);
    if (answerElement) {
      if (newActiveIndex === index) {
        gsap.fromTo(answerElement, 
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
      } else {
        gsap.to(answerElement, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        });
      }
    }
  };

  return (
    <section id="faq" ref={faqRef} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="faq-element text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="faq-element text-lg text-gray-600">
              Everything you need to know about our skincare products
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-element bg-gray-50 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-emerald-600 transition-transform duration-300 flex-shrink-0 ${
                      activeIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  id={`answer-${index}`}
                  className={`overflow-hidden ${activeIndex === index ? 'h-auto' : 'h-0'}`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;