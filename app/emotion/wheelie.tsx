import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

import EmotionWheelSVG from '@/assets/icons/emotion wheel.svg';
import HappyFace from '@/assets/icons/happy1.svg';
import SadFace from '@/assets/icons/sad1.svg';
import AngryFace from '@/assets/icons/mad1.svg';
import TiredFace from '@/assets/icons/meh1.svg';
import DepressedFace from '@/assets/icons/depressed1.svg';
import AnxiousFace from '@/assets/icons/anxious1.svg';



const { width } = Dimensions.get('window');
const RADIUS = width * 1.1;

const moods = [
  { id: 'happy', color: '#A4D37C', label: 'Happy', Face: HappyFace },
  { id: 'sad', color: '#80D6FB', label: 'Sad', Face: SadFace },
  { id: 'angry', color: '#F49B54', label: 'Angry', Face: AngryFace },
  { id: 'tired', color: '#DCA1FF', label: 'Tired', Face: TiredFace },
  { id: 'depressed', color: '#60E8B1', label: 'Depressed', Face: DepressedFace },
  { id: 'anxious', color: '#B27052', label: 'Anxious', Face: AnxiousFace },
];

const EmotionWheel = () => {
  const rotation = useSharedValue(0);
  const [selectedMoodIndex, setSelectedMoodIndex] = useState(0);
  const selectedMood = moods[selectedMoodIndex];
  const router = useRouter();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}rad` }],
  }));

  const handleNext = () => {
    const nextIndex = (selectedMoodIndex + 1) % moods.length;
    rotation.value = withSpring(rotation.value + (2 * Math.PI) / moods.length);
    setSelectedMoodIndex(nextIndex);

    if (nextIndex === 0) {
      setTimeout(() => {
        router.push('/emotion/sleep');
      }, 500);
    }
  };

  const FaceComponent = selectedMood.Face;

  return (
    <View style={[styles.container, { backgroundColor: selectedMood.color }]}>
      {/* Top content */}
      <Text style={styles.title}>How are you feeling today?</Text>
      <FaceComponent width={80} height={80} style={styles.face} />
      <Text style={styles.label}>I feel {selectedMood.label}!</Text>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Bottom half-wheel */}
      <View style={styles.wheelContainer}>
        <Animated.View style={[styles.wheel, animatedStyle]}>
          <EmotionWheelSVG width={RADIUS * 2} height={RADIUS * 2} />
        </Animated.View>
      </View>
    </View>
  );
};

export default EmotionWheel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
  },
  label: {
    fontSize: 18,
    marginBottom: 16,
    color: '#333',
  },
  face: {
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#5a4fcf',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    zIndex: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  wheelContainer: {
    position: 'absolute',
    bottom: -RADIUS / 2 + 190,
    height: RADIUS,
    left: -RADIUS / 2 + 210,
    overflow: 'visible',
    width: '100%',
    alignItems: 'center',    
  },
  wheel: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
