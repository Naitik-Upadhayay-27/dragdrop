import React, { createContext, useContext, useState } from 'react';

const BuilderContext = createContext();

export const useBuilderContext = () => useContext(BuilderContext);

export const BuilderProvider = ({ children }) => {
  // State for the canvas elements
  const [elements, setElements] = useState([]);
  
  // State for the selected element
  const [selectedElement, setSelectedElement] = useState(null);
  
  // State to control properties panel visibility independently from selection
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(false);
  
  // State for template modal
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  
  // State for template selector
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(true); // Open by default
  
  // Available element types that can be added to the canvas
  const availableElements = [
    { id: 'text', type: 'text', label: 'Text', content: 'Text Element', properties: { fontSize: '16px', color: '#000000' } },
    { id: 'image', type: 'image', label: 'Image', content: 'https://source.unsplash.com/random/300x200', properties: { width: '300px', height: '200px', alt: 'Image' } },
    { id: 'button', type: 'button', label: 'Button', content: 'Click Me', properties: { backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '4px' } },
    { id: 'heading', type: 'heading', label: 'Heading', content: 'Heading', properties: { fontSize: '24px', color: '#000000', fontWeight: 'bold' } },
    { id: 'paragraph', type: 'paragraph', label: 'Paragraph', content: 'This is a paragraph of text that can be edited.', properties: { fontSize: '16px', color: '#000000', lineHeight: '1.5' } },
    { id: 'background', type: 'background', label: 'Background', content: '', properties: { width: '100%', height: '300px', backgroundColor: '#f5f5f5', backgroundImage: '', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', zIndex: '-1', opacity: '1', overlayColor: 'rgba(0,0,0,0)', overlayOpacity: '0', blur: '0px', grayscale: '0%', sepia: '0%', hueRotate: '0deg', contrast: '100%', brightness: '100%' } },
  ];

  // Add a new element to the canvas
  const addElement = (element, position = null) => {
    const newElement = {
      ...element,
      id: `${element.type}-${Date.now()}`,
      position: position || { x: 0, y: 0 }
    };
    setElements(prevElements => [...prevElements, newElement]);
    setSelectedElement(newElement);
    setShowPropertiesPanel(true); // Show properties panel when adding a new element
    return newElement;
  };
  
  // Remove an element from the canvas
  const removeElement = (id) => {
    setElements(prevElements => prevElements.filter(el => el.id !== id));
    
    // If the deleted element was selected, clear the selection
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement(null);
      // Keep properties panel open
    }
  };
  
  // Custom function to handle element selection
  const selectElement = (element) => {
    setSelectedElement(element);
    if (element) {
      setShowPropertiesPanel(true);
    }
  };
  
  // Function to deselect element but keep properties panel open
  const deselectElement = () => {
    setSelectedElement(null);
    // Properties panel remains open
  };

  // Update an element's properties
  const updateElement = (id, updates) => {
    setElements(prevElements => {
      return prevElements.map(element => {
        if (element.id === id) {
          return { ...element, ...updates };
        }
        return element;
      });
    });
    
    // If the selected element is being updated, update it in the state as well
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement(prev => ({ ...prev, ...updates }));
    }
  };

  // This function was redefined above with more functionality

  // Update element positions after drag
  const updateElementPositions = (result) => {
    if (!result.destination) return;
    
    // If dragging within the canvas, just reorder
    if (result.source.droppableId === 'builder-canvas' && 
        result.destination.droppableId === 'builder-canvas') {
      const items = Array.from(elements);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      
      setElements(items);
    }
  };

  // Move an element to a specific position on the canvas
  const moveElement = (id, position) => {
    setElements(prevElements => {
      return prevElements.map(element => {
        if (element.id === id) {
          return { ...element, position };
        }
        return element;
      });
    });
  };
  
  // Resize an element with new dimensions and position
  const resizeElement = (id, newSize, position) => {
    setElements(prevElements => {
      return prevElements.map(element => {
        if (element.id === id) {
          return { 
            ...element, 
            position,
            properties: {
              ...element.properties,
              width: newSize.width,
              height: newSize.height
            }
          };
        }
        return element;
      });
    });
  };
  
  // Get mouse position relative to canvas
  const getCanvasMousePosition = (e, canvasRef) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  // Toggle template modal
  const toggleTemplateModal = () => {
    setIsTemplateModalOpen(!isTemplateModalOpen);
  };
  
  // Toggle template selector
  const toggleTemplateSelector = () => {
    setIsTemplateSelectorOpen(!isTemplateSelectorOpen);
  };
  
  // Close template selector
  const closeTemplateSelector = () => {
    setIsTemplateSelectorOpen(false);
  };

  const contextValue = {
    elements,
    selectedElement,
    availableElements,
    isTemplateModalOpen,
    isTemplateSelectorOpen,
    showPropertiesPanel,
    setSelectedElement,
    setElements,
    setShowPropertiesPanel,
    addElement,
    updateElement,
    removeElement,
    updateElementPositions,
    moveElement,
    resizeElement,
    getCanvasMousePosition,
    toggleTemplateModal,
    toggleTemplateSelector,
    closeTemplateSelector,
    selectElement,
    deselectElement
  };

  return (
    <BuilderContext.Provider value={contextValue}>
      {children}
    </BuilderContext.Provider>
  );
};
