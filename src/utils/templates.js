/**
 * Utility functions for template management
 */

// Save the current builder state as a template
export const saveTemplate = (elements, name, description = '') => {
  try {
    // Get existing templates from localStorage
    const existingTemplatesJSON = localStorage.getItem('website_templates');
    const existingTemplates = existingTemplatesJSON ? JSON.parse(existingTemplatesJSON) : [];
    
    // Create new template object
    const newTemplate = {
      id: `template-${Date.now()}`,
      name,
      description,
      elements,
      createdAt: new Date().toISOString(),
    };
    
    // Add new template to the list
    const updatedTemplates = [...existingTemplates, newTemplate];
    
    // Save updated templates to localStorage
    localStorage.setItem('website_templates', JSON.stringify(updatedTemplates));
    
    return {
      success: true,
      templateId: newTemplate.id,
    };
  } catch (error) {
    console.error('Error saving template:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Load all saved templates
export const loadTemplates = () => {
  try {
    const templatesJSON = localStorage.getItem('website_templates');
    return templatesJSON ? JSON.parse(templatesJSON) : [];
  } catch (error) {
    console.error('Error loading templates:', error);
    return [];
  }
};

// Load a specific template by ID
export const loadTemplateById = (templateId) => {
  try {
    const templates = loadTemplates();
    return templates.find(template => template.id === templateId);
  } catch (error) {
    console.error('Error loading template by ID:', error);
    return null;
  }
};

// Delete a template by ID
export const deleteTemplate = (templateId) => {
  try {
    const templates = loadTemplates();
    const updatedTemplates = templates.filter(template => template.id !== templateId);
    localStorage.setItem('website_templates', JSON.stringify(updatedTemplates));
    
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting template:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Export template as JSON file
export const exportTemplate = (templateId) => {
  try {
    const template = loadTemplateById(templateId);
    
    if (!template) {
      throw new Error('Template not found');
    }
    
    const dataStr = JSON.stringify(template, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `${template.name.replace(/\s+/g, '-').toLowerCase()}-template.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error exporting template:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Import template from JSON file
export const importTemplate = (fileContent) => {
  try {
    const template = JSON.parse(fileContent);
    
    // Validate template structure
    if (!template.elements || !template.name) {
      throw new Error('Invalid template format');
    }
    
    // Get existing templates
    const templates = loadTemplates();
    
    // Create new template with a new ID
    const newTemplate = {
      ...template,
      id: `template-${Date.now()}`,
      importedAt: new Date().toISOString(),
    };
    
    // Add to templates and save
    templates.push(newTemplate);
    localStorage.setItem('website_templates', JSON.stringify(templates));
    
    return {
      success: true,
      templateId: newTemplate.id,
    };
  } catch (error) {
    console.error('Error importing template:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
