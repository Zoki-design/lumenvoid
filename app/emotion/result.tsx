import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

const emotionsData = [
  { label: 'Anxious', value: 7, color: '#DCA1FF' },
  { label: 'Sad', value: 2, color: '#80D6FB' },
  { label: 'Angry', value: 1, color: '#F49B54' },
  { label: 'Meh', value: 5, color: '#FDBF50' },
  { label: 'Happy', value: 1, color: '#A4D37C' },
  { label: 'Calm', value: 2, color: '#60E8B1' },
];

const sleepData = {
  averageHours: 4.15,
  quality: 'Bad',
  suggestion: 'Oh no! Sleeping is important.',
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(90, 79, 207, ${opacity})`,
  labelColor: () => '#444',
  propsForBackgroundLines: {
    strokeDasharray: '',
  },
};

const ResultsScreen = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.heading}>Results</Text>

      {/* Emotions Section */}
      <View style={styles.card}>
  <Text style={styles.cardTitle}>Emotions</Text>
    {emotionsData.map((item, index) => {
      const progress = Math.min(Math.max(item.value / 10, 0), 1); // FIXED
      return (
        <View key={index} style={styles.progressRow}>
          <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
            {item.label}
          </Text>
          <ProgressBar
            progress={progress}
            color={item.color}
            style={styles.progressBar}
          />
          <Text style={styles.percent}>{progress * 100}%</Text> {/* Optional: displays real percent */}
        </View>
      );
    })}
  </View>

      {/* Pie Chart & Mood Analysis */}
      <View style={[styles.card, styles.rowBetween]}>
        <PieChart
          data={emotionsData.map(e => ({
            name: e.label,
            population: e.value,
            color: e.color,
            legendFontColor: '#333',
            legendFontSize: 12,
          }))}
          width={screenWidth * 0.45}
          height={150}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          center={[0, 0]}
          absolute
        />
        <View style={styles.analysisBox}>
          <Text style={styles.analysisTitle}>Analysis</Text>
          <Text style={styles.analysisText}>Mood leans toward</Text>
          <Text style={[styles.analysisText, { fontWeight: 'bold' }]}>Anxiety</Text>
          <Text style={styles.analysisText}>Keep an eye on yourself. Don’t forget to rest!</Text>
        </View>
      </View>

      {/* Sleep Quality */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sleep Quality</Text>
        <View style={styles.sleepRow}>
          <View style={styles.sleepInfo}>
            <Text style={styles.sleepStat}>{sleepData.averageHours} Hours</Text>
            <Text style={styles.sleepLabel}>Quality</Text>
            <Text style={styles.sleepQuality}>{sleepData.quality}</Text>
            <Text style={styles.sleepSuggestion}>{sleepData.suggestion}</Text>
          </View>
          <LineChart
            data={{
              labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
              datasets: [{ data: [4, 4.5, 3, 5, 4, 3.5, 2.5] }],
            }}
            width={screenWidth * 0.5}
            height={120}
            chartConfig={chartConfig}
            withDots={true}
            withInnerLines={false}
            bezier
            style={{ borderRadius: 10 }}
          />
        </View>
      </View>

      {/* CTA */}
      <Text style={styles.footerText}>We Can Work Together for the better you!</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)')}>
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f9', paddingHorizontal: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginVertical: 20, alignSelf: 'center' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },

  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'nowrap', // prevents wrapping
    overflow: 'hidden', // hides overflow
  },
  label: {
    width: 70,
    fontSize: 13,
    color: '#333',
    flexShrink: 0,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#eee',
    marginHorizontal: 8,
  },
  percent: {
    width: 40,
    fontSize: 13,
    textAlign: 'right',
    color: '#333',
    flexShrink: 0,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  analysisBox: {
    flex: 1,
    paddingLeft: 12,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  analysisText: {
    fontSize: 14,
    color: '#555',
  },

  sleepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sleepInfo: { flex: 1, paddingRight: 12 },
  sleepStat: { fontSize: 22, fontWeight: 'bold', color: '#5a4fcf' },
  sleepLabel: { marginTop: 8, fontSize: 14, color: '#777' },
  sleepQuality: { fontSize: 16, color: '#cf5a5a', fontWeight: 'bold' },
  sleepSuggestion: { fontSize: 13, color: '#777', marginTop: 4 },

  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#5a4fcf',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default ResultsScreen;