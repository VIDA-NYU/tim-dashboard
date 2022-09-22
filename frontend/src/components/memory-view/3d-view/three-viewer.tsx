import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ReactPlayer from "react-player";
import {MediaState} from "../../HistoricalDataView";
import {GazeInfo, MemoryObject} from "../types";
import {MemoryCanvas} from "./three/canvas";
import EyeCanvas from "./three/tmp-canvas";
import {styled} from "@mui/material";

interface MemoryThreeViewProps {
    memoryObjects: Array<MemoryObject>,
    gazeInfo: GazeInfo
}

const ContentContainer = styled(CardContent)(()=>({
    width: 600,
    height: 400
}))

function MemoryThreeView ({gazeInfo, memoryObjects}: MemoryThreeViewProps){

    return (
        <>
            <ContentContainer>
                <MemoryCanvas memoryObjects={memoryObjects} gazeInfo={gazeInfo} />
                {/*<EyeCanvas />*/}
            </ContentContainer>
        </>
    )
}

export {MemoryThreeView};