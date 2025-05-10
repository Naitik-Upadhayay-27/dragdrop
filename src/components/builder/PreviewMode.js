import React from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';
import { scaleProperties, getViewportSize, getScaledPosition } from '../../utils/responsiveHelper';

const PreviewContainer = styled.div`
  flex: 1;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: auto;
`;

const PreviewFrame = styled.div`
  background-color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: ${props => {
    const viewport = getViewportSize(props.device);
    return `${viewport.width}px`;
  }};
  height: ${props => {
    const viewport = getViewportSize(props.device);
    return props.device === 'desktop' ? '100%' : `${viewport.height}px`;
  }};
  overflow: auto;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
  transform-origin: top left;
  transform: ${props => props.device === 'desktop' ? 'none' : 'scale(0.8)'};
`;

const ElementWrapper = styled.div`
  position: absolute;
  left: ${props => props.position?.x || 0}px;
  top: ${props => props.position?.y || 0}px;
  margin-bottom: 10px;
`;

const PreviewMode = ({ device }) => {
  const { elements } = useBuilderContext();

  // Render elements in preview mode with responsive styles
  const renderPreviewElements = () => {
    return elements.map((element) => {
      // Apply responsive styles based on the current device
      const responsiveStyles = scaleProperties(element.properties, device);
      
      // Get scaled position for the current device
      const scaledPosition = getScaledPosition(element.position || { x: 0, y: 0 }, device);
      
      // Render different elements based on their type
      switch(element.type) {
        case 'text':
          return (
            <ElementWrapper key={element.id} position={scaledPosition}>
              <div style={responsiveStyles}>{element.content}</div>
            </ElementWrapper>
          );
        case 'heading':
          return (
            <ElementWrapper key={element.id} position={scaledPosition}>
              <h2 style={responsiveStyles}>{element.content}</h2>
            </ElementWrapper>
          );
        case 'paragraph':
          return (
            <ElementWrapper key={element.id} position={scaledPosition}>
              <p style={responsiveStyles}>{element.content}</p>
            </ElementWrapper>
          );
        case 'button':
          return (
            <ElementWrapper key={element.id} position={scaledPosition}>
              <button style={responsiveStyles}>{element.content}</button>
            </ElementWrapper>
          );
        case 'image':
          return (
            <ElementWrapper key={element.id} position={scaledPosition}>
              <img 
                src={element.content} 
                alt={responsiveStyles.alt || 'Image'} 
                style={responsiveStyles} 
              />
            </ElementWrapper>
          );
        default:
          return null;
      }
    });
  };

  return (
    <PreviewContainer>
      <PreviewFrame device={device}>
        {renderPreviewElements()}
      </PreviewFrame>
    </PreviewContainer>
  );
};

export default PreviewMode;
