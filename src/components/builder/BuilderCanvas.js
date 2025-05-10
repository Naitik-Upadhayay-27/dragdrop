import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';
import EmptyCanvasGuide from './EmptyCanvasGuide';
import DraggableElement from './DraggableElement';
import DeleteDropZone from './DeleteDropZone';

const CanvasContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  position: relative;
  min-height: 600px;
  padding: 20px;
  overflow: auto;
`;

const CanvasContent = styled.div`
  position: relative;
  min-height: 100%;
  min-width: 100%;
  height: ${props => props.height || '1200px'};
  width: ${props => props.width || '100%'};
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  ${props => props.backgroundStyles}
  ${props => props.isSelected && `
    outline: 2px solid #2196F3;
    box-shadow: 0 0 10px rgba(33, 150, 243, 0.3);
  `}
`;

// Removed unused components

const BuilderCanvas = () => {
  const { elements, addElement, availableElements, selectedElement, setSelectedElement } = useBuilderContext();
  const canvasRef = useRef(null);
  
  // Separate background elements from other elements
  const backgroundElements = elements.filter(element => element.type === 'background');
  const regularElements = elements.filter(element => element.type !== 'background');
  
  // Get the background styles from the first background element (if any)
  const getBackgroundStyles = () => {
    if (backgroundElements.length === 0) return '';
    
    // Use the first background element for the canvas background
    const bgElement = backgroundElements[0];
    const props = bgElement.properties || {};
    
    return `
      background-color: ${props.backgroundColor || '#f5f5f5'};
      ${props.backgroundImage ? `background-image: url(${props.backgroundImage});` : ''}
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
  
  // Get overlay styles if there's a background with overlay
  const getOverlayStyles = () => {
    if (backgroundElements.length === 0) return null;
    
    const bgElement = backgroundElements[0];
    const props = bgElement.properties || {};
    
    // Check if we have both overlay color and opacity
    if (!props.overlayColor) return null;
    
    // Get opacity value - default to 0 if not set
    const opacity = parseFloat(props.overlayOpacity || '0');
    if (opacity <= 0) return null;
    
    // Extract the color components from the overlay color
    let r = 0, g = 0, b = 0;
    
    // Handle different color formats
    if (props.overlayColor.startsWith('#')) {
      // Hex color
      r = parseInt(props.overlayColor.slice(1, 3), 16);
      g = parseInt(props.overlayColor.slice(3, 5), 16);
      b = parseInt(props.overlayColor.slice(5, 7), 16);
    } else if (props.overlayColor.startsWith('rgba')) {
      // Already RGBA format - extract RGB values
      const matches = props.overlayColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+)/);
      if (matches) {
        [, r, g, b] = matches.map(v => parseInt(v));
      }
    } else if (props.overlayColor.startsWith('rgb')) {
      // RGB format - extract RGB values
      const matches = props.overlayColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
      if (matches) {
        [, r, g, b] = matches.map(v => parseInt(v));
      }
    }
    
    // Create a new rgba color with the current opacity
    return {
      backgroundColor: `rgba(${r}, ${g}, ${b}, ${opacity})`
    };
  };
  
  const overlayStyles = getOverlayStyles();

  // Handle dropping elements from sidebar onto canvas
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    
    try {
      const elementData = JSON.parse(data);
      if (elementData && elementData.type) {
        const rect = canvasRef.current.getBoundingClientRect();
        const position = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        
        // Find the element template
        const elementTemplate = availableElements.find(el => el.type === elementData.type);
        
        if (elementTemplate) {
          // Create a merged element with template defaults and dragged data
          const mergedElement = {
            ...elementTemplate,
            content: elementData.content || elementTemplate.content,
            properties: {
              ...elementTemplate.properties,
              ...elementData.properties
            }
          };
          
          // Log for debugging
          console.log('Adding element with content:', mergedElement.content);
          
          // Add the element at the drop position
          addElement(mergedElement, position);
        }
      }
    } catch (err) {
      console.error('Error parsing dropped element data:', err);
    }
  };
  
  // Set up drag and drop event handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    };
    
    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);
    
    return () => {
      canvas.removeEventListener('dragover', handleDragOver);
      canvas.removeEventListener('drop', handleDrop);
    };
  }, []);

  // Check if background is selected
  const isBackgroundSelected = selectedElement && selectedElement.type === 'background';
  
  // Handle background click to select it
  const handleCanvasClick = (e) => {
    // If clicking directly on the canvas (not on an element), select the background if it exists
    if (e.target === canvasRef.current && backgroundElements.length > 0) {
      setSelectedElement(backgroundElements[0]);
    }
  };
  
  return (
    <>
      <CanvasContainer>
        <CanvasContent ref={canvasRef} onClick={handleCanvasClick}>
        {/* Background container */}
        {backgroundElements.length > 0 && (
          <BackgroundContainer 
            backgroundStyles={getBackgroundStyles()}
            isSelected={isBackgroundSelected}
            onClick={(e) => {
              e.stopPropagation();
              if (backgroundElements.length > 0) {
                setSelectedElement(backgroundElements[0]);
              }
            }}
          >
            {/* Overlay for background */}
            {overlayStyles && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: overlayStyles.backgroundColor,
                pointerEvents: 'none'
              }} />
            )}
          </BackgroundContainer>
        )}
        
        {elements.length === 0 ? (
          <EmptyCanvasGuide />
        ) : (
          regularElements.map((element, index) => (
            <DraggableElement 
              key={element.id} 
              element={element} 
              index={index} 
            />
          ))
        )}
        
        {/* Background is now handled by the canvas itself */}
      </CanvasContent>
      </CanvasContainer>
      <DeleteDropZone />
    </>
  );
};

export default BuilderCanvas;
