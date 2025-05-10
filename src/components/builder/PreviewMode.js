import React from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';
import { getResponsiveStyles } from '../../utils/responsive';

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
    switch(props.device) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  }};
  height: ${props => props.device === 'desktop' ? '100%' : '80vh'};
  overflow: auto;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
`;

const ElementWrapper = styled.div`
  margin-bottom: 10px;
`;

const PreviewMode = ({ device }) => {
  const { elements } = useBuilderContext();

  // Render elements in preview mode with responsive styles
  const renderPreviewElements = () => {
    return elements.map((element) => {
      // Apply responsive styles based on the current device
      const responsiveStyles = getResponsiveStyles(element.properties, device);
      
      // Render different elements based on their type
      switch(element.type) {
        case 'text':
          return (
            <ElementWrapper key={element.id}>
              <div style={responsiveStyles}>{element.content}</div>
            </ElementWrapper>
          );
        case 'heading':
          return (
            <ElementWrapper key={element.id}>
              <h2 style={responsiveStyles}>{element.content}</h2>
            </ElementWrapper>
          );
        case 'paragraph':
          return (
            <ElementWrapper key={element.id}>
              <p style={responsiveStyles}>{element.content}</p>
            </ElementWrapper>
          );
        case 'button':
          return (
            <ElementWrapper key={element.id}>
              <button style={responsiveStyles}>{element.content}</button>
            </ElementWrapper>
          );
        case 'image':
          return (
            <ElementWrapper key={element.id}>
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
