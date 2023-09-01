import React from 'react';
import { Recipe } from '../state/types';
import { Button, Card } from '@mui/material';
import RecipeEditorContent from './recipe-editor-content';
import { TextReducerState } from '../state/types';
import RecipeCreator from './recipe-creator';
import ControlPanel from './control-panel/control-panel';
import { generateInitialStepRephraseStates } from '../state/utils';
import styled from '@emotion/styled';
import { useRecipeCreator } from './hooks';

import { RecipeEditorMode } from '../state/types';
import RephrasePanel from './control-panel/rephrase-panel';
import StudyControlPanel from './control-panel/study-control';
import { InstructionRephraseParams } from '../../WOZView/instruction-rephrase/types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomTabPanel from '../tab-panels/custom-tab-panel';
import UserStudyContainer from '../user-study/user-study-container';
import FormativeStudyContainer from '../formative-study/formative-study-container';


interface RecipeEditorProps {
    recipe: Recipe,
    setRecipe: (newValue: Recipe) => void,
    textReducerState: TextReducerState,
    setTextReducerState: (newValue: TextReducerState) => void,
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
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

export default function RecipeEditor({ recipe, setRecipe, textReducerState, setTextReducerState }: RecipeEditorProps) {

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
        <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Formative Study" {...a11yProps(0)} />
                    <Tab label="User Study" {...a11yProps(1)} />
                    <Tab label="Deployment" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <FormativeStudyContainer
                />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <UserStudyContainer
                    recipe={recipe}
                    setRecipe={setRecipe}
                    textReducerState={textReducerState}
                    setTextReducerState={setTextReducerState}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>
           



        </Card>
    )
}