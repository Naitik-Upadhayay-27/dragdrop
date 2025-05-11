import React, { useState } from 'react';
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
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
    gap: 10px;
  }
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
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
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

const SuccessMessage = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4CAF50;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: fadeInOut 3s ease-in-out forwards;
  display: flex;
  align-items: center;
  gap: 10px;
  
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, -20px); }
    15% { opacity: 1; transform: translate(-50%, 0); }
    85% { opacity: 1; transform: translate(-50%, 0); }
    100% { opacity: 0; transform: translate(-50%, -20px); }
  }
`;

const BuilderToolbar = ({ previewMode, togglePreviewMode, previewDevice, changePreviewDevice }) => {
  const { toggleTemplateModal, toggleTemplateSelector } = useBuilderContext();
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [showPublishMessage, setShowPublishMessage] = useState(false);
  
  const handleDeviceChange = (device) => {
    changePreviewDevice(device);
  };
  
  const handleSave = () => {
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };
  
  const handlePublish = () => {
    setShowPublishMessage(true);
    setTimeout(() => setShowPublishMessage(false), 3000);
  };
  
  const handleSaveAndPublish = () => {
    setShowSaveMessage(true);
    setTimeout(() => {
      setShowSaveMessage(false);
      setShowPublishMessage(true);
      setTimeout(() => setShowPublishMessage(false), 3000);
    }, 3000);
  };
  
  return (
    <ToolbarContainer>
      {showSaveMessage && (
        <SuccessMessage>
          <span>✅</span> Changes saved successfully!
        </SuccessMessage>
      )}
      
      {showPublishMessage && (
        <SuccessMessage>
          <span>🚀</span> Website published successfully!
        </SuccessMessage>
      )}
      
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
        <Button onClick={toggleTemplateSelector}>Built-in Templates</Button>
        <Button onClick={toggleTemplateModal}>My Templates</Button>
        <Button primary onClick={handleSave}>Save</Button>
        <Button onClick={handlePublish}>Publish</Button>
        <Button primary onClick={handleSaveAndPublish}>Save & Publish</Button>
      </ToolbarActions>
    </ToolbarContainer>
  );
};

export default BuilderToolbar;
