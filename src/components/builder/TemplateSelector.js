import React, { useState } from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';
import { builtInTemplates } from '../../utils/builtinTemplates';

const SelectorOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const SelectorContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 900px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 20px;
`;

const SelectorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const SelectorTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const TemplateCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  ${props => props.selected && `
    border: 2px solid #3498db;
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
  `}
`;

const TemplatePreview = styled.div`
  height: 180px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TemplateInfo = styled.div`
  padding: 15px;
`;

const TemplateName = styled.h3`
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
`;

const TemplateDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#3498db' : '#f5f5f5'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: ${props => props.primary ? '#2980b9' : '#e0e0e0'};
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

// Template preview images with reliable sources
const templatePreviews = {
  'Business Website': 'https://picsum.photos/300/180?random=10',
  'Portfolio Website': 'https://picsum.photos/300/180?random=11',
  'Blog Website': 'https://picsum.photos/300/180?random=12',
  'E-commerce Website': 'https://picsum.photos/300/180?random=13',
  'Landing Page': 'https://picsum.photos/300/180?random=14'
};

const TemplateSelector = ({ isOpen, onClose }) => {
  const { setElements } = useBuilderContext();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };
  
  const handleApplyTemplate = () => {
    if (selectedTemplate) {
      // Process elements to ensure all text elements have proper resize properties
      const processedElements = selectedTemplate.elements.map(element => {
        // Clone the element to avoid modifying the original
        const processedElement = { ...element };
        
        // Ensure text-based elements have proper width and height properties
        if (['text', 'heading', 'paragraph'].includes(element.type)) {
          processedElement.properties = {
            ...processedElement.properties,
            width: processedElement.properties.width || 
                  (element.type === 'text' ? '200px' : '300px'),
            height: processedElement.properties.height || 'auto',
          };
        }
        
        return processedElement;
      });
      
      // Apply the processed template elements to the canvas
      setElements(processedElements);
      onClose();
    }
  };
  
  const handleStartFromScratch = () => {
    // Clear the canvas
    setElements([]);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <SelectorOverlay onClick={onClose}>
      <SelectorContainer onClick={e => e.stopPropagation()}>
        <SelectorHeader>
          <SelectorTitle>Choose a Template</SelectorTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </SelectorHeader>
        
        <p>Start with a pre-designed template or create your own from scratch.</p>
        
        <TemplatesGrid>
          {builtInTemplates.map((template, index) => (
            <TemplateCard 
              key={index}
              selected={selectedTemplate === template}
              onClick={() => handleTemplateSelect(template)}
            >
              <TemplatePreview>
                <PreviewImage 
                  src={templatePreviews[template.name] || 'https://picsum.photos/300/180?random=15'} 
                  alt={template.name}
                />
              </TemplatePreview>
              <TemplateInfo>
                <TemplateName>{template.name}</TemplateName>
                <TemplateDescription>{template.description}</TemplateDescription>
              </TemplateInfo>
            </TemplateCard>
          ))}
        </TemplatesGrid>
        
        <ButtonContainer>
          <Button onClick={handleStartFromScratch}>Start from Scratch</Button>
          <Button 
            primary 
            disabled={!selectedTemplate}
            onClick={handleApplyTemplate}
          >
            Use Selected Template
          </Button>
        </ButtonContainer>
      </SelectorContainer>
    </SelectorOverlay>
  );
};

export default TemplateSelector;
