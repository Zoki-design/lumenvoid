import { View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { TextHeading, TextSubheading, TextCaption } from '@/components/StyledText';
import { ChevronRight, BookUser, Calendar, ShieldCheck, BellRing, Settings, HelpCircle } from 'lucide-react-native';
import Card from '@/components/Card';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Box from '@/components/Box';

export default function ProfileScreen() {
  const router = useRouter();

  const renderMenuItem = (icon: JSX.Element, title: string) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuIcon}>{icon}</View>
      <TextSubheading style={styles.menuText}>{title}</TextSubheading>
      <ChevronRight size={20} color={Colors.text.tertiary} />
    </TouchableOpacity>
  );

  return (
    <Box style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            <Image source={require('@/assets/images/mascot.png')} style={styles.avatar} />
            <View style={styles.userDetails}>
              <TextSubheading style={styles.username}>User</TextSubheading>
              <TextCaption>ID: 154654254545</TextCaption>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('../profile/settings')}>
            <Settings size={20} color={Colors.text.tertiary} />
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <TextSubheading style={styles.statNumber}>8</TextSubheading>
            <TextCaption>Recorded days</TextCaption>
          </Card>
          <Card style={styles.statCard}>
            <TextSubheading style={styles.statNumber}>185</TextSubheading>
            <TextCaption>Points Collected</TextCaption>
          </Card>
        </View>

        {/* Premium Pass Card - Now Touchable */}
        <TouchableOpacity style={styles.premiumCard} onPress={() => router.push('../profile/subscribtion')}>
          <View>
            <TextSubheading>Premium Pass</TextSubheading>
            <TextCaption>Use the full potential!</TextCaption>
          </View>
          <Image source={require('@/assets/images/mascot.png')} style={styles.mascotImage} />
        </TouchableOpacity>

        {/* Menu Items */}
        <Box style={styles.menuList}>
          {renderMenuItem(<BookUser size={20} />, 'Your Recordings')}
          {renderMenuItem(<Calendar size={20} />, 'Friends')}
          {renderMenuItem(<ShieldCheck size={20} />, 'Achievements')}
          <TextCaption>More </TextCaption>
          {renderMenuItem(<BellRing size={20} />, 'Community')}
          {renderMenuItem(<HelpCircle size={20} />, 'Useful Links')}
        </Box>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userDetails: {},
  username: {
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '600',
  },
  premiumCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#776F89',
    width: '100%',
    height: 120,
  },
  mascotImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  menuList: {
    rowGap: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    padding: 16,
    borderRadius: 16,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  heartButton: {
    backgroundColor: Colors.primary.default,
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});
