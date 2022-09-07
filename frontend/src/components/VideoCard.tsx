import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import ReactPlayer from 'react-player';
import { MediaState } from "./HistoricalDataView";
import Chip from "@mui/material/Chip";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface VideoCardProps {
    title: string;
    subtitle?: string;
    path: string;
    state?: MediaState;
    onProgress?: (changeState: onProgressType) => void;
    onSeek?: (seek: number) => void;
    chip: boolean;
  }

export interface onProgressType {
    loaded: number;
    loadedSeconds: number;
    played: number;
    playedSeconds: number;
    totalDuration?: string;
    currentTime?: string;
}

function VideoCard(props: VideoCardProps) {

    const playerRef = useRef(null);
    const {
        playing,
        controls,
        light,
        loop,
        playbackRate,
        pip,
        played,
        seeking,
    } = props.state;
    useEffect(() => {
        const handleChangePlayed = (played) => {
            playerRef.current.seekTo(played)
        }
        if ((played || played===0 ) && seeking ) {
            handleChangePlayed(played);
         }
      }, [played]);

      const handleProgress  = (changeState: onProgressType) => {
        const duration = playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
        const currentTime = playerRef && playerRef.current
            ? playerRef.current.getCurrentTime()
            : "00:00";
        props.onProgress({...changeState, totalDuration: duration, currentTime: currentTime});
      }

      const handleSeeking = (e) => {
          props.onSeek(e);
      }
      const usedCameras= () => {
        if (props.chip){
          return <>
          <Chip icon={<CameraAltIcon fontSize="small"/>} label="Main" size="small" />
          <Chip icon={<CameraAltIcon fontSize="small"/>} label="Depth" size="small" style={{marginLeft: 8}} />
          </>
        }
        return <></>;
      }
    return (
        <>
        <Card sx={{ maxWidth: 1600 }}>
        <CardHeader
            titleTypographyProps={{
                fontSize: 16,
            }}
            title={props.title}
            subheader={usedCameras()}
        />
        <CardContent>
            <ReactPlayer
                ref = {playerRef}
                url={props.path}
                width='100%'
                height='100%'
                playing = {playing}
                controls = {false}
                playbackRate={playbackRate}
                onProgress={handleProgress}
                onSeek={handleSeeking}
            />
        </CardContent>
        </Card>
        </>
    );
}

export {VideoCard};