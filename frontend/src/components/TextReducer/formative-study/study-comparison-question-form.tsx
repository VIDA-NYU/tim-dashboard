import React, { useState } from 'react';
import { StudyComparisonQuestion, TextInstance } from './types';
import { Button, TextField, IconButton, Typography, Paper, Divider, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    index: number,
  initialData?: StudyComparisonQuestion;
  onSubmit: (data: StudyComparisonQuestion) => void;
}

const OptionContainer = styled("div")({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "6px",
})
const StudyComparisonQuestionForm: React.FC<Props> = ({ index, initialData, onSubmit }) => {
  const [options, setOptions] = useState<TextInstance[]>(initialData?.options || []);

  const addOption = () => {
    setOptions([...options, { content: '', comment: '' }]);
  };

  const updateOption = (index: number, field: keyof TextInstance, value: string) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const removeOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    onSubmit({ type: 'comparison', options });
  };

  return (
    <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
    <Typography variant="h6">{index >= 0? `Question ${index + 1}` : "New"}</Typography>
    <Divider style={{ margin: '10px 0' }} />

      {options.map((option, index) => (
        <OptionContainer key={index}>
          <TextField
            label='Content'
            value={option.content}
            onChange={e => updateOption(index, 'content', e.target.value)}
          />
          <TextField
            label='Comment'
            value={option.comment}
            onChange={e => updateOption(index, 'comment', e.target.value)}
          />
          <IconButton onClick={() => removeOption(index)}>
            <DeleteIcon />
          </IconButton>
        </OptionContainer>
      ))}
      <Button
      sx={{
        marginRight: "2px"
      }}
      variant='contained' color='primary' onClick={addOption}>
        Add Option
      </Button>
      <Button variant='contained' color='secondary' onClick={handleSubmit}>
       Save 
      </Button>
    </Paper>
  );
};

export default StudyComparisonQuestionForm;
