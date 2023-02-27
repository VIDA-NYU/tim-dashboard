import {styled} from "@mui/material";
import RephraseInstanceComp from "./rephrase-instance-comp";
import {useInstructionRephraseAPI} from "./open-ai-hook";
import {RephraseControlPanel} from "./rephrase-control-panel";
import {InstructionRephraseParams} from "./types";

interface StepRephraseProps {
    instruction: string,
    params: InstructionRephraseParams,
    onSettingParams: (params: InstructionRephraseParams) => void,
}

const Container = styled("div")({
    display: 'flex',
    flexDirection: "row",
})
export default function StepRephraseComp({instruction, onSettingParams, params}: StepRephraseProps){
    const rephraseRequest = {
        original: instruction,
        params: params
    }
    const {instructionRephraseInstanceResponse} = useInstructionRephraseAPI(rephraseRequest);
    return (
        <Container>
            <RephraseControlPanel params={params}
                onSettingParams={onSettingParams}
            ></RephraseControlPanel>
            {instructionRephraseInstanceResponse && instructionRephraseInstanceResponse.instance && <RephraseInstanceComp rephraseInstance={instructionRephraseInstanceResponse.instance}/>}
        </Container>
    )

}