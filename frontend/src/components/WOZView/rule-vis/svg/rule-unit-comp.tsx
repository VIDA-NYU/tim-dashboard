import { RuleUnitAction, RuleUnitBase, RuleUnitObject, RuleUnitOperationAnd, RuleUnitTimeCounter } from "../types";
import RuleActionComponent from "./rule-unit-action";
import RuleObjectComponent from "./rule-unit-object";
import RuleUnitDefaultComponent from "./rule-unit-default";
import RuleUnitTimeCounterComponent from "./rule-unit-time-counter";
import RuleAndComponent from "./rule-unit-and";

interface RuleUnitComponentProps {
    ruleUnit: RuleUnitBase,
    x: number, y: number,
    width: number, height: number
  }
  
const RuleUnitComponent: React.FC<RuleUnitComponentProps> = ({ ruleUnit, x, y, width, height }) => {
    
    if(ruleUnit instanceof RuleUnitAction){
        return (
            <RuleActionComponent ruleUnit={ruleUnit as RuleUnitAction}
                x={x}
                y={y}
                width={width}
                height={height}

            />
        )
    }
    else if(ruleUnit instanceof RuleUnitObject){
        return (
            <RuleObjectComponent ruleUnit={ruleUnit as RuleUnitObject}
                x={x}
                y={y}  
                width={width}
                height={height}
            />)
    }
    else if(ruleUnit instanceof RuleUnitTimeCounter){
        return (
            <RuleUnitTimeCounterComponent
                x={x}
                y={y}
                width={width}
                height={height}
                ruleUnit={ruleUnit as RuleUnitTimeCounter}
            ></RuleUnitTimeCounterComponent>
        )
    }
    else if(ruleUnit instanceof RuleUnitOperationAnd){
        return (
            <RuleAndComponent
                x={x}
                y={y}
                width={width}
                height={height}
                ruleUnit={ruleUnit as RuleUnitOperationAnd} 
            />
        )
    }
    else{
        return (
            <RuleUnitDefaultComponent
                x={x}
                y={y} 
                width={width}
                height={height}
                ruleUnit={ruleUnit}/>
        )
    }

    return (
        <g>
        </g>
  );
};

export default RuleUnitComponent;