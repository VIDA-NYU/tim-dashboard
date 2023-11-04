import { Box } from '@mui/material';
import { StreamView } from '../LiveDataView/components/StreamDataView/LiveStream';
import { DeticHandsChart } from '../LiveDataView/components/StreamDataView/LiveCharts';
import { ImageView } from '../LiveDataView/components/StreamDataView/ImageView';
import { ClipOutputsView, DeticOutputsView, DeticStateOutputsView, MemoryOutputsView } from '../LiveDataView/components/StreamDataView/PerceptionOutputsView';
import { PauseView, ReasoningOutputsView, ResetView } from '../LiveDataView/components/StreamDataView/ReasoningOutputsView';
import { DETIC_HANDS_STREAM, DETIC_IMAGE_STREAM, DETIC_MEMORY, EGOVLP_ACTION_STEPS_STREAM, MAIN_STREAM, PAUSE_REASONING, REASONING_CHECK_STREAM, RESET_REASONING } from '../../config';

function DebuggingDataView() {
  return (
    <>
        {/* <Box sx={{ gridArea: 'h',  marginTop: "-10px"}}><StreamView utf parse='prettyJSON' streamId={DETIC_IMAGE_STREAM} /></Box> */}
        {/* <Box sx={{ gridArea: 'i' }}><StreamView utf parse='prettyJSON' streamId={DETIC_HANDS_STREAM} /></Box> */}
        {/* <Box sx={{ gridArea: 'g' }}>
          <StreamView utf streamId={DETIC_HANDS_STREAM} showStreamId={false} showTime={false}>
              {(data, time) => <DeticHandsChart data={{ ...JSON.parse(data), time }} />}
          </StreamView>
        </Box> */}
        <Box sx={{ gridArea: 'h'}}>
            <StreamView utf streamId={DETIC_MEMORY} showStreamId={true} showTime={false}>
                {data => (<Box pl={2} pb={3} pr={1} pt={"28px"} style={{width: '100%', borderRadius: '8px', border: '2px solid #e3f2fd', fontSize: '13px'}}><MemoryOutputsView data={JSON.parse(data)} /></Box>)}
            </StreamView>
        </Box>
        <Box sx={{ gridArea: 'g'}}>
          <StreamView utf streamId={DETIC_MEMORY} showTime={false}>
            {data => (<Box pl={2} pb={3} pr={1} pt={"23px"} style={{width: '100%', borderRadius: '8px', border: '2px solid #e3f2fd', fontSize: '13px'}}><DeticStateOutputsView data_={JSON.parse(data)} /></Box>)}
          </StreamView>
        </Box>
        <Box sx={{ gridArea: 'M' }}><ImageView streamId={MAIN_STREAM} showStreamId={false} boxStreamId={DETIC_IMAGE_STREAM} confidence={0.5} debugMode={true}/></Box>
        <Box sx={{ gridArea: 'i', gridRow: '1' }}>
          <StreamView utf streamId={PAUSE_REASONING} showStreamId={false} showTime={false} showStreamStatus={false}>
            {data => (<Box pt={"3px"}><PauseView data={data} /></Box>)}
          </StreamView>
          <StreamView utf streamId={RESET_REASONING} showStreamId={false} showTime={false} showStreamStatus={false}>
            {data => (<Box pt={"3px"}><ResetView data={data} /></Box>)}
          </StreamView>
        </Box>
        <Box sx={{ gridArea: 'r' }}>
          <StreamView utf streamId={REASONING_CHECK_STREAM} showStreamId={true} showTime={false}>
            {data => (<Box pb={3} style={{width: '100%', borderRadius: '8px', border: '2px solid #e3f2fd', fontSize: '14px'}}><ReasoningOutputsView data={JSON.parse(data)} /></Box>)}
          </StreamView>
        </Box>
        
        {/* <Box sx={{ gridArea: 'e' }}><StreamView utf parse='prettyJSON' streamId={'reasoning'} /></Box> */}
      </>
  )
}

export default DebuggingDataView;
