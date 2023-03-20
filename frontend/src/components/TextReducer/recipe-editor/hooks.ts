import { useState } from "react";
import { Recipe, TextReducerState } from "../state/types";
import { generateInitialStepRephraseStates } from '../state/utils';
import { RecipeEditorMode } from "../state/types";


function trimAndSplit(text: string): string[] {
    return text.trim().split('\n');
  }
  

function generateRecipeByTextContent(title: string, content: string): Recipe {
    const textLines = trimAndSplit(content);
    return {
        name: "New Recipe",
        steps: textLines.map((line, index) => {
            return {
                index: index,
                step: line,
            };
        }),
    };
}      

function useRecipeCreator(
    recipe: Recipe,
    setRecipe: (newData: Recipe) => void | ((fn: (prevData: Recipe) => Recipe) => void),
    textReducerState: TextReducerState,
    setTextReducerState: (newData: TextReducerState) => void | ((fn: (prevData: TextReducerState) => TextReducerState) => void),
    setMode: (newData: RecipeEditorMode) => void | ((fn: (prevData: RecipeEditorMode) => RecipeEditorMode) => void)
    ){
    const [creatorContent, setCreatorContent] = useState<string>("");
    const [creatorTitle, setCreatorTitle] = useState<string>("");

    const onCreatorSave = () => {
        const recipe =  generateRecipeByTextContent("New Recipe", creatorContent);       
        
        setRecipe(recipe);
                setTextReducerState({
            ...textReducerState,
            stepStates: generateInitialStepRephraseStates(recipe)
        });
        setMode(RecipeEditorMode.EDITING);

    };
    const onCreatorDiscard = () => {
        setMode(RecipeEditorMode.EDITING);
    };

    const onCreatorOpen = () => {
        setMode(RecipeEditorMode.CREATING);
    }

    return {
        onCreatorOpen, creatorContent, setCreatorContent, creatorTitle, setCreatorTitle, onCreatorDiscard, onCreatorSave
    };
}

export {useRecipeCreator}