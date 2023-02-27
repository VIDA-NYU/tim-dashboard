import {styled} from "@mui/material";
import StepRephraseComp from "./step-rephrase-comp";
import {useState} from "react";
import {InstructionRephraseParams, RephraseDisplayMode} from "./types";

interface RephraseContainerProps{
    recipeInstructions: Array<string>,
    currentStep: number
}

const Container = styled("div")({
    // marginBottom: 10,
    flexBasis: 8,
    flexGrow: 7
})

export default function RephraseComp({recipeInstructions, currentStep}: RephraseContainerProps){

    const [currParams, setCurrParams] = useState<InstructionRephraseParams>({
            numericSimplification: true,
            lexicalSimplification: true
    });
    const [displayMode, setDisplayMode] = useState<RephraseDisplayMode>(RephraseDisplayMode.Concurrent);

    return (
        <Container>
            <StepRephraseComp
                params={currParams}
                onSettingParams={setCurrParams}
                instruction={recipeInstructions[currentStep]}/>
        </Container>
    )
}