// react
import { useEffect, useState } from 'react';

// material
import Box from '@mui/material/Box';
// import { TimestampManager } from '../PointCloudViewerBak/controller/TimestampManager';
import { EventsManager } from '../../tabs/HistoricalDataView/services/EventsManager';
import ModelViewDataConsumer from "./modelview-data-consumer";
import TimestampManager from '../../tabs/HistoricalDataView/services/TimestampManager';

const ModelView = ({...props}) => {

  const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);

  useEffect( () => {
    const onTimestampChange = (event: any) => {
      setCurrentTimestamp(event.timestamp);
    };

    // subscribing
    EventsManager.subscribe( 'onTimestampSelected', onTimestampChange );

  }, []);

  return (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* <h1>{currentTimestamp} ---</h1> */}
        <ModelViewDataConsumer
            sessionInfo={props.sessionInfo}
            playedTime = {currentTimestamp ? TimestampManager.get_elapsed_time(currentTimestamp) : 0}
            setTimestamps={props.setTimestamps}
        />;
    </Box>
  )

};

export default ModelView;
