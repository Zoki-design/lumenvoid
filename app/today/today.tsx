import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

export default function App() {
  const [mood, setMood] = useState(0);
  const [journalEntry, setJournalEntry] = useState('');
  const [affirmation, setAffirmation] = useState('');
  const [sleepQuality, setSleepQuality] = useState(7.5);
  const [selectedHour, setSelectedHour] = useState(7.5);

  // Sleep quality-ийг текстээр тодорхойлох функц
  const getSleepQualityLabel = (value: number) => {
    if (value <= 2) return 'Very Poor';
    if (value <= 4) return 'Poor';
    if (value <= 6) return 'Average';
    if (value <= 8) return 'Good';
    return 'Very Good';
  };

  const moods = [
    { id: '1', mood: 'Happy', image: require('../../assets/icons/happy1.png') },
    { id: '2', mood: 'Meh', image: require('../../assets/icons/meh1.png') },
    { id: '3', mood: 'Mad', image: require('../../assets/icons/mad1.png') },
    { id: '4', mood: 'Sad', image: require('../../assets/icons/sad1.png') },
    { id: '5', mood: 'Anxious', image: require('../../assets/icons/anxious1.png') },
    { id: '6', mood: 'Depressed', image: require('../../assets/icons/depressed1.png') },
  ];

  const mainFocusItems = [
    { icon: '🌸', label: 'Wellness', Image: require('../../assets/icons/lotus 1.png') },
    { icon: '💼', label: 'Work', Image: require('../../assets/icons/suitcase 1.png') },
    { icon: '⭐', label: 'Achievement', Image: require('../../assets/icons/mission-statement 1 (1).png') },
    { icon: '👥', label: 'Community', Image: require('../../assets/icons/high-five 1.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Record Your Day!</Text>
        </View>

        {/* Mood Picker */}
        <View style={styles.moodContainer}>
          {moods.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setMood(index)}
              style={[styles.moodButton, mood === index && styles.selectedMood]}
            >
              <Image
                source={item.image}
                style={[styles.moodImage, mood === index && { tintColor: '#fff' }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Journal Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Journal Your Day</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Write about your day..."
            value={journalEntry}
            onChangeText={setJournalEntry}
          />
        </View>

        {/* Affirmation Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Affirmation</Text>
          <TextInput
            style={styles.input}
            placeholder="Today I feel grateful..."
            value={affirmation}
            onChangeText={setAffirmation}
          />
        </View>

        {/* Focus Grid */}
        <View style={styles.focusGrid}>
          {mainFocusItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.focusItem}>
              <Image
                source={item.Image}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
              <Text style={styles.focusLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sleep Quality Slider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sleep Quality</Text>
          <Slider
            value={sleepQuality}
            onValueChange={setSleepQuality}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#8BC34A"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#8BC34A"
          />
          <Text style={styles.sliderLabel}>{getSleepQualityLabel(sleepQuality)}</Text>
        </View>

        {/* Hours Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hours</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hoursContainer}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hour, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.hourBox,
                  selectedHour === hour && styles.selectedHourBox
                ]}
                onPress={() => setSelectedHour(hour)}
              >
                <Text
                  style={[
                    styles.hoursText,
                    selectedHour === hour && styles.hoursBig
                  ]}
                >
                  {hour}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedMood: {
    backgroundColor: '#8BC34A',
  },
  moodImage: {
    width: 24,
    height: 24,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    minHeight: 40,
  },
  focusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  focusItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  focusLabel: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  sliderLabel: {
    textAlign: 'center',
    marginTop: 10,
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  hoursContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  hourBox: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedHourBox: {
    backgroundColor: '#2C3E50',
  },
  hoursText: {
    color: '#333',
    fontSize: 18,
  },
  hoursBig: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
});
