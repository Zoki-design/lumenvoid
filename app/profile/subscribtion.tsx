import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TextSubheading, TextCaption } from '@/components/StyledText';
import { X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Box from '@/components/Box';
import { useRouter } from 'expo-router';

export default function SubscriptionScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('annual');

  const renderPlan = (title: string, price: string, subtext: string, planKey: string) => (
    <TouchableOpacity
      style={[
        styles.planCard,
        selectedPlan === planKey && styles.planCardSelected,
      ]}
      onPress={() => setSelectedPlan(planKey)}
    >
      <View>
        <TextSubheading>{title}</TextSubheading>
        <TextCaption>{subtext}</TextCaption>
      </View>
      <TextSubheading>{price}</TextSubheading>
    </TouchableOpacity>
  );

  const renderBenefit = (text: string) => (
    <View style={styles.benefitBox}>
      <TextCaption>{text}</TextCaption>
    </View>
  );

  return (
    <Box style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <X size={24} color={Colors.text.tertiary} />
        </TouchableOpacity>

        <TextSubheading style={styles.header}>Premium Pass</TextSubheading>
        <TextCaption style={styles.subHeader}>
          Completely free for 7 days! You can cancel anytime
        </TextCaption>

        {renderPlan('Annual Pass', '$34.99/y', 'Free for 7 days (first time)', 'annual')}
        {renderPlan('Monthly Pass', '$4.99/month', '', 'monthly')}

        {renderBenefit('Ad-free\nEnjoy record and edit without any ads!')}
        {renderBenefit('In-depth Analysis\nGain more insights about you and your life')}
        {renderBenefit('More customization\nCustomize your profile and change color themes!')}
        {renderBenefit('Up to 3 Photos\nRecord more pictures of your day!')}

        <TouchableOpacity style={styles.trialButton}>
          <TextSubheading style={styles.trialButtonText}>Begin Free Trial</TextSubheading>
        </TouchableOpacity>

        <TextCaption style={styles.footerText}>
          $34.99 per year after trial, cancel anytime
        </TextCaption>
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
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  subHeader: {
    marginBottom: 20,
    textAlign: 'center',
  },
  planCard: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planCardSelected: {
    borderColor: Colors.primary.default,
    backgroundColor: '#EFEAFF',
  },
  benefitBox: {
    width: '100%',
    padding: 16,
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    marginBottom: 10,
  },
  trialButton: {
    width: '100%',
    padding: 16,
    backgroundColor: Colors.primary.default,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  trialButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  footerText: {
    fontSize: 12,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
});
