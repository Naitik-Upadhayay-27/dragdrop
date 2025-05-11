import React, { useState } from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import { useBuilderContext } from '../../context/BuilderContext';
import DraggableSampleImage from './DraggableSampleImage';
import ImagePropertiesPanel from '../elements/ImagePropertiesPanel';
import { MultiSelectionIndicator, Badge, ApplyButton } from './MultiSelectionIndicator';

const PanelContainer = styled.div`
  background-color: #f5f5f5;
  border-left: 1px solid #ddd;
  padding: 15px;
  height: 100%;
  overflow-y: auto;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  
  /* Adjust padding based on panel width */
  ${props => props.isNarrow && `
    padding: 10px 5px;
  `}
`;

const ResizeHandle = styled.div`
  position: absolute;
  left: -5px;
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

const PanelTitle = styled.h3`
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  color: #333;
  display: flex;
  align-items: center;
`;

const NoSelectionMessage = styled.div`
  color: #999;
  font-style: italic;
  margin-top: 20px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  
  /* Adjust layout based on panel width */
  ${props => props.isNarrow && `
    display: flex;
    flex-direction: column;
  `}
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #2196F3;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #2196F3;
  }
`;

const ColorInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.isNarrow ? '1fr' : 'repeat(3, 1fr)'};
  gap: 10px;
  margin-top: 10px;
`;

const FontOption = styled.div`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.selected ? '#e3f2fd' : 'white'};
  border-color: ${props => props.selected ? '#2196F3' : '#ddd'};
  
  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }
`;

const ImageOption = styled.div`
  border: 2px solid ${props => props.selected ? '#2196F3' : '#ddd'};
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
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

const ResizeHandlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  padding: 10px;
  background-color: #eee;
  border-radius: 4px;
`;

const ResizeHandleOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  label {
    min-width: 120px;
  }
  
  input {
    flex: 1;
  }
`;

// Sample images for the image selector
const sampleImages = [
  // Local images from public/images folder
  '/images/download (1).webp',
  '/images/download (2).webp',
  '/images/download.webp',
  '/images/OIP (1).webp',
  '/images/OIP (2).webp',
  '/images/OIP (3).webp',
  '/images/OIP.webp',
];

// Font style options
const fontStyles = [
  { name: 'Normal', style: 'normal', weight: 'normal' },
  { name: 'Bold', style: 'normal', weight: 'bold' },
  { name: 'Italic', style: 'italic', weight: 'normal' },
  { name: 'Bold Italic', style: 'italic', weight: 'bold' },
  { name: 'Light', style: 'normal', weight: '300' },
  { name: 'Medium', style: 'normal', weight: '500' },
];

const fontFamilies = [
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Helvetica', value: 'Helvetica, sans-serif' },
  { name: 'Times', value: 'Times New Roman, serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Courier', value: 'Courier New, monospace' },
  { name: 'Verdana', value: 'Verdana, sans-serif' },
];

const PropertiesPanel = () => {
  const { 
    selectedElement, 
    selectedElements,
    updateElement, 
    setSelectedElement,
    propertiesPanelVisible,
    togglePropertiesPanel,
    propertiesPanelWidth,
    setPropertiesPanelWidth,
    elements,
    deselectElement,
    selectElement
  } = useBuilderContext();
  
  // Always declare hooks at the top level, before any conditional returns
  const [showResizeHandles, setShowResizeHandles] = useState(false);
  
  // When panel is collapsed, show only the toggle button
  if (!propertiesPanelVisible) {
    return (
      <div style={{ 
        position: 'absolute', 
        right: 0, 
        top: 0, 
        height: '100%',
        zIndex: 100 
      }}>
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10
          }}
        >
          <div style={{ position: 'relative' }}>
            <button 
              onClick={togglePropertiesPanel}
              title="Click to open Properties panel"
              style={{
                position: 'relative',
                width: '28px',
                height: '28px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #ddd',
                borderRight: 'none',
                borderTopLeftRadius: '4px',
                borderBottomLeftRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '14px',
                zIndex: 5,
                transition: 'width 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.width = '36px';
                // Show tooltip
                const tooltip = e.currentTarget.nextElementSibling;
                if (tooltip) tooltip.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.width = '32px';
                // Hide tooltip
                const tooltip = e.currentTarget.nextElementSibling;
                if (tooltip) tooltip.style.opacity = '0';
              }}
            >
              <span style={{ marginLeft: '-2px' }}>&lt;</span>
            </button>
            <div style={{
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '6px 10px',
              borderRadius: '4px',
              position: 'absolute',
              right: '40px',
              whiteSpace: 'nowrap',
              fontSize: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              zIndex: 20
            }}>
              Click to open Properties
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleContentChange = (e) => {
    if (!selectedElement) return;
    updateElement(selectedElement.id, { content: e.target.value });
  };
  
  // Handle image selection from sample images
  const handleImageSelect = (imageUrl) => {
    if (!selectedElement) return;
    updateElement(selectedElement.id, { 
      properties: { 
        ...selectedElement.properties, 
        backgroundImage: `url(${imageUrl})` 
      } 
    });
  };
  
  // Handle font style selection
  const handleFontStyleSelect = (fontStyle) => {
    if (!selectedElement) return;
    const updatedProperties = {
      ...selectedElement.properties,
      fontStyle: fontStyle.style,
      fontWeight: fontStyle.weight
    };
    updateElement(selectedElement.id, { properties: updatedProperties });
  };
  
  // Handle font family selection
  const handleFontFamilySelect = (fontFamily) => {
    if (!selectedElement) return;
    const updatedProperties = {
      ...selectedElement.properties,
      fontFamily: fontFamily.value
    };
    updateElement(selectedElement.id, { properties: updatedProperties });
  };
  
  // Handle property change with support for multi-selection
  const handlePropertyChange = (propertyName, value, applyToAll = false) => {
    if (!selectedElement) return;
    
    // Make a deep copy of the current properties
    const updatedProperties = {
      ...selectedElement.properties,
      [propertyName]: value
    };
    
    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('Current properties:', selectedElement.properties);
      console.log('Updated properties:', updatedProperties);
      if (applyToAll) {
        console.log('Applying to all selected elements:', selectedElements.length);
      }
    }
    
    // Check if we should apply to all selected elements
    const hasMultipleSelected = selectedElements.length > 1;
    
    if (hasMultipleSelected && applyToAll) {
      // Update all selected elements with the new property
      selectedElements.forEach(element => {
        const elementUpdatedProps = {
          ...element.properties,
          [propertyName]: value
        };
        updateElement(element.id, { properties: elementUpdatedProps });
      });
    } else {
      // Update just the primary selected element
      updateElement(selectedElement.id, { properties: updatedProperties });
    }
    
    // For background elements, force a re-render by re-selecting the element after a short delay
    if (selectedElement.type === 'background') {
      setTimeout(() => {
        // Get the updated element from the elements array
        const updatedElement = elements.find(el => el.id === selectedElement.id);
        if (updatedElement) {
          selectElement(updatedElement);
        }
      }, 50);
    }
  };
  
  // Create a version of handlePropertyChange that always applies to all selected elements
  const handlePropertyChangeForAll = (propertyName, value) => {
    if (!selectedElement || selectedElements.length <= 1) return;
    
    // Apply the property change to all selected elements
    selectedElements.forEach(element => {
      const elementUpdatedProps = {
        ...element.properties,
        [propertyName]: value
      };
      updateElement(element.id, { properties: elementUpdatedProps });
    });
  };

  // Handle resize change for elements that support it
  const handleResizeChange = (dimension, value) => {
    if (!selectedElement) return;
    
    // If value is empty, set to auto
    const dimensionValue = value ? `${value}px` : 'auto';
    
    // Update the element with the new dimension
    updateElement(selectedElement.id, { 
      properties: {
        ...selectedElement.properties,
        [dimension]: dimensionValue
      }
    });
  };

  // Render different property forms based on element type
  const renderPropertyFields = () => {
    const properties = selectedElement.properties || {};
    const isNarrow = propertiesPanelWidth < 200;
    const isVeryNarrow = propertiesPanelWidth < 100;
    
    // Check if multiple elements are selected
    const hasMultipleSelected = selectedElements.length > 1;
    
    // Get the types of all selected elements
    const selectedTypes = hasMultipleSelected ? 
      [...new Set(selectedElements.map(el => el.type))] : 
      [selectedElement.type];
    
    // Check if all selected elements are of the same type
    const allSameType = selectedTypes.length === 1;
    
    switch (selectedElement.type) {
      case 'canvasSettings':
        return (
          <>
            <PanelTitle>Canvas Settings</PanelTitle>
            
            <FormGroup>
              <Label>Canvas Height</Label>
              <Input
                type="text"
                value={properties.canvasHeight || 'auto'}
                onChange={(e) => handlePropertyChange('canvasHeight', e.target.value)}
                placeholder="auto, 800px, etc."
              />
              <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
                Use 'auto' for dynamic height or specify a fixed height (e.g., '800px')
              </small>
            </FormGroup>
            
            <FormGroup>
              <Label>Content Alignment</Label>
              <select
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                value={properties.contentAlignment || 'center'}
                onChange={(e) => handlePropertyChange('contentAlignment', e.target.value)}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <Label>Background Color</Label>
              <ColorInput
                type="color"
                value={properties.backgroundColor || '#ffffff'}
                onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
              />
            </FormGroup>
          </>
        );
      
      case 'text':
      case 'heading':
      case 'paragraph':
        return (
          <>
            <PanelTitle>
              Text Properties
              {hasMultipleSelected && (
                <Badge>{selectedElements.length} selected</Badge>
              )}
            </PanelTitle>
            
            {hasMultipleSelected && allSameType && (
              <div style={{ marginBottom: '15px', color: '#666' }}>
                <p>Multiple elements selected. Changes will apply to the primary element.</p>
              </div>
            )}
            
            <FormGroup isNarrow={isNarrow}>
              <Label>Font Size</Label>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Input
                  type="text"
                  value={properties.fontSize || '16px'}
                  onChange={(e) => handlePropertyChange('fontSize', e.target.value)}
                  placeholder="16px, 1.5em, etc."
                />
                {hasMultipleSelected && allSameType && (
                  <ApplyButton 
                    onClick={() => handlePropertyChangeForAll('fontSize', properties.fontSize || '16px')}
                  >
                    Apply to All Selected
                  </ApplyButton>
                )}
              </div>
            </FormGroup>
            
            <FormGroup isNarrow={isNarrow}>
              <Label>Color</Label>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ColorInput
                  type="color"
                  value={properties.color || '#000000'}
                  onChange={(e) => handlePropertyChange('color', e.target.value)}
                />
                {hasMultipleSelected && allSameType && (
                  <ApplyButton 
                    onClick={() => handlePropertyChangeForAll('color', properties.color || '#000000')}
                  >
                    Apply to All Selected
                  </ApplyButton>
                )}
              </div>
            </FormGroup>
            
            <FormGroup isNarrow={isNarrow}>
              <Label>Font Style</Label>
              <OptionGrid isNarrow={isNarrow} isVeryNarrow={isVeryNarrow}>
                {fontStyles.map((style, index) => (
                  <FontOption 
                    key={index}
                    selected={properties.fontStyle === style.style && properties.fontWeight === style.weight}
                    onClick={() => {
                      handleFontStyleSelect(style);
                      if (hasMultipleSelected && allSameType) {
                        handlePropertyChangeForAll('fontStyle', style.style);
                        handlePropertyChangeForAll('fontWeight', style.weight);
                      }
                    }}
                  >
                    {style.name}
                  </FontOption>
                ))}
              </OptionGrid>
            </FormGroup>
            
            <FormGroup isNarrow={isNarrow}>
              <Label>Font Family</Label>
              <OptionGrid isNarrow={isNarrow} isVeryNarrow={isVeryNarrow}>
                {fontFamilies.map((family, index) => (
                  <FontOption 
                    key={index}
                    selected={properties.fontFamily === family.value}
                    onClick={() => {
                      handleFontFamilySelect(family);
                      if (hasMultipleSelected && allSameType) {
                        handlePropertyChangeForAll('fontFamily', family.value);
                      }
                    }}
                    style={{ fontFamily: family.value }}
                  >
                    {family.name}
                  </FontOption>
                ))}
              </OptionGrid>
            </FormGroup>
            
            <FormGroup isNarrow={isNarrow}>
              <Label>Text Align</Label>
              <OptionGrid isNarrow={isNarrow} isVeryNarrow={isVeryNarrow}>
                {['left', 'center', 'right', 'justify'].map((align, index) => (
                  <FontOption 
                    key={index}
                    selected={properties.textAlign === align}
                    onClick={() => {
                      handlePropertyChange('textAlign', align);
                      if (hasMultipleSelected && allSameType) {
                        handlePropertyChangeForAll('textAlign', align);
                      }
                    }}
                  >
                    {align.charAt(0).toUpperCase() + align.slice(1)}
                  </FontOption>
                ))}
              </OptionGrid>
            </FormGroup>
          </>
        );
      
      case 'image':
        return <ImagePropertiesPanel element={selectedElement} />;
      
      case 'button':
        return (
          <>
            <PanelTitle>
              Button Properties
              {hasMultipleSelected && (
                <Badge>{selectedElements.length} selected</Badge>
              )}
            </PanelTitle>
            
            <FormGroup isNarrow={isNarrow}>
              <Label>Background Color</Label>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ColorInput
                  type="color"
                  value={properties.backgroundColor || '#ffffff'}
                  onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
                />
                {hasMultipleSelected && allSameType && (
                  <ApplyButton 
                    onClick={() => handlePropertyChangeForAll('backgroundColor', properties.backgroundColor || '#ffffff')}
                  >
                    Apply to All Selected
                  </ApplyButton>
                )}
              </div>
            </FormGroup>
            
            <FormGroup isNarrow={isNarrow}>
              <Label>Text Color</Label>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ColorInput
                  type="color"
                  value={properties.color || '#000000'}
                  onChange={(e) => handlePropertyChange('color', e.target.value)}
                />
                {hasMultipleSelected && allSameType && (
                  <ApplyButton 
                    onClick={() => handlePropertyChangeForAll('color', properties.color || '#000000')}
                  >
                    Apply to All Selected
                  </ApplyButton>
                )}
              </div>
            </FormGroup>
            
            <FormGroup isNarrow={isNarrow}>
              <Label>Padding</Label>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Input
                  type="text"
                  value={properties.padding || '10px'}
                  onChange={(e) => handlePropertyChange('padding', e.target.value)}
                  placeholder="e.g., 10px, 10px 20px"
                />
                {hasMultipleSelected && allSameType && (
                  <ApplyButton 
                    onClick={() => handlePropertyChangeForAll('padding', properties.padding || '10px')}
                  >
                    Apply to All Selected
                  </ApplyButton>
                )}
              </div>
            </FormGroup>
            
            <FormGroup isNarrow={isNarrow}>
              <Label>Border Radius</Label>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Input
                  type="text"
                  value={properties.borderRadius || '4px'}
                  onChange={(e) => handlePropertyChange('borderRadius', e.target.value)}
                  placeholder="e.g., 4px, 50%"
                />
                {hasMultipleSelected && allSameType && (
                  <ApplyButton 
                    onClick={() => handlePropertyChangeForAll('borderRadius', properties.borderRadius || '4px')}
                  >
                    Apply to All Selected
                  </ApplyButton>
                )}
              </div>
            </FormGroup>
          </>
        );
      
      case 'background':
        return (
          <>
            <PanelTitle>Background Properties</PanelTitle>
            
            <FormGroup isNarrow={isNarrow}>
              <Label>Background Color</Label>
              <ColorInput
                type="color"
                value={properties.backgroundColor || '#ffffff'}
                onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup isNarrow={isNarrow}>
              <Label>Height</Label>
              <Input
                type="text"
                value={properties.height?.replace('px', '') || ''}
                onChange={(e) => handleResizeChange('height', e.target.value)}
                placeholder="Height in px"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Background Image</Label>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                Choose from sample images or upload your own
              </p>
              <Input
                type="file"
                accept="image/*"
                style={{ marginBottom: '15px' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      // Find background element in the elements array
                      const backgroundElement = elements.find(element => element.type === 'background');
                      
                      if (backgroundElement) {
                        // Select the background element
                        selectElement(backgroundElement);
                        
                        // Update the background image
                        const imageUrl = event.target.result;
                        updateElement(backgroundElement.id, {
                          properties: {
                            ...backgroundElement.properties,
                            backgroundImage: `url(${imageUrl})`
                          }
                        });
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </FormGroup>
            
            <div className="sample-images">
              <Label>Sample Images</Label>
              <OptionGrid isNarrow={isNarrow} isVeryNarrow={isVeryNarrow}>
                {sampleImages.slice(0, 6).map((image, index) => (
                  <ImageOption 
                    key={index} 
                    selected={properties.backgroundImage === `url(${image})`}
                    onClick={() => handleImageSelect(image)}
                  >
                    <img src={image} alt={`Sample ${index + 1}`} />
                  </ImageOption>
                ))}
              </OptionGrid>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  // Main return for the visible panel
  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: propertiesPanelWidth + 'px',
        zIndex: 100,
        boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      {/* Resize handle */}
      <div
        style={{
          width: '10px',
          height: '100%',
          cursor: 'col-resize',
          backgroundColor: 'transparent',
          position: 'relative'
        }}
        onMouseDown={(e) => {
          const startX = e.clientX;
          const startWidth = propertiesPanelWidth;
          
          const handleMouseMove = (moveEvent) => {
            const newWidth = startWidth - (moveEvent.clientX - startX);
            // Allow for much smaller minimum width (50px) for better collapsibility
            if (newWidth >= 50 && newWidth <= 500) {
              setPropertiesPanelWidth(newWidth);
            }
          };
          
          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };
          
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      >
        <div 
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            backgroundColor: '#ddd',
            opacity: 0.5
          }}
        />
      </div>
      
      <PanelContainer isNarrow={propertiesPanelWidth < 200}>
        <PanelTitle>
          Properties
          {selectedElements.length > 1 && (
            <Badge>{selectedElements.length} selected</Badge>
          )}
        </PanelTitle>
        <CloseButton onClick={togglePropertiesPanel}>×</CloseButton>
        <ResizeHandle className="resize-handle" />
        
        {selectedElement ? (
          <>
            {/* Only show content field for elements that have content */}
            {selectedElement.type !== 'background' && (
              <FormGroup>
                <Label>Content</Label>
                {selectedElement.type === 'paragraph' ? (
                  <Textarea
                    value={selectedElement.content}
                    onChange={handleContentChange}
                    placeholder="Enter content"
                  />
                ) : (
                  <Input
                    type={selectedElement.type === 'image' ? 'url' : 'text'}
                    value={selectedElement.content}
                    onChange={handleContentChange}
                    placeholder={selectedElement.type === 'image' ? 'Image URL' : 'Enter content'}
                  />
                )}
              </FormGroup>
            )}
            
            {/* Render properties specific to the selected element type */}
            {renderPropertyFields()}
          </>
        ) : (
          <NoSelectionMessage>
            Select an element or add a new element to edit its properties
          </NoSelectionMessage>
        )}
      </PanelContainer>
    </div>
  );
};

export default PropertiesPanel;
