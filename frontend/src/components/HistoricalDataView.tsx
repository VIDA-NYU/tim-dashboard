import React, { useEffect, useRef } from 'react';
import { NavLink, Link, useParams, useNavigate, useLocation, matchPath } from "react-router-dom";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { onProgressType } from './VideoDataView/VideoCard/VideoCard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';

import { useToken } from '../api/TokenContext';
import { getAudioPath, getEyeData, getHandData, getVideoPath, useDeleteRecording, useGetAllRecordings, useGetRecording, useGetAllRecordingInfo } from '../api/rest';
import { dataType, RequestStatus, streamingType } from '../api/types';
import Controls from './Controls';
import screenful from "screenfull";
import { ConfirmationDeleteDialog, DeleteRecordingDialog, format, formatTotalDuration } from './Helpers';
// custom components
import AudioDataView from './AudioDataView/AudioDataView';
import VideoDataView from './VideoDataView/VideoDataView';
import EyesDataView from './EyesDataView/EyesDataView';
import HandsDataView from './HandsDataView/HandsDataView';



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

function RecordingsDataView({ recordingName, toggleDrawer }) {
    const navigate = useNavigate();

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

    // fetch data available of an specific recording
    const {response: recordingData} = useGetRecording(token, fetchAuth, recordingName);
    const {response: deletedRecord, status: statusDel} = useDeleteRecording(token, fetchAuth, delData);

    useEffect(() => {
      const fetchEyeData = async () => {
        try {
          const jsonFile = await getEyeData(recordingName);
          setEyeData(jsonFile.slice(0, 20));
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

    }, [recordingData]);

    useEffect(() => {
      if (statusDel === RequestStatus.SUCCESS){
        console.log("Successfully deleted:");
        setOpenConfDelDialog(true);
        setDelData({name: "", confirmation: false});

        navigate(`/recordings`)
        setState({ ...state, totalDuration: "0:0" });
      }
    }, [deletedRecord]);

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
      console.log('Handling progress..');

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

    const elapsedTime =
      timeDisplayFormat == "normal"
        ? format(currentTime) : "0:0";
        // : `-${format(totalDuration - currentTime)}`;

    // const totalDurationValue = format(totalDuration);
    const totalDurationValue = (recordingData && recordingData.duration) ? formatTotalDuration(recordingData.duration) : "0:0";

    const renderStreamings= () => (
      (recordingData !== undefined && recordingData &&  recordingData.streams) && <>
          <VideoDataView 
            type={dataType.VIDEO} 
            data={recordingData} 
            title={"Cameras"} 
            state={state} 
            recordingName={recordingName} 
            onProgress={(res) => handleProgress(res)} 
            onSeek={res => handleSeekingFromVideoCard(res)}>
          </VideoDataView>

          <AudioDataView 
            type={dataType.AUDIO} 
            data={recordingData} 
            title={"Audio"} 
            state={state} 
            recordingName={recordingName} 
            onProgress={(res) => handleProgress(res)} 
            onSeek={res => handleSeekingFromVideoCard(res)}>  
          </AudioDataView>

          <EyesDataView 
            type={dataType.JSON} 
            data={eyeData} 
            title={"Eye Data"}>  
          </EyesDataView>

          <HandsDataView
            type={dataType.JSON} 
            data={handData} 
            title={"Hands Data"}>
          </HandsDataView>
        </>
    )



  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <FormControl sx={{ m: 1, minWidth: 340 }} size="small">
          <Button onClick={()=>toggleDrawer()}>{recordingName}</Button>
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



const RecordingCard = ({ recording, onClick=null }) => {
  const navigate = useNavigate();
  // console.log(recording)
  const files = recording?.files || [];
  // console.log(files)
  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column' }}>
      {/* <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      /> */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          <Button onClick={() => { navigate(`/recordings/${recording.name}`);onClick && onClick() }}>
            {recording.name}
          </Button>
        </Typography>
        <Typography variant="h5" color="text.secondary">
          <b>{(recording.duration||'').split('.')[0]}s</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recording['first-entry-time']}
        </Typography>
        <Stack direction="row" spacing={1} overflow='auto'>
          {recording.files?.map(f => <Chip key={f} label={f} size='small' />)}
        </Stack>
        <Stack direction="row" spacing={1} flexWrap='wrap'>
          {Object.entries(recording.streams||{}).map(([sid, d]) => {
            const f = files.find(f=>f.startsWith(sid));
            return <Tooltip title={f||''} key={sid}>
              <Chip label={sid} size='small' color={f ? 'primary' : 'default'} />
            </Tooltip>
          })}
        </Stack>
      </CardContent>
      {/* <CardActions>
        <Button size="small" onClick={() => navigate(`/recordings/${recording.name}`)}>View</Button>
      </CardActions> */}
    </Card>
  );
}

const RecordingsList = ({ sortby='first-entry', ...props }) => {
  const {response: recordings} = useGetAllRecordingInfo();
  // console.log(recordings)
  return (
    // display='flex' flexWrap='wrap' gap={2} mt={5} m={'2em'} justifyContent='center'
      <Box display='flex' flexWrap='wrap' gap={2} flexDirection='column'>
        {recordings && recordings
          .filter(d=>d.duration && !d.duration.startsWith('0:00:0'))
          .sort((a, b) => (a[sortby]||'').localeCompare(b[sortby]||''))
          .map((recording) => <RecordingCard recording={recording} key={recording.name} {...props} />)
        || (Array.from({length: 6}, (x, i) => i).map(i => <Skeleton variant="rectangular" width={300} height={220} key={i} />))
        }
      </Box>
  )
}

const RecordingsView = () => {
  let { recordingId } = useParams();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return <Box mt={3}>
    <Drawer anchor='left' sx={{ maxWidth: '80vw' }} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <RecordingsList onClick={() => setDrawerOpen(false)} />
    </Drawer>
    {recordingId && <RecordingsDataView recordingName={recordingId} toggleDrawer={() => setDrawerOpen(!drawerOpen)} />}
  </Box>
}


export default RecordingsView;