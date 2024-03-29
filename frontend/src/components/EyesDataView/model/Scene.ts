import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper';



export interface Vector3D {
    x: number,
    y: number,
    z: number
}

export class Scene {

    public animationID: any = 0;

    // container ref
    public container: HTMLElement;

    // scene elements
    public camera: THREE.PerspectiveCamera;
    public scene: THREE.Scene;
    public renderer: THREE.Renderer | null = null;

    // helper elements
    public gridPlane;
    public cube;
    public axes;

    // orbit controls
    public orbitControls: OrbitControls;

    // highlights
    public highlightedGazeOrigin: any;
    public highlighteGazeDirection: any;

    // sprites
    public pointSprite: any;

    constructor(){}

    public init( containerRef: { current: HTMLElement }, originExtents: number[][]  ): void {

        // saving container ref
        this.container = containerRef.current;

        // initializing camera
        this.initialize_camera( originExtents );

        // initializing scene
        this.initialize_scene();

        // initialize renderer
        this.initialize_renderer();

        // initialize sprites
        this.initialize_sprites( './sprites/circle.png' );

    }

    // public add_point_cloud( id: string, positions: number[], colors: number[] = [], normals: number[] = []  ): void {

    //     if( id in this.scenePointClouds ){
    //         this.scene.remove( this.scenePointClouds[id] );
    //     }

    //     // loading positions
    //     const pointgeometry = new THREE.BufferGeometry();
    //     pointgeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );

    //     if(colors.length > 0) pointgeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    //     if(normals.length > 0) pointgeometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
    //     pointgeometry.computeBoundingSphere();

    //     // setting sprint and color
    //     const pointmaterial = new THREE.PointsMaterial( { size: 0.01, vertexColors: true } );
    //     // pointmaterial.color.setHSL( 1.0, 0.0, 0.0 );

    //     const points = new THREE.Points( pointgeometry, pointmaterial );

    //     if(normals.length > 0){
    //         const helper = new VertexNormalsHelper( points, 0.1, 0x00ff00 );
    //         this.scene.add(helper);
    //     }

    //     // indexing
    //     this.scenePointClouds[id] = points;

    //     this.currentPointCloud = points;
    //     this.scene.add( points );

    // }

    public highlight_current_gaze_point( origin: number[], direction: number[] = [] ){

        // remove object from scene
        // this.scene.remove( this.highlightedGazeOrigin );
        // this.scene.remove( this.highlighteGazeDirection );
        this.scene.remove( this.highlightedGazeOrigin );

        // loading positions
        const pointgeometry = new THREE.BufferGeometry();
        pointgeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( origin, 3 ) );
        pointgeometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( direction, 3 ) );
        pointgeometry.computeBoundingSphere();

        // setting sprint and color
        const pointmaterial = new THREE.PointsMaterial( { size: 0.05, alphaTest: 0.9, map: this.pointSprite, transparent: true } );
        pointmaterial.color.setHSL( 1.0, 0.3, 0.7 );

        const point = new THREE.Points( pointgeometry, pointmaterial );
        const helper = new VertexNormalsHelper( point, 0.1, 0x00ff00 );
        

        this.highlightedGazeOrigin = point;
        this.scene.add( point );
        this.scene.add(helper);


        // // adding line
        // //create a blue LineBasicMaterial
        // const linematerial = new THREE.LineBasicMaterial( { color: 0x0000ff } );

        // const linepoints = [];
        // const vectorOrigin = new THREE.Vector3( origin[0], origin[1], origin[2] );
        // const vectorDirection = new THREE.Vector3( direction[0], direction[1], direction[2] );

        // // adding points
        // linepoints.push( vectorOrigin );
        // linepoints.push( vectorDirection );
        // const linegeometry = new THREE.BufferGeometry().setFromPoints( linepoints );
    
        // const line = new THREE.Line( linegeometry, linematerial );
        // // line.scale.set( 0.3, 0.3, 0.3 );
        // // line.position.set( vectorOrigin.x, vectorOrigin.y, vectorOrigin.z )
        // this.highlighteGazeDirection = line;
        // this.scene.add( line );

    }

    // updates the gaze origin point cloud
    public update_gaze_history( positions: Float32Array ): void {

        // loading positions
        const pointgeometry = new THREE.BufferGeometry();
        pointgeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
        pointgeometry.computeBoundingSphere();

        // setting sprint and color
        const pointmaterial = new THREE.PointsMaterial( { size: 0.01, alphaTest: 0.1, map: this.pointSprite, transparent: true } );
        pointmaterial.color.setHSL( 0, 0.06, 0.84 );

        const points = new THREE.Points( pointgeometry, pointmaterial );
        this.scene.add( points );

    }

    public add_scene_helpers( planeGeometry: boolean = false, axes: boolean = false ): void {

        if( planeGeometry ){
            // plane geometry
            const gridHelper = new THREE.GridHelper( 2, 20 );
            // const gridHelper = new THREE.GridHelper( 2, 2 );
            gridHelper.position.set(1.955, -0.8, 1.01 );
            // gridHelper.position.set(1.9, -0.5, 0.9 );
            this.scene.add( gridHelper );
        }

        if( axes ){
            const axesHelper = new THREE.AxesHelper( 76 );
            this.scene.add( axesHelper );
        }

    }

    public add_orbit_controls(): void {

        const controls: OrbitControls = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbitControls = controls;

    }

    public render() {

        this.animationID = requestAnimationFrame( () => this.render() );
    
        // required if controls.enableDamping or controls.autoRotate are set to true
        this.orbitControls.update();
    
        this.renderer.render( this.scene, this.camera );

    }

    public stop_animation(): void {

        cancelAnimationFrame( this.animationID );
    }


    private initialize_sprites( spritePath: string ): void {

        // loading texture
        const sprite = new THREE.TextureLoader().load( spritePath );
        this.pointSprite = sprite;
    }

    private initialize_scene(): void {

        const scene: THREE.Scene = new THREE.Scene();
        scene.background = new THREE.Color( 'white' );
        scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

        // saving scene ref
        this.scene = scene;

    }

    private initialize_camera( extents: number[][] ): void {

        const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera( 75, 1600/600, 0.1, 1000 );
        
        // camera position grows towards outside the screen
        const x: number = (extents[0][0] + extents[0][1]) / 2;
        const y: number = extents[1][1] + 1;
        const z: number = extents[2][1] + 1;
        camera.position.x = x + 1;
        camera.position.y = y;
        camera.position.z = z + 2;
        // camera.position.z = 100;
        // camera.position.y = -20;
        // camera.position.z = 2;
        // camera.position.y = -0.3;
        // camera.position.x = 1.9;

        // saving ref
        this.camera = camera;

    }

    private initialize_renderer(): void {

        // const renderer: THREE.Renderer = new THREE.WebGLRenderer();
        // renderer.setPixelRatio( window.devicePixelRatio );
        // renderer.setSize( 1600, 600 );

        // // appending renderer
        // this.container.appendChild( renderer.domElement );

        // // saving ref
        // this.renderer = renderer;

    }

    
}
