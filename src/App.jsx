import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatWeBuild from './components/WhatWeBuild';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import ValueProps from './components/ValueProps';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  useScrollReveal();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenModal = (service = null) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="app-root">
      <Navbar onOpenProjectModal={() => handleOpenModal()} />
      <main id="top">
        <Hero onOpenProjectModal={() => handleOpenModal()} />
        <WhatWeBuild onOpenInquiry={(srv) => handleOpenModal(srv)} />
        <About />
        <Services onSelectService={(srv) => handleOpenModal(srv)} />
        <Process />
        <ValueProps />
        <ContactSection onOpenProjectModal={() => handleOpenModal()} />
      </main>
      <Footer />
      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        preselectedService={selectedService} 
      />
    </div>
  );
}
