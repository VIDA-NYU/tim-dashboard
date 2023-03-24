import { useEffect, useState } from 'react';
import { Documentation } from './types';
import { generateDocumentation } from './utils';


function useDocumentationEditor(recipeInstructions: Array<string>){
    const [editingIndex, setEditingIndex] = useState<number>(-1);

    const [editingContent, setEditingContent] = useState<string>("");

    const [editingError, setEditingError] = useState<string>("");

    const [editingVisualIndex, setEditingVisualIndex] = useState<number>(-1);

    const [documentation, setDocumentation] = useState<Documentation>(() => {
        let documentation: Documentation = {
            steps: []
        };
        return documentation;
    });

    useEffect(() => {
        let myDocumentation: Documentation = generateDocumentation(recipeInstructions);
        setDocumentation(myDocumentation);
    }, [recipeInstructions]);

    const startEditing = (index: number) => {
        setEditingIndex(index);
        setEditingContent(documentation.steps[index].description);
        setEditingVisualIndex(documentation.steps[index].summaryIndex);
    };


    const saveEditingContent = () => {
        let newDocumentation: Documentation = {
            steps: [...documentation.steps]
        };
        newDocumentation.steps[editingIndex].description = editingContent;
        newDocumentation.steps[editingIndex].summaryIndex = editingVisualIndex;
        setDocumentation(newDocumentation);
        
    };

    return {
        editingIndex,
        setEditingIndex,
        editingContent,
        setEditingContent,
        editingError,
        setEditingError,
        documentation,
        setDocumentation,
        saveEditingContent,
        startEditing,
        editingVisualIndex,
        setEditingVisualIndex
    }

}

export {useDocumentationEditor}