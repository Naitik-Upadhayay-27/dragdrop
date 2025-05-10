import React from 'react';
import TextElement from './TextElement';
import ImageElement from './ImageElement';
import ButtonElement from './ButtonElement';
import HeadingElement from './HeadingElement';
import ParagraphElement from './ParagraphElement';
import { useBuilderContext } from '../../context/BuilderContext';

const ElementFactory = ({ element }) => {
  const { selectedElement } = useBuilderContext();
  const isSelected = selectedElement && selectedElement.id === element.id;

  switch (element.type) {
    case 'text':
      return <TextElement element={element} isSelected={isSelected} />;
    case 'image':
      return <ImageElement element={element} isSelected={isSelected} />;
    case 'button':
      return <ButtonElement element={element} isSelected={isSelected} />;
    case 'heading':
      return <HeadingElement element={element} isSelected={isSelected} />;
    case 'paragraph':
      return <ParagraphElement element={element} isSelected={isSelected} />;
    default:
      return <div>Unknown element type: {element.type}</div>;
  }
};

export default ElementFactory;
