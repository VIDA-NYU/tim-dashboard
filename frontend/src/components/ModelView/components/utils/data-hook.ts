import {useVideoTime} from "./video-time";

export function preprocessResponse(response: any){
    if(response && Object.keys(response).includes("detail") && response["detail"] === "Not Found"){
        return []
    }else{
        return response;
    }
}

function useRecordingFrameData(currentTime, recordingData, reasoningData,
                               boundingBoxData, egovlpActionData, clipActionData){
    const {
        frameIndex: clipActionFrameIndex,
        frameData: clipActionFrameData
    } = useVideoTime(currentTime, clipActionData, recordingData);
    const {
        frameIndex: egovlpActionFrameIndex,
        frameData: egovlpActionFrameData
    } = useVideoTime(currentTime, egovlpActionData, recordingData)

    const {
        frameIndex: reasoningFrameIndex,
        frameData: reasoningFrameData
    } = useVideoTime(currentTime, reasoningData, recordingData);

    const {
        frameIndex: boundingBoxFrameIndex,
        frameData: boundingBoxFrameData
    } = useVideoTime(currentTime, boundingBoxData, recordingData);

    return {
        reasoningFrameData, egovlpActionFrameData, clipActionFrameData,
        boundingBoxFrameData
    }
}

export const prettyJSON = msg => msg ? JSON.stringify(JSON.parse(msg), null, 2) : msg

function useFrameData( currentTime, recordingData, reasoningData,
                   boundingBoxData, egovlpActionData, clipActionData){

    const {
        reasoningFrameData: recordingReasoningFrameData,
        egovlpActionFrameData: recordingEgovlpActionFrameData,
        clipActionFrameData: recordingClipActionFrameData,
        boundingBoxFrameData: recordingBoundingBoxFrameData
    } = useRecordingFrameData(
        currentTime, recordingData, reasoningData,
        boundingBoxData, egovlpActionData, clipActionData
    );
        return {
            reasoningFrameData: recordingReasoningFrameData,
            egovlpActionFrameData: recordingEgovlpActionFrameData,
            clipActionFrameData: recordingClipActionFrameData,
            boundingBoxFrameData: recordingBoundingBoxFrameData,
            currentTime: currentTime
        }
}

export {useRecordingFrameData, useFrameData};