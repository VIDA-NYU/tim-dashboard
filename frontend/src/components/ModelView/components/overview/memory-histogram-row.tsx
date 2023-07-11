import {Tooltip} from "react-svg-tooltip";
import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import { timestampRanges } from "../utils/utils";

interface HistogramRowProps {
    transform: string,
    detectedItems : {isVideoStart: boolean, data: {values: any[]}, threshold: number},
    cellSize: number,
    chartWidth: number,
    actionCellHeight: number
    yAxisLabelOffsetY: number,
    yAxisLabelWidth: number,
    index: number,
    xScale: (number) => number,
    playedTimes: Array<number>,
    timedData: any,
    selectedItem: string,
    setTimestamps: (ranges: string[][]) => void
}


function statusColorMap(status: string) : string{
    if (status == 'tracked') return '#00d000';
    else if (status == 'extended') return '#e0e000';
    else if (status == 'hand') return '#e00000';
    else if (status == 'outside') return '#4dd2ff';
    return '#111111';
}

export default function MemoryHistogramRow({transform, detectedItems, cellSize, chartWidth, actionCellHeight,
                                      yAxisLabelOffsetY, yAxisLabelWidth,
                                      index, xScale, playedTimes, timedData, selectedItem, setTimestamps}: HistogramRowProps){
    const rowTooltipRef = useRef(null);
    const labelRef = useRef(null);

    const [colorSelectedItem, setColorSelectedItem] = useState<string>("white");
    useEffect(() => {
        const mouseClickCircleElm = d3.select(labelRef.current);
        if(mouseClickCircleElm) {
            mouseClickCircleElm.on("click", function(mouse) {
                if(colorSelectedItem==="blue"){
                    setTimestamps([]);
                    setColorSelectedItem("white");
                } else {
                    const timesRanges = timestampRanges(playedTimes, timedData);
                    setTimestamps(timesRanges);
                    setColorSelectedItem("blue");
                }
            })
        }
    })
    const numId = timedData.label.split('-',3)[0];

    return (
        <g transform={transform}>
            <g>
                <rect
                    x={-10}
                    y={0}
                    width= {12}
                    height={10}
                    fill={null}
                    opacity={0}
                    ref={labelRef}
                >
                </rect>
                <circle
                    cx={-6}
                    cy={4}
                    r= {3}//{xScale(playedTimes[playedTimes.length - 1])}
                    fill={colorSelectedItem}
                    stroke={"grey"}
                    strokeWidth={"0.5"}
                    ref={labelRef}
                >
                </circle>
            </g>
            <g
                fillOpacity={detectedItems.isVideoStart ? '1' : detectedItems.data.values.filter(a => a.status != 'outside').map(a => a.id.toString()).includes(numId) ? "1" : '0.1'}
            >
                <g>
                    <text
                        x={0}
                        y={cellSize / 2 + yAxisLabelOffsetY}
                        fontSize = {"x-small"}
                    > {timedData.label}
                    </text>
                    <rect
                        x={-2}
                        y={-2}
                        width={detectedItems.isVideoStart ? 0 : detectedItems.data.values.filter(a => a.status != 'outside').map(a => a.id.toString()).includes(numId) ? yAxisLabelWidth : 0}
                        height={actionCellHeight+2}
                        fill={'#F8DE7E'} //still thinking about the color we need to use here
                        fillOpacity={0.4}
                    >
                    </rect>
                </g>
                <g transform={`translate(${yAxisLabelWidth}, 0)`} >
                    {
                        playedTimes.map((playedTime, i) => {
                            return (
                                <g
                                    key={`action-${index}-cell-${i}`}
                                    transform={`translate(${xScale(playedTime)}, ${0})`}
                                >
                                    <rect
                                        x={0}
                                        y={0}
                                        width={cellSize}
                                        height={actionCellHeight}
                                        fill={i in timedData.data? statusColorMap(timedData.data[i].status) : '#eeeeee'}
                                    >
                                    </rect>

                                </g>
                            )
                        })
                    }
                </g>

                {/* Tooltip */}
                <rect
                    x={1}
                    y={0}
                    width= {500}//{xScale(playedTimes[playedTimes.length - 1])}
                    height={actionCellHeight}
                    fill={null}
                    opacity={0}
                    ref={rowTooltipRef}
                ></rect>

                <Tooltip triggerRef={rowTooltipRef}>
                    <rect x={2} y={2} width={420} height={30} rx={.5} ry={.5} fill='#e3e3e3'/>
                    <text x={10} y={25} fontSize={20} fill='black'> {timedData.label} </text>
                </Tooltip>

            </g>
        </g>
    )
}
