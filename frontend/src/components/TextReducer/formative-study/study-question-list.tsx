import React, { useState, useEffect, MouseEvent, Fragment } from 'react';
import { StudyComparisonQuestion, FormativeStudySession } from './types';
import StudyComparisonQuestionForm from './study-comparison-question-form';
import { Button, IconButton, Paper, Typography, Divider, FormControl, InputLabel, Select, MenuItem, Menu, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add';
import { useGetFormList } from '../hooks/formative';
import SaveLoadDialog from './save-load-dialogue';

const Header = styled("div")({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
})

const StudyQuestionList: React.FC = () => {
    const [questions, setQuestions] = useState<FormativeStudySession>({ title: "", questions: [] });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedType, setSelectedType] = useState<"comparison" | "rating">("comparison");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // New state variable to keep track of the index of the question being edited
    const [editIndex, setEditIndex] = useState<number | null>(null);

    // Same as before
    // ... 

    const handleAddClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (type: "comparison" | "rating" | null) => {
        setAnchorEl(null);
        if (type) {
            setShowAddForm(true);
            // Here you can set the type of question to add, which could then be used to determine the form to display
        }
    };


    

    const addOrUpdateQuestion = (question: StudyComparisonQuestion) => {
        if (editIndex !== null) {
            const updatedQuestions = [...questions.questions];
            updatedQuestions[editIndex] = question;
            setQuestions(prev => ( { 
                title: prev.title,
                questions: updatedQuestions }));
            setEditingIndex(null); // Reset editing index after updating
        } else {
            setQuestions(prev => ({ 
                title: prev.title,
                questions: [...questions.questions, question] }));
        }
        setShowAddForm(false); // Hide the form after submitting
    };

    const deleteQuestion = (index: number) => {
        const updatedQuestions = [...questions.questions];
        updatedQuestions.splice(index, 1);
        setQuestions(prev => ({ 
            title: prev.title,
            questions: updatedQuestions }));
    };
    return (
        <div style={{ margin: '20px', overflowY: 'scroll', maxHeight: '80vh' }}>

            {/* Add more forms for other types here using a similar pattern */}

            <Divider style={{ margin: '10px 0' }} />

            {questions.questions.map((question, index) => (
                <Fragment>

                    {editIndex === index ? (
                        <StudyComparisonQuestionForm
                            index={index}
                            initialData={question as StudyComparisonQuestion}
                            onSubmit={(q) => {
                                addOrUpdateQuestion(q);
                                setEditIndex(null);  // Reset editIndex after editing
                            }}
                        />
                    ) : (
                        <Paper elevation={1} style={{ margin: '10px', padding: '10px' }}>
                            <Typography variant="h6">Question {index + 1}</Typography>



                            <IconButton aria-label="edit" onClick={() => setEditIndex(index)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => deleteQuestion(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Paper>
                        // Render question details here
                    )}


                </Fragment>
            ))}
            {showAddForm && selectedType === "comparison" && (
                <StudyComparisonQuestionForm index={-1} onSubmit={(q) => addOrUpdateQuestion(q)} />
            )}

            <IconButton color="primary" aria-label="add" onClick={handleAddClick}>
                <AddIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleClose(null)}
            >
                <MenuItem onClick={() => handleClose("comparison")}>Add Comparison Question</MenuItem>
                {/* Uncomment below to add more types */}
                {/* <MenuItem onClick={() => handleClose("rating")}>Add Rating Question</MenuItem> */}
            </Menu>
            <SaveLoadDialog
                currentForm={questions}
                onLoad={(form: FormativeStudySession) => {
                    setQuestions(form);
                }}
            />
        </div>

    );
};

export default StudyQuestionList;
