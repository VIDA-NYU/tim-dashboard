import {extractTimestampValue, parseVideoStateTime} from "./components/utils/video-time";
import ModelViewCompContainer from "./modelview-comp-container";
import {useVideoControl} from "./components/video/video-hook";
import ReplayPlayer from "./components/video/replay-player";
import Controls from './components/common/Controls';
import {preprocessResponse, useFrameData} from "./components/utils/data-hook";
import { useEffect, useState } from "react";
import { scaleLinear } from "d3";
import ObjectConfidenceThresholdAdjuster from "./components/object-comps/object-confidence-threshold-adjuster";

export interface InternalMetadata {
    objectConfidenceThreshold: number;
    entryTime: number
}

interface ModelViewDataConsumerProps {
    sessionInfo: any,
    playedTime: number,
    setTimestamps: (ranges: string[][]) => void
}

export default function ModelViewDataConsumer({sessionInfo, playedTime, setTimestamps}: ModelViewDataConsumerProps) {
    const [seekingPlayedTime, setSeekingPlayedTime] = useState<boolean>(false);
    const [internalMetadata, setInternalMetadata] = useState<InternalMetadata>({ objectConfidenceThreshold: 0, entryTime: 0 });
    // Update internalMetadata if the selected recording changes.
    useEffect(() => {
        let entryTime = extractTimestampValue(sessionInfo.recordingMetadata["first-entry"]);
        setInternalMetadata({...internalMetadata, entryTime: entryTime});
    }, [sessionInfo.recordingName]);

    // Update model view component if the timestamp is updated through Point Cloud viewer by hovering the red dots (user head location) in the plot.
    useEffect(() => {
        if (playedTime && totalDuration !== "0:0") {
            let duration = parseFloat(totalDuration);
            let xScale = scaleLinear()
                .range([0, 1]) // return
                .domain([0, duration]);
            const played_time = xScale(playedTime < 0 ? 0 : playedTime);
            handleSeekChangePlayedTime(played_time);
            setSeekingPlayedTime(true);
        }
    }, [playedTime]);
    useEffect(() => {
        if(seekingPlayedTime) {
            setSeekingPlayedTime(false);
            handleSeekMouseUpPlayedTime();
        }
    }, [seekingPlayedTime]);

    const recordingID = sessionInfo.recordingName;

    const recordingData =  preprocessResponse(sessionInfo.recordingMetadata);
    const egovlpActionData = preprocessResponse(sessionInfo.egovlpActionJSONFile);
    const clipActionData = preprocessResponse(sessionInfo.clipActionJSONFile);
    const reasoningData = preprocessResponse(sessionInfo.reasoningJSONFile);
    const boundingBoxData = preprocessResponse(sessionInfo.boundingBoxJSONFile);

    const handleSettingObjectConfidenceThreshold = (value) => {
        setInternalMetadata({...internalMetadata, objectConfidenceThreshold: value});
    }
    const {
        state,
        controlsRef, playerContainerRef, playerRef, canvasRef,
        toggleFullScreen, totalDurationValue, timeDisplayFormat,
        elapsedTime,
        handleDuration, handleProgress, handleRewind,
        handleSeekMouseDown, handleSeekMouseUp, handleSeekChange, handleSeekChangePlayedTime,
        handlePlayPause, handleDisplayFormat, handleFastForward,
        handleSeekingFromVideoCard, handlePlaybackRate, handleSeekMouseUpPlayedTime
    } = useVideoControl(recordingData)

    const {
        playing,
        controls,
        light,
        loop,
        playbackRate,
        pip,
        played,
        seeking,
        totalDuration,
        currentTime: recordingCurrentPlayedTime,
    } = state;

    let entryTime = extractTimestampValue(sessionInfo.recordingMetadata["first-entry"]);
    let recordingCurrentTime = Math.round(parseVideoStateTime(recordingCurrentPlayedTime) * 1000 + entryTime);

    const {reasoningFrameData, egovlpActionFrameData, clipActionFrameData, boundingBoxFrameData, currentTime} = useFrameData(
        recordingCurrentTime, recordingData, reasoningData,
        boundingBoxData, egovlpActionData, clipActionData );

    const videoPlayer =
    (<ReplayPlayer
        state={state}
        onProgress={(res) => handleProgress(res)}
        onSeek={res => handleSeekingFromVideoCard(res)}
        boundingBoxData={boundingBoxFrameData}
        internalMetadata={internalMetadata}
        currentTime={currentTime}
        mainCameraPath={sessionInfo.mainCameraPath}
    >
    </ReplayPlayer>);
    const videoControls = (
        <Controls
            ref={controlsRef}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            onDuration={handleDuration}
            onRewind={handleRewind}
            onPlayPause={handlePlayPause}
            onFastForward={handleFastForward}
            playing={playing}
            played={played}
            elapsedTime={elapsedTime}
            totalDuration={totalDurationValue}
            // onMute={hanldeMute}
            // muted={muted}
            // onVolumeChange={handleVolumeChange}
            // onVolumeSeekDown={handleVolumeSeekDown}
            onChangeDispayFormat={handleDisplayFormat}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRate}
            onToggleFullScreen={toggleFullScreen}
            // volume={volume}
            // onBookmark={addBookmark}
        />
    )

    const confidenceControl = (
        <ObjectConfidenceThresholdAdjuster
        thresholdValue={internalMetadata.objectConfidenceThreshold}
        onSettingThresholdValue={handleSettingObjectConfidenceThreshold}
    />
    )

    return (
        <ModelViewCompContainer
            state={state}
            currentTime={currentTime}
            recordingID={recordingID}
            recordingData={recordingData}
            reasoningData={reasoningData}
            reasoningFrameData={reasoningFrameData}
            boundingBoxData={boundingBoxData}
            boundingBoxFrameData={boundingBoxFrameData}
            egovlpActionData={egovlpActionData}
            egovlpActionFrameData={egovlpActionFrameData}
            clipActionData={clipActionData}
            clipActionFrameData={clipActionFrameData}
            videoControls={videoControls}
            videoPlayer={videoPlayer}
            confidenceControl={confidenceControl}
            setTimestamps={setTimestamps}
            internalMetadata={internalMetadata}
        />
    )

}