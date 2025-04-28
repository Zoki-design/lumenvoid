import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { TextSubheading, TextCaption } from './StyledText';
import { Play } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  useSharedValue, 
  withSequence, 
} from 'react-native-reanimated';

interface MeditationCardProps {
  title: string;
  duration: string;
  imageUrl: string;
  onPress: () => void;
}

export default function MeditationCard({ 
  title, 
  duration, 
  imageUrl, 
  onPress 
}: MeditationCardProps) {
  const scale = useSharedValue(1);
  
  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.98, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <View style={styles.overlay}>
            <View style={styles.content}>
              <TextSubheading style={styles.title}>{title}</TextSubheading>
              <TextCaption style={styles.duration}>{duration}</TextCaption>
            </View>
            <View style={styles.playButton}>
              <Play size={20} color={Colors.background.primary} />
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 180,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: Layout.spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  image: {
    borderRadius: Layout.borderRadius.lg,
  },
  overlay: {
    flex: 1,
    padding: Layout.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  title: {
    color: Colors.background.primary,
    marginBottom: Layout.spacing.xs,
  },
  duration: {
    color: Colors.background.primary,
    opacity: 0.9,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.primary.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
});