/**
 * Utility functions for responsive design
 */

// Device breakpoints
export const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

// Media query helper
export const mediaQuery = {
  mobile: `@media (max-width: ${breakpoints.tablet - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px)`,
};

// Get current device type based on window width
export const getCurrentDevice = () => {
  if (typeof window === 'undefined') return 'desktop'; // Default for SSR
  
  const width = window.innerWidth;
  
  if (width < breakpoints.tablet) {
    return 'mobile';
  } else if (width < breakpoints.desktop) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

// Convert element position to responsive values
export const getResponsivePosition = (position, device) => {
  // Base position
  let responsivePosition = { ...position };
  
  // Adjust based on device
  switch (device) {
    case 'mobile':
      // Scale down for mobile
      responsivePosition.x = position.x * 0.5;
      responsivePosition.y = position.y * 0.8;
      break;
    case 'tablet':
      // Slight adjustment for tablet
      responsivePosition.x = position.x * 0.7;
      responsivePosition.y = position.y * 0.9;
      break;
    default:
      // Desktop uses original position
      break;
  }
  
  return responsivePosition;
};

// Convert CSS values to be responsive
export const getResponsiveValue = (value, property, device) => {
  // If not a string (e.g., already processed), return as is
  if (typeof value !== 'string') return value;
  
  // Check if value is a pixel value
  if (value.endsWith('px')) {
    const numValue = parseInt(value);
    
    // Adjust based on device and property
    switch (device) {
      case 'mobile':
        // Font sizes and dimensions are smaller on mobile
        if (property.includes('font') || property.includes('width') || property.includes('height')) {
          return `${Math.max(numValue * 0.8, 10)}px`;
        }
        break;
      case 'tablet':
        // Slight adjustment for tablet
        if (property.includes('font') || property.includes('width') || property.includes('height')) {
          return `${Math.max(numValue * 0.9, 12)}px`;
        }
        break;
      default:
        // Desktop uses original value
        break;
    }
  }
  
  // Return original value if no adjustments needed
  return value;
};

// Apply responsive styles to an element's properties
export const getResponsiveStyles = (properties, device) => {
  if (!properties) return {};
  
  const responsiveProperties = {};
  
  Object.entries(properties).forEach(([key, value]) => {
    responsiveProperties[key] = getResponsiveValue(value, key, device);
  });
  
  return responsiveProperties;
};
