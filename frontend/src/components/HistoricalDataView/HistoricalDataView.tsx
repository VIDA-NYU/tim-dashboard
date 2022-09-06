import React, { useEffect, useRef } from 'react';
import screenful from "screenfull";
import { ConfirmationDeleteDialog, DeleteRecordingDialog, format, formatTotalDuration } from '../Helpers';

// api
import { TokenProvider, useToken } from '../../api/TokenContext';
import { getAudioPath, getEyeData, getHandData, getVideoPath, useDeleteRecording, useGetAllRecordings, useGetRecording } from '../../api/rest';
import { dataType, RequestStatus, streamingType } from '../../api/types';

// material 
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';


// components
import PointCloudViewer from '../PointCloudViewer/PointCloudViewer';
import AccordionView from '../AccordionView';
import Controls from '../Controls';
import { onProgressType } from '../VideoCard';

// styles
import './HistoricalDataView.css';


export interface MediaState {
  pip?: boolean;
  playing: boolean;
  controls?: boolean;
  light?: boolean;
  played: number;
  duration?: number;
  playbackRate: number;
  loop?: boolean;
  seeking: boolean;
  totalDuration?: string;
  currentTime?: string;
}

export interface DeleteInfo {
  name: string,
  confirmation: boolean,
}

function RecordingsDataView() {
    const [recordings, setRecordings] = React.useState([]);
    const [recordingID, setRecordingID] = React.useState<number>(0);
    const [recordingName, setRecordingName] = React.useState<string>('');
    const [eyeData, setEyeData] = React.useState({});
    const [handData, setHandData] = React.useState({});

    const [openDelDialog, setOpenDelDialog] = React.useState(false);
    const [openConfDelDialog, setOpenConfDelDialog] = React.useState(false);

    const [delData, setDelData] = React.useState<DeleteInfo>({name: "", confirmation: false});

    const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
    const [state, setState] = React.useState<MediaState>({
      pip: false,
      playing: false,
      controls: false,
      light: false,

      played: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
      seeking: false,
      totalDuration: "0:0",
      currentTime: "0:0",
    });

    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);
    const controlsRef = useRef(null);
    const canvasRef = useRef(null);
    const {
      playing,
      controls,
      light,
      loop,
      playbackRate,
      pip,
      played,
      seeking,
      totalDuration,
      currentTime,
    } = state;

    // get the token and authenticated fetch function
    const { token, fetchAuth } = useToken();

    // query the streamings endpoint (only if we have a token)
    // fetch list of available recordings 
    const {response: recordingsList} = useGetAllRecordings(token, fetchAuth);
    // fetch data available of an specific recording
    const {response: recordingData} = useGetRecording(token, fetchAuth, recordingName);
    const {response: deletedRecord, status: statusDel} = useDeleteRecording(token, fetchAuth, delData);

    useEffect(() => {
      // Setup/initialize recording name.
      recordingsList && setRecordingName(recordingsList[0]);
      recordingsList && setRecordings(recordingsList);
    }, [recordingsList]);

    useEffect(() => {
      const fetchEyeData = async () => {
        try {
          const jsonFile = await getEyeData(recordingName);
          // setEyeData(jsonFile.slice(0, 20));
          setEyeData(jsonFile);
        } catch (error) {
                // console.log("error", error);
                setEyeData("404 Not Found. Eye data was not found.");
              }
      };
      const fetchHandData = async () => {
        try {
          const jsonFile = await getHandData(recordingName);
          setHandData(jsonFile.slice(0, 20));
        } catch (error) {
          // console.log("error", error);
          setHandData("404 Not Found. Hand data was not found.");
        }
      };

      if (recordingData && recordingData.streams){
        Object.keys(recordingData.streams).includes(streamingType.EYE) && fetchEyeData();
        Object.keys(recordingData.streams).includes(streamingType.HAND) && fetchHandData();
      }

      console.log('recording data: ', recordingData);

    }, [recordingData]);

    useEffect(() => {
      if (statusDel === RequestStatus.SUCCESS){
        console.log("Successfully deleted:");
        setOpenConfDelDialog(true);
        setDelData({name: "", confirmation: false});

        const index = 0;
        setRecordingID(index);
        recordings && setRecordingName(recordings[index]);
        setState({ ...state, totalDuration: "0:0" });
      }
    }, [deletedRecord]);

    const handleChangeRecording = (event: SelectChangeEvent) => {
      const index = Number(event.target.value);
      setRecordingID(index);
      recordings && setRecordingName(recordings[index]);
      setState({ ...state, totalDuration: "0:0" });
    };

    const handleSeekMouseDown = (e) => {
      // console.log({ value: e.target });
      setState({ ...state, seeking: true });
    };
    const handleSeekChange = (e) => {
      // console.log("handleSeekChange", e.target.value);
      const temporal = parseFloat(e.target.value); // parseFloat(e.target.value) / 100;
      setState({ ...state, played: temporal });
    };
    const handleSeekMouseUp = (e) => {
      // console.log("handleSeekMouseUp", { value: e.target });
      setState({ ...state, seeking: false });
    };

    const handleProgress  = (changeState: onProgressType) => {
      const newDuration = changeState.totalDuration;
      // We only want to update time slider if we are not currently seeking
      if (!state.seeking) {
        setState({ ...state, ...changeState, totalDuration: newDuration > totalDuration ? totalDuration : newDuration  });
      }
    }

    const handleSeekingFromVideoCard  = (value) => {
      //TODO: being able to control all the videos from a child video
    }

    const handlePlayPause = () => {
      setState({ ...state, playing: !state.playing });
    };

    const handleRewind = () => {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    };

    const handleFastForward = () => {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    };

    const handleDuration = (duration) => {
      setState({ ...state, duration });
    };

    const handleDisplayFormat = () => {
      setTimeDisplayFormat(
        timeDisplayFormat == "normal" ? "remaining" : "normal"
      );
    };

    const handlePlaybackRate = (rate) => {
      setState({ ...state, playbackRate: rate });
    };

    const toggleFullScreen = () => {
      screenful.toggle(playerContainerRef.current);
    };

    const elapsedTime =
      timeDisplayFormat == "normal"
        ? format(currentTime) : "0:0";
        // : `-${format(totalDuration - currentTime)}`;

    // const totalDurationValue = format(totalDuration);
    const totalDurationValue = (recordingData && recordingData.duration) ? formatTotalDuration(recordingData.duration) : "0:0";

  const renderStreamings= () => {
    if (recordingData !== undefined && recordingData &&  recordingData.streams){
      return <>
        <AccordionView type={dataType.VIDEO} data={recordingData} title={"Cameras"} state={state} recordingName={recordingName} onProgress={(res) => handleProgress(res)} onSeek={res => handleSeekingFromVideoCard(res)}
        ></AccordionView>
        {
          Object.keys(recordingData.streams).includes(streamingType.MIC) &&
          <AccordionView type={dataType.AUDIO} data={recordingData} title={"Audio Data"} state={state} recordingName={recordingName} onProgress={(res) => handleProgress(res)} onSeek={res => handleSeekingFromVideoCard(res)}
        ></AccordionView>
        }
        {
          <Accordion defaultExpanded={true} >      

            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Eyes Data</Typography>
            </AccordionSummary>

              <div className='pointcloud-list-container'>
                <div className='pointcloud-container'>
                    <PointCloudViewer points={eyeData} attribute={'GazeOrigin'} timestamp={state} initialtimestamp={recordingData['first-entry'].split('-')[0]}></PointCloudViewer>
                </div>

                <div className='pointcloud-container'>
                    <PointCloudViewer points={eyeData} attribute={'GazeDirection'} timestamp={state} initialtimestamp={recordingData['first-entry'].split('-')[0]}></PointCloudViewer>
                </div>
              </div>
             
            <AccordionDetails></AccordionDetails>
          </Accordion>

          // Object.keys(recordingData.streams).includes(streamingType.EYE) &&
          // <AccordionView type={dataType.JSON} data={eyeData} title={"Eye Data"}></AccordionView>
        }
        {

          // <Accordion defaultExpanded={true} >      

          //   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          //       <Typography>Hands Data</Typography>
          //   </AccordionSummary>

          //     <div className='pointcloud-list-container'>
          //       <div className='pointcloud-container'>
          //           <PointCloudViewer points={handData} attribute={'GazeOrigin'}></PointCloudViewer>
          //       </div>

          //       <div className='pointcloud-container'>
          //           <PointCloudViewer points={handData} attribute={'GazeDirection'}></PointCloudViewer>
          //       </div>
          //     </div>
            
          //   <AccordionDetails></AccordionDetails>
          // </Accordion>


          Object.keys(recordingData.streams).includes(streamingType.HAND) &&
        <AccordionView type={dataType.JSON} data={handData} title={"Hand Data"}></AccordionView>
        
        }
        </>
    }
    return <></>;
  }

  const handleClickDelButton = () => {
    setOpenDelDialog(true);
  }
  const handleCloseDeleteDialog = (value) => {
    setOpenDelDialog(false);
    if (value) { // if confirmation is true
      //Delete recording
      setDelData({name: recordingName, confirmation: value});
    } else {
      // Do nothing
    }
  };
  const handleCloseConfDeleteDialog = () => {
    setOpenConfDelDialog(false);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <FormControl sx={{ m: 1, minWidth: 340 }} size="small">
          <InputLabel id="demo-simple-select-label">Select Data </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={recordingID.toString()}
            label="Select Data"
            onChange={handleChangeRecording}
          >
          {
            recordings && Array.from(Array(recordings.length)).map((_, index) => (
                <MenuItem key={'menu-item-' + index} value={index}>{recordings[index]}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
        {/*
        // Disable Delete recording
        <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
          <Button variant="outlined" onClick={handleClickDelButton}  startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </FormControl>
        */}
        <DeleteRecordingDialog
          id="delete-recording"
          keepMounted
          open={openDelDialog}
          onClose={handleCloseDeleteDialog}
        />
        <ConfirmationDeleteDialog
          id="confirmation-delete-recording"
          keepMounted
          open={openConfDelDialog}
          onClose={handleCloseConfDeleteDialog}
        />
      </Box>   

      <Controls
            ref={controlsRef}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            onDuration={handleDuration}
            onRewind={handleRewind}
            onPlayPause={handlePlayPause}
            onFastForward={handleFastForward}
            playing={playing}
            played={played}
            elapsedTime={elapsedTime}
            totalDuration={totalDurationValue}
            // onMute={hanldeMute}
            // muted={muted}
            // onVolumeChange={handleVolumeChange}
            // onVolumeSeekDown={handleVolumeSeekDown}
            onChangeDispayFormat={handleDisplayFormat}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRate}
            onToggleFullScreen={toggleFullScreen}
            // volume={volume}
            // onBookmark={addBookmark}
          />
      {renderStreamings()}
    </div>
  );
}

// top level - wraps with a global token context
const HistoricalDataView = () => {
  return <TokenProvider>
    <RecordingsDataView />
  </TokenProvider>
}

export default HistoricalDataView;