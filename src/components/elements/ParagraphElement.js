import React from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';

const StyledParagraph = styled.p`
  padding: 10px;
  cursor: pointer;
  position: relative;
  margin: 0;
  ${props => props.isSelected && `
    outline: 2px solid #2196F3;
  `}
  ${props => props.properties && Object.entries(props.properties).map(([key, value]) => {
    // Convert camelCase to kebab-case for CSS properties
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${cssKey}: ${value};`;
  }).join(' ')}
`;

const ParagraphElement = ({ element, isSelected }) => {
  const { setSelectedElement } = useBuilderContext();

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  return (
    <StyledParagraph 
      onClick={handleClick}
      isSelected={isSelected}
      properties={element.properties}
    >
      {element.content}
    </StyledParagraph>
  );
};

export default ParagraphElement;
