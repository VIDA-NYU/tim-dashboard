import { RuleUnitAction, RuleUnitTimeCounter } from "../types"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {ActionIcon, RuleIconComponent} from "./icons/action-icon";
import { blueGrey, green, grey } from "@mui/material/colors";
import RuleUnitRect from "./icons/rule-unit-rect";
import RuleUnitText from "./icons/rule-unit-text";
import RuleUnitTransform from "./icons/rule-unit-transform";
import { gray } from "d3";

interface RuleTimeCounterComponentProps {
    ruleUnit: RuleUnitTimeCounter,
    x: number, y: number,
    width: number, height: number
}


export default function RuleUnitTimeCounterComponent ({ruleUnit, x, y, width, height}: RuleTimeCounterComponentProps){

    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(Math.max(ruleUnit.currentValue / ruleUnit.timeThreshold, 0), 1);
    const strokeDasharray = `${circumference * progress} ${circumference}`;
    const strokeWidth = 3;
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
           <g transform={`translate(${width - 30}, 9)`}>
                <circle
                r={radius}
                stroke={blueGrey[100]}
                strokeWidth={strokeWidth}
                transform={`rotate(-90) translate(-${1 * radius})`}
                fill="none"
                />
                <circle
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={circumference}
                transform={`rotate(270) translate(-${1 * radius})`}
                />
                
                
            </g>

            <RuleUnitText
                    height={height}
                    color={color}
                    text={`Time: ${ruleUnit.currentValue}/${ruleUnit.timeThreshold}`}
                />
        </RuleUnitTransform>
    )
}
