import { RuleUnitAction } from "../types"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {ActionIcon, RuleIconComponent} from "./icons/action-icon";
import { blueGrey, green, grey } from "@mui/material/colors";
import RuleUnitRect from "./icons/rule-unit-rect";
import RuleUnitText from "./icons/rule-unit-text";
import RuleUnitTransform from "./icons/rule-unit-transform";

interface RuleActionComponentProps {
    ruleUnit: RuleUnitAction,
    x: number, y: number,
    width: number, height: number
}

export default function RuleActionComponent ({ruleUnit, x, y, width, height}: RuleActionComponentProps){
    let ruleSatisfied = ruleUnit.ruleSatisfied();
    let color = ruleSatisfied ? green[500] : blueGrey[400];
    return (
        <RuleUnitTransform
            x={x}
            y={y}
        >

            <RuleUnitRect
                width={width}
                height={height}
                color={color}
            />
            <g>
        
                <g 
                    transform={`translate(${width - 30}, ${height/2})`}>
                        <RuleIconComponent
                            x={0}
                            y={0}
                            status={ruleSatisfied}
                            color={color}
                            iconType="action"
                        />
                </g>
                <RuleUnitText
                    height={height}
                    color={color}
                    text={ruleUnit.targetAction}
                />
                
            </g>


        </RuleUnitTransform>
    )
}
