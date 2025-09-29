import { useState, useRef, useEffect, useCallback } from "react";
import { GLASSES_DATASET } from "@/utils/GlassesDataset";

interface FrameItem {
  id: string;
  name: string;
  brand: string;
  type: 'glasses' | 'sunglasses';
  price: number;
  style: string;
  frameColor?: string;
  svg?: string; // inline demo
  imageUrl?: string; // dataset image
  lensColor?: string;
}
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Glasses, Sun, Eye, Target, Zap, RefreshCw } from "lucide-react";

// Inline demo frames (SVG) – will be unified with image-based dataset
const GLASSES_COLLECTION: FrameItem[] = [
  {
    id: 'ray-ban-clubmaster',
    name: 'Clubmaster Classic',
    brand: 'Ray-Ban',
    type: 'glasses' as const,
    price: 163.00,
    style: 'round',
    frameColor: '#2B2B2B',
    svg: `<svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4A4A4A"/>
          <stop offset="100%" style="stop-color:#2B2B2B"/>
        </linearGradient>
      </defs>
      <!-- Left lens -->
      <circle cx="85" cy="60" r="45" fill="rgba(200,220,255,0.1)" stroke="url(#frameGrad)" stroke-width="4"/>
      <!-- Right lens -->
      <circle cx="215" cy="60" r="45" fill="rgba(200,220,255,0.1)" stroke="url(#frameGrad)" stroke-width="4"/>
      <!-- Bridge -->
      <path d="M130 60 Q150 55 170 60" stroke="url(#frameGrad)" stroke-width="3" fill="none"/>
      <!-- Left temple -->
      <line x1="40" y1="45" x2="10" y2="40" stroke="url(#frameGrad)" stroke-width="3"/>
      <!-- Right temple -->
      <line x1="260" y1="45" x2="290" y2="40" stroke="url(#frameGrad)" stroke-width="3"/>
    </svg>`
  },
  {
    id: 'ray-ban-aviator',
    name: 'Aviator Classic',
    brand: 'Ray-Ban',
    type: 'sunglasses' as const,
    price: 154.00,
    style: 'aviator',
    frameColor: '#DAA520',
    svg: `<svg viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD700"/>
          <stop offset="100%" style="stop-color:#DAA520"/>
        </linearGradient>
        <linearGradient id="lensGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,50,0,0.8)"/>
          <stop offset="100%" style="stop-color:rgba(0,20,0,0.9)"/>
        </linearGradient>
      </defs>
      <!-- Left lens -->
      <ellipse cx="90" cy="70" rx="50" ry="40" fill="url(#lensGrad)" stroke="url(#goldGrad)" stroke-width="3"/>
      <!-- Right lens -->
      <ellipse cx="230" cy="70" rx="50" ry="40" fill="url(#lensGrad)" stroke="url(#goldGrad)" stroke-width="3"/>
      <!-- Bridge -->
      <path d="M140 65 Q160 60 180 65" stroke="url(#goldGrad)" stroke-width="2" fill="none"/>
      <!-- Left temple -->
      <line x1="40" y1="60" x2="5" y2="55" stroke="url(#goldGrad)" stroke-width="2"/>
      <!-- Right temple -->
      <line x1="280" y1="60" x2="315" y2="55" stroke="url(#goldGrad)" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'warby-parker-winston',
    name: 'Winston Tortoise',
    brand: 'Warby Parker',
    type: 'glasses' as const,
    price: 95.00,
    style: 'rectangular',
    frameColor: '#8B4513',
    svg: `<svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="tortoise" patternUnits="userSpaceOnUse" width="10" height="10">
          <rect width="10" height="10" fill="#8B4513"/>
          <circle cx="3" cy="3" r="1.5" fill="#A0522D"/>
          <circle cx="7" cy="7" r="1" fill="#CD853F"/>
        </pattern>
      </defs>
      <!-- Left lens -->
      <rect x="50" y="30" width="70" height="40" rx="8" fill="rgba(200,220,255,0.1)" stroke="url(#tortoise)" stroke-width="4"/>
      <!-- Right lens -->
      <rect x="180" y="30" width="70" height="40" rx="8" fill="rgba(200,220,255,0.1)" stroke="url(#tortoise)" stroke-width="4"/>
      <!-- Bridge -->
      <rect x="125" y="45" width="25" height="8" rx="4" fill="url(#tortoise)"/>
      <!-- Left temple -->
      <line x1="45" y1="40" x2="10" y2="35" stroke="url(#tortoise)" stroke-width="3"/>
      <!-- Right temple -->
      <line x1="255" y1="40" x2="290" y2="35" stroke="url(#tortoise)" stroke-width="3"/>
    </svg>`
  },
  {
    id: 'oakley-holbrook',
    name: 'Holbrook Sport',
    brand: 'Oakley',
    type: 'sunglasses' as const,
    price: 118.00,
    style: 'sport',
    frameColor: '#1C1C1C',
    svg: `<svg viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sportGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3A3A3A"/>
          <stop offset="100%" style="stop-color:#1C1C1C"/>
        </linearGradient>
        <linearGradient id="darkLens" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0.7)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.9)"/>
        </linearGradient>
      </defs>
      <!-- Left lens -->
      <rect x="45" y="25" width="80" height="50" rx="12" fill="url(#darkLens)" stroke="url(#sportGrad)" stroke-width="3"/>
      <!-- Right lens -->
      <rect x="195" y="25" width="80" height="50" rx="12" fill="url(#darkLens)" stroke="url(#sportGrad)" stroke-width="3"/>
      <!-- Bridge -->
      <rect x="130" y="45" width="30" height="6" rx="3" fill="url(#sportGrad)"/>
      <!-- Left temple -->
      <line x1="40" y1="40" x2="5" y2="35" stroke="url(#sportGrad)" stroke-width="4"/>
      <!-- Right temple -->
      <line x1="280" y1="40" x2="315" y2="35" stroke="url(#sportGrad)" stroke-width="4"/>
    </svg>`
  },
  {
    id: 'dior-stellaire',
    name: 'DiorSoStellaire1',
    brand: 'Dior',
    type: 'sunglasses' as const,
    price: 420.00,
    style: 'oversized',
    frameColor: '#C0C0C0',
    svg: `<svg viewBox="0 0 340 130" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#E5E5E5"/>
          <stop offset="100%" style="stop-color:#C0C0C0"/>
        </linearGradient>
        <linearGradient id="brownLens" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(139,69,19,0.4)"/>
          <stop offset="100%" style="stop-color:rgba(101,67,33,0.8)"/>
        </linearGradient>
      </defs>
      <!-- Left lens -->
      <ellipse cx="85" cy="65" rx="60" ry="45" fill="url(#brownLens)" stroke="url(#silverGrad)" stroke-width="3"/>
      <!-- Right lens -->
      <ellipse cx="255" cy="65" rx="60" ry="45" fill="url(#brownLens)" stroke="url(#silverGrad)" stroke-width="3"/>
      <!-- Bridge -->
      <path d="M145 60 Q170 55 195 60" stroke="url(#silverGrad)" stroke-width="2" fill="none"/>
      <!-- Left temple -->
      <line x1="25" y1="50" x2="5" y2="45" stroke="url(#silverGrad)" stroke-width="3"/>
      <!-- Right temple -->
      <line x1="315" y1="50" x2="335" y2="45" stroke="url(#silverGrad)" stroke-width="3"/>
    </svg>`
  }
];

// Merge inline demo frames with dataset image frames (imageUrl based)
const FRAME_COLLECTION: FrameItem[] = [
  ...GLASSES_COLLECTION,
  ...GLASSES_DATASET.map(item => ({
    id: item.id,
    name: item.name,
    brand: item.brand,
    type: item.type,
    price: item.price,
    style: item.style,
    frameColor: item.color,
    imageUrl: item.imageUrl,
    lensColor: item.lensColor
  }))
];

interface FaceDetection {
  leftEye: { x: number; y: number };
  rightEye: { x: number; y: number };
  confidence: number;
  scale: number;
  rotation: number;
}

const AdvancedTryOn = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedType, setSelectedType] = useState<'glasses' | 'sunglasses'>('glasses');
  const [selectedProduct, setSelectedProduct] = useState(FRAME_COLLECTION[0]);
  const [cameraActive, setCameraActive] = useState(false);
  const [faceDetection, setFaceDetection] = useState<FaceDetection | null>(null);
  const [detectionQuality, setDetectionQuality] = useState<'poor' | 'good' | 'excellent'>('poor');
  const [isProcessing, setIsProcessing] = useState(false);
  const faceMeshRef = useRef<any>(null); // Mediapipe FaceMesh instance
  const lastVideoTimeRef = useRef<number>(-1);
  const [usingRealDetection, setUsingRealDetection] = useState(false);
  const smoothingRef = useRef<{rotation:number; scale:number; x:number; y:number}>({rotation:0, scale:1, x:50, y:50});
  const SMOOTH_ALPHA = 0.3; // exponential smoothing factor

  // Advanced face detection using canvas-based image processing
  const detectFaceFeatures = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !cameraActive) return;
    if (usingRealDetection) return; // Real detection loop handled separately

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx || video.videoWidth === 0) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Fallback simulation
    const centerX = canvas.width * 0.5;
    const centerY = canvas.height * 0.45;
    const time = Date.now() * 0.001;
    const breathingOffset = Math.sin(time * 0.5) * 3;
    const microMovement = Math.sin(time * 8) * 1;
    const eyeDistance = Math.min(canvas.width, canvas.height) * 0.12;
    const leftEye = { x: (centerX - eyeDistance + microMovement) / canvas.width * 100, y: (centerY + breathingOffset) / canvas.height * 100 };
    const rightEye = { x: (centerX + eyeDistance + microMovement) / canvas.width * 100, y: (centerY + breathingOffset) / canvas.height * 100 };
    const actualEyeDistance = Math.sqrt(
      Math.pow((rightEye.x - leftEye.x) * canvas.width / 100, 2) +
      Math.pow((rightEye.y - leftEye.y) * canvas.height / 100, 2)
    );
    const confidence = Math.min(0.9, 0.65 + (actualEyeDistance / 100) * 0.25);
    const scale = Math.max(0.6, Math.min(1.6, actualEyeDistance / 80));
    const rotation = (rightEye.y - leftEye.y) * 0.5;
    const quality = confidence > 0.85 ? 'excellent' : confidence > 0.75 ? 'good' : 'poor';
    setFaceDetection({ leftEye, rightEye, confidence, scale, rotation });
    setDetectionQuality(quality);
  }, [cameraActive, usingRealDetection]);

  // Initialize Mediapipe FaceMesh dynamically to avoid SSR issues and reduce bundle
  useEffect(() => {
    let cancelled = false;
    async function initFaceMesh() {
      if (!cameraActive || !videoRef.current) return;
      try {
        setIsProcessing(true);
        const [{ FaceMesh }, mpCamera] = await Promise.all([
          import('@mediapipe/face_mesh'),
          import('@mediapipe/camera_utils')
        ] as any);

        if (cancelled) return;

        const faceMesh = new FaceMesh({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
        });
        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        faceMesh.onResults((results: any) => {
          if (!videoRef.current || cancelled) return;
          const video = videoRef.current;
          if (lastVideoTimeRef.current === video.currentTime) return; // throttle duplicates
          lastVideoTimeRef.current = video.currentTime;

          const landmarks = results.multiFaceLandmarks?.[0];
          if (!landmarks) return;

          // Use multiple landmarks for better stability (Mediapipe indices)
          const LEFT_EYE_SET = [33, 133, 159, 145, 153, 246];
          const RIGHT_EYE_SET = [362, 263, 386, 374, 380, 466];

          const avgPoint = (indices:number[]) => {
            const pts = indices.map(i => landmarks[i]);
            const x = pts.reduce((s,p)=>s+p.x,0)/pts.length;
            const y = pts.reduce((s,p)=>s+p.y,0)/pts.length;
            return {x, y};
          };

          const l = avgPoint(LEFT_EYE_SET);
            const r = avgPoint(RIGHT_EYE_SET);
            const leftEye = { x: l.x * 100, y: l.y * 100 };
            const rightEye = { x: r.x * 100, y: r.y * 100 };
          const dx = rightEye.x - leftEye.x;
          const dy = rightEye.y - leftEye.y;
          const rawDistancePercent = Math.sqrt(dx*dx + dy*dy); // percent space
          const pixelDistance = rawDistancePercent * (video.videoWidth/100);

          // Style-specific base width multipliers to better fit frames
          const styleMultiplier: Record<string, number> = {
            round: 1.05,
            rectangular: 1.15,
            aviator: 1.25,
            'cat-eye': 1.2,
            sport: 1.3,
            oversized: 1.35
          };
          const mult = styleMultiplier[selectedProduct.style] || 1.1;
          let targetScale = Math.max(0.5, Math.min(2.4, (pixelDistance / 70) * mult));

          // Exponential smoothing for stability
          const sm = smoothingRef.current;
          sm.scale = sm.scale + (targetScale - sm.scale) * SMOOTH_ALPHA;
          // Rotation in degrees based on dy
          const rawRotation = dy * 0.6;
          sm.rotation = sm.rotation + (rawRotation - sm.rotation) * SMOOTH_ALPHA;
          const centerX = (leftEye.x + rightEye.x)/2;
          const centerY = (leftEye.y + rightEye.y)/2 - 1; // slight upward adjustment
          sm.x = sm.x + (centerX - sm.x) * SMOOTH_ALPHA;
          sm.y = sm.y + (centerY - sm.y) * SMOOTH_ALPHA;

          // Confidence heuristic: distance + landmark refinement
          const confidence = Math.min(0.995, 0.75 + (pixelDistance/120)*0.25);
          const quality = confidence > 0.92 ? 'excellent' : confidence > 0.82 ? 'good' : 'poor';
          setFaceDetection({
            leftEye,
            rightEye,
            confidence,
            scale: sm.scale,
            rotation: sm.rotation
          });
          setDetectionQuality(quality);
        });

        // Setup camera utils
        const CameraClass = (mpCamera as any).Camera;
        if (videoRef.current) {
          const cam = new CameraClass(videoRef.current, {
            onFrame: async () => {
              if (!cancelled && faceMesh) {
                await faceMesh.send({ image: videoRef.current });
              }
            },
            width: 640,
            height: 480
          });
          await cam.start();
          faceMeshRef.current = faceMesh;
          setUsingRealDetection(true);
        }
      } catch (e) {
        console.warn('FaceMesh init failed, falling back to simulation', e);
        setUsingRealDetection(false);
      } finally {
        if (!cancelled) setIsProcessing(false);
      }
    }
    initFaceMesh();
    return () => { cancelled = true; };
  }, [cameraActive]);

  // Initialize camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (error) {
        console.error('Camera access error:', error);
      }
    };

    startCamera();
    
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // Face detection loop
  useEffect(() => {
    if (!cameraActive) return;

    const interval = setInterval(() => {
      detectFaceFeatures();
    }, 120); // fallback loop when real detection unavailable

    return () => clearInterval(interval);
  }, [cameraActive, detectFaceFeatures]);

  const filteredProducts = GLASSES_COLLECTION.filter(p => p.type === selectedType);

  const capturePhoto = () => {
    if (!videoRef.current || !faceDetection) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame
    ctx.drawImage(video, 0, 0);

    // Create download link
    const link = document.createElement('a');
    link.download = `virtual-tryon-${selectedProduct.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 0.9);
    link.click();
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Advanced Virtual Try-On
          </h1>
          <p className="text-xl text-gray-600">AI-Powered Eye Detection & Real-Time Glasses Fitting</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Camera Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Eye className="w-6 h-6 text-blue-600" />
                    Live Camera View
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedType === "glasses" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType("glasses")}
                      className="transition-all duration-200"
                    >
                      <Glasses className="w-4 h-4 mr-1" />
                      Glasses
                    </Button>
                    <Button
                      variant={selectedType === "sunglasses" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType("sunglasses")}
                      className="transition-all duration-200"
                    >
                      <Sun className="w-4 h-4 mr-1" />
                      Sunglasses
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-inner">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                  />
                  
                  {/* Hidden canvas for processing */}
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {/* Detection Status */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge 
                      variant={faceDetection ? "default" : "secondary"}
                      className={`${faceDetection ? 'bg-green-500' : 'bg-red-500'} text-white px-3 py-1`}
                    >
                      <Target className="w-3 h-3 mr-1" />
                      {faceDetection ? (usingRealDetection ? 'Face Tracked (AI)' : 'Face Simulated') : 'Searching...'}
                    </Badge>
                    
                    {faceDetection && (
                      <Badge 
                        variant="outline"
                        className={`${
                          detectionQuality === 'excellent' ? 'border-green-500 text-green-600 bg-green-50' :
                          detectionQuality === 'good' ? 'border-yellow-500 text-yellow-600 bg-yellow-50' :
                          'border-red-500 text-red-600 bg-red-50'
                        }`}
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        {detectionQuality.toUpperCase()} ({Math.round(faceDetection.confidence * 100)}%)
                      </Badge>
                    )}
                  </div>

                  {/* Eye Detection Indicators */}
                  {faceDetection && (
                    <>
                      <div 
                        className="absolute w-2 h-2 bg-blue-500 rounded-full border border-white shadow-lg"
                        style={{ left: `${faceDetection.leftEye.x}%`, top: `${faceDetection.leftEye.y}%`, transform: 'translate(-50%, -50%)' }}
                      />
                      <div 
                        className="absolute w-2 h-2 bg-blue-500 rounded-full border border-white shadow-lg"
                        style={{ left: `${faceDetection.rightEye.x}%`, top: `${faceDetection.rightEye.y}%`, transform: 'translate(-50%, -50%)' }}
                      />
                    </>
                  )}

                  {/* Advanced Glasses Overlay */}
                  {faceDetection && (
                    <div 
                      className="absolute pointer-events-none transition-transform duration-100 ease-linear"
                      style={{
                        left: `${(faceDetection.leftEye.x + faceDetection.rightEye.x)/2}%`,
                        top: `${(faceDetection.leftEye.y + faceDetection.rightEye.y)/2 - 1}%`,
                        transform: `translate(-50%, -50%) rotate(${faceDetection.rotation}deg) scale(${faceDetection.scale})`,
                        willChange: 'transform'
                      }}
                    >
                      {selectedProduct.imageUrl ? (
                        <img 
                          src={selectedProduct.imageUrl}
                          alt={selectedProduct.name}
                          className="select-none"
                          style={{
                            width: `${Math.max(120, Math.min(800, faceDetection.scale * 180))}px`,
                            filter: selectedProduct.type === 'sunglasses' ? 'brightness(0.85) contrast(1.05)' : 'brightness(1)'
                          }}
                          draggable={false}
                        />
                      ) : (
                        <div 
                          className="opacity-90"
                          style={{ width: '180px', height: '90px' }}
                          dangerouslySetInnerHTML={{ __html: (selectedProduct as any).svg }}
                        />
                      )}
                    </div>
                  )}

                  {/* Product Info */}
                  {faceDetection && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-black/80 text-white px-6 py-3 rounded-xl backdrop-blur-sm border border-white/20">
                        <div className="text-center">
                          <div className="font-bold text-lg">{selectedProduct.name}</div>
                          <div className="text-sm text-gray-300 flex items-center justify-center gap-2">
                            <span>{selectedProduct.brand}</span>
                            <span>•</span>
                            <span className="text-green-400">${selectedProduct.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Controls */}
                <div className="mt-6 flex gap-4 justify-center">
                  <Button 
                    disabled={!faceDetection || detectionQuality === 'poor'}
                    onClick={capturePhoto}
                    className="px-8 py-3 text-lg"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Capture Photo
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="px-6 py-3"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Selection */}
          <div>
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">
                  {selectedType === 'glasses' ? '👓 Eyeglasses' : '🕶️ Sunglasses'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`p-4 rounded-xl cursor-pointer border-2 transition-all duration-200 hover:shadow-lg ${
                        selectedProduct.id === product.id
                          ? 'border-blue-500 bg-blue-50 shadow-md transform scale-105'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-6 rounded"
                          dangerouslySetInnerHTML={{ __html: product.svg }}
                        />
                        <div className="flex-1">
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-sm text-gray-600">{product.brand}</div>
                          <div className="text-lg font-bold text-green-600">${product.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detection Analytics */}
            {faceDetection && (
              <Card className="mt-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Detection Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <span className="font-mono">{Math.round(faceDetection.confidence * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scale Factor:</span>
                      <span className="font-mono">{faceDetection.scale.toFixed(2)}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Head Tilt:</span>
                      <span className="font-mono">{Math.abs(faceDetection.rotation).toFixed(1)}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality:</span>
                      <span className={`font-semibold ${
                        detectionQuality === 'excellent' ? 'text-green-600' :
                        detectionQuality === 'good' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {detectionQuality.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedTryOn;