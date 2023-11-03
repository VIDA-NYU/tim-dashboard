import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { ReadyState } from 'react-use-websocket';
import { useStreamData } from '../../../../api/rest';
import { StreamInfo } from './LiveStream';
import colormap from 'colormap';
import { Alert, Box, Button, Paper, Typography, Chip } from '@mui/material';
import { ObjLabel } from './ReasoningOutputsView';

let probColors = colormap({
    colormap: 'winter',
    nshades: 10,
    format: 'rgbaString',
    alpha: [0, 1],
})
// console.log(probColors)
  
interface ClipOutputsViewProps { data: { [key: string]: number; }, min?: number }
interface DeticOutputsViewProps { [key: string]: number; }
  
export const ClipOutputsView = ({ data, min=0 }: ClipOutputsViewProps) => {
    const entries = data && Object.entries(data)
    const noAction = entries && entries.every(([t,s]) => s === 0)
    return data && (<Box display='flex' flexDirection='column'>
      {noAction && <Chip label='No Action' color='error' />}
      {entries.sort(([ta, sa], [tb,sb]) => ( sb-sa ))
             .slice(0, noAction ? 2 : 3)
             .map(([text, similarity]) => (
              <Chip key={text} label={`${text}: ${(similarity*100).toFixed(2)}`} sx={{ 
                backgroundColor: probColors[Math.round(Math.max(1, similarity*(probColors.length-1)))],
                opacity: similarity > min ? 1 : 0,//Math.max(0.7, similarity),
                transition: 'opacity 0.4s ease-in-out',
              }} />
      ))}
    </Box>)
}

// Display object's state
export const DeticStateOutputsView = ({ data_, min=0 } ) => {
  var objectsState = data_ && data_.map((data: DeticOutputsViewProps, index) => {
    const entries = data && data['state'] && Object.entries(data['state'] );
    const noAction = entries && entries.every(([t,s]) => s === 0)
    return  entries && (<Box key={'DeticStateOutputsView_' + index} display='flex' flexDirection='column'>
      <span> {data['label']}</span>
    {noAction && <Chip key={'DeticStateOutputsView_' +"noaction"+ index} label='No Action' color='error' />}
    {entries && entries.sort(([ta, sa], [tb,sb]) => ( sb-sa ))
          .slice(0, noAction ? 2 : 3)
          .map(([text, similarity]) => (
            <Chip key={text} label={`${text}: ${(similarity*100).toFixed(2)}`} sx={{ 
              backgroundColor: probColors[Math.round(Math.max(1, similarity*(probColors.length-1)))],
              opacity: similarity > min ? 1 : 0,//Math.max(0.7, similarity),
              transition: 'opacity 0.4s ease-in-out',
            }} />
    ))}
    </Box>)
  });
  return (
    <>
    <span><b>Objects' State:</b></span>
    <br/>
    {objectsState}
    </>

  )
  
}

// Display objects from detics
export const DeticOutputsView = ({data}: {data: ObjLabel []}) => {
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
    return <Chip key={'DeticOutputsView_' + index} label={label} size="small" />
    });
  return (
    <>
    <span><b>Detected Objects:</b></span>
    <br/>
    {detectedObjects}
    </>

  )
  
}

// Display objects from memory
export const MemoryOutputsView = ({data}: {data: ObjLabel []}) => {
  var listLabels = {};
  data && data.map((element:ObjLabel, index: number) => {
      if(Object.keys(listLabels).includes(element.label)){
        listLabels[element.label] = listLabels[element.label] +1;
      } else {
        listLabels[element.label] = 1;
      }
  });
  var detectedObjects = Object.keys(listLabels).length>0 && Object.keys(listLabels).map((element:string, index: number) => {
    var label= element + ":" + listLabels[element];
    return <Chip key={'MemoryOutputsView_' + index} label={label} size="small" />
    });
  return (
    <>
    <span><b>Detected Objects:</b></span>
    <br/>
    {detectedObjects}
    </>

  )
  
}

export const ClipOutputsLiveView = ({ data, min=0 }: ClipOutputsViewProps) => {
  const entries = data && Object.entries(data)
  const noAction = entries && entries.every(([t,s]) => s === 0)
  return data && (<Box display='flex' flexDirection='column'>
    {noAction && <span style={{margin: 5, color: 'red'}}>No Action</span>}
    {entries.sort(([ta, sa], [tb,sb]) => ( sb-sa ))
           .slice(0, noAction ? 4 : 5)
           .map(([text, similarity]) => (
            <li key={text}
              // style={{ 
              // color: probColors[Math.round(Math.max(1, similarity*(probColors.length-1)))],
              // opacity: similarity > min ? 1 : 0,//Math.max(0.7, similarity),
              // transition: 'opacity 0.4s ease-in-out',}}
              ><b>{text}</b>: {(similarity*100).toFixed(2)}
            </li>
    ))}
  </Box>)
}
