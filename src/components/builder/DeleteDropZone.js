import React, { useState } from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';

const DropZoneContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) ${props => props.isActive ? 'scale(1.2)' : 'scale(1)'};
  width: 200px;
  height: 60px;
  border-radius: 8px;
  background-color: ${props => props.isActive ? '#f44336' : 'rgba(0, 0, 0, 0.7)'};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1000;
  color: white;
  font-size: 16px;
  border: 2px dashed ${props => props.isActive ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  
  &:hover {
    background-color: #f44336;
    border-color: white;
  }
  
  ${props => props.isActive && `
    box-shadow: 0 4px 20px rgba(244, 67, 54, 0.4);
  `}
`;

const TrashIcon = styled.div`
  width: 24px;
  height: 24px;
  color: white;
  margin-right: 8px;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const DropZoneText = styled.span`
  font-weight: 500;
  white-space: nowrap;
`;

const DeleteDropZone = () => {
  const { removeElement } = useBuilderContext();
  const [isActive, setIsActive] = useState(false);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsActive(true);
  };
  
  const handleDragLeave = () => {
    setIsActive(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsActive(false);
    
    try {
      const data = e.dataTransfer.getData('text/plain');
      const elementData = JSON.parse(data);
      
      if (elementData && elementData.id) {
        // Remove the element
        removeElement(elementData.id);
        
        // Show feedback
        const feedback = document.createElement('div');
        feedback.textContent = 'Element deleted';
        feedback.style.position = 'fixed';
        feedback.style.bottom = '90px';
        feedback.style.right = '20px';
        feedback.style.padding = '8px 16px';
        feedback.style.backgroundColor = '#333';
        feedback.style.color = 'white';
        feedback.style.borderRadius = '4px';
        feedback.style.opacity = '0';
        feedback.style.transition = 'opacity 0.3s ease';
        
        document.body.appendChild(feedback);
        
        // Show and then fade out
        setTimeout(() => {
          feedback.style.opacity = '1';
          
          setTimeout(() => {
            feedback.style.opacity = '0';
            
            setTimeout(() => {
              document.body.removeChild(feedback);
            }, 300);
          }, 1500);
        }, 10);
      }
    } catch (err) {
      console.error('Error parsing dropped element data for deletion:', err);
    }
  };
  
  return (
    <DropZoneContainer 
      isActive={isActive}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <TrashIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>
      </TrashIcon>
      <DropZoneText>{isActive ? 'Release to Delete' : 'Drop Here to Delete'}</DropZoneText>
    </DropZoneContainer>
  );
};

export default DeleteDropZone;
