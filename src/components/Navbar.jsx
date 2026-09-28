import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenProjectModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['about', 'work', 'services', 'process', 'contact'];
      const scrollPosition = window.scrollY + 140;

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
    handleScroll();
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

  const handleCtaClick = () => {
    closeMenu();
    if (onOpenProjectModal) {
      onOpenProjectModal();
    }
  };

  return (
    <header className={`nav-bar ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`} id="navbar">
      <div className="nav-container">
        
        {/* Left Column: Logo + Wordmark */}
        <div className="nav-col-left">
          <a className="nav-logo" href="#top" aria-label="PixaP home" onClick={closeMenu}>
            <span className="nav-logo-badge">P</span>
            <span className="nav-logo-text">PixaP</span>
          </a>
        </div>

        {/* Center Column: Links (About, Work, Services, Process, Contact) */}
        <nav className="nav-col-center nav-links" id="navLinks" aria-label="Primary navigation">
          <a 
            href="#about" 
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About
          </a>
          <a 
            href="#work" 
            className={`nav-link ${activeSection === 'work' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Work
          </a>
          <a 
            href="#services" 
            className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Services
          </a>
          <a 
            href="#process" 
            className={`nav-link ${activeSection === 'process' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Process
          </a>
          <a 
            href="#contact" 
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Contact
          </a>
        </nav>

        {/* Right Column: CTA Button Group & Mobile Hamburger */}
        <div className="nav-col-right">
          <div className="nav-cta-group">
            {/* Micro-status pill stacked immediately above button */}
            <div className="nav-status-pill" aria-label="Status: Accepting new projects">
              <span className="status-dot" aria-hidden="true">●</span>
              <span className="status-text">ACCEPTING NEW PROJECTS</span>
            </div>

            {/* Outline Button */}
            <button 
              type="button"
              className="nav-cta-btn" 
              onClick={handleCtaClick}
            >
              <span>Let's Build</span>
              <span className="nav-cta-arrow" aria-hidden="true">→</span>
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            className={`nav-burger ${isOpen ? 'open' : ''}`}
            id="navBurger"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <div className={`nav-mobile-drawer ${isOpen ? 'open' : ''}`}>
        <nav className="nav-mobile-links" aria-label="Mobile navigation">
          <a 
            href="#about" 
            className={`nav-mobile-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About
          </a>
          <a 
            href="#work" 
            className={`nav-mobile-link ${activeSection === 'work' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Work
          </a>
          <a 
            href="#services" 
            className={`nav-mobile-link ${activeSection === 'services' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Services
          </a>
          <a 
            href="#process" 
            className={`nav-mobile-link ${activeSection === 'process' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Process
          </a>
          <a 
            href="#contact" 
            className={`nav-mobile-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Contact
          </a>
        </nav>

        <div className="nav-mobile-cta">
          <div className="nav-status-pill mobile">
            <span className="status-dot">●</span>
            <span className="status-text">ACCEPTING NEW PROJECTS</span>
          </div>
          <button 
            type="button"
            className="nav-cta-btn mobile"
            onClick={handleCtaClick}
          >
            <span>Let's Build</span>
            <span className="nav-cta-arrow">→</span>
          </button>
        </div>
      </div>
    </header>
  );
}
