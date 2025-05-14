import React from 'react';
import Question from '../../components/Question';

export default function question2() {
  return (
    <Question
      question="How often do you feel sad?"
      questionIndex={1}
      onNextRoute="/emotion/question3"
    />
  );
}