import React, { Suspense, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Canvas, MeshProps, useFrame } from '@react-three/fiber'
import {useGLTF, useTexture, useAnimations, Stage} from "@react-three/drei"
import { a, useSpring } from "@react-spring/three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from "three";

import {Model} from "./head/Scarlett_johansson_3d_headface";
import GazeLine from "./gaze/gaze-line";


function FaceModel(props) {

    console.log(props.data)

    return (
        <group position={[0, 0, 0]}>

            <Model></Model>
            { props.data !== {} && <GazeLine data={props.data}></GazeLine>}
        </group>
    )


}

export default FaceModel;
