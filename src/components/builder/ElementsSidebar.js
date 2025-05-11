import React from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import { useBuilderContext } from '../../context/BuilderContext';

const SidebarContainer = styled.div`
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
  padding: ${props => props.isNarrow ? '10px 5px' : '15px'};
  height: 100%;
  overflow-y: auto;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    max-width: 100%;
    height: 100%;
    z-index: 200;
    box-shadow: 2px 0 10px rgba(0,0,0,0.2);
  }
`;

const ResizeHandle = styled.div`
  position: absolute;
  right: -5px;
  top: 0;
  width: 10px;
  height: 100%;
  cursor: col-resize;
  z-index: 10;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666;
  padding: 5px;
  line-height: 1;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  
  &:hover {
    background-color: #e0e0e0;
    color: #333;
  }
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
  padding: ${props => props.isNarrow ? '8px 5px' : '12px'};
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: ${props => props.isBackground ? 'pointer' : 'grab'};
  user-select: none;
  transition: all 0.2s;
  position: relative;
  font-size: ${props => props.isVeryNarrow ? '12px' : 'inherit'};
  text-align: ${props => props.isVeryNarrow ? 'center' : 'left'};
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  

  
  &:active {
    cursor: ${props => props.isBackground ? 'pointer' : 'grabbing'};
  }
  
  &.dragging {
    opacity: 0.5;
  }
`;

// Removed Canvas Settings button styling

const ElementsSidebar = () => {
  const { 
    availableElements, 
    addElement, 
    sidebarVisible,
    setSidebarVisible,
    sidebarWidth,
    setSidebarWidth,
    toggleSidebar,
    elements,
    selectElement,
    propertiesPanelVisible,
    togglePropertiesPanel
  } = useBuilderContext();
  
  // Check if we're on mobile
  const isMobile = window.innerWidth <= 768;

  // When sidebar is collapsed, show only the toggle button
  if (!sidebarVisible) {
    return (
      <div style={{ 
        position: 'absolute', 
        left: 0, 
        top: isMobile ? '50px' : 0, 
        height: '100%',
        zIndex: 100 
      }}>
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10
          }}
        >
          <div style={{ position: 'relative' }}>
            <button 
              onClick={toggleSidebar}
              title="Click to open Elements panel"
              style={{
                position: 'relative',
                background: '#2196F3',
                border: 'none',
                borderRadius: '0 4px 4px 0',
                width: '32px',
                height: '80px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                boxShadow: '2px 0 8px rgba(0,0,0,0.2)',
                color: 'white',
                fontSize: '16px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1976D2';
                e.currentTarget.style.width = '36px';
                // Show tooltip
                const tooltip = e.currentTarget.nextElementSibling;
                if (tooltip) tooltip.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2196F3';
                e.currentTarget.style.width = '32px';
                // Hide tooltip
                const tooltip = e.currentTarget.nextElementSibling;
                if (tooltip) tooltip.style.opacity = '0';
              }}
            >
              <span style={{ marginRight: '-2px' }}>&gt;</span>
            </button>
            <div style={{
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '6px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              position: 'absolute',
              left: '40px',
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              zIndex: 20
            }}>
              Click to open Elements
            </div>
          </div>
        </div>
      </div>
    );
  }

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

  // Canvas Settings functionality removed
  
  // Handle Background element click
  const handleBackgroundClick = () => {
    // Find background element in the elements array
    const backgroundElement = elements.find(element => element.type === 'background');
    
    if (backgroundElement) {
      // Select the background element
      selectElement(backgroundElement);
    } else {
      // No background element exists, create one
      const backgroundTemplate = availableElements.find(element => element.type === 'background');
      
      if (backgroundTemplate) {
        // Create a new background element with default properties
        const newBackgroundElement = {
          ...backgroundTemplate,
          id: `background-${Date.now()}`,
          position: { x: 0, y: 0 },
          properties: {
            ...backgroundTemplate.properties,
            backgroundColor: '#f5f5f5',  // Light gray default
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }
        };
        
        // Add the background element to the canvas
        const addedElement = addElement(newBackgroundElement);
        
        // Select the new background element
        selectElement(addedElement);
      }
    }
    
    // Ensure properties panel is visible
    if (!propertiesPanelVisible) {
      togglePropertiesPanel();
    }
  };
  
  // Filter out Canvas Settings and Background from the draggable elements
  const draggableElements = availableElements.filter(element => 
    element.type !== 'canvasSettings' && element.type !== 'background'
  );
  
  // Get the background element template
  const backgroundElement = availableElements.find(element => element.type === 'background');
  
  return (
    <Rnd
      style={{ 
        zIndex: 100,
        position: 'absolute',
        left: 0,
        top: 0,
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
      }}
      size={{ width: sidebarWidth, height: '100%' }}
      position={{ x: 0, y: 0 }}
      enableResizing={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      }}
      disableDragging={true}
      onResize={(e, direction, ref, delta, position) => {
        setSidebarWidth(parseInt(ref.style.width));
      }}
      minWidth={50}
      maxWidth={400}
      default={{
        x: 0,
        y: 0,
        width: sidebarWidth,
        height: '100%'
      }}
    >
      <SidebarContainer isNarrow={sidebarWidth < 150}>
        <SidebarTitle>{sidebarWidth < 100 ? 'Elem.' : 'Elements'}</SidebarTitle>
        <CloseButton onClick={toggleSidebar}>×</CloseButton>
        {/* Canvas Settings button removed */}
        
        <ElementsList>
          {/* Special Background button - clickable, not draggable */}
          <div style={{ marginBottom: '15px' }}>
            <ElementItem
              key="background-button"
              onClick={handleBackgroundClick}
              draggable="false"
              isBackground={true}
              isNarrow={sidebarWidth < 150}
              isVeryNarrow={sidebarWidth < 100}
              style={{ 
                backgroundColor: '#e3f2fd', 
                borderColor: '#90caf9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '5px'
              }}
            >
              {sidebarWidth < 100 ? 'BG' : 'Background'}
            </ElementItem>
            {sidebarWidth > 100 && (
              <div style={{ 
                fontSize: '11px', 
                textAlign: 'center', 
                color: '#666',
                backgroundColor: '#f5f5f5',
                padding: '3px',
                borderRadius: '3px'
              }}>
                Click to edit background
              </div>
            )}
          </div>
          
          {/* Regular draggable elements */}
          <div style={{ marginBottom: '15px' }}>
            {draggableElements.map((element) => (
              <ElementItem
                key={element.id}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, element)}
                onDragEnd={handleDragEnd}
                isNarrow={sidebarWidth < 150}
                isVeryNarrow={sidebarWidth < 100}
              >
                {sidebarWidth < 100 ? element.label.split(' ')[0] : element.label}
              </ElementItem>
            ))}
            {sidebarWidth > 100 && (
              <div style={{ 
                fontSize: '11px', 
                textAlign: 'center', 
                color: '#666',
                backgroundColor: '#f5f5f5',
                padding: '3px',
                borderRadius: '3px',
                marginTop: '5px'
              }}>
                Drag elements to canvas
              </div>
            )}
          </div>
        </ElementsList>
        
        {sidebarWidth > 120 && (
          <InstructionText>
            ↑ Drag and drop elements onto the canvas
          </InstructionText>
        )}
        <ResizeHandle className="resize-handle" />
      </SidebarContainer>
    </Rnd>
  );
};

export default ElementsSidebar;
