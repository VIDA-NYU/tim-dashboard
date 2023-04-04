import { RuleUnitAction, RuleUnitOperationAnd } from "../types"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {ActionIcon, RuleIconComponent} from "./icons/action-icon";
import { blueGrey, green, grey } from "@mui/material/colors";
import RuleUnitRect from "./icons/rule-unit-rect";
import RuleUnitText from "./icons/rule-unit-text";
import RuleUnitTransform from "./icons/rule-unit-transform";
import { ScaleBand, scaleBand } from "d3";
interface RuleAndComponentProps {
    ruleUnit: RuleUnitOperationAnd,
    x: number, y: number,
    width: number, height: number
}

export default function RuleAndComponent ({ruleUnit, x, y, width, height}: RuleAndComponentProps){
    let ruleSatisfied = ruleUnit.ruleSatisfied();
    let color = ruleSatisfied ? green[500] : blueGrey[400];
    const getStatusColor = (status: boolean) => (status ? green[300] : blueGrey[200]);

    const pointSize = 5;
    const pointSpacing = 10;

    const paddingRatio = 0.3;

    const yScale = scaleBand()
            .domain(ruleUnit.children.map((child, i) => i.toString()))
            .range([0, height])
            .padding(paddingRatio); 

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
            <g
                transform={`translate(20, ${paddingRatio * height / 2})`}
            >
                {ruleUnit.children.map((child, index) => (
                    <circle
                    key={index}
                    cx={0}
                    cy={yScale(index.toString())}
                    r={pointSize}
                    fill={getStatusColor(child.ruleSatisfied())}
                    />
                ))}
                
                
            </g>
            <g
                transform="translate(38, 5)"
            >
                <RuleUnitText
                    height={height}
                    color={color}
                    text={"AND"}
                /> 
            </g>


        </RuleUnitTransform>
    )
}
