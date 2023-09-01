interface TextInstance{
    content: string,
    comment: string
}

interface StudyQuestion {
    type: "comparison" | "rating"
}

interface StudyComparisonQuestion extends StudyQuestion{
    readonly type: "comparison",
    options: TextInstance[], 
}

interface FormativeStudySession {
    title: string,
    questions: StudyQuestion[],
}

interface FormativeFormEntry {
    storeID: string,
    title: string
    form: FormativeStudySession
}

export type {TextInstance, StudyQuestion, StudyComparisonQuestion, FormativeStudySession, FormativeFormEntry};
