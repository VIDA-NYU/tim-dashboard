import { ControlCard, ControlCardHeader } from "./common"
import RephraseControlSwitch from "../../../WOZView/instruction-rephrase/rephrase-control-switch";
import { styled } from "@mui/material";
import { green, pink, blueGrey } from '@mui/material/colors';
import NumbersIcon from '@mui/icons-material/Numbers';
import AbcIcon from '@mui/icons-material/Abc';
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import {InstructionRephraseParams} from "../../../WOZView/instruction-rephrase/types";


interface RephrasePanelProps {
    params: InstructionRephraseParams,
    onSettingParams: (params: InstructionRephraseParams) => void,
}

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
    lexicalSimplification: green[500],
    humanEdited: blueGrey[500]
}

const RephraseOptionList = styled("div")({
    display: "flex",
    flexDirection: "row",
    marginLeft: "18px",
    marginRight: "5px"
})


export default function RephrasePanel ({params, onSettingParams}: 
    RephrasePanelProps) {
    return (
        <ControlCard>
            <ControlCardHeader
                title={"Rephrase Panel"}
            />
            <Content >
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

                        <RephraseControlSwitch
                            iconElement={<EditIcon/>}
                            tooltipHint={"human edited"}
                            colorActivated={ActiveColorMap.humanEdited}
                            stateActivated={params.humanEdited}
                            onSettingState={(value: boolean) => {
                                onSettingParams({
                                    ...params,
                                    humanEdited: value
                                })
                            }}
                        />

                    </RephraseOptionList>


                </Content>
        </ControlCard>
    )
}