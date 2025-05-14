import React from 'react';
import Question from '../../components/Question';

export default function question3() {
  return (
    <Question
      question="How often do you feel anxious?"
      questionIndex={2}
      onNextRoute="/emotion/result"
    />
  );
}