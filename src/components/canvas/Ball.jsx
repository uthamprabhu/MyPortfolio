import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

// Flat, animated ball used on mobile/tablet instead of a WebGL canvas.
// Avoids the ~8 simultaneous WebGL context limit on mobile browsers
// (13 balls = 13 contexts = blank balls), while keeping a lively look.
const FlatBall = ({ icon, index = 0 }) => (
  <div className="w-full h-full flex items-center justify-center">
    <div
      className="tech-ball relative w-24 h-24 rounded-full p-[2px]
        bg-gradient-to-br from-[#915eff] to-[#00cea8]
        shadow-[0_0_25px_rgba(145,94,255,0.35)]
        transition-transform duration-300 active:scale-95 hover:scale-110"
      style={{ animationDelay: `${(index % 5) * 0.35}s` }}
    >
      <div className="w-full h-full rounded-full bg-[#151030] flex items-center justify-center">
        <img src={icon} alt="tech" className="w-12 h-12 object-contain" />
      </div>
    </div>
  </div>
);

const BallCanvas = ({ icon, index }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1024px)");
    setIsSmallScreen(query.matches);
    const handler = (e) => setIsSmallScreen(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  // Mobile / tablet -> lightweight animated flat ball.
  if (isSmallScreen) {
    return <FlatBall icon={icon} index={index} />;
  }

  // Desktop -> full 3D WebGL ball (original look).
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
