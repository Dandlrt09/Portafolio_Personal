import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/layout/Layout';
import Hero from './components/Hero';
import Skills from './components/Skills';
import ProjectGrid from './components/ProjectGrid';
import Contact from './components/Contact';

function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Hero />
        <Skills />
        <ProjectGrid />
        <Contact />
      </Layout>
    </LanguageProvider>
  );
}

export default App;
