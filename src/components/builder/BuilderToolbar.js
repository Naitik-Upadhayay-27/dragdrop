import React from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';

const ToolbarContainer = styled.div`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  
  img {
    height: 30px;
    margin-right: 10px;
  }
`;

const ToolbarActions = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#4CAF50' : 'transparent'};
  color: white;
  border: ${props => props.primary ? 'none' : '1px solid white'};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.primary ? '#3e8e41' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const DeviceToggle = styled.div`
  display: flex;
  gap: 5px;
  margin-right: 20px;
`;

const DeviceButton = styled.button`
  background-color: ${props => props.active ? '#555' : 'transparent'};
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  
  &:hover {
    background-color: #555;
  }
`;

const BuilderToolbar = ({ previewMode, togglePreviewMode, previewDevice, changePreviewDevice }) => {
  const { toggleTemplateModal } = useBuilderContext();
  
  const handleDeviceChange = (device) => {
    changePreviewDevice(device);
  };
  
  return (
    <ToolbarContainer>
      <Logo>
        <span>Websites.co.in Builder</span>
      </Logo>
      
      <ToolbarActions>
        <DeviceToggle>
          <DeviceButton 
            active={previewDevice === 'mobile'} 
            onClick={() => handleDeviceChange('mobile')}
            title="Mobile Preview"
          >
            📱
          </DeviceButton>
          <DeviceButton 
            active={previewDevice === 'tablet'} 
            onClick={() => handleDeviceChange('tablet')}
            title="Tablet Preview"
          >
            📔
          </DeviceButton>
          <DeviceButton 
            active={previewDevice === 'desktop'} 
            onClick={() => handleDeviceChange('desktop')}
            title="Desktop Preview"
          >
            🖥️
          </DeviceButton>
        </DeviceToggle>
        
        <Button onClick={togglePreviewMode}>
          {previewMode ? 'Edit Mode' : 'Preview'}
        </Button>
        <Button onClick={toggleTemplateModal}>Templates</Button>
        <Button primary>Save</Button>
        <Button>Publish</Button>
      </ToolbarActions>
    </ToolbarContainer>
  );
};

export default BuilderToolbar;
