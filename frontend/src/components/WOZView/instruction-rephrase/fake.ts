import {InstructionRephraseInstanceResponse, InstructionRephraseParams} from "./types";

export function generateFakeInstructionRephraseInstanceResponse(original: string, params: InstructionRephraseParams): InstructionRephraseInstanceResponse {
    let response: InstructionRephraseInstanceResponse = {
        instance: {
            params: {
                numericSimplification: true,
                lexicalSimplification: true,
                humanEdited: false
            },
            original: original,
            rephrased: `[rephrased text offline] ${original}`,
        }
    };
    return response;

}
