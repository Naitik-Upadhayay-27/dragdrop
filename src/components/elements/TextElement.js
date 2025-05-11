import React from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';

const StyledText = styled.div`
  padding: 10px;
  cursor: pointer;
  position: relative;
  width: ${props => props.properties?.width || '200px'}; /* Default width if not specified */
  height: ${props => props.properties?.height || 'auto'}; /* Default height if not specified */
  box-sizing: border-box;
  display: inline-block;
  min-width: 50px;
  min-height: 30px;
  overflow: visible;
  word-wrap: break-word;
  resize: both;
  /* Remove the selected outline since DraggableElement already adds one */
  ${props => props.properties && Object.entries(props.properties).map(([key, value]) => {
    // Skip width and height as they're handled separately above
    if (key === 'width' || key === 'height') return '';
    // Convert camelCase to kebab-case for CSS properties
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${cssKey}: ${value};`;
  }).join(' ')}
`;

const TextElement = ({ element, isSelected }) => {
  const { setSelectedElement } = useBuilderContext();

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  return (
    <StyledText 
      onClick={handleClick}
      isSelected={isSelected}
      properties={element.properties}
    >
      {element.content}
    </StyledText>
  );
};

export default TextElement;
