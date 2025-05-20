// app/emotion/[questionIndex].tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import Question from '@/app/components/Question';
import React from 'react';

const questions = [
  'How often do you feel angry?',
  'How often do you feel sad?',
  'How often do you feel anxious?',
];

export default function DynamicQuestionScreen() {
  const router = useRouter();
  const { questionIndex } = useLocalSearchParams<{ questionIndex: string }>();

  const index = parseInt(questionIndex || '0');

  // If index is out of bounds, redirect or return null
  if (isNaN(index) || index < 0 || index >= questions.length) {
    return null;
  }

  const nextRoute =
    index < questions.length - 1
      ? `/emotion/${index + 1}`
      : '/emotion/result';

  return (
    <Question
      question={questions[index]}
      questionIndex={index}
      onNextRoute={nextRoute}
    />
  );
}
