import { ControlCard, ControlCardHeader } from "./common"
import { useState, useEffect } from "react";

import { TextReducerState } from "../../state/types"
import {styled} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';


interface StudyControlPanelProps {
    textReducerState: TextReducerState,
}

const Content = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80%"
});

const Row = styled("div")({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
});



export default function StudyControlPanel({textReducerState}: StudyControlPanelProps) {

    const [counter, setCounter] = useState(0);
    const [isActive, setIsActive] = useState(false);
  
    useEffect(() => {
        let interval: NodeJS.Timeout;
    
        if (isActive) {
          interval = setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1);
          }, 1000);
        } else if (!isActive) {
          clearInterval(interval);
        }
    
        return () => {
          clearInterval(interval);
        };
      }, [isActive]);
    
      const handleStartStop = () => {
        setIsActive(!isActive);
      };

      const formatTime = (time: number): string => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
    
        return `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };

    return (
        <ControlCard
            sx={{
                flexBasis: 10,
            }}
        >
            <ControlCardHeader
                title={"Study Control"}
            />
            <Content>

                <Typography variant="h6">Step: {textReducerState.currentStep} </Typography>
                <Row>
                <IconButton onClick={handleStartStop} color="primary" aria-label="start-stop">
                    {isActive ? <StopIcon /> : <PlayArrowIcon />}
                </IconButton>
                <Typography variant="h6">Time elapsed: {formatTime(counter)} </Typography>
                </Row>

            </Content>
        </ControlCard>
    )
}