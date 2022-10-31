import {useEffect, useRef} from "react";
import * as d3 from "d3";
import {FrameMovement} from "./types";
import {max} from "d3";

const SvgWidth = 300;
const SvgHeight = 200;

interface IMUActivityBarChartProps {
    data: Array<FrameMovement>
}

function maxValue(a, b, c){
    if( a > b && a > c){
        return a
    }else if ( b > a && b > c){
        return b
    }else{
        return c;
    }
}

const leftColor = "steelblue"
const centerColor = "orange"
const rightColor = "pink"


function computePercentage(d, index, data){
    return Math.round(100 * d.frame/data.length)
}

function IMUActivityBarChart({data}: IMUActivityBarChartProps){

    const svgRef = useRef(null);
    const contentRef = useRef(null);

    const xAvisRef = useRef(null);
    const yAxisRef = useRef(null);
    const leftPathRef = useRef(null);
    const centerPathRef = useRef(null);
    const rightPathRef = useRef(null);

    const mouseHoverRef = useRef(null);
    const mouseHoverLeftCircleRef = useRef(null);
    const mouseHoverCenterCircleRef = useRef(null);
    const mouseHoverRightCircleRef = useRef(null);
    const mouseHoverTextRef = useRef(null);
    const mouseHoverTextLine0Ref = useRef(null);
    const mouseHoverTextLine1Ref = useRef(null);
    const mouseHoverTextLine2Ref = useRef(null);
    const mouseHoverTextLine3Ref = useRef(null);
    const mouseHoverTextRectRef = useRef(null);

    let marginX = 30;
    let marginY = 10;
    let contentHeight = 160;
    let contentWidth = 230;

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, (d, i) => d.frame))
        .range([0, contentWidth]);


    const yScale = d3.scaleLinear()
        .domain([0, 1.2 * d3.max(data, d=>maxValue(d[0], d[1], d[2]))]) 
        .range([contentHeight, 0]);

    useEffect(() => {
        let xAxisElm = d3.select(xAvisRef.current);
        let yAxisElm = d3.select(yAxisRef.current);

        let leftPathElm = d3.select(leftPathRef.current);
        let centerPathElm = d3.select(centerPathRef.current);
        let rightPathElm = d3.select(rightPathRef.current);

        if(xAxisElm){
            xAxisElm
                .call(d3.axisBottom(xScale).tickFormat(value => d3.format("d")(value) + "%"));
        }

        if(yAxisElm){
            yAxisElm.call(d3.axisLeft(yScale))
        }

        for(let i = 0; i < data.length; i++){
            let d = data[i];
        }

        if(leftPathElm){
            leftPathElm.datum(data)
                .attr("fill", "none")
                .attr("stroke", leftColor)
                .attr("stroke-width", 1.5)
                // @ts-ignore
                .attr("d", d3.line()
                    // @ts-ignore
                        .x(function(d) {  return xScale(d.frame) })
                    // @ts-ignore
                        .y(function(d) { return yScale(d[0]) })
                )
        }
        if(centerPathElm){
            centerPathElm.datum(data)
                .attr("fill", "none")
                .attr("stroke", centerColor)
                .attr("stroke-width", 1.5)
                // @ts-ignore
                .attr("d", d3.line()
                    // @ts-ignore
                        .x(function(d) {  return xScale(d.frame) })
                    // @ts-ignore
                        .y(function(d) { return yScale(d[1]) })
                )
        }
        if(rightPathElm){
            rightPathElm.datum(data)
                .attr("fill", "none")
                .attr("stroke", rightColor)
                .attr("stroke-width", 1.5)
                // @ts-ignore
                .attr("d", d3.line()
                    // @ts-ignore
                    .x(function(d, i) {  return xScale(d.frame) })
                    // @ts-ignore
                    .y(function(d) { return yScale(d[2]) })
                )
        }



    }, [xScale, yScale])


    let inferX = (mouse) => {
        const [minX, maxX] = d3.extent(data, d=>d.frame);
        const [xCord,yCord] = d3.pointer(mouse);
        const ratio = xCord / contentWidth;
        const mouseX = minX + Math.round(ratio * (maxX - minX));

        let mouseFrameData = data.find(d => d.frame === mouseX);
        let mouseFrame = 0;
        if(mouseFrameData){
            mouseFrame = mouseFrameData.frame;
        }
        return mouseFrame;
    }


    useEffect(() => {

        const contentElm = d3.select(contentRef.current);
        const mouseHoverElm = d3.select(mouseHoverRef.current);
        const mouseHoverLeftCircleElm = d3.select(mouseHoverLeftCircleRef.current);
        const mouseHoverCenterCircleElm = d3.select(mouseHoverCenterCircleRef.current);
        const mouseHoverRightCircleElm = d3.select(mouseHoverRightCircleRef.current);
        const mouseHoverTextElm = d3.select(mouseHoverTextRef.current);

        const mouseHoverTextLine0Elm = d3.select(mouseHoverTextLine0Ref.current)
        const mouseHoverTextLine1Elm = d3.select(mouseHoverTextLine1Ref.current)
        const mouseHoverTextLine2Elm = d3.select(mouseHoverTextLine2Ref.current)
        const mouseHoverTextLine3Elm = d3.select(mouseHoverTextLine3Ref.current);

        const mouseHoverTextRectElm = d3.select(mouseHoverTextRectRef.current);

        if(contentElm && mouseHoverElm && mouseHoverLeftCircleElm && mouseHoverCenterCircleElm &&
            mouseHoverRightCircleElm && mouseHoverTextElm &&
            mouseHoverTextLine0Elm && mouseHoverTextLine1Elm && mouseHoverTextLine2Elm &&
            mouseHoverTextLine3Elm && mouseHoverTextRectElm
        ) {
            contentElm.on("mouseover", function(mouse) {
                contentElm.style('display', 'block');
            })

            contentElm.on("mousemove", function (mouse){
                let mouseFrame = inferX(mouse);
                const leftValue = data.find(d => d.frame === mouseFrame)[0];
                const centerValue = data.find(d => d.frame === mouseFrame)[1];
                const rightValue = data.find(d => d.frame === mouseFrame)[2];
                mouseHoverElm.attr("transform", `translate(${xScale(mouseFrame)}, 0)`);
                mouseHoverLeftCircleElm.attr("cy", yScale(leftValue));
                mouseHoverCenterCircleElm.attr("cc", yScale(centerValue));
                mouseHoverRightCircleElm.attr("cy", yScale(rightValue));
                mouseHoverTextLine0Elm.text(`video: ${mouseFrame}%`);
                mouseHoverTextLine1Elm.text(`x axis: ${leftValue.toFixed(2)}`);
                mouseHoverTextLine2Elm.text(`y axis: ${rightValue.toFixed(2)}`)
                mouseHoverTextLine3Elm.text(`z axis: ${rightValue.toFixed(2)}`);
                mouseHoverTextElm
                    .attr('text-anchor', mouseFrame < (data.length) / 2 ? "start" : "end")
                    .attr("transform",  `translate(8, 30)`)
                mouseHoverTextRectElm.attr("transform", mouseFrame < (data).length / 2 ? `translate(3, 22)`: `translate(-80, 22)`);
                ;
            })
        }

    })

    return (
        <div>
            <svg ref={svgRef} width={SvgWidth} height={SvgHeight}>
                <defs>
                    <filter id="f1" x="0" y="0" width="200%" height="200%">
                        <feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />
                        <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                                       values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.3 0" />
                        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="1" />
                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />    </filter>
                </defs>
                <g
                    transform={`translate(${marginX}, ${marginY})`}
                    ref={contentRef}
                >
                    <g
                        ref={xAvisRef}
                        transform={`translate(0,${contentHeight})`}
                    >
                    </g>

                    <g
                        ref={yAxisRef}
                    ></g>

                    <path
                        ref={leftPathRef}
                    >
                    </path>

                    <path
                        ref={centerPathRef}
                    >

                    </path>

                    <path
                        ref={rightPathRef}
                    >

                    </path>

                    <g
                        ref={mouseHoverRef}
                    >
                        <rect
                            width={2}
                            x={-1}
                            height={contentHeight}
                            fill={"lightgray"}
                        >
                        </rect>

                        <circle
                            r={3}
                            stroke={leftColor}
                            ref={mouseHoverLeftCircleRef}
                            fill={"none"}
                        >
                        </circle>

                        <circle
                            r={3}
                            stroke={centerColor}
                            ref={mouseHoverCenterCircleRef}
                            fill={"none"}
                        >
                        </circle>

                        <circle
                            r={3}
                            stroke={rightColor}
                            ref={mouseHoverRightCircleRef}
                            fill={"none"}
                        >
                        </circle>
                        <rect
                            ref={mouseHoverTextRectRef}
                            width={94}
                            height={42}
                            fill={"#fdfdfd"}
                            transform={"translate(5, 19)"}
                            filter="url(#f1)"
                            rx={3}
                        >

                        </rect

                        >
                        <text
                            ref={mouseHoverTextRef}
                            transform={"translate(36, 50)"}
                            fontSize={12}
                            textAnchor={"start"}

                        >
                            <tspan x="0" dy=".6em"
                                   ref={mouseHoverTextLine0Ref}></tspan>
                            <tspan
                                fill={leftColor}
                                x="0" dy=".8em" ref={mouseHoverTextLine1Ref}></tspan>
                            <tspan
                                fill={centerColor}
                                x="0" dy=".9em" ref={mouseHoverTextLine2Ref}></tspan>
                            <tspan
                                fill={rightColor}
                                x="0" dy=".9em" ref={mouseHoverTextLine3Ref}></tspan>
                        </text>



                    </g>
                    <g
                        transform={"translate(190, 0)"}
                    >
                        <g transform={"translate(0, 0)"}>
                            <circle
                                fill={leftColor}
                                r={5}
                                cx={0}
                                cy={2.5}
                            ></circle>
                            <text
                                x={12}
                                y={6}
                                fontSize={12}
                            >
                                X Axis
                            </text>
                        </g>
                        <g transform={"translate(0, 0)"}>
                            <circle
                                fill={centerColor}
                                r={5}
                                cx={0}
                                cy={2.5}
                            ></circle>
                            <text
                                x={12}
                                y={6}
                                fontSize={12}
                            >
                                Y Axis
                            </text>
                        </g>
                        <g transform={"translate(0, 18)"}>
                            <circle
                                fill={rightColor}
                                r={5}
                                cx={0}
                                cy={2.5}
                            ></circle>
                            <text
                                x={12}
                                y={6}
                                fontSize={12}
                            >
                                Z Axis
                            </text>
                        </g>

                    </g>

                </g>
            </svg>
        </div>
    )

}

export default IMUActivityBarChart;
