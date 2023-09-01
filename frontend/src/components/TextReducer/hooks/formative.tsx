import { useState, useEffect } from 'react';
import axios from 'axios';
import { FormativeFormEntry, FormativeStudySession, StudyComparisonQuestion } from '../formative-study/types';
import { AR_TEXT_API_API } from '../../../config';
import useSWR, { Key } from 'swr';
import { format } from 'path';
import { useToken } from '../../../api/TokenContext';
import { API_URL } from '../../../config';
function useGetFormList() {
    const [formList, setFormList] = useState<FormativeStudySession[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [refresh, setRefresh] = useState<boolean>(false);
    const url = `/api/formative/`;
    const fetcher = (url: string) => fetch(url, {
        method: 'GET',
        // @ts-ignore
        header: { "Content Type": "applicaton/json" },
    }).then((res) => res.json())
        .then((res) => {
            const processedData: FormativeFormEntry[] = res.map((item: any) => {
                return {
                    storeID: item.id,
                    title: item.title,
                    form: {
                        title: item.title,
                        ...item.data
                    },
                }
            });
            return processedData;

        });
    // query the streamings endpoint (only if we have a token)
    const { data: response } = useSWR(url, fetcher,);
    return {
        data: response,
        response,
        error, setRefresh
    };
    // useEffect(() => {
    //     setLoading(true);
    //     const getFormList = async () => {
    //         try {

    //             const res = fetch(`${AR_TEXT_API_API}/api/formative/1`, {
    //                 method: 'GET',
    //                 // mode: 'same-origin', // no-cors, cors, *same-origin
    //             }).then(res => {
    //                 return res.text();
    //             }).then(res => {
    //                 // setFormList(res);
    //                 setLoading(false);
    //             }).catch(err => {
    //             })

    //             // @ts-ignore
    //             // console.log(res.text());
    //             // // setFormList(res.data);
    //             // setLoading(false);
    //         } catch (error) {
    //             console.log(error, "r")
    //             setError(error);
    //             setLoading(false);
    //         }
    //     }
    //     getFormList();
    // }, [refresh]);

    return { formList, loading, error, setRefresh };
}

function useDisplayControl(foramtiveForm: FormativeStudySession) {
    const [displayIndex, setDisplayIndex] = useState<number>(-1);
    const [optionDisplayIndex, setOptionDisplayIndex] = useState<number>(0);
    const goToNext = () => {
        setDisplayIndex(prev => prev + 1);
    }
    const goToPrev = () => {
        setDisplayIndex(prev => prev - 1);
    }
    const goToIndex = (index: number) => {
        setDisplayIndex(index);
    }

    const goNextOption = () => {
        setOptionDisplayIndex(prev => prev + 1);
    }
    const goPrevOption = () => {
        setOptionDisplayIndex(prev => prev - 1);
    }
    const goOptionIndex = (index: number) => {
        setOptionDisplayIndex(index);
    }
    const { token } = useToken();

    useEffect(() => {
        if (displayIndex >= 0 && displayIndex < foramtiveForm.questions.length

        ) {
            let currentQuestion = foramtiveForm.questions[displayIndex];
            if (currentQuestion.type === "comparison") {
                let comparisonQuestion = currentQuestion as StudyComparisonQuestion;
                if (optionDisplayIndex < comparisonQuestion.options.length && optionDisplayIndex >= 0) {
                    let displayedText = comparisonQuestion.options[optionDisplayIndex].content;
                    const mimeType = 'text/plain';
                    const encoder = new TextEncoder();
                    const jsonString = JSON.stringify({
                        text: optionDisplayIndex,
                    });
                    const fileData = encoder.encode(jsonString);

                    const blob = new Blob([fileData], { type: mimeType });


                    // const fileData = new Blob([JSON.stringify(recipe)], { type: 'text/plain' });
                    const fileName = 'entries.txt';
                    const formData = new FormData();
                    const header = { "Authorization": "Bearer " + token, }
                    formData.append('entries', blob, fileName);
                    fetch(`${API_URL}/data/tsimer_step`, {
                        method: 'POST',
                        headers: header,
                        body: formData,
                    }).then((response) => {
                        if (response.ok) {
                        } else {
                        }
                    }).catch((error) => {
                    });
                    console.log(displayedText);
                }
            }

        }

    }, [displayIndex, optionDisplayIndex])

    const canGoNext = displayIndex < foramtiveForm.questions.length - 1;
    const canGoPrev = displayIndex > 0;


    return {
        goToIndex, goToNext, goToPrev, displayIndex, canGoNext, canGoPrev,
        goNextOption, goPrevOption, goOptionIndex, optionDisplayIndex,
    }

}
export { useGetFormList, useDisplayControl }