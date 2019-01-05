import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {
    StackActions,
    NavigationActions,
  } from 'react-navigation';
  
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles'


export class MenuScreen extends Component {

    onPress_Touchable = (name) => {
        let toStack = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: name })],
          });
          this.props.navigation.dispatch(toStack);
    }
    

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.grid}>

                    <TouchableOpacity style={styles.button}
                        onPress={() => {this.onPress_Touchable("Home")}}>
                        <Icon name="ios-home" color="black" size={50}/>
                        <Text style={styles.text}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {this.onPress_Touchable("Statistics")}}>
                        <Icon name="ios-podium" color="black" size={50}/>
                        <Text style={styles.text}>Statistics</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {this.onPress_Touchable("Setting")}}>
                        <Icon name="ios-options" color="black" size={40}/>
                        <Text style={styles.text}>Jar Setting</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {this.onPress_Touchable("Home")}}>
                        <Icon name="ios-contact" color="black" size={50}/>
                        <Text style={styles.text}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {this.onPress_Touchable("Home")}}>
                        <Icon name="ios-information-circle" color="black" size={50}/>
                        <Text style={styles.text}>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {this.onPress_Touchable("Splash")}}>
                        <Icon name="ios-log-out" color="black" size={40}/>
                        <Text style={styles.text}>Log Out</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }
}
