import { useThree } from '@react-three/fiber'

import { MeshBasicNodeMaterial, uv, vec3 } from 'three/nodes'

const raymarchMaterial = new MeshBasicNodeMaterial()

raymarchMaterial.colorNode = vec3(uv(), 1)

export const Step1 = () => {
  const { width, height } = useThree((state) => state.viewport)

  return (
    <mesh scale={[width, height, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={raymarchMaterial} attach='material' />
    </mesh>
  )
}
