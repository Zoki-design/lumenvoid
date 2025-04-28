import { View, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { TextTitle, TextSubheading, TextBody, TextCaption } from '@/components/StyledText';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import MoodCard from '@/components/MoodCard';
import MeditationCard from '@/components/MeditationCard';
import ProgressCard from '@/components/ProgressCard';
import { useState } from 'react';
import { Bell, ArrowRight } from 'lucide-react-native';
import { moods, meditations, progressStats } from '@/assets/data/mockData';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
} from 'react-native-reanimated';

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const bellScale = useSharedValue(1);

  const handlePressBell = () => {
    bellScale.value = withSpring(1.2, { damping: 4 }, () => {
      bellScale.value = withSpring(1);
    });
  };

  const bellAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: bellScale.value }],
    };
  });

  const renderMoodItem = ({ item }: { item: typeof moods[0] }) => (
    <MoodCard
      emoji={item.emoji}
      label={item.label}
      selected={selectedMood === item.id}
      onPress={() => setSelectedMood(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <TextCaption style={styles.greeting}>Good morning</TextCaption>
            <TextTitle>Alex</TextTitle>
          </View>
          
          <TouchableOpacity 
            onPress={handlePressBell} 
            style={styles.notificationButton}
          >
            <Animated.View style={bellAnimatedStyle}>
              <Bell size={24} color={Colors.text.primary} />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.moodTrackerSection}>
          <TextSubheading style={styles.sectionTitle}>How are you feeling today?</TextSubheading>
          
          <FlatList
            data={moods}
            renderItem={renderMoodItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moodList}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          />
          
          <Button 
            title="Track Your Mood" 
            onPress={() => console.log('Track mood')} 
            fullWidth
            style={styles.trackButton}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TextSubheading style={styles.sectionTitle}>Daily Recommendation</TextSubheading>
          </View>
          
          <MeditationCard
            title="Anxiety Relief"
            duration="15 min"
            imageUrl="https://images.pexels.com/photos/1447092/pexels-photo-1447092.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            onPress={() => console.log('Open meditation')}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TextSubheading style={styles.sectionTitle}>Your Progress</TextSubheading>
            <TouchableOpacity style={styles.viewAllButton}>
              <TextCaption style={styles.viewAllText}>View All</TextCaption>
              <ArrowRight size={16} color={Colors.primary.default} />
            </TouchableOpacity>
          </View>
          
          {progressStats.map((stat) => (
            <ProgressCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              target={stat.target}
              unit={stat.unit}
              description={stat.description}
            />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TextSubheading style={styles.sectionTitle}>Daily Affirmation</TextSubheading>
          </View>
          
          <Card style={styles.affirmationCard} elevation="medium">
            <TextBody style={styles.affirmationText}>
              "I am worthy of love and respect. I embrace my strengths and accept my imperfections."
            </TextBody>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
  },
  greeting: {
    color: Colors.text.secondary,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  moodTrackerSection: {
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.lg,
    margin: Layout.spacing.lg,
    marginTop: Layout.spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  section: {
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  sectionTitle: {
    color: Colors.text.primary,
  },
  moodList: {
    paddingVertical: Layout.spacing.md,
  },
  trackButton: {
    marginTop: Layout.spacing.md,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: Colors.primary.default,
    marginRight: Layout.spacing.xs,
  },
  affirmationCard: {
    backgroundColor: Colors.primary.light + '20', // 20% opacity
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary.default,
  },
  affirmationText: {
    fontStyle: 'italic',
    lineHeight: 24,
    textAlign: 'center',
  },
});