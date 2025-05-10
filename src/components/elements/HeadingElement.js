import React from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';

const StyledHeading = styled.h2`
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

const HeadingElement = ({ element, isSelected }) => {
  const { setSelectedElement } = useBuilderContext();

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  return (
    <StyledHeading 
      onClick={handleClick}
      isSelected={isSelected}
      properties={element.properties}
    >
      {element.content}
    </StyledHeading>
  );
};

export default HeadingElement;
