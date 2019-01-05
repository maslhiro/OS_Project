import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Dimensions, Slider, BackHandler } from 'react-native'
//import { Home } from '../../colors'
import {
  StackActions,
  NavigationActions,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import { PieChart } from 'react-native-chart-kit'
import styles from './styles'

const total = 100

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
}
const screenWidth = Dimensions.get('window').width - 10


export class SettingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nes: 60,
      edu: 10,
      live: 5,
      give: 10,
      play: 5,
      free: 10

    }
  }

  renderChart = () => {
    let {
      nes, edu, live, give, play, free
    } = this.state
    let data = [
      { name: 'Nes', percentage : nes, color: 'rgba(131, 167, 234, 1)' },
      { name: 'Edu', percentage : edu, color: 'yellow' },
      { name: 'Live', percentage : live, color: 'black' },
      { name: 'Give', percentage : give, color: '#eeeeee' },
      { name: 'Play', percentage : play, color: 'rgb(0, 0, 255)' },
      { name: 'Free', percentage : free, color: 'red' }

    ]
    return (
      <PieChart
        data={data}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        accessor="percentage"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    )
  }

  checkPercentage  = (nameState, value) => {

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

  toHome = () => {
    let toStack = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })],
    });
    this.props.navigation.dispatch(toStack);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={()=>this.toHome()}
            style={[styles.touchHeader, { alignItems: 'flex-start', paddingLeft: 10 }]}>
            <Icon name="md-arrow-dropleft" size={40} color="white" />
          </TouchableOpacity>
          <View style={styles.viewHeader}>
            <Text style={styles.textHeader}>Jar Setting</Text>
          </View>
          <TouchableOpacity style={styles.touchHeader}>
            <Icon name="ios-checkmark" size={40} color="white" />
          </TouchableOpacity>
        </View>
        {this.renderChart()}

        <View style={{ flex: 1, backgroundColor: '#ffffff', margin: 5, padding: 5 }}>
          <Text
            style={{
              fontSize: 20,
              color: 'black'
            }}
          >Nes : {this.state.nes}</Text>
          <Slider
            value={this.state.nes}
            minimumValue={1}
            maximumValue={100}
            step={1}
            thumbTintColor="#222831"
            onSlidingComplete={(value) => this.setState({ nes: value })}
          />
          <Text
            style={{
              fontSize: 20, color: 'black'
            }}
          >Edu : {this.state.edu}</Text>
          <Slider
            value={this.state.edu}
            minimumValue={1}
            maximumValue={100}
            step={1}
            thumbTintColor="#222831"
             onSlidingComplete={(value) => this.setState({ edu: value })}
          />
          <Text
            style={{
              fontSize: 20, color: 'black'
            }}
          >Live : {this.state.live}</Text>
          <Slider
            value={this.state.live}
            minimumValue={1}
            maximumValue={100}
            step={1}
            thumbTintColor="#222831"

            onSlidingComplete={(value) => this.setState({ live: value })}
          />
          <Text
            style={{
              fontSize: 20, color: 'black'
            }}
          >Give : {this.state.give}</Text>
          <Slider
            value={this.state.give}
            minimumValue={1}
            maximumValue={100}
            step={1}
            thumbTintColor="#222831"

            onSlidingComplete={(value) => this.setState({ give: value })}
          />

          <Text
            style={{
              fontSize: 20, color: 'black'
            }}
          >Play : {this.state.play}</Text>
          <Slider
            value={this.state.play}
            minimumValue={1}
            maximumValue={100}
            step={1}
            thumbTintColor="#222831"

            onSlidingComplete={(value) => this.setState({ play: value })}
          />

          <Text
            style={{
              fontSize: 20, color: 'black'
            }}
          >Free : {this.state.free}</Text>
          <Slider
            value={this.state.free}
            minimumValue={1}
            maximumValue={100}
            step={1}
            thumbTintColor="#222831"
            onSlidingComplete={(value) => this.setState({ give: value })}
          />

        </View>


      </View>
    )
  }
}
