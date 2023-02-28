import {
    InstructionRephraseInstanceRequest,
    InstructionRephraseInstanceResponse,
    InstructionRephraseParams
} from "./types";
import {useEffect, useState} from "react";
import {getJsonData} from "../utils/rest";
import {API_URL, RECORDINGS_STATIC_PATH} from "../../../config";
import {generateFakeInstructionRephraseInstanceResponse} from "./fake";
import {buildInferencePrompt, buildPrompt, buildTaskPrompt} from "./open-ai";
import {RecipeObjectStatus} from "../object-comps/types";

const OPENAI_API_KEY = "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";
async function callOpenAIAPI(context: string, objects: Array<RecipeObjectStatus>,
                             originalInstruction: string, params: InstructionRephraseParams){
    // const prompt = buildInferencePrompt();
    buildTaskPrompt(params)
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
        apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    return buildPrompt(context, objects, originalInstruction, params).then(prompt => {
        return openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0,
            max_tokens: 30,
        }).then(res=>{
            return res.data.choices[0].text.trim() as String;
            // console.log(res.data.choices[0].text.trim());
        });
    })


}

function useInstructionRephraseAPI (requestParams: InstructionRephraseInstanceRequest, humanRephrasedInstruction: string){

    const [response, setResponse] = useState<InstructionRephraseInstanceResponse>();
    useEffect(() => {
        let response = generateFakeInstructionRephraseInstanceResponse(requestParams.original, requestParams.params);
        if(!requestParams.params.humanEdited){
            setResponse(response);
        }
        // callOpenAIAPI("The user is making Pinwheels with the tortilla. This is one of the steps",
        //     [], requestParams.original,
        //     requestParams.params).then(res => {
        //         let openaiResponse: InstructionRephraseInstanceResponse = {
        //             instance: {
        //                 original: requestParams.original,
        //                 params: requestParams.params,
        //                 rephrased: res
        //             }
        //         }
        //         setResponse(openaiResponse);
        // });
    }, [requestParams.original,
        requestParams.params.numericSimplification, requestParams.params.lexicalSimplification,
        requestParams.params.humanEdited])

    useEffect(() => {
        if(requestParams.params.humanEdited){
            setResponse(
                {
                    instance: {
                        params: requestParams.params,
                        original: requestParams.original,
                        rephrased: humanRephrasedInstruction
                    }
                }
            )
        }
    }, [humanRephrasedInstruction, requestParams.params.humanEdited])

    return {
        instructionRephraseInstanceResponse: response
    }

}

export {useInstructionRephraseAPI};