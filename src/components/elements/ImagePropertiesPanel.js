import React, { useState } from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';
import ImageSearch from './ImageSearch';

const PanelContainer = styled.div`
  padding: 15px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const PanelTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
`;

const PropertyGroup = styled.div`
  margin-bottom: 15px;
`;

const PropertyLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
`;

const PropertyInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }
`;

const TabContainer = styled.div`
  margin-bottom: 15px;
`;

const TabButtons = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
`;

const TabButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.active ? '#f5f5f5' : 'transparent'};
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#2196F3' : 'transparent'};
  color: ${props => props.active ? '#2196F3' : '#555'};
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:focus {
    outline: none;
  }
`;

const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
`;

const ImagePropertiesPanel = ({ element }) => {
  const { updateElement } = useBuilderContext();
  const [activeTab, setActiveTab] = useState('properties');
  
  const handlePropertyChange = (property, value) => {
    const updatedProperties = {
      ...element.properties,
      [property]: value
    };
    
    updateElement(element.id, { properties: updatedProperties });
  };
  
  return (
    <PanelContainer>
      <PanelTitle>Image Properties</PanelTitle>
      
      <TabContainer>
        <TabButtons>
          <TabButton 
            active={activeTab === 'properties'} 
            onClick={() => setActiveTab('properties')}
          >
            Properties
          </TabButton>
          <TabButton 
            active={activeTab === 'search'} 
            onClick={() => setActiveTab('search')}
          >
            Search Images
          </TabButton>
        </TabButtons>
        
        <TabContent active={activeTab === 'properties'}>
          <PropertyGroup>
            <PropertyLabel>Image URL</PropertyLabel>
            <PropertyInput
              type="text"
              value={element.content || ''}
              onChange={(e) => updateElement(element.id, { content: e.target.value })}
              placeholder="Enter image URL..."
            />
          </PropertyGroup>
          
          <PropertyGroup>
            <PropertyLabel>Alt Text</PropertyLabel>
            <PropertyInput
              type="text"
              value={element.properties?.alt || ''}
              onChange={(e) => handlePropertyChange('alt', e.target.value)}
              placeholder="Enter alt text..."
            />
          </PropertyGroup>
          
          <PropertyGroup>
            <PropertyLabel>Width</PropertyLabel>
            <PropertyInput
              type="text"
              value={element.properties?.width || ''}
              onChange={(e) => handlePropertyChange('width', e.target.value)}
              placeholder="e.g., 300px or 100%"
            />
          </PropertyGroup>
          
          <PropertyGroup>
            <PropertyLabel>Height</PropertyLabel>
            <PropertyInput
              type="text"
              value={element.properties?.height || ''}
              onChange={(e) => handlePropertyChange('height', e.target.value)}
              placeholder="e.g., 200px or auto"
            />
          </PropertyGroup>
          
          <PropertyGroup>
            <PropertyLabel>Border Radius</PropertyLabel>
            <PropertyInput
              type="text"
              value={element.properties?.borderRadius || ''}
              onChange={(e) => handlePropertyChange('borderRadius', e.target.value)}
              placeholder="e.g., 4px or 50%"
            />
          </PropertyGroup>
          
          <PropertyGroup>
            <PropertyLabel>Object Fit</PropertyLabel>
            <PropertyInput
              type="text"
              value={element.properties?.objectFit || ''}
              onChange={(e) => handlePropertyChange('objectFit', e.target.value)}
              placeholder="e.g., cover, contain, fill"
            />
          </PropertyGroup>
        </TabContent>
        
        <TabContent active={activeTab === 'search'}>
          <ImageSearch />
        </TabContent>
      </TabContainer>
    </PanelContainer>
  );
};

export default ImagePropertiesPanel;
