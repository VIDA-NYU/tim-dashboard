
interface InstructionRephraseParams {
    numericSimplification: boolean,
    lexicalSimplification: boolean,
    humanEdited: boolean,
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

interface RephraseAnnotationRecord {
    step: number
    rephrased: string,
    reason: "human" | "model",
}

interface RephraseAnnotation {
    records: Array<RephraseAnnotationRecord>
}

export type {InstructionRephraseParams, InstructionRephraseInstance,
    InstructionRephraseInstanceResponse, InstructionRephraseInstanceRequest,
    RephraseAnnotationRecord, RephraseAnnotation
};
export {RephraseDisplayMode};
