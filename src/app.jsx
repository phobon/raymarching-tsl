import Canvas from './components/canvas'

// import { Step1 } from './components/raymarching/step1'
// import { Step2 } from './components/raymarching/step2'
// import { Step3 } from './components/raymarching/step3'
// import { Step4 } from './components/raymarching/step4'
// import { Step5 } from './components/raymarching/step5'
// import { Step6 } from './components/raymarching/step6'
import { Final } from './components/raymarching/final'

const App = () => {
  return (
    <Canvas>
      {/* A basic full screen plane that maps uv coordinates */}
      {/* <Step1 /> */}

      {/* A basic raymarching setup */}
      {/* <Step2 /> */}

      {/* A static, raymarched sphere */}
      {/* <Step3 /> */}

      {/* Raymarched sphere moving left and right with sin */}
      {/* <Step4 /> */}

      {/* Two spheres and the basics of the min() function */}
      {/* <Step5 /> */}

      {/* Two spheres with a smoothmin() function */}
      {/* <Step6 /> */}

      {/* Final scene with a full lighting model */}
      <Final />
    </Canvas>
  )
}

export default App
