import { InstructionRephraseParams } from "../../WOZView/instruction-rephrase/types";

enum SyncStatus {
    IDLE = "IDLE",
    SYNCING = "SYNCING",
    SYNCED = "SYNCED",
    ERROR = "ERROR"
}

enum RecipeEditorMode {
    EDITING,
    CREATING,
}


interface RephraseAction {
    params: InstructionRephraseParams,
    result: string,
    time: number
}
interface RephraseState {
    original: RecipeStep 
    actions: Array<RephraseAction>,
}

interface RecipeStep {
    step: string,
    index: number,
}

interface Recipe {
    name: string,
    steps: Array<RecipeStep>
}

interface TextReducerState {
    recipe: Recipe,
    currentStep: number,
    
    stepStates: Array<RephraseState>,
    rephraseParams: InstructionRephraseParams,
}

interface TextReducerProviderState {
    textReducerState: TextReducerState,
    setTextReducerState: (newData: TextReducerState) => void | ((fn: (prevData: TextReducerState) => TextReducerState) => void)
}


export type {TextReducerState, TextReducerProviderState, Recipe, RecipeStep, RephraseAction, RephraseState};

export {SyncStatus, RecipeEditorMode};