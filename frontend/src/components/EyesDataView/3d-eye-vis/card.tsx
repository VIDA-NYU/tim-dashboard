import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ReactPlayer from "react-player";
import {EyeCanvas} from "./canvas";

interface EyeDataViewProps {
    data: any
}

function EyeDataCard ({data}: EyeDataViewProps){

    return (
        <>
                <CardContent>
                    <EyeCanvas data={data} />
                </CardContent>
        </>
    )
}

export {EyeDataCard};