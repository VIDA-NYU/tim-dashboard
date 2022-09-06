import React, { useEffect, useRef } from 'react';

// third party
import * as scatter from 'scatter-gl';

// styles
import './PointCloudViewer.css';

const PointCloudViewer = () => {

    // dom refs
    const scatterContainerRef = useRef(null);

    // hooks
    useEffect(() => { 
        
        // creating dataset
        const coords: any = Array.from(Array(10000).keys()).map( index => {
            return [Math.random()*100, Math.random()*100, Math.random()*100]
        });

        const scatterDataset = new scatter.ScatterGL.Dataset(coords);
        const scatterGL = new scatter.ScatterGL(scatterContainerRef.current);
        scatterGL.render( scatterDataset );

    }, [])

    return (
        <div className='component-container'>
            <div className='scatterplot-container' ref={scatterContainerRef}></div>
        </div>
    )
}
  


export default PointCloudViewer;