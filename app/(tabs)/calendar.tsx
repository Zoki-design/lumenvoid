import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextTitle } from '@/components/StyledText';
import { themes } from '@/constants/Colours';
import Layout from '@/constants/Layout';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { moods } from '@/assets/data/mockData';

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const router = useRouter();

  const noneMoodImage = moods.find((m) => m.id === '7')?.image;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[styles.flex, { left: 300 }]}>
            <TouchableOpacity style={styles.iconButtons}>
              <FontAwesome name="search" size={24} color={themes.light.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtons}>
              <FontAwesome5 name="share" size={24} color={themes.light.textSecondary} />
            </TouchableOpacity>
          </View>
          <TextTitle style={styles.title}>April 2025</TextTitle>
        </View>

        {/* 🌟 Calendar Below Header */}
        <View style={{ paddingHorizontal: Layout.spacing.lg }}>
          <Calendar
            current={'2025-04-01'}
            monthFormat={'MMMM yyyy'}
            hideArrows={true}
            disableMonthChange={true}
            dayComponent={({ date, state }) => (
              <View style={styles.dayContainer}>
                <Text style={[styles.dayText, state === 'disabled' && styles.disabledText]}>
                  {date.day}
                </Text>
                <Image source={noneMoodImage} style={styles.icon} resizeMode="contain" />
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: themes.light.background,
    flex: 1,
  },
  flex: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  header: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
  },
  iconButtons: {},
  title: {
    color: themes.light.textPrimary,
    fontSize: 16,
    marginTop: 10,
  },
  // 🌟 Calendar Day Styling
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  dayText: {
    fontSize: 14,
    color: 'black',
  },
  disabledText: {
    color: 'gray',
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 2,
  },
});