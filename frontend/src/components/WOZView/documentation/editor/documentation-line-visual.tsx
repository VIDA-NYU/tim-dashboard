import { Card, Typography, styled } from "@mui/material";
import { DocumentationStep, Documentation } from "../types";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { VideoSummary } from "../../video-summary/types";
import VideoSummaryEventImageView from "../../video-summary/video-summary-line/video-summary-event-image-view";

interface DocumentationLineVisualProps {
    editingVisualIndex: number,
    setEdititingVisualIndex: (value: number) => void,
    videoSummary: VideoSummary
}


const Container = styled("div")({
    display: "flex",
    flexDirection: "row",
    width: "100%",
});

const SummarySelectPanel = styled(Card)({
    display: "flex",
    flexDirection: "column",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
});

const VisualContainer = styled(Card)({
    display: "flex",
    flexDirection: "column",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    marginLeft: "10px",
});


export default function DocumentationLineVisual({editingVisualIndex, setEdititingVisualIndex, videoSummary} : DocumentationLineVisualProps) {



    const handleChangeSummary = (event: SelectChangeEvent) => {
        let newValueString = event.target.value.toString();
        let newValue = parseInt(newValueString);
        setEdititingVisualIndex(newValue);
    };

    

    return (
        <Container>
            <SummarySelectPanel>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Event</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={editingVisualIndex.toString()}
                    label="Visual"
                    onChange={handleChangeSummary}
                        >
                    {
                        videoSummary.events.map((event, index) => {
                            return (
                                <MenuItem value={index}>{event.desc}</MenuItem>
                            )
                        })
                    }
          
                    </Select>
                </FormControl>
                <Typography align="center" variant="body1">
                    {
                        editingVisualIndex !== -1 && videoSummary.events[editingVisualIndex].type
                    }
                </Typography>
            </SummarySelectPanel>
            
            <VisualContainer>
                {editingVisualIndex !== -1 && <VideoSummaryEventImageView 
                    summaryEvent={videoSummary.events[editingVisualIndex]}
                />}
            </VisualContainer>
            
            
        </Container>
    );
}
