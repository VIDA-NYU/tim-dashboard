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
import {Configuration, OpenAIApi} from "openai";

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

async function callImageGeneration(prompt: string){
    const {Configuration, OpenAIApi} = require("openai");
    const configuration = new Configuration({
        apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    return openai.createImage({
        prompt: `a illustration for "${prompt}"`,
        n: 1,
        size: "256x256",
    }).then(response => response.data.data[0].url);

}

function useInstructionIllustration(instruction: string){
    const [url, setURL] = useState<string>("https://openaicom.imgix.net/c3ca91b1-f41d-4ba0-84b2-84b2b9c0530e/dall-e-api-now-available-in-public-beta.jpg?fm=auto&auto=compress,format&fit=min&rect=,,,&w=3840&h=3840");
    // useEffect(() => {
    //     callImageGeneration(instruction).then(resURL => {
    //         setURL(resURL);
    //     })
    // }, [instruction]);
    return {illustrationURL: url};
}


function useInstructionRephraseAPI (requestParams: InstructionRephraseInstanceRequest, humanRephrasedInstruction: string){

    const [response, setResponse] = useState<InstructionRephraseInstanceResponse>();
    useEffect(() => {
        // let response = generateFakeInstructionRephraseInstanceResponse(requestParams.original, requestParams.params);
        // if(!requestParams.params.humanEdited){
        //     setResponse(response);
        // }
        callOpenAIAPI("The user is making Pinwheels with the tortilla. This is one of the steps",
            [], requestParams.original,
            requestParams.params).then(res => {
                let openaiResponse: InstructionRephraseInstanceResponse = {
                    instance: {
                        original: requestParams.original,
                        params: requestParams.params,
                        rephrased: res
                    }
                }
                setResponse(openaiResponse);
        });
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

export {useInstructionRephraseAPI, useInstructionIllustration};