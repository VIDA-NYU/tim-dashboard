/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import filePath from "./scarlett_johansson_3d_headface.gltf";


export function Model(props) {
  const { nodes, materials } = useGLTF(filePath)
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.Texture0} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.Texture1} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.Texture2} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.Texture3} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.Texture4} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.Texture5} />
        <mesh geometry={nodes.Object_8.geometry} material={materials.Texture6} />
      </group>
    </group>
  )
}

useGLTF.preload('/scarlett_johansson_3d_headface.gltf')
