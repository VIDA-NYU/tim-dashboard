
interface InstructionRephraseParams {
    numericSimplification: boolean,
    lexicalSimplification: boolean,
}
interface InstructionRephraseInstance {
    original: string,
    rephrased: string,
    params: InstructionRephraseParams
}

interface InstructionRephraseInstanceResponse{
    instance: InstructionRephraseInstance,
}

interface InstructionRephraseInstanceRequest {
    original: string,
    params: InstructionRephraseParams
}

enum RephraseDisplayMode {
    Concurrent,
    Preview,
    Static
}


export type {InstructionRephraseParams, InstructionRephraseInstance,
    InstructionRephraseInstanceResponse, InstructionRephraseInstanceRequest,
};
export {RephraseDisplayMode};
