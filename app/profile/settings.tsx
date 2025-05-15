import React, { useState, ReactNode } from 'react';
import { View, Switch, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { TextSubheading, TextCaption } from '@/components/StyledText';
import { ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const router = useRouter();
  const [dailyReminder, setDailyReminder] = useState(true);
  const [hideFromRanking, setHideFromRanking] = useState(false);

  const renderItem = (
    title: string,
    onPress?: () => void,
    rightElement?: ReactNode
  ) => {
    const content = (
      <View style={styles.item}>
        <TextSubheading style={styles.itemText}>{title}</TextSubheading>
        {rightElement ?? <ChevronRight size={20} color={Colors.text.tertiary} />}
      </View>
    );

    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          {content}
        </TouchableOpacity>
      );
    }

    return content;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextCaption style={styles.sectionTitle}>Account</TextCaption>
        {renderItem('Login Information', () => router.back())}
        {renderItem('Collection', () => router.back())}
        {renderItem('Privacy', () => router.back())}

        <TextCaption style={styles.sectionTitle}>Subscription</TextCaption>
        {renderItem('Restore Purchases', () => router.back())}
        {renderItem('Cancel Subscription', () => router.back())}

        <TextCaption style={styles.sectionTitle}>Social and Friend</TextCaption>
        {renderItem('Blocked Users', () => router.back())}
        {renderItem(
          'Hide from Global Ranking',
          undefined,
          <Switch
            value={hideFromRanking}
            onValueChange={setHideFromRanking}
            thumbColor={hideFromRanking ? Colors.primary.default : '#f4f3f4'}
          />
        )}

        <TextCaption style={styles.sectionTitle}>Notification</TextCaption>
        {renderItem(
          'Daily Reminder',
          undefined,
          <Switch
            value={dailyReminder}
            onValueChange={setDailyReminder}
            thumbColor={dailyReminder ? Colors.primary.default : '#f4f3f4'}
          />
        )}
        {renderItem('Sound effect', () => router.back())}
        {renderItem('Log Out', () => router.push('/sign-in'))}
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
    padding: 25,
    paddingBottom: 100,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 8,
    color: Colors.text.tertiary,
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2, // Android
  },
  itemText: {
    fontSize: 14, // Smaller than default
  },
});
