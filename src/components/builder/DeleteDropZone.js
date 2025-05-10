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
  z-index: 100; /* Lower z-index so elements can be dropped on it */
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
    e.stopPropagation(); // Stop event propagation
    setIsActive(false);
    
    try {
      // Try to get the data from dataTransfer
      const data = e.dataTransfer.getData('application/json');
      console.log('Drop data received:', data);
      
      if (!data) {
        console.error('No data received in drop event');
        return;
      }
      
      // Try to parse the data
      let elementData;
      try {
        elementData = JSON.parse(data);
      } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
        // If parsing fails, check if we have a direct ID
        if (data && typeof data === 'string') {
          elementData = { id: data };
        }
      }
      
      console.log('Parsed element data:', elementData);
      
      if (elementData && elementData.id) {
        // Remove the element
        console.log('Removing element with ID:', elementData.id);
        removeElement(elementData.id);
        
        // Show feedback
        const feedback = document.createElement('div');
        feedback.textContent = 'Element deleted';
        feedback.style.position = 'fixed';
        feedback.style.bottom = '90px';
        feedback.style.left = '50%';
        feedback.style.transform = 'translateX(-50%)';
        feedback.style.padding = '8px 16px';
        feedback.style.backgroundColor = '#333';
        feedback.style.color = 'white';
        feedback.style.borderRadius = '4px';
        feedback.style.opacity = '0';
        feedback.style.transition = 'opacity 0.3s ease';
        feedback.style.zIndex = '9999';
        
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
      } else {
        console.error('No valid element ID found in drop data');
      }
    } catch (err) {
      console.error('Error handling dropped element:', err);
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
