import {ButtonGroup, styled} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";

interface IllustrationTextInputProps {
    onSettingIllustrationText: (value: string) => void,
    initialIllustrationText: string
}

const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginRight: "25px",
    minWidth: "70%"
    // width: "100%"
})

export function IllustrationTextInput({onSettingIllustrationText, initialIllustrationText}: IllustrationTextInputProps) {


    const [inputValue, setInputValue] = useState<string>("");

    const onClickingGeneration = () => {
        onSettingIllustrationText(inputValue);
    }

    useEffect(() => {
        setInputValue(initialIllustrationText)
    }, [initialIllustrationText])

    return (
        <Container>
            <TextField
                sx={{
                    // flexBasis: 3,
                    // flexGrow: 2,
                    // marginRight: "20px"
                    marginBottom: "12px"
                }
                }
                id="outlined-basic" label="Outlined" variant="outlined"
                value={inputValue}
                onChange={(event) => {
                    setInputValue(event.target.value)
                }
                }
            />
            <ButtonGroup
                sx={{
                    justifyContent: "space-between"
                }}
            >
                <Button
                    sx={{
                        flexBasis: 2,
                        flexGrow: 2,
                        minWidth: "190px",
                        marginRight: "8px"
                    }}
                    size="small"
                    onClick={onClickingGeneration}
                    variant="contained">Generate</Button>

                <Button
                    sx={{
                        flexBasis: 2,
                        flexGrow: 2,
                        minWidth: "90px"
                    }}
                    size="small"
                    variant="contained">Display</Button>
            </ButtonGroup>


        </Container>
    )
}