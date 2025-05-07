import { View, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextTitle, TextSubheading, TextCaption } from '@/components/StyledText';
import { themes } from '@/constants/Colours';
import MeditationCard from '@/components/MeditationCard';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Search, Filter } from 'lucide-react-native';
import { meditations } from '@/assets/data/mockData';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
} from 'react-native-reanimated';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'mindfulness', name: 'Mindfulness' },
  { id: 'stress', name: 'Stress' },
  { id: 'sleep', name: 'Sleep' },
  { id: 'focus', name: 'Focus' },
  { id: 'self-care', name: 'Self-care' },
];

export default function MeditateScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const searchInputWidth = useSharedValue('80%');
  const filterOpacity = useSharedValue(1);

  const handleFocus = () => {
    searchInputWidth.value = withTiming('100%');
    filterOpacity.value = withTiming(0);
  };

  const handleBlur = () => {
    searchInputWidth.value = withTiming('80%');
    filterOpacity.value = withTiming(1);
  };

  const searchContainerStyle = useAnimatedStyle(() => {
    return {
      width: parseFloat(searchInputWidth.value) / 100 * Layout.window.width,
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
        <TextTitle style={styles.title}>Recorded Moods</TextTitle>
        
        <View style={styles.searchContainer}>
          <Animated.View style={[styles.searchInputContainer, searchContainerStyle]}>
            <Search size={20} color={Colors.text.tertiary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search meditations..."
              placeholderTextColor={Colors.text.tertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Animated.View>
          
          <Animated.View style={filterButtonStyle}>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color={Colors.text.primary} />
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
          <MeditationCard
            title={item.title}
            duration={item.duration}
            imageUrl={item.imageUrl}
            onPress={() => console.log('Open meditation', item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.meditationsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    backgroundColor: Colors.background.primary,
    paddingTop: Layout.spacing.md,
    paddingBottom: Layout.spacing.md,
    borderBottomLeftRadius: Layout.borderRadius.lg,
    borderBottomRightRadius: Layout.borderRadius.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.tertiary,
    borderRadius: Layout.borderRadius.md,
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
    borderRadius: Layout.borderRadius.md,
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