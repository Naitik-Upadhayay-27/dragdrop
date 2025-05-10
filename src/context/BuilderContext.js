import React, { createContext, useContext, useState } from 'react';

const BuilderContext = createContext();

export const useBuilderContext = () => useContext(BuilderContext);

export const BuilderProvider = ({ children }) => {
  // State for the canvas elements
  const [elements, setElements] = useState([]);
  
  // State for the selected element
  const [selectedElement, setSelectedElement] = useState(null);
  
  // State for template modal
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  
  // Available element types that can be dragged onto the canvas
  const availableElements = [
    { id: 'text', type: 'text', label: 'Text', content: 'Add your text here', properties: { fontSize: '16px', color: '#000000', fontWeight: 'normal' } },
    { id: 'image', type: 'image', label: 'Image', content: 'https://via.placeholder.com/150', properties: { width: '150px', height: '150px', alt: 'Image' } },
    { id: 'button', type: 'button', label: 'Button', content: 'Click Me', properties: { backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '4px' } },
    { id: 'heading', type: 'heading', label: 'Heading', content: 'Heading', properties: { fontSize: '24px', color: '#000000', fontWeight: 'bold' } },
    { id: 'paragraph', type: 'paragraph', label: 'Paragraph', content: 'This is a paragraph of text that can be edited.', properties: { fontSize: '16px', color: '#000000', lineHeight: '1.5' } },
  ];

  // Add a new element to the canvas
  const addElement = (element) => {
    const newElement = {
      ...element,
      id: `${element.type}-${Date.now()}`,
      position: { x: 0, y: 0 }
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };

  // Update an element's properties
  const updateElement = (id, updates) => {
    setElements(
      elements.map(element => 
        element.id === id ? { ...element, ...updates } : element
      )
    );
  };

  // Remove an element from the canvas
  const removeElement = (id) => {
    setElements(elements.filter(element => element.id !== id));
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement(null);
    }
  };

  // Update element positions after drag
  const updateElementPositions = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setElements(items);
  };

  // Move an element to a specific position on the canvas
  const moveElement = (id, position) => {
    setElements(
      elements.map(element => 
        element.id === id ? { ...element, position } : element
      )
    );
  };

  // Toggle template modal
  const toggleTemplateModal = () => {
    setIsTemplateModalOpen(!isTemplateModalOpen);
  };

  return (
    <BuilderContext.Provider
      value={{
        elements,
        selectedElement,
        availableElements,
        isTemplateModalOpen,
        setSelectedElement,
        setElements,
        addElement,
        updateElement,
        removeElement,
        updateElementPositions,
        moveElement,
        toggleTemplateModal
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};
