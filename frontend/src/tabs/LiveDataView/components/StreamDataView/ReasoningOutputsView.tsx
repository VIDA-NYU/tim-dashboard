import {Box, Chip, Button, Alert, AlertTitle } from '@mui/material';
import { useRecordingControls } from '../../../../api/rest';
import DoneIcon from '@mui/icons-material/Done';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { blue, green } from '@mui/material/colors';
import { StreamView } from './LiveStream';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import { DETIC_IMAGE_STREAM, REASONING_ENTITIES_STREAM } from '../../../../config';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WozStatusComp from '../../../IntervenorView/woz-status';
import React, { useState, useEffect, useContext } from 'react';

interface Entity {
  ingredients: string [],
  tools: string []
}
interface Entities {
  step_id: number,
  step_entities: Entity,
}
export interface ObjLabel {
  xyxyn: number [],
  confidence: number,
  class_id: number,
  label: string
}
interface RenderedObjLabel {
  confidence: number,
  label: string,
  total: number
}
interface InProgressTask {
  id: number,
  name: string
}
  

let entities: Entities [] = [];
let inProgressTask_: InProgressTask[]=[];
let flag = true;
let systemStatus = "Active";

export const PauseView = ({ data }) => {
  if(data=="start"){
    systemStatus = "PAUSE";
  }
  if(data=="resume"){
    systemStatus = "Active";
  }
  return <Alert severity="info"><strong>System Status: </strong>{systemStatus}</Alert>;
}

export const ResetView = ({ data }) => {
  let message = "";
  let showResetMessage = data=="reset";
  if(showResetMessage){
    message = "Resetting ...";
  }
  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      message = "";
    }, 3000);
  }, [data]);
  return showResetMessage ? <Alert severity="warning"><strong>{message} </strong></Alert> :<></>;
}

export const ReasoningOutputsView = ({ data }) => {
  var activeTasks = data && data['active_tasks'] && data['active_tasks'].map((active_tasks, index) => {
  const {task_id, task_name, step_id, step_status, step_description, error_status, error_description} = active_tasks || {}; // reading the prediction that has the highest probability.
  const current_step = step_id; // Reasoning handles indexes, so we need to add 1 to communicate the user they are in the first (1) step.
  
  
  if (!inProgressTask_.find(e => e.id === task_id)) {
    inProgressTask_.push({id: task_id, name: task_name});
  } 
  return active_tasks && (<Box key={'ReasoningOutputsView_activetask_' + index}  display='flex' flexDirection='column' pt={1} mr={2} ml={2}>
      <span><b>Task ID:</b> {task_id}</span>
      <span><b>Task Name:</b> {task_name}</span>  
      <span><b>Current Step:</b> {current_step}</span>
      <span><b>Description:</b> {step_description || 'No active step.'}</span>
      <span><b>Status:</b> {step_status}</span>
      <span><b>Errors:</b> {error_description || 'No errors.'}</span><br/>
  </Box>)
  });

  const inprogress_tasks = data && data["inprogress_task_ids"];
  const listinprogress  = inProgressTask_ && inProgressTask_.map((element:InProgressTask, index: number) => {
    return inprogress_tasks && inprogress_tasks.includes(element.id) && (<Chip key={'ReasoningOutputsView_inprogresstask_' + index}  label={element.name} size="small" />)
    });
  return <Box display='flex' flexDirection='column' pt={5} mr={2} ml={2}>
    <span><b>Active Tasks:</b> {data && data['active_tasks'] && data['active_tasks'].length} tasks</span>
    {activeTasks}
    <span><b>In progress Tasks:</b> {inprogress_tasks && inprogress_tasks.length} tasks</span>
    {listinprogress}
  </Box>
}

const EntitiesView = ({data, step_id}: {data: ObjLabel [], step_id:number}) => {
  var listLabels = {};
  data && data.map((element:ObjLabel, index: number) => {
    if(element.confidence > 0.5) {
      if(Object.keys(listLabels).includes(element.label)){
        listLabels[element.label] = listLabels[element.label] +1;
      } else {
        listLabels[element.label] = 1;
      }
    }
  });
  var detectedObjects = Object.keys(listLabels).length>0 && Object.keys(listLabels).map((element:string, index: number) => {
    var label= element + ":" + listLabels[element];
    return <Chip label={label} size="small" />
    });
  let current_entities = (entities.length > 0 && step_id !== undefined) ? entities[step_id].step_entities.ingredients.concat(entities[step_id].step_entities.tools)  : [];

  var targetObjects = current_entities.length>0 && current_entities.map((element, index) => {
    var iconType = index < entities[step_id].step_entities.ingredients.length ? <LunchDiningOutlinedIcon /> : <RestaurantOutlinedIcon />;
    return <Chip icon={iconType} label={element} size="small" color={Object.keys(listLabels).includes(element) ? "success" : "default"} />;
    });

  return (
    <>
    <span><b>Detected Objects:</b></span>
    {detectedObjects}
    {/* <ul key={'steps_all'}>
      <li key={"objectes"}> Target Objects: {targetObjects} </li>
      <li key={"detected_objectes"}>  Detected Objects: {detectedObjects} </li>
      <li key={"detected_objectes"}> {detectedObjects} </li>
    </ul> */}
    </>

  )
}

const ListSteps = ({list, completedStep}: { list: string [], completedStep: number }) => {
    return (
        <ol key={'steps_all'}>{
            list.map((value: string, index: number) => {
                return index < completedStep ? (
                    <li key={'steps_' + index} style={{color: "green"}}> {value} <DoneIcon
                        sx={{color: green[500], fontSize: 25}}></DoneIcon>
                    </li>
                ) : index === completedStep ? (
                    <li key={'steps_' + index} style={{color: "blue"}}> {value} <RotateLeftIcon
                        sx={{color: blue[700], fontSize: 25}}></RotateLeftIcon>
                    </li>
                ) : (
                    <li key={'steps_' + index}>  {value} </li>
                );
            })
        }
        </ol>
    )
}
export const ReasoningOutputsWOZView = ({
                                            data, recipe, reasoningFrameData,
                                            egovlpActionFrameData, clipActionFrameData,
                                            worldFrameData, state, recordingList,
                                            recipeIDList, currentTimestampValue, currentStep
                                        }) => {
    const {step_id, step_status, step_description, error_status, error_description} = data || {};

    return <Box display='flex' flexDirection='column' pt={0} mr={2} ml={2}>
      {/*<span><b>RECIPE STEPS</b></span>*/}
      {/*<span><b>Current Step: </b>{current_step} - <b>  Status:</b> {step_status}</span>*/}
        {recipe && <WozStatusComp
            currentTimestampValue={currentTimestampValue}
            recipeIDList={recipeIDList}
            state={state}
            worldFrameData={worldFrameData}
            egovlpActionFrameData={egovlpActionFrameData}
            clipActionFrameData={clipActionFrameData}
            reasoningFrameData={reasoningFrameData}
            recordingList={recordingList}
            recipe={recipe} currentStep={currentStep}></WozStatusComp>}
        {/*{recipe && recipe.instructions &&*/}
        {/*    <RecipeTextComp recipeInstructions={recipe.instructions} currentStep={machinePredictedStep}/>}*/}
        {/*{recipe && recipe.instructions && <ListSteps list={recipe.instructions} completedStep={step_id}/>}*/}
        {/*<AnnotationContext.Consumer>*/}
        {/*    {*/}
        {/*        ({annotationData, setAnnotationData}) => (*/}
        {/*            <Box>*/}
        {/*                <Button onClick={() => setStep({step_id_s: step_id_previous})} variant="contained"*/}
        {/*                        style={{margin: 6}}><ArrowBackIcon/> Previous Step</Button>*/}
        {/*                <Button onClick={() => {*/}
        {/*                    setStep({step_id_s: step_id_next});*/}
        {/*                    let prevData = annotationData;*/}
        {/*                    setAnnotationData(*/}
        {/*                        {*/}
        {/*                            ...prevData,*/}
        {/*                            reasoningSteps: [...prevData.reasoningSteps, {*/}
        {/*                                type: "new_step",*/}
        {/*                                time: state.currentTime,*/}
        {/*                                step: currentUserStep + 1,*/}
        {/*                                prev: -1,*/}
        {/*                            }]*/}
        {/*                        }*/}
        {/*                    )*/}
        {/*                    setCurrentUserStep(currentUserStep + 1);*/}
        {/*                    console.log(prevData);*/}

        {/*                }} variant="contained"><ArrowForwardIcon/>Next Step</Button>*/}
        {/*                <Button onClick={() => {*/}
        {/*                    uploadAnnotation("ethan_mugcake_0", {"test": "a"})*/}
        {/*                }}> Save </Button>*/}
        {/*            </Box>*/}
        {/*        )*/}
        {/*    }*/}
        {/*</AnnotationContext.Consumer>*/}

    </Box>

}
export const ReasoningOutputsWOZViewPaper = ({ data, recipe }) => {
  const { step_id, step_status, step_description, error_status, error_description } = data || {};
  // let step_id = 0;
  const current_step = step_id + 1;
  const { setStep } = useRecordingControls();
  const step_id_previous = (step_id -1).toString();
  const step_id_next = (step_id +1).toString();
  return <Box display='flex' flexDirection='column' pt={0} mr={2} ml={2}>
    <span><b>RECIPE STEPS</b></span>
    <span><b>Current Step: </b>{current_step} - <b>  Status:</b> {step_status}</span>
    {recipe && recipe.steps_simple && <ListSteps list={recipe.steps_simple} completedStep={step_id}/>}
    <Box>
      <Button onClick={() => setStep({ step_id_s: step_id_previous})} variant="contained" style={{margin: 6}}><ArrowBackIcon /> Previous Step</Button>
      <Button  onClick={() => setStep({ step_id_s: step_id_next})} variant="contained"><ArrowForwardIcon />Next Step</Button>
    </Box>
  </Box>
}