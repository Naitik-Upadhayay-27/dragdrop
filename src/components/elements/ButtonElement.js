import React from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  border: none;
  ${props => props.isSelected && `
    outline: 2px solid #2196F3;
  `}
  ${props => props.properties && Object.entries(props.properties).map(([key, value]) => {
    // Convert camelCase to kebab-case for CSS properties
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${cssKey}: ${value};`;
  }).join(' ')}
`;

const ButtonElement = ({ element, isSelected }) => {
  const { setSelectedElement } = useBuilderContext();

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  return (
    <StyledButton 
      onClick={handleClick}
      isSelected={isSelected}
      properties={element.properties}
    >
      {element.content}
    </StyledButton>
  );
};

export default ButtonElement;
