import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import {
  Icosahedron,
  PerspectiveCamera,
  OrthographicCamera,
  OrbitControls,
  useSimplification,
  // Box,
  DepthBuffer,
  Plane,
  Octahedron,
  SpotLight,
  Polyhedron,
  Stars,
  shaderMaterial,
  useTexture
} from '@react-three/drei';
import { makeStyles } from '@material-ui/core';
import { TorusBufferGeometry } from 'three';
import { useMemo, useRef, useState, Suspense, useEffect } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Color } from 'three';

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

const NUM = 3;

interface Positions {
  id: string;
  position: [number, number, number];
}

export default function PerspectiveCameraScene() {
  const classes = useStyles();

  const positions = useMemo(() => {
    const pos: Positions[] = [];
    const half = (NUM - 1) / 2;

    for (let x = 0; x < NUM; x++) {
      for (let y = 0; y < NUM; y++) {
        pos.push({
          id: `${x}-${y}`,
          position: [(x - half) * 4, (y - half) * 4, 0]
        });
      }
    }

    return pos;
  }, []);
  const [depthBuffer, setDepth] = useState();

  return (
    <Canvas className={classes.canvas}>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} zoom={10} />
        <Stars />

        {/* <DepthBuffer ref={setDepth} /> */}

        {/* <SpotLight
        penumbra={1.5}
        depthBuffer={depthBuffer}
        position={[10, 4, 2]}
        angle={0.5}
        color="#ff005b"
        castShadow
      /> */}
        <Gradient />
        {/* <H /> */}
        {/* <Y /> */}
        <Box />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
// const L = () => {

// }
const H = () => {
  const torusRef = useRef();
  const { size, camera } = useThree(); // This will just crash
  console.log(camera);
  useFrame(() => {
    torusRef.current.rotation.x += 0.01;
    torusRef.current.rotation.y += 0.01;
    torusRef.current.rotation.z += 0.01;
  });

  return (
    <>
      <Octahedron args={[1, 1]} geometry={new TorusBufferGeometry(2, 1, 16, 42)} ref={torusRef}>
        <meshBasicMaterial color={'#f2d230'} wireframe />
      </Octahedron>
    </>
  );
};

const Y = () => {
  const normalMap = useTexture('moon.jpeg');
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z += 0.01;
  });
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <mesh position={[10, 10, 10]} ref={ref}>
        <sphereBufferGeometry args={[1, 100, 100]} />
        <meshStandardMaterial displacementScale={0.2} map={normalMap} />
      </mesh>
    </>
  );
};

const Box = () => {
  const normalMap = useTexture('ava2.jpg');
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    // ref.current.rotation.y += 0.01;
    // ref.current.rotation.z += 0.01;
  });
  return (
    <>
      {/* <ambientLight intensity={0.1} /> */}
      {/* <directionalLight /> */}
      <mesh position={[-10, 10, 10]} ref={ref}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial map={normalMap} />
      </mesh>
    </>
  );
};

const Gradient = () => {
  const normalMap = useTexture('ava2.jpg');
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    // ref.current.rotation.y += 0.01;
    // ref.current.rotation.z += 0.01;
  });

  return (
    <>
      <Octahedron args={[6, 2]} ref={ref} position={[-10, -10, -10]}>
        <meshNormalMaterial attach="material" flatShading color="hotpink" />
      </Octahedron>
    </>
  );
};
