import React, { useEffect, useRef, useState } from 'react';

// third party
import * as scatter from 'scatter-gl';
import * as d3 from 'd3-binarytree';

// styles
import './PointCloudViewer.css';

interface PointCloudViewerProps {
    points: any,
    attribute: string,
    timestamp: any,
    initialtimestamp: any
}

const PointCloudViewer = ( {points, attribute, timestamp, initialtimestamp}: PointCloudViewerProps ) => {

    // dom refs
    const pointCloudContainerRef = useRef(null);

    const [scatterGL, setScatterGL] = useState<any>(null);
    const [timestampToIndex, settimestampToIndex] = useState<{[timestamp: string]: number}>({});
    const [binarytree, setBinaryTree] = useState<any>({});

    // hooks
    useEffect(() => { 

        if(points.length){

            // generating dataset
            const coords = generate_scatter_dataset( points, attribute );
            const scatterDataset = new scatter.ScatterGL.Dataset(coords);

            // styles
            const pointStyle: {} = {
                colorUnselected: 'rgba(200, 200, 200, 1.0)',
                colorNoSelection: 'rgba(200, 200, 200, 1.0)',
                colorSelected: 'rgba(152, 0, 0, 1.0)',
                colorHover: 'rgba(118, 11, 79, 0.7)',
                scaleDefault: 0.2,
                scaleSelected: 2.0,
                scaleHover: 1.2,
                fillOpacity: 0.5
            }

            // generating canvas
            console.log(scatterGL);
            if( scatterGL === null ){
                const newscatterGL = new scatter.ScatterGL(pointCloudContainerRef.current, {
                    styles: {
                        point: pointStyle
                    }
                });
                setScatterGL(newscatterGL);
            }

            if(scatterGL !== null){
                // rendering
                scatterGL.render( scatterDataset );
                scatterGL.stopOrbitAnimation();
            }

            

        }
        
    }, [points])

    useEffect(() => {

        if( scatterGL !== null ){

            const localTimestamp: number =  Math.floor(parseInt(initialtimestamp) + timestamp.currentTime * 1000);
            const closestTimestamp = binarytree.find( localTimestamp );
            const pointIndex = timestampToIndex[closestTimestamp];
            scatterGL.select([pointIndex]);
        }
            
    }, [timestamp])

    const generate_scatter_dataset = ( points: any[], attribute: string ) => {

        // setting timestamp to index
        const timestampToIndex: {[timestamp: number]: number} = {};

        // creating binary tree
        const tree = d3.binarytree().x( (x) => x ) ;

        // creating dataset
        const coords: any = points.map( (value: any, index: number) => {

            const currentTimestamp: number = parseInt(value.timestamp.split('-')[0]);
            timestampToIndex[currentTimestamp] = index;

            // adding index to tree
            tree.add(currentTimestamp);

            return [value[attribute].x, value[attribute].y, value[attribute].z]
        });
        
        settimestampToIndex(timestampToIndex);
        setBinaryTree(tree);

        return coords;
        
    }


    return (
        <div className='pointcloud-container' ref={pointCloudContainerRef}></div>
    )
}
  


export default PointCloudViewer;