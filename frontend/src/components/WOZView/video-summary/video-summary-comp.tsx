import {styled} from "@mui/material";
import VideoSummaryLine from "./video-summary-line/video-summary-line";
import {AnnotationData} from "../annotation/types";
import {generateFakeVideoSummary} from "./fake";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import VideoSummaryEventImageView from "./video-summary-line/video-summary-event-image-view";

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
    flexDirection: "row"
})


export default function VideoSummaryComp({annotationData, currentTimeStampValue,
                                             state, recipeInstructions}: VideoSummaryProps){

    let videoSummary = generateFakeVideoSummary();
    return (
        <Container>
            <CardHeader title={"Summary"} titleTypographyProps={{variant: "body1"}}></CardHeader>
            <Content>
                <VideoSummaryLine videoSummary={videoSummary}></VideoSummaryLine>
                <VideoSummaryEventImageView/>
            </Content>
        </Container>
    )
}