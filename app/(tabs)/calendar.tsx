import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextTitle, TextSubheading, TextBody, TextCaption, TextSmall } from '@/components/StyledText';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Card from '@/components/Card';
import { Heart, MessageCircle, MoveHorizontal as MoreHorizontal, CirclePlus as PlusCircle } from 'lucide-react-native';
import { communityPosts, therapists } from '@/assets/data/mockData';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

function CommunityPost({ item }: { item: typeof communityPosts[0] }) {
  const likeScale = useSharedValue(1);

  const handlePressLike = () => {
    likeScale.value = withSpring(1.3, { damping: 4 }, () => {
      likeScale.value = withSpring(1);
    });
    console.log('Like post', item.id);
  };

  const likeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: likeScale.value }],
    };
  });

  return (
    <Card style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.authorContainer}>
          <View style={styles.authorAvatar}>
            <TextCaption>{item.author.charAt(0)}</TextCaption>
          </View>
          <View>
            <TextBody style={styles.authorName}>{item.author}</TextBody>
            <TextSmall style={styles.timeAgo}>{item.timeAgo}</TextSmall>
          </View>
        </View>
        <TouchableOpacity>
          <MoreHorizontal size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
      </View>

      <TextSubheading style={styles.postTitle}>{item.title}</TextSubheading>
      <TextBody style={styles.postContent}>{item.content}</TextBody>

      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handlePressLike}
        >
          <Animated.View style={likeAnimatedStyle}>
            <Heart size={20} color={Colors.text.secondary} />
          </Animated.View>
          <TextCaption style={styles.actionText}>{item.likes}</TextCaption>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color={Colors.text.secondary} />
          <TextCaption style={styles.actionText}>{item.comments}</TextCaption>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

export default function CommunityScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TextTitle style={styles.title}>Community</TextTitle>
        <TouchableOpacity style={styles.newPostButton}>
          <PlusCircle size={20} color={Colors.background.primary} />
          <TextCaption style={styles.newPostText}>New Post</TextCaption>
        </TouchableOpacity>
      </View>

      <View style={styles.featuredSection}>
        <TextSubheading style={styles.sectionTitle}>Connect with Therapists</TextSubheading>

        <FlatList
          data={therapists}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.therapistsList}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.therapistCard}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.therapistImage}
              />
              <View style={styles.therapistInfo}>
                <TextCaption style={styles.therapistName} numberOfLines={1}>
                  {item.name}
                </TextCaption>
                <TextSmall style={styles.therapistSpecialty} numberOfLines={1}>
                  {item.specialty}
                </TextSmall>
                <View style={styles.rating}>
                  <TextSmall style={styles.ratingText}>★ {item.rating}</TextSmall>
                </View>
              </View>
              <View style={[
                styles.availabilityBadge,
                item.available ? styles.availableBadge : styles.unavailableBadge
              ]}>
                <TextSmall style={styles.availabilityText}>
                  {item.available ? 'Available' : 'Busy'}
                </TextSmall>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.postsSection}>
        <TextSubheading style={styles.sectionTitle}>Recent Posts</TextSubheading>

        <FlatList
          data={communityPosts}
          renderItem={({ item }) => <CommunityPost item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.postsList}
          showsVerticalScrollIndicator={false}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    backgroundColor: Colors.background.primary,
    borderBottomLeftRadius: Layout.borderRadius.lg,
    borderBottomRightRadius: Layout.borderRadius.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    color: Colors.text.primary,
  },
  newPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.default,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
  },
  newPostText: {
    color: Colors.background.primary,
    marginLeft: Layout.spacing.xs,
  },
  featuredSection: {
    paddingTop: Layout.spacing.lg,
    paddingHorizontal: Layout.spacing.lg,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.md,
  },
  therapistsList: {
    paddingBottom: Layout.spacing.lg,
  },
  therapistCard: {
    width: 150,
    backgroundColor: Colors.background.primary,
    borderRadius: Layout.borderRadius.md,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  therapistImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  therapistInfo: {
    padding: Layout.spacing.sm,
  },
  therapistName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  therapistSpecialty: {
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.xs,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: Colors.accent.dark,
  },
  availabilityBadge: {
    position: 'absolute',
    top: Layout.spacing.xs,
    right: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  availableBadge: {
    backgroundColor: Colors.success.default,
  },
  unavailableBadge: {
    backgroundColor: Colors.neutral[400],
  },
  availabilityText: {
    color: Colors.background.primary,
    fontSize: 10,
  },
  postsSection: {
    flex: 1,
    paddingHorizontal: Layout.spacing.lg,
  },
  postsList: {
    paddingBottom: Layout.spacing.xl,
  },
  postCard: {
    marginBottom: Layout.spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.sm,
  },
  authorName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  timeAgo: {
    color: Colors.text.tertiary,
  },
  postTitle: {
    marginBottom: Layout.spacing.xs,
  },
  postContent: {
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.md,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    paddingTop: Layout.spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.lg,
  },
  actionText: {
    marginLeft: Layout.spacing.xs,
    color: Colors.text.secondary,
  },
});