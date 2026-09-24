import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenProjectModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['about', 'services', 'process', 'value', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    document.body.style.overflow = nextState ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header className={`nav ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'open' : ''}`} id="nav">
      <a className="logo" href="#top" aria-label="PixaP home" onClick={closeMenu}>
        <span className="logo-badge">P</span>
        <span>PixaP</span>
      </a>

      <nav className="nav-links" id="navLinks" aria-label="Primary">
        <a 
          href="#about" 
          className={activeSection === 'about' ? 'active' : ''}
          onClick={closeMenu}
        >
          About
        </a>
        <a 
          href="#services" 
          className={activeSection === 'services' ? 'active' : ''}
          onClick={closeMenu}
        >
          Services
        </a>
        <a 
          href="#process" 
          className={activeSection === 'process' ? 'active' : ''}
          onClick={closeMenu}
        >
          Process
        </a>
        <a 
          href="#contact" 
          className={activeSection === 'contact' ? 'active' : ''}
          onClick={closeMenu}
        >
          Contact
        </a>
      </nav>

      <div className="nav-actions">
        <button 
          className="pill pill-ghost nav-cta" 
          onClick={onOpenProjectModal}
        >
          <span>Let's Build</span>
          <span className="arr">→</span>
        </button>

        <button
          className={`burger ${isOpen ? 'open' : ''}`}
          id="burger"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
