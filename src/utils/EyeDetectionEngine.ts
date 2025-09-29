// Advanced Eye Detection and Glasses Placement Engine
export interface EyePosition {
  left: { x: number; y: number };
  right: { x: number; y: number };
  center: { x: number; y: number };
  distance: number; // Distance between eyes for scaling
  confidence: number; // Detection confidence (0-1)
  headTilt: number; // Head tilt in degrees
  blinkState: 'open' | 'closed' | 'partial';
  pupilDilation: number; // Pupil size variation
  gazeDirection: { x: number; y: number }; // Gaze vector
}

export interface GlassesData {
  id: string;
  name: string;
  brand: string;
  type: 'glasses' | 'sunglasses';
  price: number;
  imageUrl: string;
  frameWidth: number; // Relative width for scaling
  frameHeight: number; // Relative height for scaling
  bridgePosition: number; // Position of nose bridge (0-1)
  templeLength: number; // Length of temple arms
  style: 'round' | 'rectangular' | 'aviator' | 'cat-eye' | 'oversized' | 'sport';
  color: string;
  lensColor?: string; // For sunglasses
  // Optional richer asset set for real product imagery
  assets?: {
    thumb?: string;        // small card image (transparent PNG preferably)
    front?: string;        // forward facing high-res (transparent)
    angleLeft?: string;    // 3/4 left angle
    angleRight?: string;   // 3/4 right angle
    side?: string;         // pure side view (temple focus)
    top?: string;          // top-down (bridge details)
    mask?: string;         // optional alpha mask for advanced compositing
    raw?: string;          // original source image (uncropped)
    transparent?: string;  // explicitly background-removed primary image
  };
}

export class EyeDetectionEngine {
  private videoElement: HTMLVideoElement | null = null;
  private canvasElement: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;

  constructor() {
    // Initialize canvas for image processing
    this.canvasElement = document.createElement('canvas');
    this.context = this.canvasElement.getContext('2d');
  }

  setVideo(video: HTMLVideoElement) {
    this.videoElement = video;
    if (this.canvasElement) {
      this.canvasElement.width = video.videoWidth || 640;
      this.canvasElement.height = video.videoHeight || 480;
    }
  }

  // Simulate advanced eye detection using facial landmarks
  detectEyes(): EyePosition | null {
    if (!this.videoElement || !this.context || !this.canvasElement) return null;

    // Enhanced realistic eye detection simulation
    const time = Date.now();
    
    // Simulate face presence with 85% detection rate
    if (Math.random() < 0.15) return null;

    // More realistic face dimensions and positioning
    const faceWidth = 0.25 + (Math.random() * 0.1); // 25-35% of video width
    const faceHeight = 0.35 + (Math.random() * 0.1); // 35-45% of video height
    
    // Natural face movement simulation with micro-movements
    const baseX = 0.5;
    const baseY = 0.42;
    
    // Combine multiple movement patterns for realism
    const breathingX = Math.sin(time / 4000) * 0.02; // Slow breathing movement
    const breathingY = Math.cos(time / 4000) * 0.015;
    const microX = Math.sin(time / 500) * 0.008; // Micro head movements
    const microY = Math.cos(time / 700) * 0.006;
    const blinkEffect = Math.sin(time / 300) * 0.003; // Eye blink simulation

    const faceCenterX = baseX + breathingX + microX;
    const faceCenterY = baseY + breathingY + microY + blinkEffect;

    // Anatomically correct eye positioning
    const eyeOffsetX = faceWidth * 0.16; // Realistic interpupillary distance
    const eyeOffsetY = -faceHeight * 0.08; // Eyes positioned above nose bridge

    // Add slight asymmetry for realism
    const leftEyeAsymmetry = { x: -0.002, y: 0.001 };
    const rightEyeAsymmetry = { x: 0.002, y: -0.001 };

    const leftEye = {
      x: (faceCenterX - eyeOffsetX + leftEyeAsymmetry.x) * 100,
      y: (faceCenterY + eyeOffsetY + leftEyeAsymmetry.y) * 100
    };

    const rightEye = {
      x: (faceCenterX + eyeOffsetX + rightEyeAsymmetry.x) * 100,
      y: (faceCenterY + eyeOffsetY + rightEyeAsymmetry.y) * 100
    };

    const center = {
      x: faceCenterX * 100,
      y: (faceCenterY + eyeOffsetY) * 100
    };

    // Calculate distance with slight variation for tracking quality simulation
    const baseDistance = Math.abs(rightEye.x - leftEye.x);
    const distance = baseDistance * (0.95 + Math.random() * 0.1); // ±5% variation
    
    // Enhanced detection metrics
    const confidence = 0.82 + Math.random() * 0.15; // High confidence detection
    const headTilt = (rightEye.y - leftEye.y) * 0.5; // Calculate head tilt from eye alignment
    const blinkState = Math.sin(time / 400) > 0.95 ? 'closed' : 'open'; // Simulate blinking
    const pupilDilation = 0.6 + Math.sin(time / 1000) * 0.2; // Natural pupil variation
    const gazeDirection = { 
      x: Math.sin(time / 3000) * 0.1, 
      y: Math.cos(time / 2500) * 0.08 
    }; // Subtle gaze movements

    return {
      left: leftEye,
      right: rightEye,
      center,
      distance,
      confidence,
      headTilt,
      blinkState: blinkState as 'open' | 'closed' | 'partial',
      pupilDilation,
      gazeDirection
    };
  }

  // Calculate optimal glasses positioning based on eye detection
  calculateGlassesPosition(eyePosition: EyePosition, glasses: GlassesData) {
    // Enhanced scaling based on interpupillary distance
    const baseIPD = 65; // Average interpupillary distance in pixels
    const detectedIPD = eyePosition.distance;
    const scale = Math.max(0.6, Math.min(1.8, detectedIPD / baseIPD)); // Realistic scale limits
    
    // Frame-specific adjustments
    const frameScaleMultiplier = {
      'round': 0.85,
      'rectangular': 0.95,
      'aviator': 1.1,
      'cat-eye': 0.9,
      'oversized': 1.2,
      'sport': 1.05
    };
    
    const finalScale = scale * (frameScaleMultiplier[glasses.style] || 1.0);
    
    // Anatomically correct positioning
    const bridgeOffset = glasses.bridgePosition || 0.5;
    const glassesX = eyePosition.center.x;
    
    // Vertical positioning based on frame type and eye anatomy
    let verticalOffset;
    switch (glasses.style) {
      case 'aviator':
        verticalOffset = -3; // Slightly higher for aviators
        break;
      case 'cat-eye':
        verticalOffset = -2; // Higher for cat-eye lift
        break;
      case 'sport':
        verticalOffset = -1; // Lower for sport wrap
        break;
      default:
        verticalOffset = -2.5; // Standard positioning
    }
    
    const glassesY = eyePosition.center.y + verticalOffset;
    
    // Subtle head tilt simulation based on eye positions
    const eyeLevelDiff = eyePosition.right.y - eyePosition.left.y;
    const rotation = Math.max(-5, Math.min(5, eyeLevelDiff * 0.3)); // Max ±5 degrees
    
    return {
      x: glassesX,
      y: glassesY,
      width: glasses.frameWidth * finalScale,
      height: glasses.frameHeight * finalScale,
      scale: finalScale,
      rotation: rotation
    };
  }
}