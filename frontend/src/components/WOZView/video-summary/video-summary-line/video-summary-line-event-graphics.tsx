import {styled} from "@mui/material";
import {blueGrey, green, red} from "@mui/material/colors";
import {VideoSummaryEvent} from "../types";
import {ActionIcon, EntityIcon, SceneIcon} from "./icons";

interface VideoSummaryLineEventGraphicsProps {
    x: number,
    y: number,
    color: string,
    desc: string,
    type: "action"| "scene" | "entity"
}


const Container = styled("g")({

})

const renderIcon = (type: "action"| "scene" | "entity") => {
    if(type === "action"){
        return <ActionIcon/>
    }else if(type === "scene"){
        return <SceneIcon/>
    }else{
        return <EntityIcon/>
    }

}


export default function VideoSummaryLineEventGraphics({x, y, color, desc, type}: VideoSummaryLineEventGraphicsProps){
    return (
        <Container
            transform={`translate(${x}, ${y})`}
        >
            <circle
                cx={0}
                cy={0}
                r={25}
                fill={color}
            ></circle>
            {renderIcon(type)}
            {/*<ActionIcon/>*/}
            <text
                transform={`translate(${-12}, ${50})`}
                textAnchor={"middle"}
                >
                {desc}
            </text>

        </Container>
    )
}