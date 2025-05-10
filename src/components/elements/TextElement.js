import React from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';

const StyledText = styled.div`
  padding: 10px;
  cursor: pointer;
  position: relative;
  ${props => props.isSelected && `
    outline: 2px solid #2196F3;
  `}
  ${props => props.properties && Object.entries(props.properties).map(([key, value]) => {
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
