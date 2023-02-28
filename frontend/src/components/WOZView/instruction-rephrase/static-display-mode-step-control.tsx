import {styled} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Avatar from "@mui/material/Avatar";
import {blueGrey, green, grey} from "@mui/material/colors";
import {gray} from "d3";

interface StaticDisplayModeStepControlProps {
    allowStepControl: boolean,
    stepIndex: number,
    onSettingStep: (value: number) => void,

}

const Container = styled("div")({
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
})

export default function StaticDisplayModeStepControl({allowStepControl, stepIndex, onSettingStep}: StaticDisplayModeStepControlProps){

    const handleMovingNext = () => {
        if(allowStepControl){
            onSettingStep(stepIndex + 1);
        }
    }

    const handleMovingPrev = () => {
        if(allowStepControl && stepIndex > 0){
            onSettingStep(stepIndex - 1);
        }
    }

    return (
        <Container>
            <IconButton
                onClick={handleMovingPrev}
            >
                <KeyboardArrowLeftIcon/>
            </IconButton>
            <Avatar
                    sx={{bgcolor: blueGrey[600], width: 24, height: 24}}>
                    {stepIndex}
            </Avatar>
            <IconButton
                onClick={handleMovingNext}
            >
                <KeyboardArrowRightIcon/>
            </IconButton>
        </Container>
    )
}