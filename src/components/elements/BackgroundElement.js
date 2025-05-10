import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';

const StyledBackground = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  min-height: ${props => props.properties?.height || '300px'};
  background-color: ${props => props.properties?.backgroundColor || '#f5f5f5'};
  background-size: ${props => props.properties?.backgroundSize || 'cover'};
  background-position: ${props => props.properties?.backgroundPosition || 'center'};
  background-repeat: no-repeat !important;
  opacity: ${props => props.properties?.opacity || '1'};
  ${props => props.isSelected && `
    outline: 2px solid #2196F3;
    box-shadow: 0 0 10px rgba(33, 150, 243, 0.3);
  `}
  ${props => props.properties && props.properties.backgroundImage && `
    background-image: url(${props.properties.backgroundImage});
  `}
  ${props => props.properties && `
    filter: 
      blur(${props.properties.blur || '0px'}) 
      grayscale(${props.properties.grayscale || '0%'}) 
      sepia(${props.properties.sepia || '0%'}) 
      hue-rotate(${props.properties.hueRotate || '0deg'}) 
      contrast(${props.properties.contrast || '100%'}) 
      brightness(${props.properties.brightness || '100%'});
  `}
`;

const OverlayDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.overlayColor || 'rgba(0,0,0,0)'};
  opacity: ${props => props.overlayOpacity || '0'};
  pointer-events: none;
  z-index: 1;
`;

const UploadButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  display: ${props => props.isSelected ? 'block' : 'none'};
  z-index: 10;
  
  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const BackgroundElement = ({ element, isSelected }) => {
  const { setSelectedElement, updateElement } = useBuilderContext();
  const fileInputRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  const handleUploadClick = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const backgroundImage = event.target.result;
        updateElement(element.id, {
          properties: {
            ...element.properties,
            backgroundImage
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <StyledBackground
      onClick={handleClick}
      isSelected={isSelected}
      properties={element.properties}
    >
      <OverlayDiv 
        overlayColor={element.properties.overlayColor}
        overlayOpacity={element.properties.overlayOpacity}
      />
      <UploadButton 
        isSelected={isSelected}
        onClick={handleUploadClick}
      >
        Upload Background Image
      </UploadButton>
      <HiddenInput 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        accept="image/*"
      />
    </StyledBackground>
  );
};

export default BackgroundElement;
