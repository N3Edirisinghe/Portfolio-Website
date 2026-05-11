import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Research from './components/Research';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import NetworkBackground from './components/NetworkBackground';
import ParallaxProvider from './components/ParallaxProvider';

function App() {
  return (
    <>
      <div className="vignette"></div>
      <ParallaxProvider />
      <CustomCursor />
      <NetworkBackground />
      <div className="bg-grid"></div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
