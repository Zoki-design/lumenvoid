import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import MoodCard from '../components/MoodCard';
import { moods } from '@/assets/data/Data';
import { themes } from '@/constants/Colours';
import { TextTitle, TextBody, TextRegular } from '@/app/components/StyledText';
import { PieChart } from 'react-native-chart-kit';
import { StyleSheet } from 'react-native';
import Box from '@/app/components/Box';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const calendar = () => {
  const data = [
    {
      name: 'Anger',
      population: 40,
      color: themes.light.orange,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Joy',
      population: 25,
      color: themes.light.green,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Sadness',
      population: 15,
      color: themes.light.cyan,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Anxiety',
      population: 10,
      color: themes.light.indigo,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Neutral',
      population: 10,
      color: themes.light.yellow,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Depression',
      population: 5,
      color: themes.light.brown,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];
  const renderMoodItem = ({ item }: { item: (typeof moods)[0] }) => (
    <MoodCard image={item.image} count={item.count} />
  );
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <TextTitle style={styles.statheader}>Recorded moods</TextTitle>
        <Box style={styles.moodTrackerSection}>
          <FlatList
            data={moods}
            renderItem={renderMoodItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moodList}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </Box>

        <TextTitle style={styles.statheader}>Overall</TextTitle>
        <View>
          <View style={styles.container}>
            <TextBody style={styles.title}>
              Your anger moods have been increased drastically
            </TextBody>
            <PieChart
              data={data}
              width={screenWidth * 0.9}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              absolute
            />
          </View>
        </View>

        <TextTitle style={styles.statheader}>Sleep Quality</TextTitle>
        <View style={styles.sleepContainer}>
          <View style={styles.sleepChartWrapper}>
            <View style={styles.faceColumn}>
              <Image
                source={require('@/assets/icons/happy1.png')}
                style={styles.faceIcon}
              />
              <Image
                source={require('@/assets/icons/happy1.png')}
                style={styles.faceIcon}
              />
              <Image
                source={require('@/assets/icons/happy1.png')}
                style={styles.faceIcon}
              />
            </View>
            <LineChart
              data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                  {
                    data: [6.5, 7.0, 6.9, 7.5, 7.2, 7.8, 7.25],
                    strokeWidth: 2,
                  },
                ],
              }}
              width={screenWidth * 0.5}
              height={120}
              withDots={false}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLabels={false}
              withHorizontalLabels={false}
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(148, 183, 108, ${opacity})`, 
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForBackgroundLines: {
                  stroke: '#E5E5E5',
                },
              }}
              bezier
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                marginLeft: -10,
              }}
            />
          </View>
          <View style={styles.sleepInfo}>
            <Text style={styles.sleepLabel}>Average hours</Text>
            <Text style={styles.sleepValue}>7.25</Text>
            <Text style={styles.sleepLabel}>Quality</Text>
            <Text style={styles.sleepQuality}>Mostly good</Text>
            <Text style={styles.sleepComment}>
              Your sleep is good!{'\n'}Keep it up!
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  moodTrackerSection: {
    margin: 20,
    display: 'flex',
  },
  moodList: {
    paddingHorizontal: 20,
  },
  statheader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  container: {
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  meditateText: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
  sleepContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#ccc',
  },
  sleepChartWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  faceColumn: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    marginRight: 10,
  },
  faceIcon: {
    width: 20,
    height: 20,
    marginVertical: 5,
  },
  sleepInfo: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  sleepLabel: {
    fontSize: 12,
    color: '#888',
  },
  sleepValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  sleepQuality: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 6,
  },
  sleepComment: {
    fontSize: 12,
    color: '#666',
  },
});

export default calendar;
