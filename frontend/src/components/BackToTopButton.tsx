import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    // Clean up
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-fade-in-up"
          aria-label="Back to top"
        >
          {/* Shimmer effect */}
          <span className="pointer-events-none absolute -inset-y-10 -left-10 w-20 rotate-45 bg-white/30 blur-md opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-500" />
          
          <ArrowUp className="w-6 h-6 transition-transform duration-200 group-hover:-translate-y-1" />
          
          {/* Pulse ring on hover */}
          <span className="absolute inset-0 rounded-full bg-green-600 opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-300" />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;