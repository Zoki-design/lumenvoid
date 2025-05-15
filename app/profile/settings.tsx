import React, { useState } from 'react';
import { View, StyleSheet, Switch, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { TextSubheading, TextCaption } from '@/components/StyledText';
import { ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const router = useRouter();
  const [dailyReminder, setDailyReminder] = useState(true);
  const [hideFromRanking, setHideFromRanking] = useState(false);

  const renderMenuItem = (
    title: string,
    onPress?: () => void,
    rightElement?: React.ReactNode
  ) => (
    <TouchableOpacity
      style={[styles.menuItem, onPress && styles.menuItemInteractive]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <TextCaption style={styles.menuText}>{title}</TextCaption>
      {rightElement ?? <ChevronRight size={20} color={Colors.text.tertiary} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextCaption style={styles.sectionTitle}>Account</TextCaption>
        {renderMenuItem('Login Information', () => router.back())}
        {renderMenuItem('Collection', () => router.back())}
        {renderMenuItem('Privacy', () => router.back())}

        <TextCaption style={styles.sectionTitle}>Subscription</TextCaption>
        {renderMenuItem('Restore Purchases', () => router.back())}
        {renderMenuItem('Cancel Subscription', () => router.back())}

        <TextCaption style={styles.sectionTitle}>Social and Friend</TextCaption>
        {renderMenuItem(
          'Hide from Global Ranking',
          undefined,
          <Switch
            value={hideFromRanking}
            onValueChange={setHideFromRanking}
            thumbColor={hideFromRanking ? Colors.primary.default : '#f4f3f4'}
          />
        )}

        <TextCaption style={styles.sectionTitle}>Notification</TextCaption>
        {renderMenuItem(
          'Daily Reminder',
          undefined,
          <Switch
            value={dailyReminder}
            onValueChange={setDailyReminder}
            thumbColor={dailyReminder ? Colors.primary.default : '#f4f3f4'}
          />
        )}
        {renderMenuItem('Sound Effect', () => router.back())}
        {renderMenuItem('Log Out', () => router.push('/sign-in'))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollContainer: {
    paddingHorizontal: 25,
    paddingTop: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 10,
    color: Colors.text.tertiary,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  menuItemInteractive: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  menuText: {
    flex: 1,
    fontSize: 14,
  },
});
