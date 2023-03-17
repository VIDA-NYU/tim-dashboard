import {styled} from "@mui/material";
import {scaleLinear, axisBottom, select} from "d3";
import {VideoSummary} from "../types";
import VideoSummaryLineEventGraphics from "./video-summary-line-event-graphics";
import {blueGrey, green, red} from "@mui/material/colors";
import {VideoSummaryEvent} from "../types";
import {useEffect, useRef} from "react";

interface VideoSummaryLineProps {
    videoSummary: VideoSummary
}

const StyledSVG = styled("svg")({
    width: "2200px"
})

const Fake_Data = [
    {}
]


export default function VideoSummaryLine({videoSummary}: VideoSummaryLineProps){

    let xAxisRef = useRef();

    let width = 1000;

    const xLiner = scaleLinear([0, 900]).domain([0, 60])

    const xMargin = 10;
    const yMargin = 20;

    let colorMap = (videoSummaryEvent: VideoSummaryEvent) => {

        if (videoSummaryEvent.type === "action") {
            return red[500];
        } else if (videoSummaryEvent.type === "scene") {
            return green[500]
        } else {
            return blueGrey[500];
        }
    };

    useEffect(() => {
        if(xAxisRef.current){
            const xAxis = axisBottom(xLiner).tickValues([]);
            // @ts-ignore
            select(xAxisRef.current).call(xAxis);
        }
    }, [xLiner]);

    const xAxisY = 60;
    return (
        <StyledSVG
            width={width+1200}
            height={200}
        >
            <g
                transform={`translate(${xMargin}, ${yMargin})`}
            >
                <g transform={`translate(10, 50)`}>
                    <g >
                        {
                            videoSummary.events.map((event, i) => (
                                <VideoSummaryLineEventGraphics
                                    x={xLiner(event.timestampValue)} y={0} color={colorMap(event)}
                                    desc={event.desc} type={event.type}
                                />
                            ))
                        }
                    </g>
                    <g ref={xAxisRef}>
                </g>


                </g>
            </g>


        </StyledSVG>
    )
}