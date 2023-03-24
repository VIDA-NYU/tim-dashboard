import { Card, styled } from "@mui/material";
import { useDocumentationEditor } from "./documentation-editor-hook";
import DocumentationEditor from "./editor/documentation-editor";
import { generateStaticVideoSummary } from "../video-summary/static";


interface DocumentationProps {
    recipeInstructions: Array<string>,
}

const Container = styled(Card)({

});


export default function DocumentationComp ({recipeInstructions}: DocumentationProps) {

    const {editingContent, editingError, editingIndex, setEditingContent, setEditingError, setEditingIndex, documentation,
        saveEditingContent, startEditing, editingVisualIndex, setEditingVisualIndex
    } = useDocumentationEditor(recipeInstructions);

    let videoSummary = generateStaticVideoSummary()

    return (
        <Card>
            <DocumentationEditor
                editingContent={editingContent}
                editingError={editingError}
                editingIndex={editingIndex}
                setEditingContent={setEditingContent}
                setEditingError={setEditingError}
                setEditingIndex={setEditingIndex}
                documentation={documentation}
                saveEditingContent={saveEditingContent}
                startEditing={startEditing}
                editingVisualIndex={editingVisualIndex}
                setEditingVisualIndex={setEditingVisualIndex}
                videoSummary={videoSummary}
            />
        </Card>
    );
}