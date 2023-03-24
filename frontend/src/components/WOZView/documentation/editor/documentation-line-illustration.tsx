import { Card } from "@mui/material";
import { styled } from "@mui/material";
import {IllustrationTextInput} from "../../instruction-illustration/illustration-text-input";
import IllustrationDisplay from "../../instruction-illustration/illustration-display";
import { useState, useEffect } from "react";
import { useInstructionIllustration } from "../../instruction-rephrase/open-ai-hook";

interface DocumentationLineIllustrationProps {
    editingContent: string,
}

const Container = styled(Card)({
    marginTop: "10px",
    marginBottom: "10px"
});

const Content = styled("div")({
    display: 'flex',
    flexDirection: "row",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "12px"
})

function DocumentationLineIllustration({editingContent}: DocumentationLineIllustrationProps) {
    const [illustrationText, setIllustrationText] = useState<string>("");

    const onSettingIllustrationText = (value: string) => {
        setIllustrationText(value);
    }
    useEffect(() => {
        setIllustrationText(editingContent)
    }, [editingContent]);


    const {illustrationURL} = useInstructionIllustration(illustrationText);
    return (
        <Container>
            <Content>
                <IllustrationTextInput onSettingIllustrationText={onSettingIllustrationText}
                                       initialIllustrationText={editingContent}
                />
                <IllustrationDisplay url={illustrationURL}/>
            </Content>
        </Container>
    )
}


export default DocumentationLineIllustration;