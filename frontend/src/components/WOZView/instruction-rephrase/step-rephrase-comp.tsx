import {styled} from "@mui/material";
import RephraseInstanceComp from "./rephrase-instance-comp";
import {useInstructionRephraseAPI} from "./open-ai-hook";
import {RephraseControlPanel} from "./rephrase-control-panel";
import {InstructionRephraseParams, RephraseAnnotation, RephraseDisplayMode} from "./types";
import RephraseModeSelector from "./rephrase-mode-selector";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {useEffect, useState} from "react";
import {computeStepRephrasedInstruction} from "./utils";

interface StepRephraseProps {
    instruction: string,
    params: InstructionRephraseParams,
    onSettingParams: (params: InstructionRephraseParams) => void,
    displayMode: RephraseDisplayMode,
    setDisplayMode: (value: RephraseDisplayMode) => void,
    stepIndex: number,
    recipeInstructions: Array<string>
}

const Container = styled(Card)({
    // display: 'flex',
    // flexDirection: "row",
})

const Content = styled("div")({
    display: 'flex',
    flexDirection: "row",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "12px"
})

const LeftControlPanels = styled("div")({
    display: "flex",
    flexDirection: "column"
})

export default function StepRephraseComp({instruction, stepIndex, onSettingParams,
                                             recipeInstructions,
                                             params, displayMode, setDisplayMode}: StepRephraseProps){

    const [rephraseStep, setRephraseStep] = useState<number>(0);
    const [rephraseAnnotation, setRephraseAnnotation] = useState<RephraseAnnotation>({
        records: []
    })
    const [humanRephrasedInstruction, setHumanRephrasedInstruction] = useState<string>("");

    useEffect(() => {
        setRephraseStep(stepIndex)
    }, [stepIndex]);

    let rephraseDisplayStep = stepIndex;
    if(displayMode === RephraseDisplayMode.Preview){
        rephraseDisplayStep += 1;
    }else if(displayMode === RephraseDisplayMode.Concurrent){
        rephraseDisplayStep = stepIndex;
    }

    const onSettingEditing = (value: boolean, newValue: string) => {
        setHumanRephrasedInstruction(newValue)
        onSettingParams({
            ...params,
            humanEdited: value
        })
    }


    let stepToDisplay = RephraseDisplayMode.Static ? rephraseStep : rephraseDisplayStep ;
    const rephraseRequest = {
        original: recipeInstructions[stepToDisplay],
        params: params
    }
    const {instructionRephraseInstanceResponse} = useInstructionRephraseAPI(rephraseRequest, humanRephrasedInstruction);



    let rephrasedInstruction = computeStepRephrasedInstruction(stepToDisplay, recipeInstructions[stepToDisplay], rephraseAnnotation);


    return (
        <Container>
            <CardHeader title={"Rephrase"} titleTypographyProps={{variant: "body1"}}></CardHeader>
            <Content>

            <LeftControlPanels>
                <RephraseControlPanel params={params}
                                      onSettingParams={onSettingParams}
                ></RephraseControlPanel>
                <RephraseModeSelector rephraseDisplayMode={displayMode} onSettingMode={setDisplayMode}/>
            </LeftControlPanels>

            {instructionRephraseInstanceResponse && instructionRephraseInstanceResponse.instance && <RephraseInstanceComp
                onSettingEditing={onSettingEditing}
                rephraseDisplayMode={displayMode}
                stepIndex={displayMode === RephraseDisplayMode.Static ? rephraseStep : rephraseDisplayStep}
                onSettingStep={setRephraseStep}
                recipeInstructions={recipeInstructions}
                rephraseInstance={instructionRephraseInstanceResponse.instance}/>}


            </Content>
            </Container>
    )

}