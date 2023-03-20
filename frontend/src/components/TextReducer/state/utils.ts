import { RecipeStep, TextReducerState } from "./types";
import { Recipe, RephraseState } from "./types";


function createDefaultTextReducerState () : TextReducerState {
    let recipe = {
            name: "",
            steps: [
                {
                    step: "Step 1",
                    index: 0
                },
                {
                    step: "Step 2",
                    index: 1
                },
                {
                    step: "Step 3",
                    index: 2
                },
                {
                    step: "Step 4",
                    index: 3
                },
                {
                    step: "Step 5",
                    index: 4
                },
                {
                    step: "Step 6",
                    index: 5
                },
                {
                    step: "Step 7",
                    index: 6
                },
                {
                    step: "Step 8",
                    index: 7
                },
                {
                    step: "Step 9",
                    index: 8
                },
            ]
        };
    return {
        recipe: recipe,
        currentStep: 0,
        stepStates: generateInitialStepRephraseStates(recipe),
        rephraseParams: {
            humanEdited: false,
            lexicalSimplification: true,
            numericSimplification: true 
        }
    };
}

function generateInitialStepRephraseStates(recipe: Recipe): Array<RephraseState> {
    return recipe.steps.map( d => {
        return {
            actions: [],
            original: d
        }
    })
}

function getLatestActionOfStep(stepState: RephraseState) {
    if(stepState.actions.length === 0) {
        return {
            params: {
                humanEdited: false,
                lexicalSimplification: false,
                numericSimplification: false
            },
            result: stepState.original.step,
            time: 0
        }
    }else{
        return stepState.actions[stepState.actions.length - 1];
    }
}

function computeCurrentContentOfStep(stepState: RephraseState) {
    return getLatestActionOfStep(stepState).result;
}

function computeCurrentStepInstance(stepState: RephraseState) : RecipeStep{
    return {
        step: getLatestActionOfStep(stepState).result,
        index: stepState.original.index
    }
}

function computeCurrentRecipe (textReducerState: TextReducerState) : Recipe {
    return {
        name: textReducerState.recipe.name,
        steps: textReducerState.stepStates.map(computeCurrentStepInstance)
    }
}


export {createDefaultTextReducerState, generateInitialStepRephraseStates, computeCurrentContentOfStep, computeCurrentStepInstance, computeCurrentRecipe};