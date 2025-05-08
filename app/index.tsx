import { View, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { TextTitle, TextBody } from '@/components/StyledText';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Button from '@/components/Button';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/logiin.jpg')}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <TextTitle style={styles.title}>Welcome to Mindful</TextTitle>
          <TextBody style={styles.subtitle}>
            Your journey to mental wellness starts here
          </TextBody>
          
          <View style={styles.buttonContainer}>
            <Link href="/sign-in" asChild>
              <Button 
                title="Sign In" 
                variant="primary"
                fullWidth
                style={styles.button}
                onPress={() => {
                  // handle the button press here
                }}
              />
            </Link>
            
            <Link href="/sign-up" asChild>
              <Button 
                title="Create Account" 
                variant="outline"
                fullWidth
                style={styles.button}
                onPress={() => {
                  // handle the button press here
                }}
              />
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: Layout.spacing.xl,
    justifyContent: 'flex-end',
  },
  title: {
    color: Colors.background.primary,
    fontSize: 36,
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    color: Colors.background.primary,
    opacity: 0.9,
    marginBottom: Layout.spacing.xl,
  },
  buttonContainer: {
    gap: Layout.spacing.md,
  },
  button: {
    marginBottom: Layout.spacing.sm,
  },
});