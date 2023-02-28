import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import RephraseControlSwitch from "./rephrase-control-switch";
import NumbersIcon from "@mui/icons-material/Numbers";
import AbcIcon from "@mui/icons-material/Abc";
import {styled} from "@mui/material";
import RephraseModeRadio from "./rephrase-mode-radio";
import {RephraseDisplayMode} from "./types";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface RephraseModeSelectorProps {
    rephraseDisplayMode: RephraseDisplayMode,
    onSettingMode: (value: RephraseDisplayMode) => void

}
const Container = styled("div")({

    display: "flex",
    flexGrow: 0,
    marginRight: "3px"
})

const Content = styled("div")({
    display: "flex",
    flexDirection: "row",
    paddingTop: "10px",
    paddingBottom: "1px",
    alignItems: "center",
    marginLeft: "6px",
    marginRight: "3px"
})


const ModeOptionList = styled("div")({
    display: "flex",
    flexDirection: "row",
    marginLeft: "18px",
    marginRight: "5px"
})

export default function RephraseModeSelector({rephraseDisplayMode, onSettingMode}: RephraseModeSelectorProps){



    return (
        <Container>
            <Card
                sx={{
                    marginBottom: "1px"
                }}
            >
                <Content >
                    <Typography variant={"body1"}> Mode </Typography>
                    <ModeOptionList>
                        <RephraseModeRadio
                            iconElement={<ReplayIcon/>}
                            tooltipHint={"overview mode"}
                            stateActivated={rephraseDisplayMode === RephraseDisplayMode.Static}
                            onSettingState={(value: boolean) => {
                                onSettingMode(RephraseDisplayMode.Static)
                            }}
                        />

                        <RephraseModeRadio
                            iconElement={<PlayCircleOutlineIcon/>}
                            tooltipHint={"real-time mode"}
                            stateActivated={rephraseDisplayMode === RephraseDisplayMode.Concurrent}
                            onSettingState={(value: boolean) => {
                                onSettingMode(RephraseDisplayMode.Concurrent)
                            }}
                        />

                        <RephraseModeRadio
                            iconElement={<RemoveRedEyeIcon/>}
                            tooltipHint={"preview mode"}
                            stateActivated={rephraseDisplayMode === RephraseDisplayMode.Preview}
                            onSettingState={(value: boolean) => {
                                onSettingMode(RephraseDisplayMode.Preview)
                            }}
                        />
                    </ModeOptionList>


                </Content>
            </Card>
        </Container>
    )
}