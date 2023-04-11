import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("../../public/shirt_baked.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const FullTexture = useTexture(snap.fullDecal);

  /* `useFrame` is a hook provided by the `@react-three/fiber` library that allows us to perform
  actions on every frame of the 3D scene. In this case, the function passed to `useFrame` is using
  the `easing.dampC` function from the `maath` library to smoothly transition the color of the
  `lambert1` material of the shirt mesh to the `color` value in the `snap` object from our `store`.
  The `delta` parameter represents the time elapsed since the last frame, which is used to calculate
  the smooth transition. */
  useFrame((state, delta) =>
    easing.dampC(materials.lamber1.color, snap.color, 0.25, delta)
  );
  const stateString = JSON.stringify(snap);
  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={FullTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
