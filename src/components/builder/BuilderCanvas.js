import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';
import EmptyCanvasGuide from './EmptyCanvasGuide';
import DraggableElement from './DraggableElement';
import DeleteDropZone from './DeleteDropZone';

const CanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  position: relative;
  min-height: 600px;
  width: 1280px; /* Match desktop preview width */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  padding: 0;
  overflow: hidden;
`;

const CanvasInner = styled.div`
  padding: 20px;
  height: 100%;
  width: 100%;
  overflow: auto;
`;

const CanvasContent = styled.div`
  position: relative;
  min-height: 100%;
  min-width: 100%;
  height: ${props => props.height || '600px'};
  width: ${props => props.width || '100%'};
  /* Add padding to ensure elements can be placed at the bottom */
  padding-bottom: 200px;
  margin-left: ${props => props.marginLeft || '0px'};
  margin-right: ${props => props.marginRight || '0px'};
  margin-top: ${props => props.marginTop || '0px'};
  margin-bottom: ${props => props.marginBottom || '0px'};
  display: flex;
  flex-direction: column;
  align-items: ${props => {
    switch(props.contentAlignment) {
      case 'left': return 'flex-start';
      case 'right': return 'flex-end';
      case 'center': return 'center';
      default: return 'flex-start';
    }
  }};
  cursor: default;
`;



const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  ${props => props.backgroundStyles}
  ${props => props.isSelected && `
    outline: 2px solid #2196F3;
    box-shadow: 0 0 10px rgba(33, 150, 243, 0.3);
  `}
`;

// Removed unused components

const BuilderCanvas = () => {
  const { 
    elements, 
    addElement, 
    availableElements, 
    selectedElement, 
    selectedElements,
    selectElement, 
    deselectElement
  } = useBuilderContext();
  const canvasRef = useRef(null);
  const [canvasHeight, setCanvasHeight] = useState('600px');
  

  
  // Default canvas settings
  const defaultCanvasSettings = {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    canvasHeight: 'auto',
    contentAlignment: 'center'
  };
  
  // Separate background elements from other elements
  const backgroundElements = elements.filter(element => element.type === 'background');
  const regularElements = elements.filter(element => element.type !== 'background');
  
  // Force re-render when background elements change
  const [forceUpdate, setForceUpdate] = useState(0);
  useEffect(() => {
    // Force a re-render when background elements change
    setForceUpdate(prev => prev + 1);
  }, [backgroundElements]);
  
  // Get the background styles from the first background element (if any)
  const getBackgroundStyles = () => {
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
    
    // Log the background properties to help with debugging
    console.log('Background Properties:', props);
    
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
  
  // Handle dropping elements from sidebar onto canvas
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    
    try {
      const elementData = JSON.parse(data);
      if (elementData && elementData.type) {
        const rect = canvasRef.current.getBoundingClientRect();
        
        // Calculate position relative to canvas with scroll offset
        const position = {
          x: e.clientX - rect.left + canvasRef.current.scrollLeft,
          y: e.clientY - rect.top + canvasRef.current.scrollTop
        };
        
        // Ensure position is within canvas boundaries
        position.x = Math.max(0, position.x);
        position.y = Math.max(0, position.y);
        
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
          
          // Add the element at the drop position
          const newElement = addElement(mergedElement, position);
        }
      }
    } catch (err) {
      console.error('Error parsing dropped element data:', err);
    }
  };
  
  // Calculate the dynamic canvas height based on element positions
  const calculateCanvasHeight = () => {
    if (elements.length === 0) return '600px';
    
    // Find the bottom-most position of all elements
    let maxBottom = 0;
    
    elements.forEach(element => {
      if (!element.position) return;
      
      // Get the element's position
      const { y } = element.position;
      
      // Get the element's height (default to 0 if not available)
      let height = 0;
      
      if (element.properties) {
        if (element.properties.height) {
          // Remove 'px', '%', etc. and parse as integer
          const heightStr = element.properties.height.toString();
          height = parseInt(heightStr.replace(/[^0-9]/g, '')) || 0;
        }
      }
      
      // For elements without explicit height, use default values based on type
      if (height === 0) {
        switch (element.type) {
          case 'text':
          case 'paragraph':
            height = 50; // Default height for text elements
            break;
          case 'heading':
            height = 60; // Default height for headings
            break;
          case 'button':
            height = 40; // Default height for buttons
            break;
          case 'image':
            height = 200; // Default height for images
            break;
          default:
            height = 100; // Default fallback height
        }
      }
      
      // Calculate the bottom position
      const bottom = y + height;
      
      // Update maxBottom if this element is lower
      if (bottom > maxBottom) {
        maxBottom = bottom;
      }
    });
    
    // Add padding to ensure there's space below the last element
    const heightWithPadding = maxBottom + 300;
    
    // Ensure minimum height of 600px
    return Math.max(600, heightWithPadding) + 'px';
  };
  
  // Update canvas height when elements change
  useEffect(() => {
    setCanvasHeight(calculateCanvasHeight());
  }, [elements]);
  
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
  

  

  

  
  // Handle canvas click
  const handleCanvasClick = (e) => {
    // Check if we're clicking on the canvas container or canvas content
    // and not on a child element (like a draggable element)
    const isCanvasClick = e.target === canvasRef.current || 
                          e.target.classList.contains('canvas-container') ||
                          e.target.classList.contains('canvas-content');
    
    if (isCanvasClick) {
      if (backgroundElements.length > 0) {
        // If there's a background, select it
        selectElement(backgroundElements[0]);
      } else {
        // If no background, deselect current element but keep properties panel open
        deselectElement();
      }
    }
  };
  
  return (
    <>
      <CanvasContainer className="canvas-container">
        <CanvasInner onClick={handleCanvasClick}>
          <CanvasContent 
            className="canvas-content" 
            ref={canvasRef} 
            height={defaultCanvasSettings.canvasHeight === 'auto' ? canvasHeight : defaultCanvasSettings.canvasHeight}
            marginLeft={defaultCanvasSettings.marginLeft}
            marginRight={defaultCanvasSettings.marginRight}
            marginTop={defaultCanvasSettings.marginTop}
            marginBottom={defaultCanvasSettings.marginBottom}
            contentAlignment={defaultCanvasSettings.contentAlignment}
            onClick={handleCanvasClick}
          >
        {/* Background container */}
        {backgroundElements.length > 0 && (
          <BackgroundContainer 
            backgroundStyles={getBackgroundStyles()}
            isSelected={isBackgroundSelected}
            onClick={(e) => {
              e.stopPropagation();
              if (backgroundElements.length > 0) {
                selectElement(backgroundElements[0]);
              }
            }}
          >
            {/* Overlay functionality removed as requested */}
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
              isSelected={selectedElements.some(sel => sel.id === element.id)}
            />
          ))
        )}
        

        
        {/* Background is now handled by the canvas itself */}
          </CanvasContent>
        </CanvasInner>
      </CanvasContainer>
      <DeleteDropZone />
    </>
  );
};

export default BuilderCanvas;
