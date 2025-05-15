import React from 'react';
import Question from '../../components/Question';

export default function question1() {
  return (
    <Question
      question="How often do you feel angry?"
      questionIndex={0}
      onNextRoute="/emotion/question2" // Next route
    />
  );
}