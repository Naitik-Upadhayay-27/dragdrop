import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';
import ElementFactory from './ElementFactory';

const SectionContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: ${props => props.properties?.height || '200px'};
  background-color: ${props => props.properties?.backgroundColor || '#ffffff'};
  background-image: ${props => props.properties?.backgroundImage ? `url(${props.properties.backgroundImage})` : 'none'};
  background-size: ${props => props.properties?.backgroundSize || 'cover'};
  background-position: ${props => props.properties?.backgroundPosition || 'center'};
  background-repeat: ${props => props.properties?.backgroundRepeat || 'no-repeat'};
  opacity: ${props => props.properties?.opacity || '1'};
  padding: ${props => props.properties?.padding || '20px'};
  margin-bottom: ${props => props.properties?.marginBottom || '0px'};
  border-radius: ${props => props.properties?.borderRadius || '0px'};
  box-shadow: ${props => props.properties?.boxShadow || 'none'};
  border: ${props => props.properties?.border || 'none'};
  overflow: hidden;
  transition: all 0.3s ease;
  
  ${props => props.isHovered && !props.isSelected && `
    outline: 2px dashed #2196F3;
  `}
  
  ${props => props.isSelected && `
    outline: 2px solid #2196F3;
    box-shadow: 0 4px 20px rgba(33, 150, 243, 0.3);
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
  
  &:hover {
    .section-controls {
      opacity: 1;
    }
  }
`;

const SectionLabel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #2196F3;
  color: white;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 500;
  border-bottom-right-radius: 4px;
  z-index: 10;
  display: ${props => props.isSelected || props.isHovered ? 'block' : 'none'};
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const SectionContent = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
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

const SectionControls = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
  z-index: 20;
  opacity: 0;
  transition: opacity 0.3s ease;
  class-name: section-controls;
`;

const ControlButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
  color: #333;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

const AddElementButton = styled(ControlButton)`
  background-color: #4CAF50;
  color: white;
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 44px;
  height: 44px;
  font-size: 24px;
  opacity: ${props => props.isSelected || props.isHovered ? '1' : '0'};
  z-index: 10;
`;

const ElementMenu = styled.div`
  position: absolute;
  bottom: 60px;
  right: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 12px;
  z-index: 30;
  display: ${props => props.show ? 'grid' : 'none'};
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 280px;
`;

const ElementMenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  .icon {
    font-size: 24px;
    margin-bottom: 4px;
    color: #555;
  }
  
  .label {
    font-size: 12px;
    color: #333;
  }
`;

const SectionElement = ({ element, isSelected, children }) => {
  const { setSelectedElement, updateElement, availableElements, addElementToSection } = useBuilderContext();
  const [showElementMenu, setShowElementMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowElementMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const handleAddElement = (e) => {
    e.stopPropagation();
    // Toggle element menu
    setShowElementMenu(!showElementMenu);
  };
  
  const handleDuplicate = (e) => {
    e.stopPropagation();
    // Duplicate this section
    const newElement = {
      ...element,
      id: undefined, // Will be generated by addElement
    };
    updateElement(element.id, { duplicated: true });
  };
  
  const handleDelete = (e) => {
    e.stopPropagation();
    // Delete this section
    // This would be implemented in BuilderContext
  };
  
  const handleAddElementType = (elementType) => {
    // Find the element template
    const elementTemplate = availableElements.find(el => el.type === elementType);
    if (elementTemplate) {
      // Add element to this section
      const position = { x: 20, y: 20 }; // Default position within section
      addElementToSection(elementTemplate, element.id, position);
      setShowElementMenu(false);
    }
  };

  return (
    <SectionContainer
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isSelected={isSelected}
      isHovered={isHovered}
      properties={element.properties}
    >
      <SectionLabel isSelected={isSelected} isHovered={isHovered}>
        {element.properties.sectionType || 'Section'}
      </SectionLabel>
      
      <SectionControls className="section-controls">
        <ControlButton title="Style Section" onClick={handleClick}>
          <span>✎</span>
        </ControlButton>
        <ControlButton title="Duplicate Section" onClick={handleDuplicate}>
          <span>⧉</span>
        </ControlButton>
        <ControlButton title="Delete Section" onClick={handleDelete}>
          <span>✕</span>
        </ControlButton>
      </SectionControls>
      
      <OverlayDiv 
        overlayColor={element.properties.overlayColor}
        overlayOpacity={element.properties.overlayOpacity}
      />
      
      <SectionContent>
        {children}
      </SectionContent>
      
      <AddElementButton 
        isSelected={isSelected}
        isHovered={isHovered}
        onClick={handleAddElement}
      >
        +
      </AddElementButton>
      
      <ElementMenu ref={menuRef} show={showElementMenu}>
        <ElementMenuItem onClick={() => handleAddElementType('text')}>
          <div className="icon">T</div>
          <div className="label">Text</div>
        </ElementMenuItem>
        <ElementMenuItem onClick={() => handleAddElementType('heading')}>
          <div className="icon">H</div>
          <div className="label">Heading</div>
        </ElementMenuItem>
        <ElementMenuItem onClick={() => handleAddElementType('paragraph')}>
          <div className="icon">¶</div>
          <div className="label">Paragraph</div>
        </ElementMenuItem>
        <ElementMenuItem onClick={() => handleAddElementType('image')}>
          <div className="icon">🖼️</div>
          <div className="label">Image</div>
        </ElementMenuItem>
        <ElementMenuItem onClick={() => handleAddElementType('button')}>
          <div className="icon">⬜</div>
          <div className="label">Button</div>
        </ElementMenuItem>
      </ElementMenu>
    </SectionContainer>
  );
};

export default SectionElement;
