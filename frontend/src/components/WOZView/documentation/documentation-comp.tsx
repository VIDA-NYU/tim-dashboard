import { Card, CardHeader, styled } from "@mui/material";
import { useDocumentationEditor } from "./documentation-editor-hook";
import DocumentationEditor from "./editor/documentation-editor";
import { generateStaticVideoSummary } from "../video-summary/static";


interface DocumentationProps {
    recipeInstructions: Array<string>,
}

const Container = styled(Card)({
    paddingBottom: "10px",
    paddingTop: "10px",
});

const Content = styled("div")({
    overflowY: "scroll",
    height: "360px",
    paddingBottom: "10px",
    paddingTop: "10px",
    paddingRight: "10px",
});


export default function DocumentationComp ({recipeInstructions}: DocumentationProps) {

    const {editingContent, editingError, editingIndex, setEditingContent, setEditingError, setEditingIndex, documentation,
        saveEditingContent, startEditing, editingVisualIndex, setEditingVisualIndex
    } = useDocumentationEditor(recipeInstructions);

    let videoSummary = generateStaticVideoSummary()

    return (
        <Container>
            <CardHeader title={"Documentation"} titleTypographyProps={{variant: "body1"}}></CardHeader>
            <Content>
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
            </Content>
            
        </Container>
    );
}