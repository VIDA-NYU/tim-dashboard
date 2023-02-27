import {InstructionRephraseInstanceRequest, InstructionRephraseInstanceResponse} from "./types";
import {useEffect, useState} from "react";
import {getJsonData} from "../utils/rest";
import {API_URL, RECORDINGS_STATIC_PATH} from "../../../config";
import {generateFakeInstructionRephraseInstanceResponse} from "./fake";

function useInstructionRephraseAPI (requestParams: InstructionRephraseInstanceRequest){

    const [response, setResponse] = useState<InstructionRephraseInstanceResponse>();

    useEffect(() => {
        let response = generateFakeInstructionRephraseInstanceResponse(requestParams.original, requestParams.params);
        setResponse(response);
    }, [requestParams.original,
        requestParams.params.numericSimplification, requestParams.params.lexicalSimplification])

    return {
        instructionRephraseInstanceResponse: response
    }

}

export {useInstructionRephraseAPI};