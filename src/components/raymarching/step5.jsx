import { useThree } from '@react-three/fiber'

import {
  MeshBasicNodeMaterial,
  float,
  Loop,
  If,
  Break,
  Fn,
  uv,
  vec3,
  timerLocal,
  sin,
  min,
  viewportResolution,
} from 'three/tsl'

const raymarchMaterial = new MeshBasicNodeMaterial()

const sdSphere = Fn(([p, r]) => {
  return p.length().sub(r)
})

const timer = timerLocal(1)

const sdf = Fn(([pos]) => {
  const translatedPos = pos.add(vec3(sin(timer), 0, 0))
  const sphere = sdSphere(translatedPos, 0.5)
  const secondSphere = sdSphere(pos, 0.3)

  return min(secondSphere, sphere)
})

const raymarch = Fn(() => {
  // Use frag coordinates to get an aspect-fixed UV
  const _uv = uv().mul(viewportResolution.xy).mul(2).sub(viewportResolution.xy).div(viewportResolution.y)

  // Initialize the ray and its direction
  const rayOrigin = vec3(0, 0, -3)
  const rayDirection = vec3(_uv, 1).normalize()

  // Total distance travelled - note that toVar is important here so we can assign to this variable
  const t = float(0).toVar()

  // Calculate the initial position of the ray - this var is declared here so we can use it in lighting calculations later
  const ray = rayOrigin.add(rayDirection.mul(t)).toVar()

  Loop({ start: 1, end: 80 }, () => {
    const d = sdf(ray) // current distance to the scene

    t.addAssign(d) // "march" the ray

    ray.assign(rayOrigin.add(rayDirection.mul(t))) // position along the ray

    // If we're close enough, it's a hit, so we can do an early return
    If(d.lessThan(0.001), () => {
      Break()
    })

    // If we've travelled too far, we can return now and consider that this ray didn't hit anything
    If(t.greaterThan(100), () => {
      Break()
    })
  })

  return vec3(t.mul(0.2))
})()

raymarchMaterial.colorNode = raymarch

export const Step5 = () => {
  const { width, height } = useThree((state) => state.viewport)

  return (
    <mesh scale={[width, height, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={raymarchMaterial} attach='material' />
    </mesh>
  )
}
