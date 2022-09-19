import {styled} from "@mui/material";
import ReactPlayer from "react-player";
import {MediaState} from "../HistoricalDataView";
import {useEffect, useRef, useState} from "react";

import boundingBoxData from "./samples/coffee-test-2.json";
import {locateFrame, preprocessBoundingBoxData} from "./utils/wrapper";
import data from "bootstrap/js/src/dom/data";

interface VideoBoundingBoxPlayerProps {
    recordingName: string,
    path: string;
    state?: MediaState;
    onProgress?: (changeState: onProgressType) => void;
    onSeek?: (seek: number) => void;
};

export interface onProgressType {
    loaded: number;
    loadedSeconds: number;
    played: number;
    playedSeconds: number;
    totalDuration?: string;
    currentTime?: string;
}


const Container = styled("div")(({}) => ({
    position: "relative",
    top: 0,
    left: 0,
    // zIndex: 10,
}))

const BoundingBoxCanvas = styled("canvas")(({}) => ({
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    width: "100%",
    height: "100%"
}))


function VideoBoundingBoxPlayer({recordingName, state, onSeek, onProgress, path}: VideoBoundingBoxPlayerProps) {

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
    } = state;

    const data = require(`./samples/${recordingName}.json`);

    useEffect(() => {
        const handleChangePlayed = (played) => {
            playerRef.current.seekTo(played)
        }
        if ((played || played === 0) && seeking) {
            handleChangePlayed(played);
        }
    }, [played]);

    const handleProgress = (changeState: onProgressType) => {
        const duration = playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
        const currentTime = playerRef && playerRef.current
            ? playerRef.current.getCurrentTime()
            : "00:00";
        onProgress({...changeState, totalDuration: duration, currentTime: currentTime});
    }

    const handleSeeking = (e) => {
        onSeek(e);
    }
    const processedBoundingBoxData = preprocessBoundingBoxData(boundingBoxData);
    const canvasRef = useRef<HTMLCanvasElement>();

    const seekBoundingBox = (targetPlayed: number) => {
        const threshold = 0.1;
        if(targetPlayed < threshold){
            return undefined
        }
        return locateFrame(processedBoundingBoxData, targetPlayed)
    }

    useEffect(() => {
    }, [state])


    const [count, setCount] = useState<number>(0);
    // let count = 0;
    useEffect(() => {
        // dynamically assign the width and height to canvas
        const canvasEle = canvasRef.current;
        if (canvasEle) {
            // canvasEle.width = canvasEle.clientWidth;
            // canvasEle.height = canvasEle.clientHeight;

            // get context of the canvas
            let ctx = canvasEle.getContext("2d");

            let x = (count % 50) * 20;
            let videoWidth = ctx.canvas.width;
            let videoHeight = ctx.canvas.height;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            ctx.beginPath();
            let frameData = seekBoundingBox(played * processedBoundingBoxData.length);
            if (frameData && frameData.objects) {
                for (let object of frameData.objects) {
                    ctx.rect(object.loc2D.x * videoWidth, object.loc2D.y * videoHeight,
                        object.width * videoWidth, object.height * videoHeight);
                    ctx.font = "10px Arial";
                    ctx.fillStyle = "#ff00ff";
                    ctx.fillText(`${object.object}: ${object.instruction}`, object.loc2D.x * videoWidth, object.loc2D.y * videoHeight);
                    ctx.stroke();
                    ;
                }
            }

            // let timeRecord = seekBoundingBox(st)

            setCount(value => value + 1)
        }

    }, [played]);


    return (
        <Container>
            <ReactPlayer
                sx={{
                    position: "fixed"
                }}
                ref={playerRef}
                url={path}
                width='100%'
                height='100%'
                playing={playing}
                controls={false}
                playbackRate={playbackRate}
                onProgress={handleProgress}
                onSeek={handleSeeking}
            ></ReactPlayer>
            <BoundingBoxCanvas
                ref={canvasRef}
            >
            </BoundingBoxCanvas>
        </Container>
    )
}

export default VideoBoundingBoxPlayer;