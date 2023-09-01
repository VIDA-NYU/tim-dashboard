import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
} from '@mui/material';
import { FormativeFormEntry, FormativeStudySession } from './types';  // Update the import path
import { useGetFormList } from '../hooks/formative';


interface SaveLoadProps {
    currentForm: FormativeStudySession;
    onLoad: (form: FormativeStudySession) => void;
}

const SaveLoadDialog: React.FC<SaveLoadProps> = ({ currentForm, onLoad }) => {

    const {setRefresh, data} = useGetFormList();
    const [open, setOpen] = useState(false);
    const [saveAsDialogOpen, setSaveAsDialogOpen] = useState(false);
    const [loadDialogOpen, setLoadDialogOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [selectedForm, setSelectedForm] = useState('');
    const [currentStoreID, setCurrentStoreID] = useState<string>(); 
    console.log(currentForm);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Dummy functions for saving/loading to/from localStorage.
    // Replace these with your actual implementation.
    const saveToStorage = (entry: FormativeFormEntry) => {
        fetch(`/api/formative/${currentStoreID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry.form),
        }).then(res => {
            console.log(res);
        }
        ).catch(err => {
            console.log(err);
        }
        )
    };

    useEffect(() => {
        setRefresh(true);
    }, [])

    const loadFromStorage = (storeID: string) => {
        const storedItem = localStorage.getItem(storeID);
        return storedItem ? JSON.parse(storedItem) as FormativeFormEntry : null;
    };

    const getAllStoredForms = () => {
        // Dummy implementation
        return data || [];
    };

    // Handlers for the Save/Save As New/Load actions
    const handleSave = () => {
        // Implement saving logic here
        saveToStorage({ storeID: 'current', title: 'Current Session', form: currentForm });
        setOpen(false);
    };

    const handleSaveAsNew = () => {
        setSaveAsDialogOpen(true);
    };

    const handleSaveAsNewConfirm = () => {
        // Implement saving logic here
        fetch(`/api/formative/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({...currentForm,
                    title: newTitle
                }),
            }).then(res => {
                console.log(res);
            }
            ).catch(err => {
                console.log(err);
            }
            )
        setSaveAsDialogOpen(false);
        setOpen(false);
    };

    const handleLoad = () => {
        setLoadDialogOpen(true);
    };

    const handleLoadConfirm = () => {
        // Implement loading logic here
        console.log();
        console.log(selectedForm, data);
        let selectEntry = data?.find((item) => item.storeID.toString() === selectedForm.toString());
        console.log(selectEntry);
        if (selectEntry) {
            console.log(selectEntry);
            onLoad(selectEntry.form);
        }
        setLoadDialogOpen(false);
        setOpen(false);
        setCurrentStoreID(selectedForm.toString());
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Save/Load
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save/Load Session</DialogTitle>
                <DialogActions>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                    <Button onClick={handleSaveAsNew} color="primary">
                        Save As New
                    </Button>
                    <Button onClick={handleLoad} color="primary">
                        Load
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Save As New Dialog */}
            <Dialog open={saveAsDialogOpen} onClose={() => setSaveAsDialogOpen(false)}>
                <DialogTitle>Save As New</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="New Title"
                        fullWidth
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveAsNewConfirm} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Load Dialog */}
            <Dialog open={loadDialogOpen} onClose={() => setLoadDialogOpen(false)}>
                <DialogTitle>Load</DialogTitle>
                <DialogContent
                    sx={{
                        minWidth: '560px',
                    }}
                >
                    <Select
                        sx={{
                            width: '100%',
                        }}
                        value={selectedForm}
                        onChange={(e) => setSelectedForm(e.target.value as string)}
                    >
                        {getAllStoredForms().map((form) => (
                            <MenuItem value={form.storeID}>{form.title}</MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLoadConfirm} color="primary">
                        Load
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SaveLoadDialog;
