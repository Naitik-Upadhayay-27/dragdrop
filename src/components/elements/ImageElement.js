import React from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';

const StyledImage = styled.div`
  padding: 5px;
  cursor: pointer;
  position: relative;
  ${props => props.isSelected && `
    outline: 2px solid #2196F3;
  `}
`;

const Image = styled.img`
  ${props => props.properties && Object.entries(props.properties).map(([key, value]) => {
    if (key !== 'alt') {
      // Convert camelCase to kebab-case for CSS properties
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value};`;
    }
    return '';
  }).join(' ')}
`;

const ImageElement = ({ element, isSelected }) => {
  const { setSelectedElement } = useBuilderContext();

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  return (
    <StyledImage 
      onClick={handleClick}
      isSelected={isSelected}
    >
      <Image 
        src={element.content}
        alt={element.properties.alt || 'Image'}
        properties={element.properties}
      />
    </StyledImage>
  );
};

export default ImageElement;
