import { useEffect } from "react";
import { getNextRephraseStep, useSyncRecipeWithHololens, useSyncRephraseWithOpenAPI, useSyncStepWithHololens, useTextReducerStep } from "./api";
import { TextReducerState } from "./state/types";
import { computeCurrentRecipe } from "./state/utils";
import TextReducerComp from "./text-reducer-comp";
import { useInstructionRephraseAPI } from "../WOZView/instruction-rephrase/open-ai-hook";

interface TextReducerDataConsumerProps {
    textReducerState: TextReducerState,
    setTextReducerState: ((newValue: TextReducerState) => void),
};

export default function TextReducerDataConsumer({textReducerState, setTextReducerState}: TextReducerDataConsumerProps) {

    let recipe = computeCurrentRecipe(textReducerState);
    const {status} = useSyncRecipeWithHololens(recipe)

    const {step: textReducerStep} = useTextReducerStep();
    
    const {} = useSyncStepWithHololens(textReducerState, setTextReducerState);    


    
    // const {} = useSyncRephraseWithOpenAPI(textReducerState, setTextReducerState);

    return (
        <TextReducerComp
            recipe={textReducerState.recipe}
            setRecipe={(newValue) => {}}
        />
    );
}