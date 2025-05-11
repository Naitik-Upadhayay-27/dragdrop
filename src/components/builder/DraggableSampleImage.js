import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  border: 2px solid ${props => props.selected ? '#2196F3' : '#ddd'};
  border-radius: 4px;
  overflow: hidden;
  cursor: ${props => props.isBackground ? 'pointer' : 'grab'};
  transition: all 0.2s;
  height: 60px;
  position: relative;
  
  &:hover {
    border-color: #2196F3;
    transform: scale(1.05);
  }
  
  &:hover::after {
    content: ${props => props.isBackground ? '"Click to apply"' : '"Drag to canvas"'};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 10px;
    padding: 3px 0;
    text-align: center;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DraggableSampleImage = ({ imageUrl, selected, onClick, isBackground = false }) => {
  const handleDragStart = (e) => {
    // If this is a background image sample, prevent dragging
    if (isBackground) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    
    // Create the element data for dragging
    const elementData = {
      type: 'image',
      content: imageUrl,
      properties: { 
        width: '300px', 
        height: '200px', 
        alt: 'Dragged Image',
        keepAspectRatio: true
      }
    };
    
    // Set the drag data
    e.dataTransfer.setData('text/plain', JSON.stringify(elementData));
    
    // Create a drag image
    try {
      const img = new Image();
      img.src = imageUrl;
      // Only set drag image if it's loaded
      if (img.complete) {
        e.dataTransfer.setDragImage(img, 0, 0);
      }
    } catch (error) {
      console.error('Error setting drag image:', error);
    }
  };
  
  return (
    <ImageContainer 
      selected={selected}
      onClick={onClick}
      draggable={!isBackground}
      onDragStart={handleDragStart}
      isBackground={isBackground}
    >
      <img src={imageUrl} alt="Sample" />
    </ImageContainer>
  );
};

export default DraggableSampleImage;
