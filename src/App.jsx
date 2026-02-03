import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/layout/Layout';
import Hero from './components/Hero';
import Skills from './components/Skills';
import ProjectGrid from './components/ProjectGrid';

function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Hero />
        <Skills />
        <ProjectGrid />
      </Layout>
    </LanguageProvider>
  );
}

export default App;
