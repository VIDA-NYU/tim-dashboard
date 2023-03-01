import {styled} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {IllustrationTextInput} from "./illustration-text-input";
import {useEffect, useState} from "react";
import IllustrationDisplay from "./illustration-display";
import {useInstructionIllustration} from "../instruction-rephrase/open-ai-hook";
import {AnnotationData} from "../annotation/types";
import {computeCurrentStep} from "../annotation/utils";

interface InstructionIllustrationProps {
    recipeInstructions: Array<string>,
    annotationData: AnnotationData,
    currentTimeStampValue: number,
    state: any,
}

const Container = styled(Card)({
    // display: 'flex',
    // flexDirection: "row",
    flexBasis: 8,
    flexGrow: 7

})

const Content = styled("div")({
    display: 'flex',
    flexDirection: "row",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "12px"
})
export default function InstructionIllustrationComp({
                                                        annotationData, currentTimeStampValue,
                                                        recipeInstructions, state
                                                    }: InstructionIllustrationProps) {

    // const [illustrationImageURL, setIllustrationImageURL] = useState<string>("");
    const [illustrationText, setIllustrationText] = useState<string>("");
    let currentTime = annotationData.meta.mode === "online" ? (currentTimeStampValue - annotationData.meta.entryTime) / 1000 : state.currentTime;
    let currentStep = computeCurrentStep(annotationData, 0, currentTime);
    let currentInstruction = recipeInstructions[currentStep]
    useEffect(() => {
        setIllustrationText(currentInstruction)
    }, [currentInstruction]);

    const onSettingIllustrationText = (value: string) => {
        setIllustrationText(value);
    }

    const {illustrationURL} = useInstructionIllustration(illustrationText);

    return (
        <Container>
            <CardHeader title={"Illustration"} titleTypographyProps={{variant: "body1"}}></CardHeader>
            <Content>
                <IllustrationTextInput onSettingIllustrationText={onSettingIllustrationText}
                                       initialIllustrationText={currentInstruction}
                />
                <IllustrationDisplay url={illustrationURL}/>
            </Content>
        </Container>
    )
}