import React from 'react';
import './App.css';
import { BuilderProvider, useBuilderContext } from './context/BuilderContext';
import WebsiteBuilder from './components/builder/WebsiteBuilder';
import TemplateModal from './components/builder/TemplateModal';
import TemplateSelector from './components/builder/TemplateSelector';

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
  const { 
    isTemplateModalOpen, 
    toggleTemplateModal, 
    isTemplateSelectorOpen, 
    closeTemplateSelector 
  } = useBuilderContext();
  
  return (
    <>
      <WebsiteBuilder />
      <TemplateModal isOpen={isTemplateModalOpen} onClose={toggleTemplateModal} />
      <TemplateSelector isOpen={isTemplateSelectorOpen} onClose={closeTemplateSelector} />
    </>
  );
}

export default App;
