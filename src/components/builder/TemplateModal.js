import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useBuilderContext } from '../../context/BuilderContext';
import { saveTemplate, loadTemplates, loadTemplateById, deleteTemplate, exportTemplate, importTemplate } from '../../utils/templates';

const ModalOverlay = styled.div`
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

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const Tab = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.active ? '#f0f0f0' : 'transparent'};
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#4CAF50' : 'transparent'};
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#4CAF50' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
  
  &:hover {
    background-color: ${props => props.primary ? '#3e8e41' : '#e0e0e0'};
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const TemplateList = styled.div`
  margin-top: 20px;
`;

const TemplateCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  position: relative;
`;

const TemplateTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 18px;
`;

const TemplateDescription = styled.p`
  margin: 0 0 15px 0;
  color: #666;
  font-size: 14px;
`;

const TemplateDate = styled.div`
  font-size: 12px;
  color: #999;
`;

const TemplateActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ActionButton = styled.button`
  background-color: ${props => props.danger ? '#f44336' : '#2196F3'};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: ${props => props.danger ? '#d32f2f' : '#0b7dda'};
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  background-color: #2196F3;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #0b7dda;
  }
`;

const TemplateModal = ({ isOpen, onClose }) => {
  const { elements, setElements } = useBuilderContext();
  const [activeTab, setActiveTab] = useState('save');
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [templates, setTemplates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (isOpen && activeTab === 'load') {
      loadSavedTemplates();
    }
  }, [isOpen, activeTab]);
  
  const loadSavedTemplates = () => {
    const savedTemplates = loadTemplates();
    setTemplates(savedTemplates);
  };
  
  const handleSaveTemplate = () => {
    if (!templateName.trim()) return;
    
    setIsSubmitting(true);
    
    const result = saveTemplate(elements, templateName, templateDescription);
    
    if (result.success) {
      setTemplateName('');
      setTemplateDescription('');
      onClose();
    } else {
      alert(`Error saving template: ${result.error}`);
    }
    
    setIsSubmitting(false);
  };
  
  const handleLoadTemplate = (templateId) => {
    const template = loadTemplateById(templateId);
    
    if (template && template.elements) {
      setElements(template.elements);
      onClose();
    } else {
      alert('Error loading template');
    }
  };
  
  const handleDeleteTemplate = (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      const result = deleteTemplate(templateId);
      
      if (result.success) {
        loadSavedTemplates();
      } else {
        alert(`Error deleting template: ${result.error}`);
      }
    }
  };
  
  const handleExportTemplate = (templateId) => {
    exportTemplate(templateId);
  };
  
  const handleImportTemplate = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target.result;
        const result = importTemplate(content);
        
        if (result.success) {
          loadSavedTemplates();
          alert('Template imported successfully');
        } else {
          alert(`Error importing template: ${result.error}`);
        }
      };
      
      reader.readAsText(file);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Template Manager</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'save'} 
            onClick={() => setActiveTab('save')}
          >
            Save Template
          </Tab>
          <Tab 
            active={activeTab === 'load'} 
            onClick={() => setActiveTab('load')}
          >
            Load Template
          </Tab>
        </TabContainer>
        
        {activeTab === 'save' ? (
          <>
            <FormGroup>
              <Label>Template Name</Label>
              <Input 
                type="text" 
                value={templateName} 
                onChange={e => setTemplateName(e.target.value)}
                placeholder="Enter a name for your template"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Description (optional)</Label>
              <Textarea 
                value={templateDescription} 
                onChange={e => setTemplateDescription(e.target.value)}
                placeholder="Enter a description for your template"
              />
            </FormGroup>
            
            <Button 
              primary 
              onClick={handleSaveTemplate}
              disabled={!templateName.trim() || isSubmitting}
            >
              Save Template
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </>
        ) : (
          <>
            <div>
              <Button primary onClick={loadSavedTemplates}>Refresh Templates</Button>
              <FileInputLabel>
                Import Template
                <FileInput 
                  type="file" 
                  accept=".json" 
                  onChange={handleImportTemplate}
                />
              </FileInputLabel>
            </div>
            
            <TemplateList>
              {templates.length === 0 ? (
                <p>No saved templates found. Create a template first.</p>
              ) : (
                templates.map(template => (
                  <TemplateCard key={template.id}>
                    <TemplateTitle>{template.name}</TemplateTitle>
                    {template.description && (
                      <TemplateDescription>{template.description}</TemplateDescription>
                    )}
                    <TemplateDate>
                      Created: {new Date(template.createdAt).toLocaleDateString()}
                    </TemplateDate>
                    <TemplateActions>
                      <ActionButton onClick={() => handleLoadTemplate(template.id)}>
                        Load
                      </ActionButton>
                      <ActionButton onClick={() => handleExportTemplate(template.id)}>
                        Export
                      </ActionButton>
                      <ActionButton danger onClick={() => handleDeleteTemplate(template.id)}>
                        Delete
                      </ActionButton>
                    </TemplateActions>
                  </TemplateCard>
                ))
              )}
            </TemplateList>
          </>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default TemplateModal;
