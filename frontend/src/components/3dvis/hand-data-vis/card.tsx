import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ReactPlayer from "react-player";
import {HandsCanvas} from "./canvas";
import {styled} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";

interface HandsDataViewProps {
    data: any
}

const Container = styled("div")(({}) => ({
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20
}))


function HandsDataCard({data}: HandsDataViewProps) {

    return (
        <Container>
            <Card>
                <CardHeader
                    titleTypographyProps={{
                        fontSize: 16,
                    }}
                    title={"Overview"}></CardHeader>
                <CardContent>
                    <HandsCanvas variant={"overview"}  data={data}/>
                </CardContent>
            </Card>
            <Card
                sx={{
                    marginLeft: 10,
                    marginRight: 10
                }}
            >
                <CardHeader
                    titleTypographyProps={{
                        fontSize: 16,
                    }}
                    title={"Left Hand"}></CardHeader>
                <CardContent>
                    <HandsCanvas variant={"left"}  data={data}/>
                </CardContent>
            </Card>

            <Card>
                <CardHeader
                    titleTypographyProps={{
                        fontSize: 16,
                    }}
                    title={"Right Hand"}></CardHeader>
                <CardContent>
                    <HandsCanvas variant={"right"} data={data}/>
                </CardContent>
            </Card>

        </Container>
    )
}

export {HandsDataCard};