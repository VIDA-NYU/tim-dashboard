import {styled, Typography} from "@mui/material";
import {TextCard} from "./rephrase-content-comp";
import {InstructionRephraseInstance} from "./types";
import StaticDisplayModeStepControl from "./static-display-mode-step-control";
import Card from "@mui/material/Card";

interface RephraseOriginalTextDisplayProps {
    rephraseInstance: InstructionRephraseInstance,
    allowStepControl: boolean,
    stepIndex: number,
    onSettingStep: (value: number) => void,

}
export const OriginalTextCard = styled(Card)({
    marginLeft: "8px",
    paddingLeft: "10px",
    paddingTop: "2px",
    paddingBottom: "2px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
})
export default function RephraseOriginalTextDisplay({rephraseInstance, stepIndex, allowStepControl, onSettingStep}: RephraseOriginalTextDisplayProps){
    return (
        <OriginalTextCard
            sx={{
                marginBottom: "3px"
            }}
        >
            <Typography
                variant={"body2"}
                sx={{
                    textDecoration: "line-through",
                }}>
                {rephraseInstance.original}
            </Typography>

            <StaticDisplayModeStepControl
                stepIndex={stepIndex} allowStepControl={allowStepControl}
                onSettingStep={onSettingStep}
            />

        </OriginalTextCard>
    )
}