import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import ReactPlayer from 'react-player';
import { MediaState } from "../HistoricalDataView";
import VideoBoundingBoxPlayer, {onProgressType} from "./player";

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
            <Card sx={{ maxWidth: 1200, width: 500 }}>
                <CardHeader
                    titleTypographyProps={{
                        fontSize: 16,
                    }}
                    title={title}
                    // subheader={this.props.path}
                />
                <CardContent>
                    <VideoBoundingBoxPlayer
                        recordingName={recordingName}
                        path={path}
                        onProgress={onProgress}
                        onSeek={onSeek}
                        state={state}
                    ></VideoBoundingBoxPlayer>
                </CardContent>
            </Card>
        </>
    );
}

export {VideoCardWithBoundingBox};