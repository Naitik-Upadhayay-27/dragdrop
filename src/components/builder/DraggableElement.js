import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';
import ElementFactory from '../elements/ElementFactory';

const ElementWrapper = styled.div`
  position: ${props => props.isBackground ? 'relative' : 'absolute'};
  left: ${props => props.isBackground ? 0 : props.position?.x || 0}px;
  top: ${props => props.isBackground ? 0 : props.position?.y || 0}px;
  width: ${props => props.isBackground ? '100%' : 'auto'};
  transition: box-shadow 0.2s;
  cursor: ${props => props.isResizing ? 'nwse-resize' : (props.isBackground ? 'pointer' : 'move')};
  z-index: ${props => {
    if (props.isBackground) return props.isSelected ? 0 : -1;
    return (props.isDragging || props.isResizing || props.isSelected) ? 100 : 1;
  }};
  
  &:hover {
    .element-controls {
      opacity: 1;
    }
    
    .resize-handle {
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

const ResizeHandle = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #2196F3;
  border: 1px solid white;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 10;
  
  &.top-left {
    top: -5px;
    left: -5px;
    cursor: nwse-resize;
  }
  
  &.top-right {
    top: -5px;
    right: -5px;
    cursor: nesw-resize;
  }
  
  &.bottom-left {
    bottom: -5px;
    left: -5px;
    cursor: nesw-resize;
  }
  
  &.bottom-right {
    bottom: -5px;
    right: -5px;
    cursor: nwse-resize;
  }
  
  /* Single direction resize handles */
  &.top {
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    cursor: ns-resize;
  }
  
  &.right {
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    cursor: ew-resize;
  }
  
  &.bottom {
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    cursor: ns-resize;
  }
  
  &.left {
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
    cursor: ew-resize;
  }
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

const DraggableElement = ({ element, index }) => {
  const { removeElement, moveElement, selectedElement, setSelectedElement, updateElement } = useBuilderContext();
  const elementRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });
  
  // Check if this element is selected
  const isSelected = selectedElement && selectedElement.id === element.id;
  
  // Track if element has been clicked first before allowing drag
  const [canDrag, setCanDrag] = useState(false);
  
  // Handle drag start for deletion
  const handleDragStart = (e) => {
    // Allow drag if not resizing (even if not selected)
    if (isResizing) {
      e.preventDefault();
      return;
    }
    
    // Select this element if it's not already selected
    if (!isSelected) {
      setSelectedElement(element);
    }
    
    // Set drag data for deletion
    e.dataTransfer.setData('text/plain', JSON.stringify({
      id: element.id,
      type: element.type
    }));
    
    // Set drag effect
    e.dataTransfer.effectAllowed = 'move';
    
    // Set a ghost image (optional)
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      e.dataTransfer.setDragImage(elementRef.current, e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const handleRemoveElement = (e) => {
    e.stopPropagation();
    removeElement(element.id);
  };
  
  const handleElementClick = (e) => {
    e.stopPropagation();
    setSelectedElement(element);
    
    // Enable dragging after the element is selected
    if (!canDrag) {
      setCanDrag(true);
    }
  };

  // Handle element dragging with mouse
  const handleMouseDown = (e) => {
    if (e.target.closest('.element-controls') || e.target.closest('.resize-handle')) return;
    
    // If the element is not selected or can't be dragged yet, just select it
    if (!isSelected || !canDrag) {
      setSelectedElement(element);
      setCanDrag(true);
      return;
    }
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = element.position?.x || 0;
    const startTop = element.position?.y || 0;
    
    setIsDragging(true);
    
    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      moveElement(element.id, {
        x: startLeft + deltaX,
        y: startTop + deltaY
      });
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  // Handle element resizing with mouse
  const handleResizeStart = (e, direction) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Only allow resizing for images and buttons
    if (element.type !== 'image' && element.type !== 'button') return;
    
    setIsResizing(true);
    setResizeDirection(direction);
    setSelectedElement(element);
    
    // Get current element dimensions
    const elRect = elementRef.current.getBoundingClientRect();
    const width = parseInt(element.properties.width) || elRect.width;
    const height = parseInt(element.properties.height) || elRect.height;
    
    setInitialSize({ width, height });
    setInitialPosition({ x: element.position.x, y: element.position.y });
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
    
    const handleResizeMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - initialMousePosition.x;
      const deltaY = moveEvent.clientY - initialMousePosition.y;
      
      // Start with current properties
      const updatedProperties = { ...element.properties };
      
      // Handle resizing based on which handle is being dragged
      switch (direction) {
        // Single direction resizing - only change one dimension at a time
        case 'right':
          // Only change width, expanding to the right
          updatedProperties.width = `${Math.max(50, initialSize.width + deltaX)}px`;
          break;
          
        case 'left':
          // Only change width, expanding to the left
          updatedProperties.width = `${Math.max(50, initialSize.width - deltaX)}px`;
          break;
          
        case 'bottom':
          // Only change height, expanding downward
          updatedProperties.height = `${Math.max(50, initialSize.height + deltaY)}px`;
          break;
          
        case 'top':
          // Only change height, expanding upward
          updatedProperties.height = `${Math.max(50, initialSize.height - deltaY)}px`;
          break;
          
        // Corner resizing - change both dimensions but independently
        case 'bottom-right':
          // Change width and height independently
          updatedProperties.width = `${Math.max(50, initialSize.width + deltaX)}px`;
          updatedProperties.height = `${Math.max(50, initialSize.height + deltaY)}px`;
          break;
          
        case 'bottom-left':
          // Change width and height independently
          updatedProperties.width = `${Math.max(50, initialSize.width - deltaX)}px`;
          updatedProperties.height = `${Math.max(50, initialSize.height + deltaY)}px`;
          break;
          
        case 'top-right':
          // Change width and height independently
          updatedProperties.width = `${Math.max(50, initialSize.width + deltaX)}px`;
          updatedProperties.height = `${Math.max(50, initialSize.height - deltaY)}px`;
          break;
          
        case 'top-left':
          // Change width and height independently
          updatedProperties.width = `${Math.max(50, initialSize.width - deltaX)}px`;
          updatedProperties.height = `${Math.max(50, initialSize.height - deltaY)}px`;
          break;
          
        default:
          break;
      }
      
      // Update the element with the new properties
      updateElement(element.id, { properties: updatedProperties });
    };
    
    const handleResizeEnd = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
    
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  // Check if this is a background element
  const isBackground = element.type === 'background';

  return (
    <ElementWrapper
      ref={elementRef}
      position={element.position}
      onMouseDown={isBackground ? null : handleMouseDown}
      onClick={handleElementClick}
      isDragging={isDragging}
      isResizing={isResizing}
      isSelected={isSelected}
      isBackground={isBackground}
      draggable={true}
      onDragStart={handleDragStart}
    >
      <ElementControls className="element-controls">
        <ControlButton 
          onClick={handleRemoveElement}
          title="Remove element"
        >
          ×
        </ControlButton>
      </ElementControls>
      
      {/* Show resize handles for images, buttons, and backgrounds (height only) */}
      {(element.type === 'image' || element.type === 'button') && (
        <>
          {/* Corner resize handles */}
          <ResizeHandle 
            className="resize-handle top-left" 
            onMouseDown={(e) => handleResizeStart(e, 'top-left')}
          />
          <ResizeHandle 
            className="resize-handle top-right" 
            onMouseDown={(e) => handleResizeStart(e, 'top-right')}
          />
          <ResizeHandle 
            className="resize-handle bottom-left" 
            onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
          />
          <ResizeHandle 
            className="resize-handle bottom-right" 
            onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
          />
          
          {/* Single direction resize handles for more precise control */}
          <ResizeHandle 
            className="resize-handle top" 
            onMouseDown={(e) => handleResizeStart(e, 'top')}
          />
          <ResizeHandle 
            className="resize-handle right" 
            onMouseDown={(e) => handleResizeStart(e, 'right')}
          />
          <ResizeHandle 
            className="resize-handle bottom" 
            onMouseDown={(e) => handleResizeStart(e, 'bottom')}
          />
          <ResizeHandle 
            className="resize-handle left" 
            onMouseDown={(e) => handleResizeStart(e, 'left')}
          />
        </>
      )}
      
      {/* Show only bottom resize handle for background elements */}
      {element.type === 'background' && (
        <ResizeHandle 
          className="resize-handle bottom" 
          onMouseDown={(e) => handleResizeStart(e, 'bottom')}
        />
      )}
      
      <ElementFactory element={element} />
    </ElementWrapper>
  );
};

export default DraggableElement;
