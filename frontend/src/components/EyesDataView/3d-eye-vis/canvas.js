import * as THREE from 'three'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Mask, useMask, OrthographicCamera, Clone, Float as FloatImpl } from '@react-three/drei'
import useSpline from '@splinetool/r3f-spline'
import {styled} from "@mui/material";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber';
import FaceModel from "./face";
import { Box, OrbitControls, Sky } from '@react-three/drei'
import data from "bootstrap/js/src/dom/data";


const ContentContainer = styled("div")({
    width: 600,
    height: 200,
})

export function EyeCanvas(props) {
    const container = useRef()
    const domContent = useRef();
    return (
        <ContentContainer ref={container} className="content-container">
            {/* Container for the HTML view */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: props.width, height: '100%', overflow: 'hidden' }} ref={domContent} />
            {/* Container for THREEJS */}
            <Canvas
                shadows
                flat
                linear
                // Since the canvas will receive events from the out-most container it must ignore events
                // This will allow the HTML view underneath to receive events, too
                style={{ pointerEvents: 'none' }}
                onCreated={(state) => {
                    // Re-connect r3f to a shared container, this allows both worlds (html & canvas) to receive events
                    state.events.connect(container.current)
                    // Re-define the event-compute function which now uses pageX/Y instead of offsetX/Y
                    // Without this the right hand would reset to client 0/0 if it hovers over any of the HTML elements
                    state.setEvents({
                        compute: (event, state) => {
                            state.pointer.set((event.pageX / state.size.width) * 2 - 1, -(event.pageY / state.size.height) * 2 + 1)
                            state.raycaster.setFromCamera(state.pointer, state.camera)
                        },
                    })
                }}>
                <directionalLight castShadow intensity={0.4} position={[-10, 50, 300]} shadow-mapSize={[512, 512]} shadow-bias={-0.002}>
                    <orthographicCamera attach="shadow-camera" args={[-2000, 2000, 2000, -2000, -10000, 10000]} />
                </directionalLight>
                <OrthographicCamera makeDefault={true} far={100000} near={-100000} position={[0, 0, 1000]} />
                <hemisphereLight intensity={0.5} color="#eaeaea" position={[0, 1, 0]} />
                <OrbitControls/>
                <FaceModel data={props.data} state={props.state} position={[0, 0, -10]}> </FaceModel>
            </Canvas>
        </ContentContainer>
    )
}