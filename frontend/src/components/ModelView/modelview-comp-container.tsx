import {Box, styled} from "@mui/material";
import {ReactElement} from "react";
import ErrorAlert from "./components/common/error-alert";
import TemporalOverview from "./components/overview/temporal-overview";
import { InternalMetadata } from "./modelview-data-consumer";

interface WozCompContainerProps {
    state: any
    recordingID: string,
    recordingData: any,
    reasoningData: any,
    reasoningFrameData: any,
    boundingBoxData: any,
    boundingBoxFrameData: any,
    clipActionData: any,
    clipActionFrameData: any,
    egovlpActionData: any,
    egovlpActionFrameData: any,
    videoPlayer: ReactElement,
    videoControls: ReactElement,
    currentTime: number,
    confidenceControl: ReactElement,
    setTimestamps: (ranges: string[][]) => void,
    internalMetadata: InternalMetadata
}


const Container = styled("div")({});

export default function ModelViewCompContainer({
                                             state,
                                             recordingData, reasoningData, reasoningFrameData,
                                             boundingBoxData, boundingBoxFrameData,
                                             egovlpActionData, egovlpActionFrameData,
                                             clipActionData, clipActionFrameData, videoPlayer,
                                             videoControls, currentTime,
                                             confidenceControl, setTimestamps,
                                             internalMetadata
                                         }: WozCompContainerProps) {
 
    const renderTemporalOverview = () => {
        if(recordingData && boundingBoxData){

            return (<TemporalOverview
                currentTime={currentTime}
                boundingBoxFrameData={boundingBoxFrameData}
                reasoningFrameData={reasoningFrameData}
                internalMetadata={internalMetadata}
                state={state}
                clipActionData={clipActionData}
                egovlpActionData={egovlpActionData}
                clipActionFrameData={clipActionFrameData}
                egovlpActionFrameData={egovlpActionFrameData}
                reasoningData={reasoningData}
                boundingBoxData={boundingBoxData}
                recordingMeta={recordingData}
                setTimestamps={setTimestamps}
            ></TemporalOverview>)
        }else if ((!reasoningData || reasoningData.length === 0)) {
            return (<ErrorAlert message={"Reasoning data is not available for this recording"}/>)
        }

    }

    return (
        <Container>
            <Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
                        gap: 1,
                        gridTemplateRows: 'auto',
                        gridTemplateAreas: {
                            md: `
              "H H H H H H"
              "H H H H H H"
              "M M M M M M"
              "N N N N N N"
              "r r r r r r"
              "r r r r r r"
              "g g g g g g"
              "g g g g g g"
              "g g g g g g"
          `,
                            xs: `
              "H H H H H H"
              "H H H H H H"
              "M M M M M M"
              "M M M M M M"
              "M M M M M M"
              "M M M M M M"
              "g g g g g g"
              "a a a b b b"
              "e e e e e e"
              "c c c d d d"
          `
                        },
                    }}>
                    {/*{recordingData && videoPlayer }*/}
                    <Box sx={{gridArea: 'M'}}>
                        {recordingData && videoPlayer}
                    </Box>
                    {/*{Video Player Controls }*/}
                    <Box
                        sx={{gridArea: "N"}}
                    >
                        {videoControls}
                    </Box>
                    <Box
                        sx={{gridArea: "r"}}
                    >
                        {confidenceControl}
                    </Box>
                    {/*{Action and Object Temporal Overview }*/}
                    <Box sx={{gridArea: 'g'}}>
                        {
                            renderTemporalOverview()

                        }
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}