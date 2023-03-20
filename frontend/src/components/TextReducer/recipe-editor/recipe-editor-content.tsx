// A recipe is a document containing a series of steps. The following component displayed a recipe with the steps and allow the user to edit the text content.
//
// Compare this snippet from src/components/TextReducer/recipe-editor.tsx:
// import React from 'react';
// import { TextReducerContext } from './state/text-reducer-state';
import { Recipe } from '../state/types';
import { TextField } from '@mui/material';
import { useState } from 'react';
import RecipeEditorLine from './recipe-editor-line';
import { TextReducerState } from '../state/types';
import { computeCurrentStepInstance } from '../state/utils';
import Card from '@mui/material/Card';


interface RecipeEditorContentProps {
    recipe: Recipe,
    setRecipe: (newValue: Recipe) => void,
    textReducerState: TextReducerState,
    onSettingStepContent: (index: number, newValue: string) => void,
};

const onSettingEditing = (newValue: boolean) => { }

export default function RecipeEditorContent({recipe, setRecipe, textReducerState, onSettingStepContent}: RecipeEditorContentProps) {
    const {steps} = recipe;
    const [stepIndex, setStepIndex] = useState(0);
    const step = steps[stepIndex];
    
    const [editingStep, setEditingStep] = useState<number>(-1);
    const [editingContent, setEditingContent] = useState<string>("");


    return (
        <Card>
            {
                textReducerState.stepStates.map((step, index) => {
                    const onSettingEditing = (newValue: boolean) => {
                        if (index === editingStep) {
                            if(newValue){
                                // setEditingStep
                                console.log(computeCurrentStepInstance(step).step);
                                setEditingContent(computeCurrentStepInstance(step).step);
                                setEditingStep(index);
                            }
                            else{
                                setEditingStep(-1);
                                onSettingStepContent(index, editingContent)
                            }
                            setEditingStep(-1);
                        } else {
                            if(newValue){
                                if(editingStep !== -1){
                                    onSettingStepContent(editingStep, editingContent);
                                    
                                }
                                setEditingContent(computeCurrentStepInstance(step).step);
                                setEditingStep(index);

                           }else{
                                // setEditingStep(-1);
                            }
                        }
                    }
                    return (
                        <RecipeEditorLine 
                        recipeStep={computeCurrentStepInstance(step)}
                            onSettingEditing={onSettingEditing}
                            editingContent={editingContent}
                            editingStatus={editingStep === index}
                            onChangingContent={(newValue: string) => {setEditingContent(newValue)}}
                        />
                    )
                })
            }
            
        </Card>
    );
}
