import React, { Component } from 'react'
import { View,Text , TouchableOpacity} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
import {Page} from '../../components'
import Icon from 'react-native-vector-icons/Ionicons'
import {Home} from '../../colors'
import styles from './styles'

export class HomeScreen extends Component {
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.touchHeader}>
                  <Icon name="ios-menu" size={30} color="white"/>
                </TouchableOpacity>
                <View style={styles.viewHeader}>
                  <Text style={styles.textHeader}>Home</Text>
                </View>
                <TouchableOpacity style={styles.touchHeader}>
                  <Text>R</Text>
                </TouchableOpacity>
            </View>

            <ScrollableTabView
              tabBarActiveTextColor={Home.scrollable}
              initialPage = {1}
              renderTabBar={() => <TabBar underlineColor={Home.scrollable} />}>
              <Page tabLabel={{label: "Tháng Trước"}} label="Page #1"/>
              <Page tabLabel={{label: "Tháng  Này", badge: 3}} label="Page #2 aka Long!"/>
              <Page tabLabel={{label: "Tương Lai"}} label="Page #3"/>
              <Page tabLabel={{label: "Page #4 aka Page"}} label="Page #4 aka Page"/>
              <Page tabLabel={{label: "Page #5"}} label="Page #5"/>
            </ScrollableTabView>

            <TouchableOpacity 
              onPress={()=>{}}
              style={styles.touchAdd}>
                  <Icon name="ios-add" size={30} color="white"/>
            </TouchableOpacity>

        </View>
    )
  }
}