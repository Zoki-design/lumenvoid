import { View, Image, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { TextCaption, TextSubheading } from '@/components/StyledText';
import { ChevronRight, BookUser, Calendar, ShieldCheck, BellRing, Settings, HelpCircle, Crown } from 'lucide-react-native';
import Card from '@/components/Card';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themes } from '@/constants/Colours'; // Assuming themes are used like in HomeScreen
import Layout from '@/constants/Layout'; // Assuming Layout constants are used for spacing

export default function ProfileScreen() {
  const router = useRouter();

  const renderMenuItem = (icon: React.ReactNode, title: string, route?: string) => (
  <TouchableOpacity style={styles.menuItem} onPress={() => route && router.back()}>
    <View style={styles.menuIcon}>{icon}</View>
    <TextCaption style={styles.menuText}>{title}</TextCaption>
    <ChevronRight size={20} color={Colors.text.tertiary} />
  </TouchableOpacity>
);


  return (

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* User Card */}
        <TextCaption style={{ marginTop: 10, marginBottom: 10 }}>Account</TextCaption>
        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            <View style={styles.avatarPlaceholder} />
            <TouchableOpacity style={styles.userDetails} onPress={() => router.push('../emotion/wheelie')}>
              <TextCaption style={styles.username}>User</TextCaption>
              <TextCaption>ID: 154654254545</TextCaption>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => router.push('../profile/settings')}>
            <Settings size={20} color={Colors.text.tertiary} />
          </TouchableOpacity>
        </View>

        {/* Records */}
        <TextCaption style={{ marginTop: 0, marginBottom: 10 }}>Records</TextCaption>
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <TextSubheading style={styles.statNumber}>8</TextSubheading>
            <TextCaption>Recorded Days</TextCaption>
          </Card>
          <Card style={styles.statCard}>
            <TextSubheading style={styles.statNumber}>185</TextSubheading>
            <TextCaption>Points Collected</TextCaption>
          </Card>
        </View>

        {/* Premium Card */}
        <TextCaption style={{ marginTop: 0, marginBottom: 10 }}>Subscription</TextCaption>
        <TouchableOpacity style={styles.premiumCard} onPress={() => router.push('../profile/subscription')}>
          <View style={{ flex: 1 }}>
            <Crown size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <TextSubheading style={{ color: '#FFFFFF', fontWeight: '400' , fontSize: 16 }}>Premium Pass</TextSubheading>
            </View>
            <TextCaption style={{ color: '#FFFFFF' }}>Use the full potential!</TextCaption>
          </View>
          <Image source={require('@/assets/images/mascot.png')} style={styles.mascotImage} />
        </TouchableOpacity>

        {/* Menu */}

          {renderMenuItem(<BookUser size={20} />, 'Your Recordings', '../profile/recordings')}
          {renderMenuItem(<Calendar size={20} />, 'Friends', '../profile/friends')}
          {renderMenuItem(<ShieldCheck size={20} />, 'Achievements', '../profile/achievements')}
          <TextCaption style={{ marginTop: 10, marginBottom: 4 }}>More</TextCaption>
          {renderMenuItem(<BellRing size={20} />, 'Community', '../profile/community')}
          {renderMenuItem(<HelpCircle size={20} />, 'Useful Links', '../profile/help')}

      </ScrollView>

  );
}

const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  android: {
    elevation: 4,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Layout.spacing.lg, // Add consistent side padding
  },
  scrollContainer: {
    paddingVertical: 16,
    paddingBottom: 100,
    paddingHorizontal: 25,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    ...shadow,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E87C29', // Match orange avatar color
    marginRight: 12,
  },
  userDetails: {},
  username: {
    fontWeight: '600',
    fontSize: 16,  // Adjusted for better readability
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

  // iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,

  // Android shadow
  elevation: 4,
},


  statNumber: {
    fontSize: 15,
    fontWeight: '600',
  },
  premiumCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#776F89',
    height: 120,
    ...shadow,
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
    backgroundColor: Colors.background.secondary,
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    ...shadow,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 14,  // Adjusted for consistency in smaller text
  },
});
