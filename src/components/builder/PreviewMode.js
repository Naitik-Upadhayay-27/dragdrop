import React from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';
import { scaleProperties, getViewportSize, getScaledPosition } from '../../utils/responsiveHelper';

const PreviewContainer = styled.div`
  flex: 1;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  max-height: 100vh;
  position: relative;
`;

const PreviewFrame = styled.div`
  background-color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: ${props => {
    const viewport = getViewportSize(props.device);
    return `${viewport.width}px`;
  }};
  height: auto; /* Always auto to accommodate content */
  min-height: ${props => {
    const viewport = getViewportSize(props.device);
    return props.device === 'desktop' ? '100vh' : `${viewport.height}px`;
  }};
  overflow: visible;
  padding: 0;
  transition: all 0.3s ease;
  position: relative;
  transform-origin: top left;
  transform: ${props => props.device === 'desktop' ? 'none' : 'scale(0.8)'};
  margin: 20px 0;
  max-height: none;
`;

const PreviewContent = styled.div`
  position: relative;
  min-height: 100%;
  min-width: 100%;
  padding: 20px;
  height: auto;
  overflow: visible;
  box-sizing: border-box;
  /* Ensure content is fully visible */
  &:after {
    content: '';
    display: block;
    clear: both;
    height: 100px; /* Extra space at bottom */
  }
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  z-index: 0;
  ${props => props.backgroundStyles}
`;

const ElementWrapper = styled.div`
  position: absolute;
  left: ${props => props.position?.x || 0}px;
  top: ${props => props.position?.y || 0}px;
  margin-bottom: 10px;
  /* Match edit mode styling */
  display: inline-block;
  box-sizing: border-box;
`;

const PreviewMode = ({ device }) => {
  const { elements } = useBuilderContext();
  
  // Get canvas settings if they exist
  const getCanvasSettings = () => {
    const canvasSettingsElement = elements.find(element => element.type === 'canvasSettings');
    if (canvasSettingsElement) {
      return canvasSettingsElement.properties || {};
    }
    return {
      marginLeft: '0px',
      marginRight: '0px',
      marginTop: '0px',
      marginBottom: '0px',
      canvasHeight: 'auto',
      contentAlignment: 'left'
    };
  };
  
  const canvasSettings = getCanvasSettings();

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
  
  // Separate background elements from other elements
  const backgroundElements = elements.filter(element => element.type === 'background');
  const regularElements = elements.filter(element => element.type !== 'background' && element.type !== 'canvasSettings');
  
  // Import element components with styled wrappers to match edit mode
  const TextElement = ({ element, properties }) => (
    <div style={{
      ...properties,
      padding: properties.padding || '10px',
      boxSizing: 'border-box',
      display: 'inline-block',
      width: properties.width || '200px', // Default width if not specified
      height: properties.height || 'auto',
      minWidth: '50px',
      minHeight: '30px',
      wordWrap: 'break-word',
      overflow: 'visible'
    }}>{element.content}</div>
  );
  
  const HeadingElement = ({ element, properties }) => (
    <h2 style={{
      ...properties,
      padding: properties.padding || '10px',
      margin: properties.margin || '0',
      boxSizing: 'border-box',
      display: 'inline-block',
      width: properties.width || '300px', // Default width if not specified
      height: properties.height || 'auto',
      minWidth: '50px',
      minHeight: '40px',
      wordWrap: 'break-word',
      overflow: 'visible'
    }}>{element.content}</h2>
  );
  
  const ParagraphElement = ({ element, properties }) => (
    <p style={{
      ...properties,
      padding: properties.padding || '10px',
      margin: properties.margin || '0',
      boxSizing: 'border-box',
      display: 'inline-block',
      width: properties.width || '300px', // Default width if not specified
      height: properties.height || 'auto',
      minWidth: '50px',
      minHeight: '50px',
      wordWrap: 'break-word',
      overflow: 'visible'
    }}>{element.content}</p>
  );
  
  const ButtonElement = ({ element, properties }) => (
    <button style={{
      ...properties,
      padding: properties.padding || '10px 20px',
      margin: properties.margin || '0',
      boxSizing: 'border-box',
      display: 'inline-block',
      width: properties.width || 'auto',
      height: properties.height || 'auto',
      cursor: 'pointer',
      border: properties.border || 'none',
      borderRadius: properties.borderRadius || '4px'
    }}>{element.content}</button>
  );
  
  const ImageElement = ({ element, properties }) => (
    <img 
      src={element.content} 
      alt={properties.alt || 'Image'} 
      style={{
        ...properties,
        boxSizing: 'border-box',
        display: 'inline-block',
        objectFit: properties.objectFit || 'cover'
      }} 
    />
  );
  
  // Element renderer based on type
  const renderElement = (element, properties) => {
    switch(element.type) {
      case 'text':
        return <TextElement element={element} properties={properties} />;
      case 'heading':
        return <HeadingElement element={element} properties={properties} />;
      case 'paragraph':
        return <ParagraphElement element={element} properties={properties} />;
      case 'button':
        return <ButtonElement element={element} properties={properties} />;
      case 'image':
        return <ImageElement element={element} properties={properties} />;
      default:
        return null;
    }
  };
  
  // Render elements in preview mode with responsive styles
  const renderPreviewElements = () => {
    return regularElements.map((element) => {
      // Apply responsive styles based on the current device
      const responsiveStyles = scaleProperties(element.properties, device);
      
      // Get scaled position for the current device
      const scaledPosition = getScaledPosition(element.position || { x: 0, y: 0 }, device);
      
      // Use the original scaled position without additional adjustments
      const adjustedPosition = scaledPosition;
      
      return (
        <ElementWrapper key={element.id} position={adjustedPosition}>
          {renderElement(element, responsiveStyles)}
        </ElementWrapper>
      );
    });
  };

  // Create a style object for the background if it exists
  const backgroundStyle = backgroundElements.length > 0 ? {
    backgroundImage: backgroundElements[0].properties.backgroundImage ? 
      `url('${backgroundElements[0].properties.backgroundImage}')` : 'none',
    backgroundColor: backgroundElements[0].properties.backgroundColor || '#f5f5f5',
    backgroundSize: backgroundElements[0].properties.backgroundSize || 'cover',
    backgroundPosition: backgroundElements[0].properties.backgroundPosition || 'center',
    backgroundRepeat: 'no-repeat',
    opacity: backgroundElements[0].properties.opacity || '1',
    filter: `
      blur(${backgroundElements[0].properties.blur || '0px'}) 
      grayscale(${backgroundElements[0].properties.grayscale || '0%'}) 
      sepia(${backgroundElements[0].properties.sepia || '0%'}) 
      hue-rotate(${backgroundElements[0].properties.hueRotate || '0deg'}) 
      contrast(${backgroundElements[0].properties.contrast || '100%'}) 
      brightness(${backgroundElements[0].properties.brightness || '100%'})
    `
  } : {};
  
  // Find the element with the highest y-position + height to determine total content height
  const calculateContentHeight = () => {
    if (regularElements.length === 0) return 1000; // Default minimum height
    
    let maxBottom = 0;
    regularElements.forEach(element => {
      const position = element.position || { x: 0, y: 0 };
      const properties = element.properties || {};
      const height = parseInt(properties.height) || 100;
      const bottom = position.y + height;
      
      if (bottom > maxBottom) {
        maxBottom = bottom;
      }
    });
    
    return maxBottom + 200; // Add padding at the bottom
  };
  
  const contentHeight = calculateContentHeight();
  
  return (
    <PreviewContainer>
      <PreviewFrame 
        device={device}
      >
        {/* Background container that covers the entire content */}
        {backgroundElements.length > 0 && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${contentHeight}px`,
            zIndex: 0,
            ...backgroundStyle
          }} />
        )}
        
        <div style={{
          marginLeft: canvasSettings.marginLeft,
          marginRight: canvasSettings.marginRight,
          marginTop: canvasSettings.marginTop,
          marginBottom: canvasSettings.marginBottom,
          display: 'flex',
          flexDirection: 'column',
          alignItems: canvasSettings.contentAlignment === 'center' ? 'center' : 
                     canvasSettings.contentAlignment === 'right' ? 'flex-end' : 'flex-start',
          width: '100%',
          height: `${contentHeight}px`, // Set explicit height based on content
          position: 'relative',
          zIndex: 1 // Above the background
        }}>
          <PreviewContent>
            {renderPreviewElements()}
          </PreviewContent>
        </div>
      </PreviewFrame>
    </PreviewContainer>
  );
};

export default PreviewMode;
