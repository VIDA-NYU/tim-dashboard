import {useToken} from "../../api/TokenContext";
import {useGetAllRecordings, useGetRecipeInfo, useGetRecipes, useGetStreamInfo} from "../../api/rest";
import {extractTimestampValue, parseVideoStateTime} from "./components/utils/video-time";
import ModelViewCompContainer from "./modelview-comp-container";
import {useVideoControl} from "./components/video/video-hook";
import {dataType} from '../../api/types'; //"../../../api/types";
import ReplayPlayer from "./components/video/replay-player";
import Controls from '../../utils/Controls';
import {preprocessResponse, useFrameData} from "./components/utils/data-hook";
import {filterObjectWithRecipe, generateRecipeObjectIndex} from "./components/object-comps/utils";
import {AnnotationData, AnnotationMeta} from "./components/annotation/types";
import {buildNewAnnotationMeta, computeCurrentStep, setNewObjectConfidenceThreshold} from "./components/annotation/utils";
import {syncWithVideoTime} from "./components/video/utils/wrapper";
import { useEffect, useState } from "react";
import { scaleLinear } from "d3";
import ObjectConfidenceThresholdAdjuster from "./components/object-comps/object-confidence-threshold-adjuster";

interface ModelViewDataConsumerProps {
    sessionInfo: any,
    annotationData: AnnotationData,
    playedTime: number,
    setAnnotationData: (newData: AnnotationData) => void,
    setTimestamps: (ranges: string[][]) => void
}

export default function ModelViewDataConsumer({sessionInfo, playedTime, annotationData, setAnnotationData, setTimestamps}: ModelViewDataConsumerProps) {
    const [seekingPlayedTime, setSeekingPlayedTime] = useState<boolean>(false);
    // Update annotationData if the selected recording changes. 
    const setAnnotationMeta = (newMeta: AnnotationMeta) => {
        setAnnotationData({
            ...annotationData,
            meta: newMeta
        })
    }
    useEffect(() => {
        setAnnotationMeta(buildNewAnnotationMeta({
            ...annotationData.meta,
            id: sessionInfo.recordingName,
            entryTime: extractTimestampValue(sessionInfo.recordingMetadata["first-entry"])
        }));
    }, [sessionInfo.recordingName]);
    // end Update annotationData

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
        setAnnotationData(setNewObjectConfidenceThreshold(annotationData, value));
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

    let recordingCurrentTime = Math.round(parseVideoStateTime(recordingCurrentPlayedTime) * 1000 + annotationData.meta.entryTime);

    const {reasoningFrameData, egovlpActionFrameData, clipActionFrameData, boundingBoxFrameData, currentTime} = useFrameData(
        annotationData.meta.mode, recordingCurrentTime, recordingData, reasoningData,
        boundingBoxData, egovlpActionData, clipActionData );

    const videoPlayer =
    (<ReplayPlayer
        type={dataType.VIDEO}
        data={recordingData}
        title={"Cameras"}
        state={state}
        recordingName={recordingID}
        onProgress={(res) => handleProgress(res)}
        onSeek={res => handleSeekingFromVideoCard(res)}
        boundingBoxData={boundingBoxFrameData}
        annotationData={annotationData}
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
        thresholdValue={annotationData.perceptronParameters.objectConfidenceThreshold}
        onSettingThresholdValue={handleSettingObjectConfidenceThreshold}
    />
    )
    const recipePicker = (
        <div/>
    )
    const currentStep = computeCurrentStep(annotationData, 0, currentTime);

    return (
        <ModelViewCompContainer
            state={state}
            currentTime={currentTime}
            currentStep={currentStep}
            recordingID={recordingID}
            recordingData={recordingData}
            reasoningData={reasoningData}
            reasoningFrameData={reasoningFrameData}
            boundingBoxData={boundingBoxData}
            boundingBoxFrameData={boundingBoxFrameData}
            // boundingBoxFrameData={syncWithVideoTime(currentTime, state, annotationData.meta.entryTime, filterObjectWithRecipe(boundingBoxFrameData, generateRecipeObjectIndex(recipeData)))}
            egovlpActionData={egovlpActionData}
            egovlpActionFrameData={egovlpActionFrameData}
            clipActionData={clipActionData}
            clipActionFrameData={clipActionFrameData}
            videoControls={videoControls}
            videoPlayer={videoPlayer}
            recipePicker={recipePicker}
            confidenceControl={confidenceControl}
            setTimestamps={setTimestamps}
        />
    )

}