import styled from "@emotion/styled";
import { VideoSummaryEvent } from "../types";
import VideoSummaryEventImageView from "./video-summary-event-image-view";
import VideoSummaryEventDetails from "./video-summary-event-details";
import { Card } from "@mui/material";

interface VideoSummaryEventCompProps {
    summaryEvent: VideoSummaryEvent
}


const Container = styled(Card)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 12,
    marginTop: 5,
})


export default function VideoSummaryEventComp({summaryEvent}: VideoSummaryEventCompProps){
    return (
        <Container>
            <VideoSummaryEventDetails
                summaryEvent={summaryEvent}
            />
            <VideoSummaryEventImageView
                summaryEvent={summaryEvent}
            />
        </Container>
    )
}