import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  border: 2px solid ${props => props.selected ? '#2196F3' : '#ddd'};
  border-radius: 4px;
  overflow: hidden;
  cursor: grab;
  transition: all 0.2s;
  height: 60px;
  
  &:hover {
    border-color: #2196F3;
    transform: scale(1.05);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DraggableSampleImage = ({ imageUrl, selected, onClick }) => {
  const handleDragStart = (e) => {
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
      draggable={true}
      onDragStart={handleDragStart}
    >
      <img src={imageUrl} alt="Sample" />
    </ImageContainer>
  );
};

export default DraggableSampleImage;
