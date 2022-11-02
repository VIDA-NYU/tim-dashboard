// templates
import AccordionView from '../../templates/AccordionView/AccordionView';

// material
import {Box, styled} from '@mui/material';

// temp
import JSONPretty from 'react-json-pretty';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import {HandsCanvas} from "./hand-data-vis/canvas";
import {computeIMUActivity, preprocessData, sampleArray} from "./visualization/utils";
import IMUActivityBarChart from "./visualization/activity-bar-chart";
import {useEffect, useState} from "react";
import {Dataset} from './model/dataset';
import {useRef} from "react";
import {isEmpty} from "./visualization/utils";

const Container = styled("div")(({}) => ({
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
}))

const JsonDataContainer = styled(Card)(({}) => ({
    height: "100%",
    width: "600px",
    marginLeft: 30,
}))

const JsonContent = styled("div")(({}) => ({
    overflowY: "scroll",
    height: "100%",
    marginLeft: 25,
    position: "relative",
    left: 0
}))

const EmptyJsonContent = styled("div")(({}) => ({
    height: "100%",
    marginLeft: 25,
    position: "relative",
    left: 0
}))

const Activity_Sample_Rate = 30;


const DefaultIMUView = ({data}: any) => {
    return (
        <JsonDataContainer
            sx={{
                height: 400
            }}
        >
            <CardHeader
                titleTypographyProps={{
                    fontSize: 16,
                }}
                title={"Hands"}></CardHeader>
            {isEmpty(data) && <EmptyJsonContent>
                <JSONPretty id="json-pretty" data={data}></JSONPretty>
            </EmptyJsonContent>}
            {!isEmpty(data) && <JsonContent>
                <JSONPretty id="json-pretty" data={data}></JSONPretty>
            </JsonContent>}
        </JsonDataContainer>
    )
}

const IMUDataView = ({type, title, data, recordingName, state, onProgress, onSeek, recordingMetaData}: any) => {
    // let sampledData = sampleArray(data, Activity_Sample_Rate);
    console.log("Entered IMUDataView")
    let processedAccelData = preprocessData(data[0], recordingName);
    console.log("processedAccelData:")
    console.log(processedAccelData)
    let processedGyroData = preprocessData(data[1], recordingName);
    let processedMagData = preprocessData(data[2], recordingName);

    //let IMUActivity = computeIMUActivity(processedData);
    /*
    const dataset = useRef(null);

    const [frameData, setFrameData] = useState();
    const [frameIndex, setFrameIndex] = useState<number>(0);
    

    useEffect(() => {
        if (!isEmpty(processedData)) {
            dataset.current = new Dataset(recordingMetaData, processedData);
        }

    }, [processedData, recordingMetaData])

    useEffect(() => {
        if (dataset.current && recordingMetaData && recordingMetaData['first-entry']) {
            const {
                element: currFrameData,
                index: currFrameIndex
            } = dataset.current.get_corresponding_timestamp(state.currentTime);
            if (currFrameIndex >= 0) {
                setFrameData(currFrameData);
                setFrameIndex(currFrameIndex);
            }

        }
    }, [state, dataset])

    if (isEmpty(data) || isEmpty(recordingMetaData) || !recordingMetaData['first-entry']) {
        return (
            <DefaultIMUView data={processedData}></DefaultIMUView>
        )
    }
    */
    return (
        <AccordionView title='IMU Data' height={300}>
            <Box sx={{display: 'flex', width: '100%', height: '100%', overflow: 'auto'}}>
                <Container>
                    {!isEmpty(processedAccelData) && <Card>
                        <CardHeader
                            titleTypographyProps={{
                                fontSize: 16,
                            }}
                            title={"Acceleration"}></CardHeader>
                        <CardContent>
                            <IMUActivityBarChart data={processedAccelData}></IMUActivityBarChart>
                        </CardContent>
                    </Card>}
                    {!isEmpty(processedGyroData) && <Card>
                        <CardHeader
                            titleTypographyProps={{
                                fontSize: 16,
                            }}
                            title={"Angular Velocity"}></CardHeader>
                        <CardContent>
                            <IMUActivityBarChart data={processedGyroData}></IMUActivityBarChart>
                        </CardContent>
                    </Card>}
                    {!isEmpty(processedMagData) && <Card>
                        <CardHeader
                            titleTypographyProps={{
                                fontSize: 16,
                            }}
                            title={"Magnetic Force"}></CardHeader>
                        <CardContent>
                            <IMUActivityBarChart data={processedMagData}></IMUActivityBarChart>
                        </CardContent>
                    </Card>}
                    <JsonDataContainer>
                        <CardHeader
                            titleTypographyProps={{
                                fontSize: 16,
                            }}
                            title={"Accelerometer JSON"}></CardHeader>
                        <JsonContent>
                            <JSONPretty id="json-pretty" data={processedAccelData}></JSONPretty>
                        </JsonContent>
                    </JsonDataContainer>
                    <JsonDataContainer>
                        <CardHeader
                            titleTypographyProps={{
                                fontSize: 16,
                            }}
                            title={"Gyroscope JSON"}></CardHeader>
                        <JsonContent>
                            <JSONPretty id="json-pretty" data={processedGyroData}></JSONPretty>
                        </JsonContent>
                    </JsonDataContainer>
                    <JsonDataContainer>
                        <CardHeader
                            titleTypographyProps={{
                                fontSize: 16,
                            }}
                            title={"Magnetometer JSON"}></CardHeader>
                        <JsonContent>
                            <JSONPretty id="json-pretty" data={processedMagData}></JSONPretty>
                        </JsonContent>
                    </JsonDataContainer>

                </Container>

            </Box>
        </AccordionView>
    )
}

export default IMUDataView;