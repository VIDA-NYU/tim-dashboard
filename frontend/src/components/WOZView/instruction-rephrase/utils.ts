import {RephraseAnnotation} from "./types";

function computeStepRephrasedInstruction(step: number, originalInstruction: string, rephraseAnnotation: RephraseAnnotation){
    return rephraseAnnotation.records.reduce((previousValue, currentValue, currentIndex, array) => currentValue.step === step ? currentValue.rephrased : previousValue, originalInstruction);
}

export {computeStepRephrasedInstruction};