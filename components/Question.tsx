import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, responses } from '../constants/questions';
import { RelativePathString, useRouter } from 'expo-router';

interface Props {
  question: string;
  questionIndex: number;
  onNextRoute: string;
}

const Question: React.FC<Props> = ({ question, questionIndex, onNextRoute }) => {
  const router = useRouter();
  const [selected, setSelected] = React.useState<number | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.backIcon} />
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((questionIndex + 1) / 4) * 100}%` }]} />
        </View>
      </View>

      <Text style={styles.question}>{question}</Text>

      <Text style={styles.responseText}>
        {selected != null ? responses[selected - 1] : ''}
      </Text>

      <View style={styles.selectionBox}>
        <View style={styles.optionsContainer}>
          {colors.map((color, index) => {
            const isSelected = selected === index + 1;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.circle, { backgroundColor: color }, isSelected && styles.selectedCircle]}
                onPress={() => setSelected(index + 1)}
              />
            );
          })}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push(onNextRoute as RelativePathString)}
        style={[styles.button, selected == null && { opacity: 0.5 } ]}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F4FB',
    paddingHorizontal: 24,
    paddingTop: 60,
    justifyContent: 'flex-start',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  backIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E2DFF0',
    borderRadius: 3,
    marginLeft: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#C9B6E4',
  },
  question: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: '#2D2A5B',
    marginBottom: 8,
  },
  responseText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#777',
    marginBottom: 24,
  },
  selectionBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    opacity: 0.7,
  },
  selectedCircle: {
    borderWidth: 3,
    borderColor: '#2D2A5B',
    transform: [{ scale: 1.2 }],
    opacity: 1,
  },
  button: {
    backgroundColor: '#2D2A5B',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 32,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Question;