import React from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  border: none;
  display: inline-block;
  transition: all 0.2s ease;
  padding: 10px 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  min-width: 50px;
  min-height: 50px;
  border-radius: 4px;
  background-color: #2196F3;
  color: white;
  ${props => props.isSelected && `
    outline: 2px solid #2196F3;
    box-shadow: 0 0 10px rgba(33, 150, 243, 0.3);
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
