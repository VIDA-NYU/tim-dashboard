import {InstructionRephraseInstanceResponse, InstructionRephraseParams} from "./types";

export function generateFakeInstructionRephraseInstanceResponse(original: string, params: InstructionRephraseParams): InstructionRephraseInstanceResponse {
    let response: InstructionRephraseInstanceResponse = {
        instance: {
            params: {
                numericSimplification: true,
                lexicalSimplification: true
            },
            original: original,
            rephrased: "[rephrased text offline]",
        }
    };
    return response;

}
