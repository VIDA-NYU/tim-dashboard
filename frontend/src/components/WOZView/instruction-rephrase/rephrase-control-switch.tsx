import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import {grey} from "@mui/material/colors";
import {ReactElement} from "react";

interface RephraseControlSwitchProps {
    colorActivated: string,
    iconElement: ReactElement,
    tooltipHint: string,
    stateActivated: boolean,
    onSettingState: (value: boolean) => void,
}




export default function RephraseControlSwitch({colorActivated, iconElement, tooltipHint, stateActivated, onSettingState}:
    RephraseControlSwitchProps){

    const onClick = () => {
        onSettingState(!stateActivated);
    }

    const backgroundColor = stateActivated ? colorActivated: grey[500];

    return (
        <Tooltip title={tooltipHint}>
            <IconButton
                onClick={onClick}
                sx={{
                    width: 28,
                    height: 28,
                    marginLeft: "5px"
                }}
            >
                <Avatar
                    sx={{bgcolor: backgroundColor, width: 24, height: 24}}>
                    {iconElement}
                </Avatar>
            </IconButton>
        </Tooltip>

    )
}