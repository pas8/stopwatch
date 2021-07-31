import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Stars, useTexture } from '@react-three/drei';
import { makeStyles } from '@material-ui/core';
import { useRef, Suspense } from 'react';

const useStyles = makeStyles(({ palette: { background } }) => ({
  '@global': {
    '*': {
      padding: 0,
      margin: 0
    },
    body: {
      background: background.default
    }
  },
  canvas: {
    inset: 0,
    minHeight: '100vh',
    minWidth: '100vw',
    bottom: 0,
    position: 'fixed',
    '& canvas': {
      height: '100% !important'
    }
  }
}));

const PerspectiveCameraScene = () => {
  const classes = useStyles();

  return (
    <Canvas className={classes.canvas}>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} zoom={1.8} />
        <Stars />
        <Moon />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

const Moon = () => {
  const normalMap = useTexture('moon.jpeg');
  const ref = useRef<any>();

  useFrame(() => {
    ref.current.rotation.x += 0.004;
    ref.current.rotation.y += 0.004;
    ref.current.rotation.z += 0.004;
  });
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <mesh position={[0, -0.16, 0]} ref={ref}>
        <sphereBufferGeometry  args={[1,100,100]}/>
        <meshStandardMaterial displacementScale={0.2} map={normalMap} />
      </mesh>
    </>
  );
};
export default PerspectiveCameraScene;
