import React from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';

const PanelContainer = styled.div`
  width: 300px;
  background-color: #f5f5f5;
  border-left: 1px solid #ddd;
  padding: 15px;
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

const PropertiesPanel = () => {
  const { selectedElement, updateElement } = useBuilderContext();

  const handleContentChange = (e) => {
    updateElement(selectedElement.id, { content: e.target.value });
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
    const { properties, type } = selectedElement;

    switch (type) {
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
              <Label>Font Weight</Label>
              <Input
                type="text"
                value={properties.fontWeight}
                onChange={(e) => handlePropertyChange('fontWeight', e.target.value)}
                placeholder="e.g., normal, bold, 600"
              />
            </FormGroup>
          </>
        );
      
      case 'image':
        return (
          <>
            <FormGroup>
              <Label>Width</Label>
              <Input
                type="text"
                value={properties.width}
                onChange={(e) => handlePropertyChange('width', e.target.value)}
                placeholder="e.g., 100px, 50%"
              />
            </FormGroup>
            <FormGroup>
              <Label>Height</Label>
              <Input
                type="text"
                value={properties.height}
                onChange={(e) => handlePropertyChange('height', e.target.value)}
                placeholder="e.g., 100px, auto"
              />
            </FormGroup>
            <FormGroup>
              <Label>Alt Text</Label>
              <Input
                type="text"
                value={properties.alt}
                onChange={(e) => handlePropertyChange('alt', e.target.value)}
                placeholder="Image description"
              />
            </FormGroup>
          </>
        );
      
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
      
      default:
        return null;
    }
  };

  return (
    <PanelContainer>
      <PanelTitle>Properties</PanelTitle>
      
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
      
      {renderPropertyFields()}
    </PanelContainer>
  );
};

export default PropertiesPanel;
