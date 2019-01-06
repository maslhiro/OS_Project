import React, { Component } from 'react'
import { View,Text , TouchableOpacity} from 'react-native'

import {Page} from '../../components'
import Icon from 'react-native-vector-icons/Ionicons'
import {colorHome} from '../../colors'
import styles from './styles'

export class HomeScreen extends Component {
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                  onPress = {() => this.props.navigation.push("Menu")}
                  style={styles.touchHeader}>
                  <Icon name="ios-menu" size={30} color="white"/>
                </TouchableOpacity>
                <View style={styles.viewHeader}>
                  <Text style={styles.textHeader}>Home</Text>
                </View>
                <TouchableOpacity style={styles.touchHeader}>
                  <Text>R</Text>
                </TouchableOpacity>
            </View>

         

            <TouchableOpacity 
              onPress={()=>{this.props.navigation.push("AddTrans")}}
              style={styles.touchAdd}>
                  <Icon name="ios-add" size={30} color="white"/>
            </TouchableOpacity>

        </View>
    )
  }
}