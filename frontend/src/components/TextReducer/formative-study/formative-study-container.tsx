import { styled } from "@mui/material"
import { useState } from "react"
import { FormativeStudySession } from "./types"
import StudyQuestionForm from "./study-question-form";
import StudyQuestionList from "./study-question-list";
import { useGetFormList } from "../hooks/formative";

interface Props {

}

const Container = styled("div")({

})

export default function FormativeStudyContainer({ }: Props) {

    const [currentFormativeSession, setCurrentFormativeSession] = useState<FormativeStudySession>();

    const {} = useGetFormList();
    return (
        <Container>
            <StudyQuestionList
            />
        </Container>
    )
}