import {GazeInfo, MemoryObject} from "./types";
import Card from "@mui/material/Card";
import {useStreamData} from "../../api/rest";
import React, {useEffect, useMemo, useState} from "react";
import {prettyJSON} from "../LiveStream";
import MemoryObjectList from "./memory-object-list";
import {processMemoryStream} from "./utils";
import {StreamInfo} from "../LiveStream";
import Memory3DScatter from "./3d-view/3d-scatter";
import {FormControlLabel, styled, Switch} from "@mui/material";
import SampleData from "./sample.json";
import {MemoryThreeView} from "./3d-view/three-viewer";

interface MemoryObjectCardProps{
    memoryObject: MemoryObject
}

const ControlPanel = styled("div")(() => ({
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-end"
}))

export const memoryFormatter = msg => msg ? JSON.parse(msg) : msg

const jsonFormatter = msg => msg? JSON.parse(msg) : msg;

function extractGazeInfo(eyeData: any) : GazeInfo{
    if(!eyeData ){
        return {
            gazeOrigin: [0, 0, 0],
            gazeDirection: [0, 1, 2]
        }
    }
    return {
        gazeOrigin: [eyeData.GazeOrigin.x, eyeData.GazeOrigin.y, eyeData.GazeOrigin.z],
        gazeDirection: [-eyeData.GazeDirection.x, eyeData.GazeDirection.y, eyeData.GazeDirection.z]
    }
}

export const MemoryObjectView = ({ streamId, eyeStreamId }) => {
    const { sid, time, data, readyState } = useStreamData({ streamId, utf: true  })
    const {data: eyeData} = useStreamData({streamId: eyeStreamId, utf: true});

    let formattedEyeData = jsonFormatter(eyeData);
    let gazeInfo = extractGazeInfo(formattedEyeData);
    const formatted = useMemo(() => data && memoryFormatter ? memoryFormatter(data) : data, [data])
    const [shown3d, setShown3D] = useState<boolean>(true)
    const [lastMemoryObjects, setLastMemoryObjects] = useState<Array<MemoryObject>>([]);



    let memoryObjects: Array<MemoryObject>;
    if(!formatted){
        memoryObjects = undefined // processMemoryStream(SampleData);
    }else{
        memoryObjects = processMemoryStream(formatted)
    }
    let fetchedObjectNum = memoryObjects?memoryObjects.length:0;
    useEffect(() => {
        if(memoryObjects && memoryObjects.length > 0){
            setLastMemoryObjects(memoryObjects);
        }
    }, [fetchedObjectNum])

    let chooseMemoryObjects = (memoryObjects, lastMemoryObjects) => {
        if(memoryObjects && memoryObjects.length > 0){
            return memoryObjects;
        }else {
            return lastMemoryObjects;
        }
    }
    return (

        <StreamInfo sid={sid||streamId} time={time} data={data} readyState={readyState}>
            <ControlPanel>
                <FormControlLabel
                    control={
                        <Switch
                            checked={shown3d}
                            onChange={() => {
                                setShown3D(oldValue => !oldValue)
                            }}
                            defaultChecked />
                    }
                    label="3D"
                />
            </ControlPanel>

            {shown3d && <MemoryThreeView memoryObjects={chooseMemoryObjects(memoryObjects, lastMemoryObjects)} gazeInfo={gazeInfo}/>}
            { !shown3d && <MemoryObjectList memoryObjects={chooseMemoryObjects(memoryObjects, lastMemoryObjects)}></MemoryObjectList>}
            {/*{ shown3d && <Memory3DScatter gazeInfo={gazeInfo} memoryObjects={memoryObjects}></Memory3DScatter>}*/}
        </StreamInfo>
    )
}


