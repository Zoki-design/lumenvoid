import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';

const Sleep = () => {
  const [value, setValue] = useState(5);
  const router = useRouter();

  const handleNext = () => {
    // Pass the sleep value as a parameter to the result screen
    router.push(`/emotion/result?sleep=${value}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How is your Sleep Quality?</Text>

      {/* Vertical Slider Container */}
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor="#FFA726"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#FFA726"
        />
      </View>

      <Text style={styles.valueLabel}>{value}/10</Text>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
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
    height: 300,  // Set the height of the slider container (longer slider)
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: 40,  // Keep the width small to maintain the vertical slider look
    height: 300, // Make the slider longer by increasing the height
    transform: [{ rotate: '90deg' }],  // Rotate the slider to be vertical
  },
  valueLabel: {
    fontSize: 18,
    marginTop: 10,
    color: '#333',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#5a4fcf',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});