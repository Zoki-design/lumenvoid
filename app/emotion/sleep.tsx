import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';

const Sleep = () => {
  const [value, setValue] = useState(5);
  const router = useRouter();

  const handleNext = () => {
    router.push(`/emotion/todayfocus?sleep=${value}`);
  };

  const getColor = (val: number) => {
    if (val <= 4) return '#e53935'; // red
    if (val <= 8) return '#fbc02d'; // yellow
    return '#43a047'; // green
  };

  const color = getColor(value);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>How is your Sleep Quality?</Text>

      <View style={styles.sliderContainer}>
        <View style={styles.sliderWrapper}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={value}
            onValueChange={setValue}
            minimumTrackTintColor={color}
            maximumTrackTintColor="#ddd"
            thumbTintColor={color}
          />
        </View>
      </View>

      <Text style={[styles.valueLabel, { color }]}>{value}/10</Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Sleep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  sliderContainer: {
    height: 300,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderWrapper: {
    width: 300,
    height: 40,
    transform: [{ rotate: '-90deg' }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: 300,
    height: 40,
  },
  valueLabel: {
    fontSize: 18,
    marginTop: 10,
  },
  button: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
