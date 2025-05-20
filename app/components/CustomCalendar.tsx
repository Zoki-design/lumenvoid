import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { themes } from '@/constants/Colours';
import { moods } from '@/assets/data/mockData';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function MoodCalendar() {
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));

  const moodIcon = moods.find(m => m.id === '7')?.image;

  type DayProps = {
    date: {
      dateString: string;
      day: number;
      month: number;
      year: number;
      timestamp: number;
    };
    state: string;
  };

  const renderDay = ({ date, state }: DayProps) => {
    const isToday = date.dateString === moment().format('YYYY-MM-DD');

    return (
      <View style={[styles.dayContainer, isToday && styles.today]}>
        <Image source={moodIcon} style={styles.icon} />
        <Text style={[styles.dayText, state === 'disabled' && styles.disabledText]}>
          {date.day}
        </Text>
      </View>
    );
  };

  const renderHeader = (date: Date) => {
    const current = moment(date);
    const month = current.format('MMMM');
    const year = current.format('YYYY');

    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <FontAwesome name="chevron-left" size={20} color={themes.light.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{`${month} ${year}`}</Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <FontAwesome name="chevron-right" size={20} color={themes.light.textPrimary} />
        </TouchableOpacity>
      </View>
    );
  };

  const changeMonth = (direction: number) => {
    const newDate = moment(currentDate).add(direction, 'months').format('YYYY-MM-DD');
    setCurrentDate(newDate);
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={currentDate}
        onDayPress={(day: { dateString: string }) => setCurrentDate(day.dateString)}
        renderHeader={renderHeader}
        dayComponent={renderDay}
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: themes.light.textSecondary,
          arrowColor: themes.light.textPrimary,
          todayTextColor: themes.light.accent,
          monthTextColor: themes.light.textPrimary,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    position: 'relative',
  },
  today: {
    borderColor: themes.light.accent,
    borderWidth: 2,
    borderRadius: 16,
  },
  icon: {
    position: 'absolute',
    width: 24,
    height: 24,
    top: -10,
    zIndex: 1,
  },
  dayText: {
    fontSize: 14,
    color: themes.light.textPrimary,
  },
  disabledText: {
    color: 'gray',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  headerText: {
    fontSize: 16,
    color: themes.light.textPrimary,
  },
});
