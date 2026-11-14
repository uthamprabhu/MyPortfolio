'use client'

import { useRef } from 'react'

// Drop-in for react-tilt (React 18 only): same `options` shape, mouse-only 3D tilt.
const Tilt = ({ options = {}, className = '', style, children }) => {
  const { max = 35, scale = 1, speed = 300, perspective = 1000 } = options
  const ref = useRef(null)

  const set = (rx, ry, s) => {
    if (ref.current) {
      ref.current.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${s}, ${s}, ${s})`
    }
  }

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    set(y * max, -x * max, scale)
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transition: `transform ${speed}ms cubic-bezier(.03,.98,.52,.99)`, willChange: 'transform' }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => set(0, 0, 1)}
    >
      {children}
    </div>
  )
}

export default Tilt
