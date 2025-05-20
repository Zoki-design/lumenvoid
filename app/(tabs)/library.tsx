import { View, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextTitle, TextSubheading, TextCaption } from '@/app/components/StyledText';
import { themes } from '@/constants/Colours';
import Box from '@/app/components/Box';
import Card from '@/app/components/Card';
import MeditationCard from '@/app/components/MeditationCard';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { meditations } from '@/assets/data/mockData';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
} from 'react-native-reanimated';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'mindfulness', name: 'Mindfulness' },
  { id: 'anxiety', name: 'Anxiety' },
  { id: 'sleep', name: 'Sleep' },
  { id: 'PTSD', name: 'PTSD' },
  { id: 'anger', name: 'Anger' },
  { id: 'cbt', name: 'CBT' },
];

export default function MeditateScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const searchInputWidth = useSharedValue(0.8); // 80% as a fraction
  const filterOpacity = useSharedValue(1);

  const handleFocus = () => {
    searchInputWidth.value = withTiming(1); // 100%
    filterOpacity.value = withTiming(0);
  };

  const handleBlur = () => {
    searchInputWidth.value = withTiming(0.8); // 80%
    filterOpacity.value = withTiming(1);
  };

  const searchContainerStyle = useAnimatedStyle(() => {
    return {
      width: `${searchInputWidth.value * 100}%`,
    };
  });

  const filterButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: filterOpacity.value,
    };
  });

  const filteredMeditations = meditations.filter(meditation => {
    const matchesSearch = meditation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          meditation.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                            meditation.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const renderCategoryItem = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <TextCaption
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText,
        ]}
      >
        {item.name}
      </TextCaption>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Animated.View style={[styles.searchInputContainer, searchContainerStyle]}>
            
            <TextInput
              style={styles.searchInput}
              placeholder="Browse Library ..."
              placeholderTextColor={themes.light.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Animated.View>
          
          <Animated.View style={filterButtonStyle}>
            <TouchableOpacity style={styles.filterButton}>

            </TouchableOpacity>
          </Animated.View>
        </View>

        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />
      </View>

      <FlatList
        data={filteredMeditations}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log('Open meditation', item.id)}>
            <MeditationCard
              title={item.title}
              duration={item.duration}
              imageUrl={item.imageUrl}
              youtubeUrl="https://www.youtube.com/watch?v=lEKDob0LwRM"
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.meditationsList}
        showsVerticalScrollIndicator={false}
      />

      <Card style={styles.featuredCard}>
        <View style={styles.featuredContent}>
          <TextSubheading style={styles.featuredTitle}>Daily Practice</TextSubheading>
          <TextCaption style={styles.featuredText}>
            Maintain a regular meditation practice to see significant improvements in your mental wellbeing.
          </TextCaption>
        </View>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.light.background,
  },
  header: {
    paddingTop: Layout.spacing.md,
    paddingBottom: Layout.spacing.md,
  },
  title: {
    color: themes.light.textPrimary,
    fontSize: 16,
    marginTop: 10,
    marginLeft: Layout.spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: 5,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.tertiary,
    borderRadius: 20,
    paddingHorizontal: Layout.spacing.md,
    height: 40,
  },
  searchIcon: {
    marginRight: Layout.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    color: Colors.text.primary,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Layout.spacing.sm,
  },
  categoriesList: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.sm,
  },
  categoryItem: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.background.tertiary,
  },
  selectedCategory: {
    backgroundColor: Colors.primary.default,
  },
  categoryText: {
    color: Colors.text.secondary,
  },
  selectedCategoryText: {
    color: Colors.background.primary,
  },
  meditationsList: {
    padding: Layout.spacing.lg,
    paddingTop: Layout.spacing.xl,
  },
  featuredCard: {
    margin: Layout.spacing.lg,
    backgroundColor: Colors.primary.default,
    marginTop: 0,
  },
  featuredContent: {
    padding: Layout.spacing.md,
  },
  featuredTitle: {
    color: Colors.background.primary,
    marginBottom: Layout.spacing.xs,
  },
  featuredText: {
    color: Colors.background.primary,
    opacity: 0.9,
  },
});