import {styled} from "@mui/material";
import VideoSummaryLine from "./video-summary-line/video-summary-line";
import {AnnotationData} from "../annotation/types";
import {generateStaticVideoSummary} from "./static";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import VideoSummaryEventImageView from "./video-summary-line/video-summary-event-image-view";
import VideoSummaryEventComp from "./video-summary-line/video-summary-event-comp";
import { useState } from "react";

interface VideoSummaryProps {
    recipeInstructions: Array<string>,
    annotationData: AnnotationData,
    currentTimeStampValue: number,
    state: any,
}


const Container = styled(Card)({
    flexBasis: 8,
    flexGrow: 7
})

const Content = styled("div")({
    display: "flex",
    flexDirection: "column"
})


const VideoSummaryLineContainer = styled(Card)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 12,
    marginTop: 5,
})

export default function VideoSummaryComp({annotationData, currentTimeStampValue,
                                             state, recipeInstructions}: VideoSummaryProps){

    const [focusedEvent, setFocusedEvent] = useState<number>(0);                
    
    let videoSummary = generateStaticVideoSummary();

    
    return (
        <Container>
            <CardHeader title={"Summary"} titleTypographyProps={{variant: "body1"}}></CardHeader>
            <Content>
                <VideoSummaryLineContainer>
                   <VideoSummaryLine 
                        setFocusedEvent={setFocusedEvent}
                        videoSummary={videoSummary}></VideoSummaryLine>
 
                </VideoSummaryLineContainer>
               {videoSummary.events.length > 0 && 
                    <VideoSummaryEventComp 
                        summaryEvent={videoSummary.events[focusedEvent]}
                    />}
            </Content>
        </Container>
    )
}