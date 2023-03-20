import {Card, styled, IconButton} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';

import { ControlCard, ControlCardHeader } from "./common";
import { RecipeEditorMode } from "../../state/types";

interface ControlPanelProps {
    mode: RecipeEditorMode,
    onCreatorSave: () => void,
    onCreatorDiscard: () => void,
    onCreatorOpen: () => void,
}

const Content = styled("div")({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
});



export default function ControlPanel({mode, onCreatorSave, onCreatorDiscard, onCreatorOpen}: ControlPanelProps) {
    return (
        <ControlCard>
            <ControlCardHeader
                title={"Control Panel"}
            />
            <Content>
            {
                mode === RecipeEditorMode.CREATING ?
                <IconButton
                size="large"
                onClick={() => {
                    onCreatorDiscard();
                }} color="secondary" aria-label="delete">
                    <CancelIcon
                        sx={{ fontSize: '3rem' }}
                    />
                </IconButton>:
                <IconButton
                size="large"
                onClick={() => {
                }}
                 aria-label="delete">
                    <CancelIcon
                        sx={{
                            color: "gray" ,
                            fontSize: '3rem' }}
                    />
                </IconButton>
            }
            
            {
                mode === RecipeEditorMode.CREATING ?
            <IconButton 
            size="large"
            onClick={() => {
                onCreatorSave();
            }} color="primary" aria-label="delete">
                <SaveIcon
                    sx={{ fontSize: '3rem' }}
                />
            </IconButton> :
            <IconButton 
            size="large"
            onClick={() => {
                onCreatorOpen();
            }} color="primary" aria-label="delete">
                <EditIcon
                    sx={{ fontSize: '3rem' }}
                />
            </IconButton>
            }

            

            </Content>


        </ControlCard>
    )
}
