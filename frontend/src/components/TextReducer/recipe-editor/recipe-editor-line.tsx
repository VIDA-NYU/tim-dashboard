import Card from "@mui/material/Card";
import {Collapse, styled, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import AccordionDetails from "@mui/material/AccordionDetails";
import { RecipeStep } from "../state/types";

interface RecipeEditorLineProps {
    recipeStep: RecipeStep,
    editingContent: string,
    editingStatus: boolean,
    onSettingEditing: (value: boolean) => void,
    onChangingContent: (newValue: string) => void,
}

export const TextCard = styled(Card)({
    marginLeft: "8px",
    paddingLeft: "10px",
    paddingTop: "2px",
    paddingBottom: "2px",
    marginBottom: "10px"
})

const RephraseSummary = styled("div")({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: "10px",
    alignItems: "center"
})

const RephraseInstanceControlPanel = styled("div")({
    display: "flex",
    flexDirection: "row"
})

function renderContent(){
    return (
        <Typography>
            INTENTIONALLY LEAVE BLANK
        </Typography>
    )
}

export default function RecipeEditorLine({ 
    recipeStep,
                                                onSettingEditing,
                                                editingContent,
                                                editingStatus,
                                                onChangingContent
                                                }: RecipeEditorLineProps) {
    const [expandState, setExpandState] = useState<boolean>(false)
    const [editState, setEditState] = useState<boolean>(false);
    const onClickExpand = () => {
        setExpandState(!expandState);
    }

    const editFinished = () => {
        setEditState(false);
        onSettingEditing(false);
    }

    const editStarted = () => {
        setEditState(true);
        onSettingEditing(true);
    }


    const onClickEdit = () => {
        if(editState ){
            editFinished();
        }else{
            editStarted();
        }
    }

    const onKeyPress = (event) => {
        // When the user pressed enter
        if(event.keyCode === 13){
            if(editState){
                editFinished();
            }
        }
    }

    const contentDisplay = editingStatus? editingContent: recipeStep.step;


    return (
        <TextCard>

            <RephraseSummary>
                <Typography
                    variant={"body2"}
                >

                    {!editingStatus && contentDisplay}
                </Typography>
                {editingStatus && <TextField id="standard-basic" label="" variant="standard" value={contentDisplay}
                                         onChange={(event) => onChangingContent(event.target.value)}
                                         sx={{width: "100%"}}
                                         size="small"
                                         onKeyDown={onKeyPress}

                />}
                <RephraseInstanceControlPanel>
                    <IconButton
                        onClick={onClickEdit}
                        sx={{
                            width: 28,
                            height: 28,
                            marginLeft: "5px"
                        }}
                    >
                        <EditIcon/>
                    </IconButton>

                    <IconButton
                        onClick={onClickExpand}
                        sx={{
                            width: 28,
                            height: 28,
                            marginLeft: "5px"
                        }}
                    >
                        {!expandState && <ExpandMoreIcon/>}
                        {expandState && <ExpandLessIcon/>}
                    </IconButton>
                </RephraseInstanceControlPanel>
            </RephraseSummary>
                <Collapse in={expandState}>{renderContent()}</Collapse>
                {/*{expandState && renderContent()}*/}

        </TextCard>
    )
}