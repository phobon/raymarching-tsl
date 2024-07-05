import { useThree } from '@react-three/fiber'

import { MeshBasicNodeMaterial, float, loop, If, Break, tslFn, viewportResolution, uv, vec3 } from 'three/nodes'

const raymarchMaterial = new MeshBasicNodeMaterial()

const sdf = tslFn(([pos]) => {
  // This is our main "scene" where objects will go, but for now return 0
  return float(0)
})

const lighting = tslFn(([ro, r]) => {
  // Ambient light
  const ambient = vec3(0.2)

  const finalColor = ambient

  return finalColor
})

const raymarch = tslFn(() => {
  // Use frag coordinates to get an aspect-fixed UV
  const _uv = uv().mul(viewportResolution.xy).mul(2).sub(viewportResolution.xy).div(viewportResolution.y)

  // Initialize the ray and its direction
  const rayOrigin = vec3(0, 0, -3)
  const rayDirection = vec3(_uv, 1).normalize()

  // Total distance travelled - note that toVar is important here so we can assign to this variable
  const t = float(0).toVar()

  // Calculate the initial position of the ray - this var is declared here so we can use it in lighting calculations later
  const ray = rayOrigin.add(rayDirection.mul(t)).toVar()

  loop({ start: 1, end: 80 }, () => {
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

  return lighting(rayOrigin, ray)
})()

raymarchMaterial.colorNode = raymarch

export const Step2 = () => {
  const { width, height } = useThree((state) => state.viewport)

  return (
    <mesh scale={[width, height, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={raymarchMaterial} attach='material' />
    </mesh>
  )
}
