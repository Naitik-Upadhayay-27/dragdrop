/**
 * Utility functions for responsive design
 */

// Device breakpoints
export const DEVICE_SIZES = {
  mobile: {
    width: 375,
    height: 667
  },
  tablet: {
    width: 768,
    height: 1024
  },
  desktop: {
    width: 1280,
    height: 800
  }
};

// Scale factor for different devices
export const SCALE_FACTORS = {
  mobile: 0.5,
  tablet: 0.75,
  desktop: 1
};

// Calculate scaled position for responsive view
export const getScaledPosition = (position, device) => {
  const scaleFactor = SCALE_FACTORS[device] || 1;
  
  return {
    x: position.x * scaleFactor,
    y: position.y * scaleFactor
  };
};

// Calculate scaled dimensions for responsive view
export const getScaledDimensions = (width, height, device) => {
  const scaleFactor = SCALE_FACTORS[device] || 1;
  
  return {
    width: width * scaleFactor,
    height: height * scaleFactor
  };
};

// Convert CSS value to number (remove px, rem, etc.)
export const cssValueToNumber = (value) => {
  if (typeof value !== 'string') return value;
  
  return parseFloat(value.replace(/[^\d.-]/g, ''));
};

// Scale CSS property value based on device
export const scalePropertyValue = (property, value, device) => {
  // Properties that should be scaled
  const scalableProperties = [
    'width', 'height', 'top', 'left', 'right', 'bottom',
    'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'font-size', 'line-height', 'border-radius', 'border-width'
  ];
  
  // Check if property should be scaled
  const shouldScale = scalableProperties.some(prop => 
    property.toLowerCase().includes(prop.toLowerCase())
  );
  
  if (!shouldScale) return value;
  
  // Get scale factor for device
  const scaleFactor = SCALE_FACTORS[device] || 1;
  
  // Handle string values with units
  if (typeof value === 'string') {
    // Extract number and unit
    const match = value.match(/^([-\d.]+)([a-z%]*)$/);
    
    if (match) {
      const num = parseFloat(match[1]);
      const unit = match[2];
      
      // Scale the number and keep the unit
      return `${(num * scaleFactor).toFixed(2)}${unit}`;
    }
  }
  
  // Handle number values
  if (typeof value === 'number') {
    return value * scaleFactor;
  }
  
  // Return original value if can't scale
  return value;
};

// Scale all properties in an object based on device
export const scaleProperties = (properties, device) => {
  if (!properties) return {};
  
  const scaledProperties = {};
  
  Object.entries(properties).forEach(([key, value]) => {
    scaledProperties[key] = scalePropertyValue(key, value, device);
  });
  
  return scaledProperties;
};

// Get viewport size for device preview
export const getViewportSize = (device) => {
  return DEVICE_SIZES[device] || DEVICE_SIZES.desktop;
};

// Check if current view is mobile
export const isMobileView = () => {
  return window.innerWidth <= DEVICE_SIZES.mobile.width;
};

// Check if current view is tablet
export const isTabletView = () => {
  return window.innerWidth > DEVICE_SIZES.mobile.width && 
         window.innerWidth <= DEVICE_SIZES.tablet.width;
};

// Get current device based on window size
export const getCurrentDevice = () => {
  if (isMobileView()) return 'mobile';
  if (isTabletView()) return 'tablet';
  return 'desktop';
};
