
/**
 * Utility functions for WebGL detection and handling
 */

export const isWebGLAvailable = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!context;
  } catch (e) {
    return false;
  }
};

export const getWebGLErrorMessage = (): string => {
  return `
    Your browser does not support WebGL or it has been disabled.
    
    To enable 3D features, please:
    • Update your browser to the latest version
    • Enable hardware acceleration in your browser settings
    • Make sure WebGL is not blocked by extensions
    • Try using a different browser (Chrome, Firefox, Safari, Edge)
    
    You can still use the 2D version of the portfolio.
  `;
};
