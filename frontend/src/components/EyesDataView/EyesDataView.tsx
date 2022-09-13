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
        <Box sx={{ display: 'flex', width: '100%', height: '100%', overflow: 'auto' }}>
            <EyeCanvas data={data} />
        </Box>
    </AccordionView>
  )
}

export default EyesDataView;