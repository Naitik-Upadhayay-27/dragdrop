import React from 'react';
import './App.css';
import { BuilderProvider, useBuilderContext } from './context/BuilderContext';
import WebsiteBuilder from './components/builder/WebsiteBuilder';
import TemplateModal from './components/builder/TemplateModal';

function App() {
  return (
    <div className="App">
      <BuilderProvider>
        <AppContent />
      </BuilderProvider>
    </div>
  );
}

const AppContent = () => {
  const { isTemplateModalOpen, toggleTemplateModal } = useBuilderContext();
  
  return (
    <>
      <WebsiteBuilder />
      <TemplateModal isOpen={isTemplateModalOpen} onClose={toggleTemplateModal} />
    </>
  );
}

export default App;
