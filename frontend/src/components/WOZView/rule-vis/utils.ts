import { RuleUnitAction, RuleUnitActCounter, RuleUnitObject, RuleUnitOperationOr, RuleUnitTimeCounter, RuleUnitOperationAnd } from "./types";

function generateStaticRule (){

    let actionRule = new RuleUnitAction("whisk action");
    let objectRule0 = new  RuleUnitObject("knife");
    
    let actCounterRule = new RuleUnitActCounter(3);
    let timeCounterRule = new RuleUnitTimeCounter(3);

    let objectRule1 = new  RuleUnitObject("tortilla");
    let objectRule2 = new  RuleUnitObject("mug cup");

    let andRule0 = new RuleUnitOperationAnd([objectRule1, objectRule2]);

    let orRule = new RuleUnitOperationAnd([actionRule, andRule0, timeCounterRule]);
    return orRule;

}

export {generateStaticRule};