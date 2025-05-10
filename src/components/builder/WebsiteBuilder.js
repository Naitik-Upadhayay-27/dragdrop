import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';
import ElementsSidebar from './ElementsSidebar';
import BuilderCanvas from './BuilderCanvas';
import PropertiesPanel from './PropertiesPanel';
import BuilderToolbar from './BuilderToolbar';
import PreviewMode from './PreviewMode';

const BuilderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const BuilderContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const WebsiteBuilder = () => {
  const [previewMode, setPreviewMode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const canvasRef = useRef(null);

  // Toggle preview mode
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  // Change preview device
  const changePreviewDevice = (device) => {
    setPreviewDevice(device);
  };



  return (
    <BuilderContainer>
      <BuilderToolbar 
        previewMode={previewMode} 
        togglePreviewMode={togglePreviewMode}
        previewDevice={previewDevice}
        changePreviewDevice={changePreviewDevice}
      />
      
      {previewMode ? (
        <PreviewMode device={previewDevice} />
      ) : (
        <BuilderContent>
          <ElementsSidebar />
          <BuilderCanvas />
          <PropertiesPanel />
        </BuilderContent>
      )}
    </BuilderContainer>
  );
};

export default WebsiteBuilder;
