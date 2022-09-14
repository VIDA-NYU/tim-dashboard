// templates
import AccordionView from '../../templates/AccordionView/AccordionView';

// material
import {Box} from '@mui/system';

// temp
import JSONPretty from 'react-json-pretty';
import {EyeCanvas} from "./3d-eye-vis/canvas";
import {CardHeader, styled} from "@mui/material";
import Card from "@mui/material/Card";


const JsonDataContainer = styled(Card)(({}) => ({
    height: "100%",
    width: "600px",
    marginLeft: 30,
    // border: "solid",
    // borderRadius: 10
}))

const CanvasContainer = styled(Card)(({}) => ({
    width: "600px",
    height: "100%",
    // border: "solid",
    // borderRadius: 10,
    position: "relative",
    left: 0
}))

const JsonContent = styled("div")(({}) => ({
    // border: "solid",
    overflowY: "scroll",
    height: "100%",
    // borderRadius: 10,
    position: "relative",
    left: 0
}))


const EyesDataView = ({type, title, data, recordingName, state, onProgress, onSeek}: any) => {

    return (
        <AccordionView title='Eyes Data' height={300}>
            <Box sx={{alignItems: "center", display: 'flex', width: '100%', height: '100%', flexDirection: "row"}}>
                <CanvasContainer>
                    <CardHeader
                        titleTypographyProps={{
                            fontSize: 16,
                        }}
                        title={"Canvas"}></CardHeader>
                    <EyeCanvas state={state} data={data} width={"100px"}/>
                </CanvasContainer>
                <JsonDataContainer>
                    <CardHeader
                        titleTypographyProps={{
                            fontSize: 16,
                        }}
                        title={"JSON"}></CardHeader>
                    <JsonContent>
                        <JSONPretty data={data}></JSONPretty>
                    </JsonContent>
                </JsonDataContainer>
            </Box>
        </AccordionView>
    )
}

export default EyesDataView;