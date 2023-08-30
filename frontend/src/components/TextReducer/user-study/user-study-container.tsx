import React from 'react';
import { Recipe } from '../state/types';
import { Button, Card } from '@mui/material';
import RecipeEditorContent from '../recipe-editor/recipe-editor-content';
import { TextReducerState } from '../state/types';
import RecipeCreator from '../recipe-editor/recipe-creator';
import ControlPanel from '../recipe-editor/control-panel/control-panel';
import { generateInitialStepRephraseStates } from '../state/utils';
import { useRecipeCreator } from '../recipe-editor/hooks';

import { RecipeEditorMode } from '../state/types';
import RephrasePanel from '../recipe-editor/control-panel/rephrase-panel';
import StudyControlPanel from '../recipe-editor/control-panel/study-control';
import { InstructionRephraseParams } from '../../WOZView/instruction-rephrase/types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomTabPanel from '../tab-panels/custom-tab-panel';
import { styled } from '@mui/material';


interface Props {
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
const Container = styled("div")({});

export default function UserStudyContainer({ recipe, setRecipe, textReducerState, setTextReducerState }: Props) {

    const [mode, setMode] = React.useState<RecipeEditorMode>(RecipeEditorMode.CREATING);

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


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
        <Container>
            <ControlRow>
                <ControlPanel
                    onCreatorSave={onCreatorSave}
                    onCreatorDiscard={onCreatorDiscard}
                    onCreatorOpen={onCreatorOpen}
                    mode={mode}
                ></ControlPanel>

                <RephrasePanel
                    onSettingParams={onSettingParams}
                    params={textReducerState.rephraseParams}
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
                    })
                }}
            >Next</Button>
        </Container>
    )
}