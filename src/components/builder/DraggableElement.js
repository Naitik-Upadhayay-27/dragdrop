import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import { useBuilderContext } from '../../context/BuilderContext';
import ElementFactory from '../elements/ElementFactory';
import { cssValueToNumber } from '../../utils/responsiveHelper';
import './DraggableElement.css';

const ElementWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  
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

const StyledRnd = styled(Rnd)`
  &.selected {
    outline: 2px solid #2196F3;
  }
  
  &.dragging {
    opacity: 0.9;
  }
  
  /* Ensure elements don't have a box-shadow that extends beyond their bounds */
  box-shadow: none !important;
  
  /* Ensure proper stacking of elements */
  z-index: ${props => props.isSelected ? 100 : 10};
`;

const DraggableElement = ({ element, index }) => {
  const { removeElement, moveElement, updateElement, selectedElement, selectElement } = useBuilderContext();
  const elementRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Check if this element is selected
  const isSelected = selectedElement && selectedElement.id === element.id;
  
  // Check if this is a background element
  const isBackground = element.type === 'background';
  
  // Get element dimensions
  const getElementSize = () => {
    const properties = element.properties || {};
    return {
      width: cssValueToNumber(properties.width) || 100,
      height: cssValueToNumber(properties.height) || 100
    };
  };
  
  // Calculate size for the Rnd component
  const elementSize = getElementSize();
  
  // Handle element click
  const handleElementClick = (e) => {
    e.stopPropagation();
    selectElement(element);
  };
  
  // Handle drag stop
  const handleDragStop = (e, data) => {
    // Update the element position in the context
    const newPosition = { x: data.x, y: data.y };
    moveElement(element.id, newPosition);
    
    // Force isDragging to false to ensure the element stops moving with the cursor
    setIsDragging(false);
    document.body.style.cursor = 'default';
  };
  
  // Handle resize stop
  const handleResizeStop = (e, direction, ref, delta, position) => {
    // Update the element size and position in the context
    const newSize = {
      width: ref.style.width,
      height: ref.style.height
    };
    
    // Update element with new size and position
    updateElement(element.id, {
      properties: {
        ...element.properties,
        width: newSize.width,
        height: newSize.height
      },
      position: position
    });
  };
  
  // Handle element removal
  const handleRemoveElement = (e) => {
    e.stopPropagation();
    removeElement(element.id);
  };
  
  // Define resize handles based on element type
  const getResizeHandles = () => {
    if (isBackground) {
      // Background elements can only be resized vertically from the bottom
      return { bottom: true };
    } else if (element.type === 'image' || element.type === 'text' || element.type === 'button') {
      // Images, text, and buttons can be resized from all sides
      return { top: true, right: true, bottom: true, left: true };
    } else {
      // Other elements don't have resize handles
      return {};
    }
  };
  
  // Handle HTML5 drag start for delete functionality
  const handleDeleteDragStart = (e) => {
    // Set the element data for the drag operation
    const elementData = JSON.stringify({
      id: element.id,
      type: element.type
    });
    
    // Set data in multiple formats to ensure compatibility
    e.dataTransfer.setData('application/json', elementData);
    e.dataTransfer.setData('text/plain', elementData);
    
    // Enable dragging to the delete zone
    e.dataTransfer.effectAllowed = 'move';
  };
  
  // Add a global mouse up handler to ensure drag state is always reset
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.cursor = 'default';
      }
    };
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);
  
  return (
    <StyledRnd
      ref={elementRef}
      className={`draggable-element ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      size={{ width: elementSize.width, height: elementSize.height }}
      position={{ x: element.position?.x || 0, y: element.position?.y || 0 }}
      isSelected={isSelected}
      onDragStart={() => {
        setIsDragging(true);
        selectElement(element);
      }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onClick={handleElementClick}
      dragHandleClassName="drag-handle"
      resizeHandleClasses={{
        top: 'resize-handle top',
        right: 'resize-handle right',
        bottom: 'resize-handle bottom',
        left: 'resize-handle left'
      }}
      enableResizing={getResizeHandles()}
      disableDragging={isBackground}
      dragAxis={isBackground ? 'none' : 'both'}
      dragGrid={[5, 5]} // Snap to grid for smoother dragging
      resizeGrid={[5, 5]} // Snap to grid for smoother resizing
      minWidth={50}
      minHeight={50}
    >
      <ElementWrapper className="drag-handle">
        <ElementControls className="element-controls">
          <ControlButton 
            onClick={handleRemoveElement}
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </ControlButton>
          <ControlButton 
            draggable="true"
            onDragStart={handleDeleteDragStart}
            title="Drag to Delete Zone"
            style={{ background: '#f44336', cursor: 'grab' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </ControlButton>
        </ElementControls>
        
        <ElementFactory element={element} />
      </ElementWrapper>
    </StyledRnd>
  );
};

export default DraggableElement;
