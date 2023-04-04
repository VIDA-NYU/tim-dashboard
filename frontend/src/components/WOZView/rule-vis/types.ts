interface Rule {

}


class RuleUnitBase {
    name: string;
  
    constructor() {
        this.name = "RuleUnitBase";
    }
    ruleSatisfied(){
        return false;
    }
  }
  
class RuleUnitAction extends RuleUnitBase {
    targetAction: string;
    constructor(targetAction: string){
        super();
        this.targetAction = targetAction;
        this.name = "Action Rule";
    }

    ruleSatisfied(): boolean {
        return true;
    }
}

class RuleUnitObject extends RuleUnitBase {
    targetObject: string
    constructor(targetObject: string){
        super();
        this.targetObject = targetObject;
        this.name = "Object Rule";
    }
    ruleSatisfied(): boolean {
        return true;
    }
}

class RuleUnitActCounter extends RuleUnitBase {
    actThreshold: number;
    currentValue: number;
    constructor(actThreshold: number){
        super();
        this.actThreshold = actThreshold;
        this.name = "Action Count Rule";
    }

    ruleSatisfied(){
        return this.currentValue >= this.actThreshold;
    }
}

class RuleUnitTimeCounter extends RuleUnitBase {
    timeThreshold: number;
    currentValue: number;
    constructor(timeThreshold: number){
        super();
        this.timeThreshold = timeThreshold;
        this.name = "Time Count Rule";
        this.currentValue = 2;
    }

    ruleSatisfied(){
        return this.currentValue >= this.timeThreshold;
    }
}



class RuleUnitOperationBase extends RuleUnitBase {
    constructor(){
        super();
    }
}
class RuleUnitOperationOr extends RuleUnitOperationBase {
    children: Array<RuleUnitBase>;
    constructor (children: Array<RuleUnitBase>){
        super() 
        this.children = children;
        this.name = "OR Rule";
    }
    ruleSatisfied(): boolean {
        return this.children.some(child => child.ruleSatisfied());
    }

    
}

class RuleUnitOperationAnd extends RuleUnitOperationBase {
    children: Array<RuleUnitBase>;
    constructor (children: Array<RuleUnitBase>){
        super() 
        this.children = children;
        this.name = "AND Rule";
    }

    ruleSatisfied(): boolean {
        return this.children.every(child => child.ruleSatisfied());
    }
}

export {RuleUnitBase, RuleUnitAction, RuleUnitObject, RuleUnitActCounter, RuleUnitOperationAnd, RuleUnitOperationOr, RuleUnitOperationBase, RuleUnitTimeCounter};