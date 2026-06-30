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

// Lightweight flat icon used on mobile/tablet instead of a WebGL canvas.
// 13 simultaneous WebGL contexts exceeds mobile browser limits (~8 max),
// causing random balls to render blank.
const FlatBall = ({ icon }) => (
  <div className="w-full h-full rounded-full bg-[#1d1836] flex items-center justify-center shadow-lg">
    <img
      src={icon}
      alt="tech icon"
      className="w-14 h-14 object-contain"
    />
  </div>
);

const BallCanvas = ({ icon }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1024px)");
    setIsSmallScreen(query.matches);
    const handler = (e) => setIsSmallScreen(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  if (isSmallScreen) {
    return <FlatBall icon={icon} />;
  }

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
