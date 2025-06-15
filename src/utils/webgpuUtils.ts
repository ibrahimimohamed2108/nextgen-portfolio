
/**
 * WebGPU Detection and Capability Utilities
 */

export interface GraphicsCapabilities {
  webgpu: boolean;
  webgl2: boolean;
  webgl: boolean;
  performanceLevel: 'high' | 'medium' | 'low' | 'fallback';
}

export const detectGraphicsCapabilities = async (): Promise<GraphicsCapabilities> => {
  const capabilities: GraphicsCapabilities = {
    webgpu: false,
    webgl2: false,
    webgl: false,
    performanceLevel: 'fallback'
  };

  // Check WebGPU
  if ('gpu' in navigator) {
    try {
      const adapter = await (navigator as any).gpu.requestAdapter();
      if (adapter) {
        const device = await adapter.requestDevice();
        if (device) {
          capabilities.webgpu = true;
          capabilities.performanceLevel = 'high';
          console.log('WebGPU detected and available');
          return capabilities;
        }
      }
    } catch (error) {
      console.log('WebGPU detection failed:', error);
    }
  }

  // Check WebGL2
  try {
    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2');
    if (gl2) {
      capabilities.webgl2 = true;
      capabilities.performanceLevel = 'medium';
      console.log('WebGL2 detected');
    }
  } catch (error) {
    console.log('WebGL2 detection failed:', error);
  }

  // Check WebGL
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      capabilities.webgl = true;
      if (capabilities.performanceLevel === 'fallback') {
        capabilities.performanceLevel = 'low';
      }
      console.log('WebGL detected');
    }
  } catch (error) {
    console.log('WebGL detection failed:', error);
  }

  return capabilities;
};

export const getOptimalRenderer = (capabilities: GraphicsCapabilities): 'webgpu' | 'webgl' | 'canvas' => {
  if (capabilities.webgpu) return 'webgpu';
  if (capabilities.webgl2 || capabilities.webgl) return 'webgl';
  return 'canvas';
};
