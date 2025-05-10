import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useBuilderContext } from '../../context/BuilderContext';
import ElementFactory from '../elements/ElementFactory';
import EmptyCanvasGuide from './EmptyCanvasGuide';

const CanvasContainer = styled.div`
  flex: 1;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 600px;
  padding: 20px;
  overflow-y: auto;
  position: relative;
`;

// Removed unused EmptyCanvasMessage component

const ElementWrapper = styled.div`
  margin-bottom: 10px;
  position: relative;
  transition: transform 0.2s;
  
  &:hover {
    .element-controls {
      opacity: 1;
    }
  }
`;

const ElementControls = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  display: flex;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 10;
`;

const ControlButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  
  &:hover {
    background-color: #d32f2f;
  }
`;

const BuilderCanvas = () => {
  const { elements, removeElement } = useBuilderContext();

  const handleRemoveElement = (e, id) => {
    e.stopPropagation();
    removeElement(id);
  };

  return (
    <CanvasContainer>
      <Droppable droppableId="builder-canvas">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: '100%' }}
          >
            {elements.length === 0 ? (
              <EmptyCanvasGuide />
            ) : (
              elements.map((element, index) => (
                <Draggable
                  key={element.id}
                  draggableId={element.id}
                  index={index}
                >
                  {(provided) => (
                    <ElementWrapper
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ElementControls className="element-controls">
                        <ControlButton 
                          onClick={(e) => handleRemoveElement(e, element.id)}
                          title="Remove element"
                        >
                          ×
                        </ControlButton>
                      </ElementControls>
                      <ElementFactory element={element} />
                    </ElementWrapper>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </CanvasContainer>
  );
};

export default BuilderCanvas;
