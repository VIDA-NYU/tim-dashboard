import { Box } from '@mui/material';
import { StreamView } from '../LiveDataView/components/StreamDataView/LiveStream';
import { DeticHandsChart } from '../LiveDataView/components/StreamDataView/LiveCharts';
import { ImageView } from '../LiveDataView/components/StreamDataView/ImageView';
import { ClipOutputsView, DeticOutputsView, DeticStateOutputsView } from '../LiveDataView/components/StreamDataView/PerceptionOutputsView';
import { ReasoningOutputsView } from '../LiveDataView/components/StreamDataView/ReasoningOutputsView';
import { DETIC_HANDS_STREAM, DETIC_IMAGE_STREAM, EGOVLP_ACTION_STEPS_STREAM, MAIN_STREAM, REASONING_CHECK_STREAM } from '../../config';

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
            <StreamView utf streamId={DETIC_IMAGE_STREAM} showStreamId={true} showTime={false}>
                {data => (<Box pt={"28px"}><DeticOutputsView data={JSON.parse(data)} /></Box>)}
            </StreamView>
        </Box>

        <Box sx={{ gridArea: 'M' }}><ImageView streamId={MAIN_STREAM} showStreamId={false} boxStreamId={DETIC_IMAGE_STREAM} confidence={0.5} debugMode={true}/></Box>

        <Box sx={{ gridArea: 'r' }}>
          <StreamView utf streamId={REASONING_CHECK_STREAM} showStreamId={true} showTime={false}>
            {data => (<Box><ReasoningOutputsView data={JSON.parse(data)} /></Box>)}
          </StreamView>
        </Box>
        <Box sx={{ gridArea: 'g' }}>
          <StreamView utf streamId={DETIC_IMAGE_STREAM} showTime={false}>
            {data => (<Box mt={-25} pt={"23px"}><DeticStateOutputsView data_={JSON.parse(data)} /></Box>)}
          </StreamView>
        </Box>
        {/* <Box sx={{ gridArea: 'e' }}><StreamView utf parse='prettyJSON' streamId={'reasoning'} /></Box> */}
      </>
  )
}

export default DebuggingDataView;
