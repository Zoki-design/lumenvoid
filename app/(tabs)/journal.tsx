import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextTitle, TextCaption } from '@/components/StyledText';
import Button from '@/components/Button';
import JournalCard from '@/components/JournalCard';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Plus, Search } from 'lucide-react-native';
import { journalEntries } from '@/assets/data/mockData';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSequence,
} from 'react-native-reanimated';

export default function JournalScreen() {
  const [filter, setFilter] = useState('all');
  const addButtonScale = useSharedValue(1);

  const handlePressAdd = () => {
    addButtonScale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    console.log('Add new journal entry');
  };

  const addButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: addButtonScale.value }],
    };
  });

  const filters = [
    { id: 'all', label: 'All Entries' },
    { id: 'recent', label: 'Recent' },
    { id: 'favorites', label: 'Favorites' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <TextTitle style={styles.title}>Journal</TextTitle>
          
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.searchButton}>
              <Search size={24} color={Colors.text.primary} />
            </TouchableOpacity>
            
            <Animated.View style={addButtonAnimatedStyle}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handlePressAdd}
              >
                <Plus size={24} color={Colors.background.primary} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        <View style={styles.filterContainer}>
          {filters.map((item) => (
            <Button
              key={item.id}
              title={item.label}
              variant={filter === item.id ? 'primary' : 'outline'}
              size="sm"
              onPress={() => setFilter(item.id)}
              style={styles.filterButton}
            />
          ))}
        </View>
      </View>

      <FlatList
        data={journalEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JournalCard
            title={item.title}
            preview={item.content}
            date={item.date}
            mood={item.mood}
            onPress={() => console.log('Open journal entry', item.id)}
          />
        )}
        contentContainerStyle={styles.journalList}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <TextCaption style={styles.statValue}>15</TextCaption>
          <TextCaption style={styles.statLabel}>This Month</TextCaption>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <TextCaption style={styles.statValue}>42</TextCaption>
          <TextCaption style={styles.statLabel}>Total Entries</TextCaption>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <TextCaption style={styles.statValue}>8</TextCaption>
          <TextCaption style={styles.statLabel}>Streak Days</TextCaption>
        </View>
      </View>
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
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    borderBottomLeftRadius: Layout.borderRadius.lg,
    borderBottomRightRadius: Layout.borderRadius.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  title: {
    color: Colors.text.primary,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.sm,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.primary.default,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    marginRight: Layout.spacing.sm,
  },
  journalList: {
    padding: Layout.spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    borderTopLeftRadius: Layout.borderRadius.lg,
    borderTopRightRadius: Layout.borderRadius.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.primary.default,
  },
  statLabel: {
    color: Colors.text.secondary,
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.neutral[200],
  },
});