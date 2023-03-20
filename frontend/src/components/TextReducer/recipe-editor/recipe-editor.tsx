import React from 'react';
import { Recipe } from '../state/types';
import { Button, Card } from '@mui/material';
import RecipeEditorContent from './recipe-editor-content';
import {TextReducerState} from '../state/types';
import RecipeCreator from './recipe-creator';
import ControlPanel from './control-panel/control-panel';
import { generateInitialStepRephraseStates } from '../state/utils';
import styled from '@emotion/styled';
import { useRecipeCreator } from './hooks';

import { RecipeEditorMode } from '../state/types';
import RephrasePanel from './control-panel/rephrase-panel';
import StudyControlPanel from './control-panel/study-control';
import { InstructionRephraseParams } from '../../WOZView/instruction-rephrase/types';


interface RecipeEditorProps {
    recipe: Recipe,   
    setRecipe: (newValue: Recipe) => void,
    textReducerState: TextReducerState,
    setTextReducerState: (newValue: TextReducerState) => void,
}

 
const ControlRow = styled("div")({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
    alignItems: "stretch"
});

export default function RecipeEditor ({recipe, setRecipe, textReducerState, setTextReducerState}: RecipeEditorProps ){

    const [mode, setMode] = React.useState<RecipeEditorMode>(RecipeEditorMode.CREATING);


    const {
        creatorContent, creatorTitle,
        setCreatorContent, setCreatorTitle, 
        onCreatorDiscard, onCreatorSave, onCreatorOpen
    } = useRecipeCreator(recipe, setRecipe, textReducerState, setTextReducerState, setMode);

    const onSettingStepContentByHuman = (index: number, newValue: string) => {
        console.log(textReducerState);
        const newSteps = [...textReducerState.stepStates];
        console.log(newSteps[index].actions);
        console.log(index);
        newSteps[index].actions.push(
            {
                params: {
                    humanEdited: true,
                    numericSimplification: false,
                    lexicalSimplification: false,
                    
                },
                time: Date.now().valueOf(),
                result: newValue,
            }
        ) 
        setTextReducerState({
            ...textReducerState,
            stepStates: newSteps,
        })
    }

    const onSettingParams = (newParams: InstructionRephraseParams) => {
        setTextReducerState(
            {
                ...textReducerState,
                rephraseParams: newParams
            }
        )
    };

    // const onSavingNewRecipe = (title: string, content: string) => {
    //     const recipe =  generateRecipeByTextContent("New Recipe", content);       

    //     setRecipe(recipe);
    //             setTextReducerState({
    //         ...textReducerState,
    //         stepStates: generateInitialStepRephraseStates(recipe)
    //     });
    //     setMode(RecipeEditorMode.EDITING);
    // }

    const onDiscardingNewRecipe = () => {
        setMode(RecipeEditorMode.EDITING);
    }


    return (
        <div>
            <ControlRow>
                <ControlPanel
                    onCreatorSave={onCreatorSave}
                    onCreatorDiscard={onCreatorDiscard}
                    onCreatorOpen={onCreatorOpen}
                    mode={mode}
                ></ControlPanel>

                <RephrasePanel
                    onSettingParams={onSettingParams}
                    params = {textReducerState.rephraseParams}
                />

                <StudyControlPanel
                    textReducerState={textReducerState}
                />

            </ControlRow>
            {
                mode === RecipeEditorMode.EDITING && <RecipeEditorContent
            textReducerState={textReducerState}
                recipe={recipe}
                setRecipe={setRecipe}
                onSettingStepContent={onSettingStepContentByHuman}
            />
            }

            {
                mode === RecipeEditorMode.CREATING && <RecipeCreator
                    creatorContent={creatorContent}
                    creatorTitle={creatorTitle}
                    setCreatorContent={setCreatorContent}
                    setCreatorTitle={setCreatorTitle}
                    onCreatorDiscard={onCreatorDiscard}
                    onCreatorSave={onCreatorSave}
                />
            }
            <Button
                onClick={() => {
                    setTextReducerState({
                        ...textReducerState,
                        currentStep: textReducerState.currentStep + 1,
                })}}
            >Next</Button>
            


        </div>
    )
}