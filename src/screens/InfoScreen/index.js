import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Picker } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'
import {
  StackActions,
  NavigationActions,
} from 'react-navigation';
import Lightbox from 'react-native-lightbox';

export class InfoScreen extends Component {

  toHome = () => {
    // let toStack = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: "Home" })],
    // });
    // this.props.navigation.dispatch(toStack);
    this.props.navigation.goBack();
  }

  render() {
    let data = this.props.navigation.getParam("data")

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => this.toHome()}
              style={[styles.touchHeader, { alignItems: 'flex-start', paddingLeft: 10 }]}>
              <Icon name="md-arrow-dropleft" size={40} color="white" />
            </TouchableOpacity>
            <View style={styles.viewHeader}>
              <Text style={styles.textHeader}>Info</Text>
            </View>
            <View style={styles.touchHeader}>
            </View>
          </View>


          <Lightbox>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: data.linkImg }}
            />
          </Lightbox>
          <View style={{ margin: 10, backgroundColor: 'white' }}>
            <Text style={{ fontSize: 20, fontWeight: '500', color: 'black' }}>{data.name}</Text>
            <Text style={{ fontSize: 18, color: 'black' }}>{data.description}</Text>
          </View>
         

        </View>
        <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-evenly', marginBottom: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <Icon name="ios-heart" color="red" size={30} />
              <Text style={{ color: 'red' }}> 10 </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <Icon name="ios-chatboxes" color="black" size={30} />
            <Text style={{ color: 'black' }}> 10 </Text>
            </View>
          </View>
        {/* <View style={{ backgroundColor: 'yellow', width: "100%", height: 40, }}>
          <TextInput
            underlineColorAndroid="black" />

        </View> */}
      </View>
    )
  }
}
