import {styled, Typography} from "@mui/material";
import Badge from '@mui/material/Badge';
import { deepOrange, deepPurple, blue, blueGrey } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {InstructionRephraseInstance} from "./types";
import Card from "@mui/material/Card";


interface RephraseInstanceProps {
    rephraseInstance: InstructionRephraseInstance,
}


const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    flexGrow: 12,
})

const TextCard = styled(Card)({
    marginLeft: "8px",
    paddingLeft: "10px",
    paddingTop: "2px",
    paddingBottom: "2px"
})

export default function RephraseInstanceComp({rephraseInstance}: RephraseInstanceProps){
    return (
        <Container>
            <TextCard
                sx={{
                    marginBottom: "3px"
                }}
            >
                <Typography
                    variant={"body2"}
                    sx={{
                    textDecoration: "line-through",
                }}>
                    {rephraseInstance.original}
                </Typography>
            </TextCard>

            <TextCard>
                <Typography
                    variant={"body2"}
                >
                    {rephraseInstance.rephrased}
                </Typography>
            </TextCard>

        </Container>
    )
}