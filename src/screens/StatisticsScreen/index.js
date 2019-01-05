import React, { Component } from 'react'
import {View, Text, Dimensions, BackHandler, TouchableOpacity} from 'react-native'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  StackActions,
  NavigationActions,
} from 'react-navigation';
import styles from './styles'
const data = [
  { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
]
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
}
const screenWidth = Dimensions.get('window').width - 10

export class StatisticsScreen  extends Component {
  toHome = () => {
    let toStack = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })],
    });
    this.props.navigation.dispatch(toStack);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.toHome()
      return true;
    });
  }

    componentWillUnmount() {
      this.backHandler.remove();
    }

  render() {
    return (
     <View style={{flex:1}}>
      <View style={styles.header}>
          <TouchableOpacity 
            onPress={()=>this.toHome()}
            style={[styles.touchHeader, { alignItems: 'flex-start', paddingLeft: 10 }]}>
            <Icon name="md-arrow-dropleft" size={40} color="white" />
          </TouchableOpacity>
          <View style={styles.viewHeader}>
            <Text style={styles.textHeader}>Statistics</Text>
          </View>
          <View style={styles.touchHeader}>

          </View>
        </View>
         <Text>Stattic</Text>
         <View>
         <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [{
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ]
              }]
            }}
            width={screenWidth} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />

        <PieChart
          data={data}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
        </View>
     </View>
    )
  }
}
