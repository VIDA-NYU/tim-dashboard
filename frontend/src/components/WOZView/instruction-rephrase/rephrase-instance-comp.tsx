import {styled} from "@mui/material";
import {InstructionRephraseInstance, RephraseDisplayMode} from "./types";
import RephraseContentComp from "./rephrase-content-comp";
import RephraseOriginalTextDisplay from "./rephrase-original-text-display";

interface RephraseInstanceProps {
    rephraseInstance: InstructionRephraseInstance,
    rephraseDisplayMode: RephraseDisplayMode,
    stepIndex: number,
    onSettingStep: (value: number) => void,
    recipeInstructions: Array<string>,
    onSettingEditing: (value: boolean, humanRephrasedInstruction: string) => void

}


const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    flexGrow: 12,
})



export default function RephraseInstanceComp({rephraseInstance, rephraseDisplayMode,
                                                 recipeInstructions, onSettingEditing,
                                                 stepIndex, onSettingStep}: RephraseInstanceProps){



    return (
        <Container>
            <RephraseOriginalTextDisplay
                allowStepControl={rephraseDisplayMode === RephraseDisplayMode.Static}
                rephraseInstance={rephraseInstance}
                stepIndex={stepIndex}
                onSettingStep={onSettingStep}
            />
            <RephraseContentComp
                onSettingEditing={onSettingEditing}
                rephraseInstance={rephraseInstance} humanRephrasedInstruction={""}/>

        </Container>
    )
}