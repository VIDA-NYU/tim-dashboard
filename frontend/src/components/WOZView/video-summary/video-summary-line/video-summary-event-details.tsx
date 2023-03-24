import { Typography } from "@mui/material"
import { VideoSummaryEvent } from "../types";
import {styled} from "@mui/material";
import VideoSummaryLineEventGraphics from "./video-summary-line-event-graphics";


interface VideoSummaryEventDetailsProps {
    summaryEvent: VideoSummaryEvent
}

const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 28,
})


export default function VideoSummaryEventDetails({summaryEvent}: VideoSummaryEventDetailsProps){
    return (
        <Container>
            <Typography variant="h5"
                align="center"
            >
                {summaryEvent.type}
            </Typography>
            <Typography variant="body2"
                align="center"
            >
                {summaryEvent.desc}
            </Typography>
            
        </Container>
    )
}  