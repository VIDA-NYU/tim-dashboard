import { styled } from "@mui/material";
import { Documentation } from "../types";
import DocumentationEditorLine from "./documentation-editor-line";
import { VideoSummary } from "../../video-summary/types";


interface DocumentationEditorProps {
    editingContent: string,
    setEditingContent: (value: string) => void,
    editingError: string,
    setEditingError: (value: string) => void,
    editingIndex: number,
    setEditingIndex: (value: number) => void,
    documentation: Documentation,
    saveEditingContent: () => void,
    startEditing: (index: number) => void,
    setEditingVisualIndex: (value: number) => void,
    editingVisualIndex: number,
    videoSummary: VideoSummary,
}


const Container = styled("div")({});

const LineList = styled("div")({});


export default function DocumentationEditor({editingContent, editingError, editingIndex, setEditingContent, setEditingError, 
    documentation, saveEditingContent, startEditing, setEditingVisualIndex, editingVisualIndex, videoSummary,
    setEditingIndex}: DocumentationEditorProps) {
    

    
    return (
        <Container>
            <LineList>
                {
                    documentation.steps.map((step, index) => {
                        return (
                            <DocumentationEditorLine
                                editingStatus={editingIndex === index}
                                onSettingEditing={(value) => {
                                    if (value) {
                                        startEditing(index);
                                        // setEditingContent(step.description);
                                    } else {
                                        saveEditingContent();
                                        setEditingIndex(-1);
                                    }
                                }}
                                editingContent={editingContent}
                                setEditingContent={setEditingContent}
                                documentationStep={step}
                                editingError={editingError}
                                setEditingError={setEditingError}
                                editingVisualIndex={editingVisualIndex}
                                setEdititingVisualIndex={setEditingVisualIndex}
                                videoSummary={videoSummary}
                                saveEditingContent={saveEditingContent}
                                startEditing={() => {startEditing(index)}}
                            ></DocumentationEditorLine>
                        )
                    })
                }
                
            </LineList>
        </Container>
    );
}
