import React from 'react';
import { StudyQuestion, StudyComparisonQuestion, FormativeStudySession } from './types';
import StudyComparisonQuestionForm from './study-comparison-question-form';

interface Props {
  onSubmit: (data: FormativeStudySession) => void;
}

const StudyQuestionForm: React.FC<Props> = ({ onSubmit }) => {
//   const addComparisonQuestion = (data: StudyComparisonQuestion) => {
//     onSubmit({ questions: [{ type: 'comparison', options: data.options } as StudyQuestion] });
//   };

  return (
    <div>
      {/* <StudyComparisonQuestionForm onSubmit={addComparisonQuestion} /> */}
    </div>
  );
};

export default StudyQuestionForm;
