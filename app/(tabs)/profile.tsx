import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextTitle, TextSubheading, TextBody, TextCaption } from '@/components/StyledText';
import { themes } from '@/constants/Colours';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Settings, BookUser, Calendar, Clock, BellRing, ShieldCheck, CircleHelp as HelpCircle, ChevronRight } from 'lucide-react-native';
import { progressStats } from '@/assets/data/mockData';
import ProgressCard from '@/components/ProgressCard';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence, 
  withDelay,
} from 'react-native-reanimated';

export default function ProfileScreen() {
  const settingsScale = useSharedValue(1);
  const profileImageScale = useSharedValue(1);

  const handlePressSettings = () => {
    settingsScale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    console.log('Open settings');
  };

  const handlePressProfileImage = () => {
    profileImageScale.value = withSequence(
      withTiming(0.95, { duration: 150 }),
      withTiming(1, { duration: 150 })
    );
    console.log('Update profile image');
  };

  const settingsAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: settingsScale.value }],
    };
  });

  const profileImageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: profileImageScale.value }],
    };
  });

  const renderMenuItem = (
    icon: React.ReactNode,
    title: string,
    subtitle?: string,
    onPress?: () => void
  ) => (
    <TouchableOpacity 
      style={styles.menuItem}
      onPress={onPress || (() => console.log(`Press ${title}`))}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuItemIcon}>
          {icon}
        </View>
        <View>
          <TextBody style={styles.menuItemTitle}>{title}</TextBody>
          {subtitle && (
            <TextCaption style={styles.menuItemSubtitle}>{subtitle}</TextCaption>
          )}
        </View>
      </View>
      <ChevronRight size={20} color={Colors.text.tertiary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TextTitle style={styles.title}> Account </TextTitle>
            <Animated.View style={settingsAnimatedStyle}>
            <TouchableOpacity 
              onPress={handlePressSettings} 
              style={styles.iconButtons}
            >
              <MaterialIcons name="settings" size={24} color={themes.light.textSecondary} />
            </TouchableOpacity>
            </Animated.View>
          </View>

          <View style={styles.profileSection}>
            <Animated.View style={profileImageAnimatedStyle}>
              <TouchableOpacity 
                onPress={handlePressProfileImage}
                activeOpacity={0.9}
              >
                <Image 
                  source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7oBex_gwatjeJ1D1ZX3mVXEQujKe8qPYwzg&s' }} 
                  style={styles.profileImage} 
                />
              </TouchableOpacity>
            </Animated.View>
            
            <View style={styles.profileInfo}>
              <TextSubheading style={styles.profileName}>Ur mom Gay</TextSubheading>
              <TextCaption style={styles.profileEmail}>ID:1546542545456</TextCaption>
              <Button 
                title="Edit Profile" 
                variant="outline" 
                size="sm" 
                onPress={() => console.log('Edit profile')}
                style={styles.editButton}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <TextTitle style={styles.title}> Records </TextTitle>
          
          {/* {progressStats.map((stat) => (
            <ProgressCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              target={stat.target}
              unit={stat.unit}
              description={stat.description}
            />
          ))} */}
        </View>

        <Card style={styles.menuCard}>
          <TextSubheading style={styles.menuTitle}>Account</TextSubheading>
          
          {renderMenuItem(
            <BookUser size={20} color={Colors.primary.default} />,
            'Personal Information',
            'Update your personal details'
          )}
          
          {renderMenuItem(
            <Calendar size={20} color={Colors.primary.default} />,
            'My Schedule',
            'View upcoming appointments'
          )}
          
          {renderMenuItem(
            <Clock size={20} color={Colors.primary.default} />,
            'Activity History',
            'View your app usage'
          )}
        </Card>

        

        <Button
          title="Log Out"
          variant="outline"
          onPress={() => console.log('Log out')}
          style={styles.logoutButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.light.background,
  },
  header: {
    backgroundColor: Colors.background.primary,
    paddingTop: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.lg,
    borderBottomLeftRadius: Layout.borderRadius.lg,
    borderBottomRightRadius: Layout.borderRadius.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: themes.light.textPrimary,
    fontSize: 16,
    marginTop: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: Layout.borderRadius.full,
  },
  profileInfo: {
    marginLeft: Layout.spacing.md,
    flex: 1,
  },
  profileName: {
    marginBottom: 2,
  },
  profileEmail: {
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.sm,
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  section: {
    padding: Layout.spacing.lg,
  },
  sectionTitle: {
    marginBottom: Layout.spacing.md,
  },
  menuCard: {
    marginHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
  },
  menuTitle: {
    marginBottom: Layout.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.primary.light + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.md,
  },
  menuItemTitle: {
    fontFamily: 'PlusJakartaSans-Medium',
  },
  menuItemSubtitle: {
    color: Colors.text.secondary,
  },
  logoutButton: {
    marginHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.xl,
  },
  iconButtons: {
  },

});