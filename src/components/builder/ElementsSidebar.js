import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
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
`;

const ElementItem = styled.div`
  padding: 12px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: grab;
  user-select: none;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  &:active {
    cursor: grabbing;
  }
`;

const ElementsSidebar = () => {
  const { availableElements } = useBuilderContext();

  return (
    <SidebarContainer>
      <SidebarTitle>Elements</SidebarTitle>
      <Droppable droppableId="elements-sidebar" isDropDisabled={true}>
        {(provided) => (
          <ElementsList
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {availableElements.map((element, index) => (
              <Draggable
                key={element.id}
                draggableId={element.id}
                index={index}
              >
                {(provided) => (
                  <ElementItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {element.label}
                  </ElementItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ElementsList>
        )}
      </Droppable>
    </SidebarContainer>
  );
};

export default ElementsSidebar;
