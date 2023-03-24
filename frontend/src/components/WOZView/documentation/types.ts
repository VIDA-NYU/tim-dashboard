interface Documentation {
    steps: DocumentationStep[];
}

interface DocumentationStep {
    description: string;
    errors: DocumentationStepError[];
    summaryIndex: number;
}

interface DocumentationStepError {
    description: string;
}


export type {Documentation, DocumentationStep, DocumentationStepError};