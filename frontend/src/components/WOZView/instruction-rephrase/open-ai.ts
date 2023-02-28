import {RecipeObjectStatus} from "../object-comps/types";
import {InstructionRephraseParams} from "./types";

const INFERENCE_TEXT = 'Please simplify the following case:' +
'Context: The user is making a coffee. This is one of the steps;' +
'Original Instruction: Prepare the filter insert by folding the paper filter in half to create a semi-circle, and in half again to create a quarter-circle. Place the paper filter in the dripper and spread open to create a cone.' +
'Objects in the scene: {}' +
'Simplified Instruction:';



function buildInferencePrompt(context: string, objects: Array<RecipeObjectStatus>, originalInstruction: string){
    const objectString = "";
    return `Please simplify the following case:` +
        `Context: ${context};` +
        `Original Instruction: ${originalInstruction}` +
        `Objects in the scene: ${objectString}` +
        'Simplified Instruction:';
}

async function loadPromptTxt(filename: string){
    const promptFile = require("./prompts/" + filename);
    return fetch(promptFile)
        .then(response => response.text())

}

async function buildTaskPrompt(params: InstructionRephraseParams){
    let promptFilename = "numeric-lexical-split-object-action.txt";
    if (params.lexicalSimplification && params.numericSimplification){

    }else if(params.lexicalSimplification && !params.numericSimplification){
        promptFilename = "lexical-split-object-action.txt";
    }else if(!params.lexicalSimplification && params.numericSimplification){
        promptFilename = "numeric-split-object-action.txt";
    }

    return loadPromptTxt(promptFilename);
}

async function buildPrompt(context: string, objects: Array<RecipeObjectStatus>,
                           originalInstruction: string, params: InstructionRephraseParams){
    return buildTaskPrompt(params).then(taskPrompt => {
        let inferencePrompt = buildInferencePrompt(context, objects, originalInstruction);
        return `${taskPrompt}\n${inferencePrompt}`;
    })
}


export {INFERENCE_TEXT, buildInferencePrompt, buildTaskPrompt, buildPrompt}
