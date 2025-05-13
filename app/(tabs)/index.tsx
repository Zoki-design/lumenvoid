import { View, ScrollView, StyleSheet, TouchableOpacity, FlatList, Text, TextInput, Image } from 'react-native';
import { TextTitle } from '@/components/StyledText';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themes } from '@/constants/Colours';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Layout from '@/constants/Layout';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MoodCard from '@/components/MoodCard';
import MeditationCard from '@/components/MeditationCard';
import { useState } from 'react';
import Box from '@/components/Box';
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

  const router = useRouter();

  const handleAddTodo = () => {
    handlePressBell();
    router.push('/today/todo');
    console.log('Logged To Do',);
  };

  const handleAddToday = () => {
    handlePressBell();
    router.push('/today/today');
    console.log('Logged Today',);
  }


  const bellAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: bellScale.value }],
    };
  });

  const renderMoodItem = ({ item }: { item: typeof moods[0] }) => (
    <MoodCard
      image={item.image}
      count={item.count}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <TextTitle style={styles.title}>Week</TextTitle>
          </View>

          <View style={styles.flex}>
            <TouchableOpacity
              onPress={handlePressBell}
              style={styles.iconButtons}
            >
              <Ionicons name="notifications" size={24} color={themes.light.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePressBell}
              style={styles.iconButtons}
            >
              <MaterialIcons name="settings" size={24} color={themes.light.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        <Box style={styles.moodTrackerSection}>
          <FlatList
            data={moods}
            renderItem={renderMoodItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moodList}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          />
        </Box>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TextTitle style={styles.title}>Today</TextTitle>
            <View style={styles.flex}>
              <TouchableOpacity
                onPress={handleAddToday}
                style={styles.iconButtons}
              >
                <MaterialIcons name="edit-square" size={18} color={themes.light.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePressBell}
                style={styles.iconButtons}
              >
                <FontAwesome6 name="trash" size={17} color={themes.light.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
          <Box style={{ width: '100%', height: 90 }}>
            <Image style={styles.icons}
              source={require('@/assets/icons/happy1.png')} />
            <View style={styles.dateContainer}>
              <Text style={{ color: themes.light.box }}>15 Tue</Text>
            </View>
            <View style={styles.line} />
            <TextInput
              placeholder="How do you feel today?"
              style={styles.TodayInput}
              placeholderTextColor={themes.light.textSecondary}
              keyboardType="default"
            />
            <Image style={styles.focusIcon}
              source={require('@/assets/icons/lotus 1.png')} />
          </Box>


          <Box style={styles.toDoList}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={styles.Todo}>To-Do:</Text>
              <TouchableOpacity onPress={handleAddTodo}>
                <MaterialIcons name="edit-square" size={18} color={themes.light.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddTodo} style={styles.plusIcon}>
                <FontAwesome5 name="plus" size={50} color={themes.light.accent} />
              </TouchableOpacity>
            </View>
          </Box>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TextTitle style={styles.title}>Daily Affirmation</TextTitle>
          </View>
          <TextInput
            placeholder="Today I feel greatful for..."
            placeholderTextColor={themes.light.textSecondary}
            style={styles.greatfulInput}
            keyboardType="default"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TextTitle style={styles.title}>Meditation</TextTitle>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <MeditationCard
                title="Anxiety Relief"
                duration="15 min"
                imageUrl="https://images.pexels.com/photos/1447092/pexels-photo-1447092.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                youtubeUrl="https://www.youtube.com/watch?v=2Yf3e2qjz3Y" 
              />
              <MeditationCard
                title="Mindful Breathing"
                duration="10 min"
                imageUrl="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                youtubeUrl="https://www.youtube.com/watch?v=2Yf3e2qjz3Y" 
              />
              <MeditationCard
                title="Meditation for mornings"
                duration="20 min"
                imageUrl="https://cdn.britannica.com/99/223399-138-B7B4A9EA/did-you-know-meditation.jpg?w=800&h=450&c=crop"
                youtubeUrl="https://www.youtube.com/watch?v=2Yf3e2qjz3Y" 
              />
              <MeditationCard
                title="40 Minute Pomodoro for Studying"
                duration="45 min"
                imageUrl="https://d15q5g7ipjper4.cloudfront.net/blog/wp-content/uploads/2022/09/pexels-charlotte-may-5965839.jpeg"
                youtubeUrl="https://www.youtube.com/watch?v=2Yf3e2qjz3Y" 
              />
            </View>
          </ScrollView>
          <TextTitle style={styles.title}>Quick Tips</TextTitle>
          <Box style={styles.tips}>
            <Text>How to set boundaries...</Text>
          </Box>
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20, gap: 10 }}>
            <Box style={styles.wisdomBox}>
              <Text style={styles.wisdomDate}>April 15</Text>
              <Text style={styles.wisdomText}>
                Don’t say yes to everything - you may be reaching the burnout.
              </Text>
              <Image source={require('@/assets/icons/crystal-ball (1).png')} style={styles.magicBall} />
            </Box>
          </View>
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
  dateContainer: {
    top: 45,
    width: 55,
    height: 20,
    alignItems: 'center',
    borderRadius: 10,
    position: 'relative',
    backgroundColor: themes.light.textPrimary,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  focusIcon: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 25,
    left: 310,
  },
  greatfulInput: {
    height: 50,
    width: '100%',
    backgroundColor: themes.light.box,
    borderRadius: 10,
    paddingHorizontal: Layout.spacing.md,
    color: themes.light.textPrimary,
    shadowColor: themes.light.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
  },
  iconButtons: {},
  icons: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 10,
    left: 15,
  },
  line: {
    width: 4,
    height: 70,
    backgroundColor: '#D4D3DF',
    borderRadius: 10,
    position: 'relative',
    left: 70,
    top: -25,
  },
  magicBall: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 70,
    left: 310,
  },
  meditation: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  moodList: {
    paddingVertical: Layout.spacing.md,
  },
  moodTrackerSection: {
    width: 370,
    height: 150,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  plusIcon: {
    left: 120,
    top: 60,
    position: 'absolute',
    borderRadius: 10,
    padding: 5,
    marginLeft: 20,
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
  sectionTitle: {},
  tips: {
    height: 150,
    width: '100%',
  },
  title: {
    color: themes.light.textPrimary,
    fontSize: 16,
    marginTop: 10,
  },
  TodayInput: {
    position: 'absolute',
    fontSize: 13,
    zIndex: 1,
    left: 100,
  },
  toDoList: {
    marginTop: 20,
    height: 200,
    width: '100%',
  },
  Todo: {
    fontWeight: 'bold',
    color: themes.light.textPrimary,
  },
  todaysMood: {
    height: 80,
    width: '100%',
    backgroundColor: themes.light.box,
    borderRadius: 10,
    shadowColor: themes.light.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  trackButton: {
    marginTop: Layout.spacing.md,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    marginRight: Layout.spacing.xs,
  },
  wisdomBox: {
    height: 125,
    width: 370,
    backgroundColor: themes.light.textSecondary,
  },
  wisdomDate: {
    color: themes.light.accent,
    fontWeight: 'bold',
    fontSize: 15,
  },
  wisdomText: {
    width: 250,
    color: themes.light.box,
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
  },
});
