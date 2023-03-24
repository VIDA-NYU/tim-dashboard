import sample1 from "../samples/sample-1.png";
import sample2 from "../samples/sample-2.png";
import event1_1 from "../samples/event1-1.png";
import event1_2 from "../samples/event1-2.png";
import event1_3 from "../samples/event1-3.png";

import event_2_1 from "../samples/event2-1.png";
import event_2_2 from "../samples/event2-2.png";
import event_2_3 from "../samples/event2-3.png";

import event_3_1 from "../samples/event3-1.png";
import event_3_2 from "../samples/event3-2.png";
import event_3_3 from "../samples/event3-3.png";

import event_4_1 from "../samples/event4-1.png";
import event_4_2 from "../samples/event4-2.png";
import event_4_3 from "../samples/event4-3.png";

import { VideoSummaryEvent } from "../types";
import { styled } from "@mui/material";



interface VideoSummaryEventImageViewProps {
    summaryEvent: VideoSummaryEvent
}

const Container = styled("div")({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 18,
    marginRight: 18,
    marginBottom: 12,
    marginTop: 5,
})

export default function VideoSummaryEventImageView({summaryEvent}: 
    VideoSummaryEventImageViewProps){
        let eventSample1 = sample1;
        let eventSample2 = sample2;
        let eventSample3 = sample1;

        if(summaryEvent.timestampValue === 10){
            eventSample1 = event1_1;
            eventSample2 = event1_2;
            eventSample3 = event1_3;
        }else if(summaryEvent.timestampValue === 20){
            eventSample1 = event_2_1;
            eventSample2 = event_2_2;
            eventSample3 = event_2_3;
        }else if (summaryEvent.timestampValue === 35){
            eventSample1 = event_3_1;
            eventSample2 = event_3_2;
            eventSample3 = event_3_3;
        }else if (summaryEvent.timestampValue === 50){
            eventSample1 = event_4_1;
            eventSample2 = event_4_2;
            eventSample3 = event_4_3;
        }


    return (
        <Container>
            <img src={eventSample1} width={256} height={144}></img>
            <img src={eventSample2} width={256} height={144}></img>
            <img src={eventSample3} width={256} height={144}></img>
        </Container>
    )
}