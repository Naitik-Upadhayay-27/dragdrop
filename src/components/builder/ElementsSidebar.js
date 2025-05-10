import React from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
  padding: 15px;
  height: 100%;
  overflow-y: auto;
`;

const SidebarTitle = styled.h3`
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  color: #333;
`;

const ElementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
`;

const InstructionText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 30px 0;
  font-style: italic;
  text-align: center;
  line-height: 1.4;
`;

const ElementItem = styled.div`
  padding: 12px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: grab;
  user-select: none;
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  &:active {
    cursor: grabbing;
  }
  
  &.dragging {
    opacity: 0.5;
  }
`;

const ElementsSidebar = () => {
  const { availableElements } = useBuilderContext();

  const handleDragStart = (e, element) => {
    // Set the drag data to the element type
    e.dataTransfer.setData('text/plain', JSON.stringify({
      type: element.type,
      id: element.id
    }));
    
    // Set the drag effect
    e.dataTransfer.effectAllowed = 'copy';
    
    // Add dragging class
    e.currentTarget.classList.add('dragging');
    
    // Create a drag image (optional)
    const dragImage = document.createElement('div');
    dragImage.textContent = element.label;
    dragImage.style.padding = '10px';
    dragImage.style.background = '#fff';
    dragImage.style.border = '1px solid #ddd';
    dragImage.style.borderRadius = '4px';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    
    // Clean up the drag image after a short delay
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 100);
  };

  const handleDragEnd = (e) => {
    // Remove dragging class
    e.currentTarget.classList.remove('dragging');
  };

  return (
    <SidebarContainer>
      <SidebarTitle>Elements</SidebarTitle>
      
      <ElementsList>
        {availableElements.map((element) => (
          <ElementItem
            key={element.id}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, element)}
            onDragEnd={handleDragEnd}
          >
            {element.label}
          </ElementItem>
        ))}
      </ElementsList>
      
      <InstructionText>
        ↑ Drag and drop elements onto the canvas to build your design
      </InstructionText>
    </SidebarContainer>
  );
};

export default ElementsSidebar;
