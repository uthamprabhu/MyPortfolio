import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')
  return (
    <mesh>
      <hemisphereLight intensity={5} groundColor="black" />
      <pointLight intensity={3} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

// Lightweight placeholder shown on phones/tablets, where the heavy
// desktop_pc model can exhaust the GPU and leave a blank white canvas.
const DesktopOnlyNotice = () => (
  <div className='w-full h-full flex items-center justify-center'>
    <div className='mx-6 max-w-sm rounded-2xl border border-[#915eff]/40 bg-black/30 backdrop-blur-sm px-6 py-8 text-center'>
      <div className='text-4xl mb-3'>🖥️</div>
      <p className='text-white font-semibold text-lg'>
        Interactive 3D scene
      </p>
      <p className='text-secondary text-sm mt-2 leading-relaxed'>
        Open this portfolio on a desktop or laptop for the full
        interactive 3D experience.
      </p>
    </div>
  </div>
)

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)
  // Screens up to 1024px (phones + most tablets) skip the 3D model.
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 500px)')
    const smallQuery = window.matchMedia('(max-width: 1024px)')

    setIsMobile(mobileQuery.matches)
    setIsSmallScreen(smallQuery.matches)

    const handleMobileChange = (event) => setIsMobile(event.matches)
    const handleSmallChange = (event) => setIsSmallScreen(event.matches)

    mobileQuery.addEventListener('change', handleMobileChange)
    smallQuery.addEventListener('change', handleSmallChange)

    return () => {
      mobileQuery.removeEventListener('change', handleMobileChange)
      smallQuery.removeEventListener('change', handleSmallChange)
    }
  }, [])

  // Don't mount the WebGL canvas on small screens. This avoids the
  // heavy model crashing the context and leaving a white block.
  if (isSmallScreen) {
    return <DesktopOnlyNotice />
  }

  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas
