import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';
import ElementsSidebar from './ElementsSidebar';
import BuilderCanvas from './BuilderCanvas';
import PropertiesPanel from './PropertiesPanel';
import BuilderToolbar from './BuilderToolbar';
import PreviewMode from './PreviewMode';

const BuilderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  position: relative;
  
  ${props => props.backgroundStyles && `
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      ${props.backgroundStyles}
    }
  `}
`;

const BuilderContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const CanvasArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  overflow: auto;
  background-color: #e0e0e0;
  padding: 20px;
  box-sizing: border-box;
`;

const WebsiteBuilder = () => {
  const { 
    showPropertiesPanel, 
    elements, 
    addElement, 
    availableElements,
    sidebarVisible,
    propertiesPanelVisible
  } = useBuilderContext();
  const [previewMode, setPreviewMode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const canvasRef = useRef(null);
  
  // Get background styles from the first background element (if any)
  const getBackgroundStyles = () => {
    const backgroundElements = elements.filter(element => element.type === 'background');
    if (backgroundElements.length === 0) return '';
    
    // Use the first background element for the canvas background
    const bgElement = backgroundElements[0];
    const props = bgElement.properties || {};
    
    // Force re-render by adding a timestamp to the image URL if it's a data URL
    let backgroundImageUrl = props.backgroundImage;
    if (backgroundImageUrl && backgroundImageUrl.startsWith('data:')) {
      // Add a cache-busting parameter for data URLs
      backgroundImageUrl = `${backgroundImageUrl}#t=${Date.now()}`;
    }
    
    return `
      background-color: ${props.backgroundColor || '#f5f5f5'};
      ${backgroundImageUrl ? `background-image: url('${backgroundImageUrl}');` : ''}
      background-size: ${props.backgroundSize || 'cover'};
      background-position: ${props.backgroundPosition || 'center'};
      background-repeat: no-repeat !important;
      opacity: ${props.opacity || '1'};
      filter: 
        blur(${props.blur || '0px'}) 
        grayscale(${props.grayscale || '0%'}) 
        sepia(${props.sepia || '0%'}) 
        hue-rotate(${props.hueRotate || '0deg'}) 
        contrast(${props.contrast || '100%'}) 
        brightness(${props.brightness || '100%'});
    `;
  };
  
  // Get background styles
  const backgroundStyles = getBackgroundStyles();
  
  // Initialize Canvas Settings if it doesn't exist
  useEffect(() => {
    // Check if Canvas Settings element already exists
    const canvasSettingsExists = elements.some(element => element.type === 'canvasSettings');
    
    if (!canvasSettingsExists) {
      // Find Canvas Settings template
      const canvasSettingsTemplate = availableElements.find(element => element.type === 'canvasSettings');
      
      if (canvasSettingsTemplate) {
        // Add Canvas Settings element (not visible on canvas, just for properties)
        addElement({
          ...canvasSettingsTemplate,
          position: { x: -1000, y: -1000 } // Position off-canvas
        });
      }
    }
  }, []);

  // Toggle preview mode
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  // Change preview device
  const changePreviewDevice = (device) => {
    setPreviewDevice(device);
  };



  // Force re-render when background changes
  useEffect(() => {
    // This empty dependency array ensures we re-render when elements change
  }, [elements]);

  return (
    <BuilderContainer backgroundStyles={backgroundStyles}>
      <BuilderToolbar 
        previewMode={previewMode} 
        togglePreviewMode={togglePreviewMode}
        previewDevice={previewDevice}
        changePreviewDevice={changePreviewDevice}
      />
      
      {previewMode ? (
        <PreviewMode device={previewDevice} />
      ) : (
        <BuilderContent>
          {/* Sidebar is positioned absolutely by its own component */}
          <ElementsSidebar />
          
          {/* Main canvas area */}
          <CanvasArea>
            <BuilderCanvas />
          </CanvasArea>
          
          {/* Properties panel is positioned absolutely by its own component */}
          <PropertiesPanel />
        </BuilderContent>
      )}
    </BuilderContainer>
  );
};

export default WebsiteBuilder;
