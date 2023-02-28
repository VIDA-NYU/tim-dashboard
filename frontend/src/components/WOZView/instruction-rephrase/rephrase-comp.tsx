import {styled} from "@mui/material";
import StepRephraseComp from "./step-rephrase-comp";
import {useState} from "react";
import {InstructionRephraseParams, RephraseDisplayMode} from "./types";
import {computeCurrentStep} from "../annotation/utils";
import {AnnotationData} from "../annotation/types";

interface RephraseContainerProps{
    recipeInstructions: Array<string>,
    annotationData: AnnotationData,
    currentTimeStampValue: number,
    state: any,

}

const Container = styled("div")({
    // marginBottom: 10,
    flexBasis: 8,
    flexGrow: 7
})

export default function RephraseComp({recipeInstructions, annotationData, currentTimeStampValue, state}: RephraseContainerProps){

    const [currParams, setCurrParams] = useState<InstructionRephraseParams>({
            numericSimplification: true,
            lexicalSimplification: true
    });
    let currentTime = annotationData.meta.mode === "online" ? (currentTimeStampValue - annotationData.meta.entryTime) / 1000 : state.currentTime;
    let currentStep = computeCurrentStep(annotationData, 0, currentTime);

    const [displayMode, setDisplayMode] = useState<RephraseDisplayMode>(RephraseDisplayMode.Concurrent);
    return (
        <Container>
            <StepRephraseComp
                stepIndex={currentStep}
                displayMode={displayMode}
                setDisplayMode={setDisplayMode}
                params={currParams}
                onSettingParams={setCurrParams}
                instruction={recipeInstructions[currentStep]}
                recipeInstructions={recipeInstructions}
            />
        </Container>
    )
}