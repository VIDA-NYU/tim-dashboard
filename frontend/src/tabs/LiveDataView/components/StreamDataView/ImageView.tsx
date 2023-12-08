import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { useStreamData } from '../../../../api/rest';
import { StreamInfo } from './LiveStream';
import Grid from '@mui/material/Grid/Grid';

const useCanvas = (q) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvasRef.current = canvas;
    contextRef.current = context;
  }, []);

  return { canvasRef, contextRef };
};

const BoundingBox = ({ ctx, box: { x, y, w, h }, color='red', linewidth=1 }) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.strokeStyle = color;
  ctx.lineWidth = linewidth;
  ctx.rect(x, y, w, h);
  ctx.stroke();
};

const ObjectLabel = ({
  ctx,
  text,
  x,
  y,
  w,
  h,
  fontSize = 11,
  fontFamily = 'Arial',
  color = 'black',
  textAlign = 'left',
  textBaseline = 'top',
  pad = 2,
  bgAlpha = 0.7,
}) => {
  if (textAlign === 'center') {
    x = x + w / 2 - pad;
  }

  // Draw background box
  ctx.fillStyle = color;
  const { width } = ctx.measureText(text);
  const prevAlpha = ctx.globalAlpha;
  ctx.globalAlpha = bgAlpha;
  ctx.fillRect(
    x - (textAlign === 'center' ? width * 0.5 : 9),
    y,
    width + pad * 2,
    fontSize + pad * 2
  );
  ctx.globalAlpha = prevAlpha;

  // Draw text
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.fillStyle = 'white';
  ctx.fillText(text, x + pad, y + pad);
};

const ConfidenceSlider = ({ boxes, setConfidence }) => {
    return <Slider
        size="small"
        sx={{
        padding: 0,
        '& .MuiSlider-markLabel': {
            top: '5px',
        },
        }}
        aria-label="detection confidence"
        value={confidence}
        min={0}
        max={1}
        step={0.1}
        marks={[
        { value: 0, label: '0%' },
        ...(boxes &&
            boxes.map((b) => (
            <Badge
                key={b.label}
                color={'error'}
                badgeContent={
                <Tooltip title={b.label} placement="top">
                    <span style={{ opacity: 0 }}>0</span>
                </Tooltip>
                }
                sx={{
                display: 'block',
                '& .MuiBadge-badge': { height: '10px', minWidth: '10px', p: 0 },
                ml: '-7px',
                mt: '5px',
                }}
            >
                <span style={{ opacity: 0 }}>0</span>
            </Badge>
            ))) || [],
        { value: 1, label: '100%' },
        ]}
        onChange={(e, x) => setConfidence(x)}
    />
}

const ImageCanvas = ({
  image = null,
  boxes = null,
  tracklets = null,
  confidence: defaultConfidence = null,
  ignoreLabels = null,
  debugMode,
  ...rest
}) => {
  const { canvasRef, contextRef } = useCanvas();
  const [confidence, setConfidence] = useState(defaultConfidence);

  useEffect(() => {
    if (!image) {
      // Handle the case when there is no image provided.
      // ...
    } else {
      // Handle the case when an image is provided.
      // ...
    }
  }, [image, boxes, confidence]);

  return (
    <Box style={{ fontSize: '13px' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', borderRadius: '8px', border: '2px solid #ececec' }}
        {...rest}
      />
      {debugMode && (
        <Grid container spacing={2} alignItems="center">
          <Grid item style={{ marginTop: '-25px' }}>
            <span>Detection Confidence: </span>
          </Grid>
          <Grid item xs style={{ marginTop: 2 }}>
            <ConfidenceSlider boxes={boxes} setConfidence={setConfidence} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

const BoundingBoxes = ({ ctx, boxes, confidence, ignoreLabels }) => {
  useEffect(() => {
    const { canvas } = ctx;
    const W = canvas.width;
    const H = canvas.height;

    for (let object of boxes) {
        if (!object.xyxyn) continue;
        if (confidence && object.confidence < confidence) continue;
        if (ignoreLabels && ignoreLabels.includes(object.label)) continue;

        const [x1, y1, x2, y2] = object.xyxyn;
        const [x, y, w, h] = [x1 * W, y1 * H, (x2 - x1) * W, (y2 - y1) * H];

        BoundingBox({ ctx, x, y, w, h, color: 'red', width: 1.5 });
        ObjectLabel({ ctx, text: object.label, x, y, w, h, color: 'red', textAlign: 'center' });
    }
  }, [ctx, boxes, confidence, ignoreLabels]);
};

const TrackletBoxes = ({ ctx, tracklets, ignoreLabels }) => {
  const { canvas } = ctx;
  const W = canvas.width;
  const H = canvas.height;

  for (const object of tracklets.data) {
    if (!object.xyxyn) continue;
    if (ignoreLabels && ignoreLabels.includes(object.label)) continue;
    const [x1, y1, x2, y2] = object.xyxyn;
    const [x, y, w, h] = [x1 * W, y1 * H, (x2 - x1) * W, (y2 - y1) * H];

    BoundingBox({ ctx, box: { x, y, w, h }, color: 'green', width: 1.5 });
    ObjectLabel({ ctx, text: `${object.id}:${object.label}`, x, y, w, h, color: 'green', textAlign: 'center' });
  }
};

export const ImageView = ({ streamId, showStreamId = true, boxStreamId, debugMode, ...rest }) => {
  const { sid, time, data, readyState } = useStreamData({ streamId, params: { output: 'jpg' });
  const { data: boxes } = useStreamData({ streamId: boxStreamId, utf: true, parse: JSON.parse });
  const tracklets = useStreamData({ streamId: "detic:memory", utf: true, parse: JSON.parse });

  return (
    <StreamInfo sid={showStreamId ? sid || streamId : null} time={time} data={data} readyState={readyState}>
      <ImageCanvas image={data} boxes={boxes} tracklets={tracklets} debugMode={debugMode} {...rest}>
        {ctx=>(<>
            <BoundingBox boxes={boxes} />
            <BoundingBox boxes={boxes} />
        </>)}
      </ImageCanvas>
    </StreamInfo>
  );
};