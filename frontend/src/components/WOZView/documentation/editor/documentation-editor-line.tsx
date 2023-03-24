import Card from "@mui/material/Card";
import {Collapse, styled, Typography} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { VideoSummary } from "../../video-summary/types";
import AccordionDetails from "@mui/material/AccordionDetails";
import { DocumentationStep } from "../types";
import DocumentationLineVisual from "./documentation-line-visual";
import InstructionIllustrationComp from "../../instruction-illustration/instruction-illustration-comp";
import DocumentationLineIllustration from "./documentation-line-illustration";


interface DocumentationEditorLineProps {
    editingStatus: boolean,
    onSettingEditing: (value: boolean) => void,
    editingContent: string,
    editingError: string,
    documentationStep: DocumentationStep
    setEditingContent: (value: string) => void,
    setEditingError: (value: string) => void,
    setEdititingVisualIndex: (value: number) => void,
    editingVisualIndex: number,
    videoSummary: VideoSummary,
    saveEditingContent: () => void,
    startEditing: () => void,
}

export const TextCard = styled(Card)({
    marginLeft: "8px",
    paddingLeft: "10px",
    paddingTop: "2px",
    paddingBottom: "2px",
    marginTop: "18px",
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
});

const CollapseContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    marginLeft: "10px",
    marginRight: "10px",
    marginBottom: "10px"
})

function renderContent(){
    return (
        <Typography>
            INTENTIONALLY LEAVE BLANK
        </Typography>
    )
}

export default function RephraseContentComp({
                                                onSettingEditing,
                                                editingStatus,
                                                editingContent,
                                                documentationStep, setEditingContent,
                                                editingError, setEditingError,
                                                editingVisualIndex,
                                                setEdititingVisualIndex, videoSummary,
                                                saveEditingContent, startEditing
                                                }: DocumentationEditorLineProps) {
    
    const contentDisplay = editingStatus? editingContent : documentationStep.description;

    const [expandState, setExpandState] = useState<boolean>(false)
    const [editState, setEditState] = useState<boolean>(false);
    const onClickExpand = () => {
        if(expandState){
            saveEditingContent();
        }else{
            startEditing();
        }
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
    return (
        <TextCard>

            <RephraseSummary>
                <Typography
                    variant={"body2"}
                >

                    {!editingStatus && contentDisplay}
                </Typography>
                {editingStatus && <TextField id="standard-basic" label="" variant="standard" value={contentDisplay}
                                         onChange={(event) => setEditingContent(event.target.value)}
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
                <Collapse in={expandState}>
                    <CollapseContainer>
                    {
                        useMemo(() => {
                            return (
                                <DocumentationLineIllustration
                            editingContent={editingContent}
                        />
                                
                                
                            )
                        }, [editingContent])
                    }
                        
                        <DocumentationLineVisual
                            setEdititingVisualIndex={setEdititingVisualIndex}
                            editingVisualIndex={editingVisualIndex}
                            videoSummary={videoSummary}
                        />
                    </CollapseContainer>
                        
                </Collapse>
                {/*{expandState && renderContent()}*/}

        </TextCard>
    )
}