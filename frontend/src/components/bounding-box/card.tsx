import React, { useEffect, useRef, useState } from "react";

import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import ReactPlayer from 'react-player';
import { MediaState } from "../HistoricalDataView";
import VideoBoundingBoxPlayer, {onProgressType} from "./player";

// material
import Card from "@mui/material/Card";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

interface VideoCardBoundingBoxProps {
    title: string;
    subtitle?: string;
    path: string;
    state?: MediaState;
    recordingName: string;
    onProgress?: (changeState: onProgressType) => void;
    onSeek?: (seek: number) => void;
}

function VideoCardWithBoundingBox({path, onSeek, onProgress, state, title, subtitle, recordingName}: VideoCardBoundingBoxProps) {

    return (
        <>
        <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ height: '50px', width: '100%', display: 'flex', alignItems: 'center', paddingLeft: '10px'}}>
                <Typography>{title}</Typography>
            </Box>

            <Box sx={{ height: 'calc(100% - 50px)', width: '100%', position: 'relative' }}>
                    <VideoBoundingBoxPlayer
                        recordingName={recordingName}
                        path={path}
                        onProgress={onProgress}
                        onSeek={onSeek}
                        state={state}
                    ></VideoBoundingBoxPlayer>
            </Box>            
        </Card>
        </>
    );
}

export {VideoCardWithBoundingBox};