import {RecipeObjectStatus} from "../object-comps/types";
import {InstructionRephraseParams} from "./types";

const INFERENCE_TEXT = 'Please simplify the following case:' +
'Context: The user is making a coffee. This is one of the steps;' +
'Original Instruction: Prepare the filter insert by folding the paper filter in half to create a semi-circle, and in half again to create a quarter-circle. Place the paper filter in the dripper and spread open to create a cone.' +
'Objects in the scene: {}' +
'Simplified Instruction:';



function buildInferencePrompt(context: string, objects: Array<RecipeObjectStatus>, originalInstruction: string){
    const objectString = "";
    return `Please simplify the following case and do not provide the explanation (only provide the simplified content without any format): \n` +
        `Context: ${context}; \n` +
        `Original Instruction: ${originalInstruction} \n` +
        `Objects in the scene: ${objectString} \n` +
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

async function loadChatTaskDescription(params: InstructionRephraseParams){
    let promptFilename = "default.txt"
    // const promptFile = require("./prompts/" + promptFilename);
    return loadPromptTxt(promptFilename);
}
async function buildChatPrompt(context: string, objects: Array<RecipeObjectStatus>, originalInstruction: string, params: InstructionRephraseParams){
    let inferencePrompt = buildInferencePrompt(context, objects, originalInstruction);
    return loadChatTaskDescription(params).then(taskPrompt => {
        let messages=[
            {"role": "system", "content": "You are a text simplifier for the augmented reality user."},
            {"role": "user", "content": taskPrompt},
            {"role": "assistant", "content": "Sure, please input the text to simplifiy."},
            {"role": "user", "content": inferencePrompt}
        ]
        return messages;
    });
    
}


export {INFERENCE_TEXT, buildInferencePrompt, buildTaskPrompt, buildPrompt, buildChatPrompt}
