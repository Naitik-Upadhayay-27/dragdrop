import React, { useState } from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';
import DraggableSampleImage from './DraggableSampleImage';
import ImagePropertiesPanel from '../elements/ImagePropertiesPanel';

const PanelContainer = styled.div`
  background-color: #f5f5f5;
  border-left: 1px solid #ddd;
  padding: 15px;
  width: 300px;
  height: 100%;
  overflow-y: auto;
`;

const PanelTitle = styled.h3`
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  color: #333;
`;

const NoSelectionMessage = styled.div`
  color: #999;
  font-style: italic;
  margin-top: 20px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
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
  grid-template-columns: repeat(3, 1fr);
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
  '/images/OIP (4).webp',
  '/images/OIP (5) - Copy.webp',
  '/images/OIP (6) - Copy.webp',
  '/images/OIP (7) - Copy.webp',
  '/images/OIP - Copy.jpg',
  '/images/OIP - Copy.webp',
  '/images/OIP.webp'
];

// Sample background images
const backgroundImages = [
  // Local images from public/background folder
  '/background/download (3).webp',
  '/background/download (4).webp',
  '/background/download.webp',
  '/background/OIP (1).webp',
  '/background/OIP (10).webp',
  '/background/OIP (11).webp',
  '/background/OIP (12).webp',
  '/background/OIP (2).webp',
  '/background/OIP (3).webp'
];

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
  const { selectedElement, updateElement, showPropertiesPanel } = useBuilderContext();
  const [showResizeHandles, setShowResizeHandles] = useState(false);

  const handleContentChange = (e) => {
    updateElement(selectedElement.id, { content: e.target.value });
  };
  
  // Handle image selection from sample images
  const handleImageSelect = (imageUrl) => {
    updateElement(selectedElement.id, { content: imageUrl });
  };
  
  // Handle font style selection
  const handleFontStyleSelect = (fontStyle) => {
    const updatedProperties = {
      ...selectedElement.properties,
      fontStyle: fontStyle.style,
      fontWeight: fontStyle.weight
    };
    updateElement(selectedElement.id, { properties: updatedProperties });
  };
  
  // Handle font family selection
  const handleFontFamilySelect = (fontFamily) => {
    const updatedProperties = {
      ...selectedElement.properties,
      fontFamily: fontFamily.value
    };
    updateElement(selectedElement.id, { properties: updatedProperties });
  };
  
  // Handle manual resize
  const handleResizeChange = (dimension, value) => {
    // Ensure value is a valid number
    const numValue = parseInt(value);
    if (isNaN(numValue)) return;
    
    const updatedProperties = {
      ...selectedElement.properties
    };
    
    // Add px unit if not already present
    updatedProperties[dimension] = value.includes('px') ? value : `${value}px`;
    
    updateElement(selectedElement.id, { properties: updatedProperties });
  };

  const handlePropertyChange = (property, value) => {
    const updatedProperties = {
      ...selectedElement.properties,
      [property]: value
    };
    updateElement(selectedElement.id, { properties: updatedProperties });
  };

  if (!selectedElement) {
    return (
      <PanelContainer>
        <PanelTitle>Properties</PanelTitle>
        <NoSelectionMessage>
          Select an element to edit its properties
        </NoSelectionMessage>
      </PanelContainer>
    );
  }

  // Render different property forms based on element type
  const renderPropertyFields = () => {
    if (!selectedElement) return null;
    
    const properties = selectedElement.properties || {};
    
    switch (selectedElement.type) {
      case 'text':
      case 'heading':
      case 'paragraph':
        return (
          <>
            <FormGroup>
              <Label>Font Size</Label>
              <Input
                type="text"
                value={properties.fontSize}
                onChange={(e) => handlePropertyChange('fontSize', e.target.value)}
                placeholder="e.g., 16px, 1.5rem"
              />
            </FormGroup>
            <FormGroup>
              <Label>Color</Label>
              <ColorInput
                type="color"
                value={properties.color}
                onChange={(e) => handlePropertyChange('color', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Font Style</Label>
              <OptionGrid>
                {fontStyles.map((style, index) => (
                  <FontOption 
                    key={index}
                    selected={properties.fontStyle === style.style && properties.fontWeight === style.weight}
                    onClick={() => handleFontStyleSelect(style)}
                  >
                    {style.name}
                  </FontOption>
                ))}
              </OptionGrid>
            </FormGroup>
            <FormGroup>
              <Label>Font Family</Label>
              <OptionGrid>
                {fontFamilies.map((family, index) => (
                  <FontOption 
                    key={index}
                    selected={properties.fontFamily === family.value}
                    onClick={() => handleFontFamilySelect(family)}
                    style={{ fontFamily: family.value }}
                  >
                    {family.name}
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
            <FormGroup>
              <Label>Background Color</Label>
              <ColorInput
                type="color"
                value={properties.backgroundColor}
                onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Text Color</Label>
              <ColorInput
                type="color"
                value={properties.color}
                onChange={(e) => handlePropertyChange('color', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Padding</Label>
              <Input
                type="text"
                value={properties.padding}
                onChange={(e) => handlePropertyChange('padding', e.target.value)}
                placeholder="e.g., 10px, 10px 20px"
              />
            </FormGroup>
            <FormGroup>
              <Label>Border Radius</Label>
              <Input
                type="text"
                value={properties.borderRadius}
                onChange={(e) => handlePropertyChange('borderRadius', e.target.value)}
                placeholder="e.g., 4px, 50%"
              />
            </FormGroup>
          </>
        );
      
      case 'background':
        return (
          <>
            <FormGroup>
              <Label>Background Color</Label>
              <ColorInput
                type="color"
                value={properties.backgroundColor || '#f5f5f5'}
                onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
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
                      handlePropertyChange('backgroundImage', event.target.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <OptionGrid>
                {backgroundImages.map((imageUrl, index) => (
                  <DraggableSampleImage
                    key={index}
                    imageUrl={imageUrl}
                    selected={selectedElement.properties.backgroundImage === imageUrl}
                    onClick={() => handlePropertyChange('backgroundImage', imageUrl)}
                  />
                ))}
              </OptionGrid>
            </FormGroup>
            <FormGroup>
              <Label>Background Size</Label>
              <Input
                as="select"
                value={properties.backgroundSize || 'cover'}
                onChange={(e) => handlePropertyChange('backgroundSize', e.target.value)}
              >
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
                <option value="auto">Auto</option>
                <option value="100% 100%">Stretch</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Background Position</Label>
              <Input
                as="select"
                value={properties.backgroundPosition || 'center'}
                onChange={(e) => handlePropertyChange('backgroundPosition', e.target.value)}
              >
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="top left">Top Left</option>
                <option value="top right">Top Right</option>
                <option value="bottom left">Bottom Left</option>
                <option value="bottom right">Bottom Right</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Background Repeat</Label>
              <Input
                as="select"
                value={properties.backgroundRepeat || 'no-repeat'}
                onChange={(e) => handlePropertyChange('backgroundRepeat', e.target.value)}
              >
                <option value="no-repeat">No Repeat</option>
                <option value="repeat">Repeat</option>
                <option value="repeat-x">Repeat Horizontally</option>
                <option value="repeat-y">Repeat Vertically</option>
              </Input>
            </FormGroup>

            {/* Opacity Settings */}
            <FormGroup>
              <Label>Opacity ({properties.opacity || '1'})</Label>
              <Input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={properties.opacity || '1'}
                onChange={(e) => handlePropertyChange('opacity', e.target.value)}
              />
            </FormGroup>

            {/* Overlay Settings */}
            <FormGroup>
              <Label>Overlay Color</Label>
              <ColorInput
                type="color"
                value={properties.overlayColor?.replace('rgba', 'rgb').replace(/,\s*[\d.]+\)/, ')') || '#000000'}
                onChange={(e) => {
                  const color = e.target.value;
                  const opacity = properties.overlayOpacity || '0.5'; // Use 0.5 as default if none set
                  const rgba = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`;
                  
                  // Update both properties to ensure they stay in sync
                  handlePropertyChange('overlayColor', rgba);
                  handlePropertyChange('overlayOpacity', opacity);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Overlay Opacity ({properties.overlayOpacity || '0'})</Label>
              <Input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={properties.overlayOpacity || '0'}
                onChange={(e) => {
                  const newOpacity = e.target.value;
                  // Update the opacity property
                  handlePropertyChange('overlayOpacity', newOpacity);
                  
                  // Also update the overlayColor with the new opacity
                  if (properties.overlayColor) {
                    let color = properties.overlayColor;
                    
                    // If it's a hex color, convert it to rgba
                    if (color.startsWith('#')) {
                      const r = parseInt(color.slice(1, 3), 16);
                      const g = parseInt(color.slice(3, 5), 16);
                      const b = parseInt(color.slice(5, 7), 16);
                      color = `rgba(${r}, ${g}, ${b}, ${newOpacity})`;
                    } 
                    // If it's already rgba, just update the opacity part
                    else if (color.startsWith('rgba')) {
                      color = color.replace(/[\d.]+\)$/, `${newOpacity})`);
                    }
                    // If it's rgb, convert to rgba
                    else if (color.startsWith('rgb')) {
                      color = color.replace('rgb', 'rgba').replace(')', `, ${newOpacity})`);
                    }
                    
                    handlePropertyChange('overlayColor', color);
                  } else {
                    // If no color is set, create a default black with opacity
                    handlePropertyChange('overlayColor', `rgba(0, 0, 0, ${newOpacity})`);
                  }
                }}
              />
            </FormGroup>

            {/* Effects Settings */}
            <PanelTitle style={{ marginTop: '20px' }}>Effects</PanelTitle>
            
            <FormGroup>
              <Label>Blur ({properties.blur?.replace('px', '') || '0'}px)</Label>
              <Input
                type="range"
                min="0"
                max="20"
                value={properties.blur?.replace('px', '') || '0'}
                onChange={(e) => handlePropertyChange('blur', `${e.target.value}px`)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Grayscale ({properties.grayscale?.replace('%', '') || '0'}%)</Label>
              <Input
                type="range"
                min="0"
                max="100"
                value={properties.grayscale?.replace('%', '') || '0'}
                onChange={(e) => handlePropertyChange('grayscale', `${e.target.value}%`)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Sepia ({properties.sepia?.replace('%', '') || '0'}%)</Label>
              <Input
                type="range"
                min="0"
                max="100"
                value={properties.sepia?.replace('%', '') || '0'}
                onChange={(e) => handlePropertyChange('sepia', `${e.target.value}%`)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Hue Rotate ({properties.hueRotate?.replace('deg', '') || '0'}°)</Label>
              <Input
                type="range"
                min="0"
                max="360"
                value={properties.hueRotate?.replace('deg', '') || '0'}
                onChange={(e) => handlePropertyChange('hueRotate', `${e.target.value}deg`)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Contrast ({properties.contrast?.replace('%', '') || '100'}%)</Label>
              <Input
                type="range"
                min="0"
                max="200"
                value={properties.contrast?.replace('%', '') || '100'}
                onChange={(e) => handlePropertyChange('contrast', `${e.target.value}%`)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Brightness ({properties.brightness?.replace('%', '') || '100'}%)</Label>
              <Input
                type="range"
                min="0"
                max="200"
                value={properties.brightness?.replace('%', '') || '100'}
                onChange={(e) => handlePropertyChange('brightness', `${e.target.value}%`)}
              />
            </FormGroup>
          </>
        );
      
      
      default:
        return null;
    }
  };

  return (
    <PanelContainer>
      <PanelTitle>Properties</PanelTitle>
      
      {selectedElement && (
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
      )}
      
      {!selectedElement && showPropertiesPanel && (
        <NoSelectionMessage>
          Select an element or add a new element to edit its properties
        </NoSelectionMessage>
      )}
      
      {!selectedElement && !showPropertiesPanel && (
        <NoSelectionMessage>
          Select an element to edit its properties
        </NoSelectionMessage>
      )}
    </PanelContainer>
  );
};

export default PropertiesPanel;
