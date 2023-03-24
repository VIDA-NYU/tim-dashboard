import {DocumentationStep} from "./types";


function generateDocumentation(recipeInstructions: Array<string>){
    let documentationSteps: Array<DocumentationStep> = [];
    recipeInstructions.forEach((instruction, index) => {
        documentationSteps.push({
            description: instruction,
            errors: [],
            summaryIndex: -1
        })
    })
    return {
        steps: documentationSteps
    };
}

export {generateDocumentation}