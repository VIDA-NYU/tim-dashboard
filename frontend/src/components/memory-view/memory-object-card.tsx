import {MemoryObject} from "./types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {styled} from "@mui/material";
import Typography from "@mui/material/Typography";

interface MemoryObjectCardProps{
    memoryObject: MemoryObject
}

const StyledCard = styled(Card) (() => ({
    marginLeft: 50
}))

const CardContentContainer = styled("div") (() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 50
}))
export default function MemoryObjectCard({memoryObject}: MemoryObjectCardProps){
    return (
        <StyledCard>
            <CardContent>
                <CardContentContainer>
                    <Typography variant={"h5"}>
                        {memoryObject.label}
                    </Typography>
                    <Typography
                        variant={"body1"}
                    >
                        {
                            `x: ${memoryObject.center.x.toFixed(2)} y: ${memoryObject.center.y.toFixed(2)} z: ${memoryObject.center.z.toFixed(2)}`
                        }
                    </Typography>
                    <Typography
                        variant={"body1"}
                    >
                        {memoryObject.trackId}
                    </Typography>
                </CardContentContainer>
            </CardContent>
        </StyledCard>
    )
}