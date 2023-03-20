import React, { useState } from "react";
import { Button, Card, styled } from "@mui/material";
import TextField from "@mui/material/TextField";


interface RecipeCreatorProps {
    creatorContent: string,
    setCreatorContent: (newValue: string) => void,
    creatorTitle: string,
    setCreatorTitle: (newValue: string) => void,
    onCreatorDiscard: () => void,
    onCreatorSave: () => void,
}

const Container = styled(Card)({
    display: "flex",
    flexDirection: "column",
    paddingBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
});

const ButtonGroup = styled("div")({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10px"
})

const TextFieldContainer = styled("div")({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10px",
    paddingRight: "8px"
})

export default function RecipeCreator ({
    creatorContent, setCreatorContent,
    creatorTitle, setCreatorTitle,
    onCreatorDiscard, onCreatorSave

}: RecipeCreatorProps){
    const [content, setContent] = useState<string>("");

    return (
        <Container>
            <TextFieldContainer>
                <TextField
                    sx={{ m: 1, width: '100%' }}
                    id="filled-multiline-flexible"
                    label="Multiline"
                    multiline
                    rows={15}
                    value={creatorContent}
                    onChange={(event) => setCreatorContent(event.target.value)}
                
                    
                />

            </TextFieldContainer>
                <ButtonGroup>
                <Button 
                    sx={{width: "50%", marginRight: "10px"}}
                    onClick={() => onCreatorDiscard()}
                    variant="contained">Discard</Button>
                <Button 
                    sx={{width: "50%", marginLeft: "10px"}}
                    onClick={() => onCreatorSave()}
                    variant="contained">Save</Button>
            </ButtonGroup>
        </Container>
    )
}
