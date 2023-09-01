import { useState, useEffect } from 'react';
import axios from 'axios';
import { FormativeFormEntry, FormativeStudySession } from '../formative-study/types';
import { AR_TEXT_API_API } from '../../../config';
import useSWR, { Key } from 'swr';
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
                    ...item.data},
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
export { useGetFormList }