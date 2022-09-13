// react
import React, { useEffect, useRef } from 'react';

// API
import { getVideoPath } from '../../api/rest';

// material
import Grid from '@mui/material/Grid';

// custom components
import { VideoCard } from './VideoCard/VideoCard';
import {VideoCardWithBoundingBox} from "../bounding-box/card";

// templates
import AccordionView from '../../templates/AccordionView/AccordionView';

// model
import { streamingType } from '../../api/types';

const VideoDataView = ({ type, title, data, recordingName, state, onProgress, onSeek }: any ) => {
    
    const videoStreamings = { [streamingType.VIDEO_MAIN]: 'Main',
        [streamingType.VIDEO_DEPTH]: 'Depth',
        [streamingType.VIDEO_GLL]: 'Grey Left-Left',
        [streamingType.VIDVIDEO_GLF]: 'Grey Left-Front',
        [streamingType.VIDEO_GRF]: 'Grey Right-Front',
        [streamingType.VIDEO_GRR]: 'Grey Right-Right'
    };
    
    const videoStreamingsIDs = Object.keys(videoStreamings);
  
    return (
        <AccordionView title='Cameras' height={750}>
            <Grid container spacing={{ xs: 1, md: 2 }} >
                {
                    videoStreamingsIDs.map((name, index) => {
                    const streams = Object.keys(data.streams);
                    if (streams.includes(name) && name === "main" && (recordingName === "coffee-test-1" || recordingName === "coffee-test-2")) {
                        return <Grid key={index} item xs={4}>
                                    <VideoCardWithBoundingBox title={videoStreamings[name]} state={state}
                                                            recordingName={recordingName}
                                                            onSeek={res => onSeek(res)} onProgress={(res) => onProgress(res)} path={getVideoPath(recordingName, name)} />
                                </Grid>
                    }
                    else if (streams.includes(name)){ //verify if stream exists.
                                return (
                                    <Grid 
                                        key={index} 
                                        item 
                                        xs={2} 
                                        style={{ maxHeight: '100%'}}>
                                        <VideoCard 
                                            title={videoStreamings[name]} 
                                            state={state}
                                            onSeek={res => onSeek(res)} 
                                            onProgress={(res) => onProgress(res)} 
                                            path={getVideoPath(recordingName, name)} />
                                    </Grid>
                                )
                            }
                    })
                }
            </Grid>
        </AccordionView>
    )}

export default VideoDataView;