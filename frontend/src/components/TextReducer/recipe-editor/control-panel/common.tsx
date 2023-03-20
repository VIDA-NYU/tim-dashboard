import { Typography, styled } from "@mui/material";
import Card from "@mui/material/Card";


const ControlCard = styled(Card)({
    display: "flex",
    flexDirection: "column",
    marginRight: 15,
    flexBasis: 3,
    flexGrow: 3,
    paddingLeft: "15px",
    paddingTop: "10px"
    // alignItems: "stretch",
    // justifyContent: "space-between"
})

interface ControlCardHeaderProps {
    title: string,
}

const ControlCardHeader = ({title}: ControlCardHeaderProps) => {
    return (
        <Typography
            variant="h5"
        >
            {title}
        </Typography>
    )
}

export {ControlCard, ControlCardHeader};