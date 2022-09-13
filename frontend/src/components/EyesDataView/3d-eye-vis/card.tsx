import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ReactPlayer from "react-player";
import {EyeCanvas} from "./canvas";
import {MediaState} from "../../HistoricalDataView";

interface EyeDataViewProps {
    data: any,
    state: MediaState
}

function EyeDataCard ({data, state}: EyeDataViewProps){

    return (
        <>
                <CardContent>
                    <EyeCanvas state={state} data={data} />
                </CardContent>
        </>
    )
}

export {EyeDataCard};