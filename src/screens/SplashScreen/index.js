import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  StatusBar,
} from 'react-native';

import {
  StackActions,
  NavigationActions,
} from 'react-navigation';

import {ProgressBar} from '../../components'
import styles from './styles'
import { scale, scaleVertical } from '../../utils';

const delay = 700;
const uriImg = "https://i.pinimg.com/564x/8e/dc/d1/8edcd15480855eaf0f4a1bb9f319c95b.jpg"

export class SplashScreen extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      progress: 0,
    };
  }


  componentDidMount() {
    StatusBar.setHidden(true, 'none');
    this.timer = setInterval(this.updateProgress, delay);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateProgress = () => {
    if (this.state.progress === 1) {
      clearInterval(this.timer);
      setTimeout(this.onLoaded, delay);
    } else {
      const randProgress = this.state.progress + (Math.random() * 0.5);
      this.setState({ progress: randProgress > 1 ? 1 : randProgress });
    }
  };

  onLoaded = () => {
    StatusBar.setHidden(false, 'slide');
    const toHome = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(toHome);
  };

  render = () => (
    <View style={styles.container}>
       <View>
        <Image
          style={[styles.image, { width: Dimensions.get('window').width }]}
          source={{uri:uriImg}}
        />
        <View style={styles.text}>
          <Text  style={styles.hero}>React Native</Text>
          <Text  style={styles.appName}>OS Project</Text>
        </View>
      </View>
      <ProgressBar
        color="#393e46"
        style={styles.progress}
        progress={this.state.progress}
        width={ scale(320)}
      />
    </View>
  );
}

