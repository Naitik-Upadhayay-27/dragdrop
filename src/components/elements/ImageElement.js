import React from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';

const StyledImage = styled.div`
  padding: 5px;
  cursor: pointer;
  position: relative;
  ${props => props.isSelected && `
    outline: 2px solid #2196F3;
    box-shadow: 0 0 10px rgba(33, 150, 243, 0.3);
  `}
`;

const Image = styled.img`
  max-width: 100%;
  display: block;
  transition: all 0.2s ease;
  ${props => props.properties && Object.entries(props.properties).map(([key, value]) => {
    // Skip non-CSS properties and handle them separately
    if (!['alt', 'keepAspectRatio'].includes(key)) {
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
  
  // Set default dimensions if not specified
  const imageProps = {
    ...element.properties,
    width: element.properties.width || '200px',
    height: element.properties.height || 'auto',
    borderRadius: element.properties.borderRadius || '0px'
  };

  // Ensure the image path is correct
  let imageSrc = element.content || 'https://picsum.photos/300/200';
  
  // Log the image source for debugging
  console.log('Image source:', imageSrc);
  
  return (
    <StyledImage 
      onClick={handleClick}
      isSelected={isSelected}
    >
      <Image 
        src={imageSrc}
        alt={element.properties.alt || 'Image'}
        properties={imageProps}
        onError={(e) => {
          console.error('Image failed to load:', imageSrc);
          e.target.src = 'https://picsum.photos/300/200'; // Fallback image
        }}
      />
    </StyledImage>
  );
};

export default ImageElement;
