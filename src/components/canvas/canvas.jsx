import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'

import { AdaptiveDpr } from '@react-three/drei'

import WebGPUCapabilities from 'three/examples/jsm/capabilities/WebGPU.js'
import { WebGPURenderer } from 'three/webgpu'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'

const WebGPUCanvas = ({ webglFallback = true, frameloop = 'always', children, debug, ...props }) => {
  const [canvasFrameloop, setCanvasFrameloop] = useState('never')
  const [initialising, setInitialising] = useState(true)

  useEffect(() => {
    if (initialising) return

    setCanvasFrameloop(frameloop)
  }, [initialising, frameloop])

  const webGPUAvailable = WebGPUCapabilities.isAvailable()

  return (
    <Canvas
      {...props}
      id='gl'
      frameloop={canvasFrameloop}
      gl={(canvas) => {
        const renderer = new WebGPURenderer({
          canvas: canvas,
          antialias: true,
          alpha: true,
          forceWebGL: !webGPUAvailable,
        })
        renderer.toneMapping = ACESFilmicToneMapping
        renderer.outputColorSpace = SRGBColorSpace
        renderer.init().then(() => {
          setInitialising(false)
        })

        return renderer
      }}
    >
      <AdaptiveDpr />
      {children}
    </Canvas>
  )
}

export default WebGPUCanvas
