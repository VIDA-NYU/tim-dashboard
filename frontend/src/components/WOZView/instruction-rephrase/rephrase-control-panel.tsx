import {styled} from "@mui/material";
import {InstructionRephraseParams} from "./types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { green, pink } from '@mui/material/colors';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import RephraseControlSwitch from "./rephrase-control-switch";
import NumbersIcon from '@mui/icons-material/Numbers';
import AbcIcon from '@mui/icons-material/Abc';
import Typography from "@mui/material/Typography";

interface RephraseControlPanelProps {
    params: InstructionRephraseParams,
    onSettingParams: (params: InstructionRephraseParams) => void,
}

const Container = styled("div")({
    display: "flex",
    flexGrow: 0,
    marginBottom: "9px"
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
const ActiveColorMap = {
    numericSimplification: pink[500],
    lexicalSimplification: green[500]
}

const RephraseOptionList = styled("div")({
    display: "flex",
    flexDirection: "row",
    marginLeft: "18px",
    marginRight: "5px"
})


export function RephraseControlPanel ({params, onSettingParams}: RephraseControlPanelProps){


    return (
        <Container>
            <Card
                sx={{
                    marginBottom: "1px"
                }}
            >
                <Content >
                    <Typography variant={"body1"}> Rephrase </Typography>
                    <RephraseOptionList>
                        <RephraseControlSwitch

                            iconElement={<NumbersIcon/>}
                            colorActivated={ActiveColorMap.numericSimplification}
                            tooltipHint={"numeric word replace"}
                            stateActivated={params.numericSimplification}
                            onSettingState={(value: boolean) => {
                                onSettingParams({
                                    ...params,
                                    numericSimplification: value
                                })
                            }}
                        />
                        <RephraseControlSwitch
                            iconElement={<AbcIcon/>}
                            tooltipHint={"lexical simplification"}
                            colorActivated={ActiveColorMap.lexicalSimplification}
                            stateActivated={params.lexicalSimplification}
                            onSettingState={(value: boolean) => {
                                onSettingParams({
                                    ...params,
                                    lexicalSimplification: value
                                })
                            }}
                        />

                    </RephraseOptionList>


                </Content>
            </Card>
        </Container>
    );
}