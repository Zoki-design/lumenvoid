import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Settings, ChevronRight, Image as ImageIcon, Users, Award, Star, Share } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Account</Text>
          <View style={styles.headerIcons}>
            <Bell size={24} color="#4a4964" />
            <Settings size={24} color="#4a4964" />
          </View>
        </View>

        {/* Profile Card */}
        <TouchableOpacity style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>User</Text>
            <Text style={styles.profileId}>ID:1546542545456</Text>
          </View>
          <ChevronRight size={24} color="#4a4964" />
        </TouchableOpacity>

        {/* Records Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Records</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Recorded days</Text>
              <Text style={styles.statValue}>8</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Points Collected</Text>
              <Text style={styles.statValue}>185</Text>
            </View>
          </View>
        </View>

        {/* Subscription Card */}
        <View style={styles.subscriptionCard}>
          <Text style={styles.subscriptionText}>Subscription Ad</Text>
        </View>

        {/* Menu Items */}
        {[
          { title: 'Gallery', icon: ImageIcon },
          { title: 'Friends', icon: Users },
          { title: 'Achievements', icon: Award },
        ].map(({ title, icon: Icon }) => (
          <TouchableOpacity key={title} style={styles.menuItem}>
            <Icon size={24} color="#717090" />
            <Text style={styles.menuItemText}>{title}</Text>
            <ChevronRight size={20} color="#4a4964" style={styles.chevron} />
          </TouchableOpacity>
        ))}

        {/* More Section */}
        <Text style={[styles.sectionTitle, styles.moreTitle]}>More</Text>
        {[
          { title: 'Community', icon: Star },
          { title: 'Useful Links', icon: Share },
        ].map(({ title, icon: Icon }) => (
          <TouchableOpacity key={title} style={styles.menuItem}>
            <Icon size={24} color="#717090" />
            <Text style={styles.menuItemText}>{title}</Text>
            <ChevronRight size={20} color="#4a4964" style={styles.chevron} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1eef5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4a4964',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  profileCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ef8834',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4a4964',
  },
  profileId: {
    fontSize: 10,
    color: '#a89fbc',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4a4964',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    fontSize: 10,
    color: '#717090',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 20,
    color: '#4a4964',
    fontWeight: '500',
    marginTop: 15,
  },
  subscriptionCard: {
    backgroundColor: '#4a4964',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  subscriptionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  menuItem: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemText: {
    fontSize: 12,
    color: '#717090',
    fontWeight: '500',
    marginLeft: 15,
    flex: 1,
  },
  chevron: {
    marginLeft: 'auto',
  },
  moreTitle: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  }
});