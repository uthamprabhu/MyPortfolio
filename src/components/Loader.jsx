'use client'

import { useEffect, useLayoutEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { useProgress } from '@react-three/drei'

// Same look as drei's <Html> loader, but plain DOM: drei's <Html> unmounts a nested
// React root synchronously, which crashes the page under React 19.2+.
const Loader = () => {
  const { progress } = useProgress()
  const gl = useThree((state) => state.gl)
  const el = useMemo(() => {
    const div = document.createElement('div')
    div.style.cssText = 'position:absolute;top:50%;left:50%;pointer-events:none;'
    div.innerHTML =
      '<span class="canvas-load"></span><p style="font-size:14px;color:#f1f1f1;font-weight:800;margin-top:40px"></p>'
    return div
  }, [])

  useLayoutEffect(() => {
    gl.domElement.parentNode?.appendChild(el)
    return () => el.remove()
  }, [gl, el])

  useEffect(() => {
    el.querySelector('p').textContent = `${progress.toFixed(2)}%`
  }, [el, progress])

  return null
}

export default Loader
