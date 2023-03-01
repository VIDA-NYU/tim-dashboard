import {styled} from "@mui/material";

interface IllustrationDisplayProps {
    url: string,
}

const Container = styled("div")({

})

const MyImage = styled("img")({
    width: "100%",
    maxHeight: "200px"
})

export default function IllustrationDisplay({url}: IllustrationDisplayProps){
    return (
        <Container>
            <MyImage src={url} alt={"Girl in a jacket"}/>
        </Container>
    )
}