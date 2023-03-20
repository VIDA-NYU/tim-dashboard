import { Recipe, RephraseState, SyncStatus, TextReducerState } from "./state/types";
import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import useSWR, { Key } from 'swr';
import { API_URL, WS_API_URL, RECORDINGS_STATIC_PATH } from '../../config';
import { useToken } from '../../api/TokenContext';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {useStreamData} from "../../api/rest";
import { parseStreamBuffer } from "../WOZView/utils/data-hook";
import { useInstructionRephraseAPI } from "../WOZView/instruction-rephrase/open-ai-hook";


function useRephrasedRecipe (textReducerState: TextReducerState) {
    
    const [rephrasedRecipe, setRephrasedRecipe] = useState<Recipe>();


    useEffect(() => {
        

        // setRephrasedRecipe(original);
    }, [textReducerState])


    return {
        rephrasedRecipe
    }
}

export function useGetAllRecordings(token, fetchAuth) {
    // get the authenticated fetch function
    const fetcher = (url: string) => fetchAuth(url).then((res) => res.json());
    // query the streamings endpoint (only if we have a token)
    const uid: Key = token && `${API_URL}/recordings`;
    const random = React.useRef(Date.now());
    const { data: response, error } = useSWR([uid, random], fetcher);
    return {
        data: response && response.data,
        response,
        error
    };
}


interface SyncRecipeResponse {
    status: SyncStatus,
    error?: string
}

function useSyncRecipeWithHololens (recipe: Recipe) {
    // const fetcher = (url: string) => fetchAuth(url).then((res) => res.json());
    // query the streamings endpoint (only if we have a token)
    // const uid: Key = token && `${API_URL}/data/tsimer_recipe`;
    // const random = React.useRef(Date.now());
    // const { data: response, error } = useSWR([uid, random], fetcher);
    

    const {token} = useToken();


    const [syncStatus, setSyncStatus] = useState<SyncStatus>(SyncStatus.IDLE);
    const [syncError, setSyncError] = useState<string>();

    const [syncListSize, setSyncListSize] = useState<number>(0);
    // const syncListSize = 0;

    useEffect(() => {

        console.log(recipe, syncStatus);
        if (syncStatus === SyncStatus.IDLE) {
            setSyncStatus(SyncStatus.SYNCING);

            const mimeType = 'text/plain';
            const encoder = new TextEncoder();
            const jsonString = JSON.stringify({
                Name: recipe.name,
                Steps: recipe.steps.map((step) => step.step)
            });
            const fileData = encoder.encode(jsonString);
            
            console.log(recipe);
            const blob = new Blob([fileData], { type: mimeType });

            // const fileData = new Blob([JSON.stringify(recipe)], { type: 'text/plain' });
            const fileName = 'entries.txt';
            const formData = new FormData();
            formData.append('entries', blob, fileName);
            const header = {"Authorization":"Bearer "+ token,}
            fetch(`${API_URL}/data/tsimer_recipe`, {
                method: 'POST',
                headers: header,
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    setSyncListSize(prev => prev - 1);
                    if(syncListSize === 0) {
                        setSyncStatus(SyncStatus.SYNCED);
                    }
                } else {
                    setSyncStatus(SyncStatus.ERROR);
                    setSyncError(response.statusText);
            }
            }).catch((error) => {
                setSyncStatus(SyncStatus.ERROR);
                setSyncError(error.message);
            });
        }
    }, [token, syncStatus]);

    useEffect(() => {
        console.log(recipe);
        setSyncStatus(SyncStatus.IDLE);
        setSyncListSize(prev => prev + 1);
    }, [JSON.stringify(recipe)]);


    return {
        status: syncStatus
    }; 
}


function stepIsRephrased(stepState: RephraseState){
    return stepState.actions.length > 0;
}


function getNextRephraseStep (textReducerState: TextReducerState) {
    if(!stepIsRephrased(textReducerState.stepStates[textReducerState.currentStep] )) {
        return {
            rephrase: true,
            step: textReducerState.stepStates[textReducerState.currentStep]}

    }else if (textReducerState.currentStep < textReducerState.stepStates.length - 1){
        return {
            rephrase: true,
            step: textReducerState.stepStates[textReducerState.currentStep + 1]
        }

    }else{
        return {
            rephrase: false,
            step: textReducerState.stepStates[textReducerState.currentStep]
        }
    }

}

interface TextReducerStepResponse {
    step: number
}

function useTextReducerStep(): TextReducerStepResponse{
    const {data} = useStreamData({ streamId: "tsimer_step",
        parse: null });
    const processedData = parseStreamBuffer(data);
    if(processedData){
        return {step: processedData.step}
    }else{
        return {step: -1};
    }
    
}

function useSyncStepWithHololens(textReducerState: TextReducerState, 
    setTextReducerState: ((state: TextReducerState) => void)) {
    
    const [syncStatus, setSyncStatus] = useState<SyncStatus>(SyncStatus.IDLE);
    const {step} = useTextReducerStep();
    useEffect(() => {
        if(step >= 0){
            setTextReducerState({
                    ...textReducerState,
                    currentStep: step
            });
        }
    }, [step])
    return {
        
    };
}

function useSyncRephraseWithOpenAPI(textReducerState: TextReducerState, setTextReducerState: ((state: TextReducerState) => void)){
    
    let {step: nextRephraseStep, rephrase: rephraseStatus} = getNextRephraseStep(textReducerState);
    const rephrasedInstruction = useInstructionRephraseAPI({
        params: textReducerState.rephraseParams,
        original: nextRephraseStep.original.step,
        }
        , nextRephraseStep.original.step);

    useEffect(() => {
        if(rephraseStatus && rephrasedInstruction.instructionRephraseInstanceResponse){
        setTextReducerState(
            {
                ...textReducerState,
                stepStates: textReducerState.stepStates.map((stepState, index) => {

                    if (index === nextRephraseStep.original.index) {
                        return {
                            ...stepState,
                            actions: [...stepState.actions, 
                            {
                                result: rephrasedInstruction.instructionRephraseInstanceResponse.instance.rephrased,
                                time: Date.now().valueOf(),
                                params: textReducerState.rephraseParams,
                            }],
                        }
                    }
                    return stepState;
                })
            }
        );

        }
                

    }, [rephrasedInstruction.instructionRephraseInstanceResponse, rephraseStatus]);

    return {

    };
}

export {useSyncRecipeWithHololens, getNextRephraseStep, useTextReducerStep, useSyncStepWithHololens, useSyncRephraseWithOpenAPI};