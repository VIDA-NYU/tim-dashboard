// templates
import AccordionView from '../../templates/AccordionView/AccordionView';

// material
import { Box } from '@mui/system';

// temp
import JSONPretty from 'react-json-pretty';
import {EyeCanvas} from "./3d-eye-vis/canvas";


const EyesDataView = ({ type, title, data, recordingName, state, onProgress, onSeek }: any) => {
  
  return (
    <AccordionView title='Eyes Data' height={300}>
        <Box sx={{ alignItems: "center", display: 'flex', width: '50%', height: '100%', overflow: 'auto', flexDirection: "row" }}>
            <EyeCanvas state={state} data={data} />
            <Box sx={{overflowY: "scroll", overflow: "auto"}}>
                <JSONPretty data={data}></JSONPretty>
            </Box>
        </Box>
    </AccordionView>
  )
}

export default EyesDataView;