import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { useBuilderContext } from '../../context/BuilderContext';
import ElementsSidebar from './ElementsSidebar';
import BuilderCanvas from './BuilderCanvas';
import PropertiesPanel from './PropertiesPanel';
import BuilderToolbar from './BuilderToolbar';
import PreviewMode from './PreviewMode';

const BuilderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const BuilderContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const WebsiteBuilder = () => {
  const { addElement, updateElementPositions, availableElements } = useBuilderContext();
  const [previewMode, setPreviewMode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop');

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    
    // Dropped outside the list
    if (!destination) {
      return;
    }
    
    // If the item is dropped back in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    
    // If dragging from sidebar to canvas
    if (
      source.droppableId === 'elements-sidebar' &&
      destination.droppableId === 'builder-canvas'
    ) {
      // Get the element type from the draggable ID
      const elementId = result.draggableId;
      const elementTemplate = availableElements.find(element => element.id === elementId);
      
      if (elementTemplate) {
        addElement(elementTemplate);
      }
      return;
    }
    
    // If reordering elements within the canvas
    if (
      source.droppableId === 'builder-canvas' &&
      destination.droppableId === 'builder-canvas'
    ) {
      updateElementPositions(result);
    }
  };

  // Toggle preview mode
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  // Change preview device
  const changePreviewDevice = (device) => {
    setPreviewDevice(device);
  };



  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <BuilderContainer>
        <BuilderToolbar 
          previewMode={previewMode} 
          togglePreviewMode={togglePreviewMode}
          previewDevice={previewDevice}
          changePreviewDevice={changePreviewDevice}
        />
        
        {previewMode ? (
          <PreviewMode device={previewDevice} />
        ) : (
          <BuilderContent>
            <ElementsSidebar />
            <BuilderCanvas />
            <PropertiesPanel />
          </BuilderContent>
        )}
      </BuilderContainer>
    </DragDropContext>
  );
};

export default WebsiteBuilder;
