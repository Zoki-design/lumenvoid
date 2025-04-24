import { StyleSheet, Text, View } from 'react-native';

export default function AIScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AI Assistant</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#4a4964',
  },
});