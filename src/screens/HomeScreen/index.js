import React, { Component } from 'react'
import { View,Text } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
import {Page} from '../../components'

export class HomeScreen extends Component {
  render() {
    return (
        <View style={{flex:1 , backgroundColor:'white'}}>
            <View style={{height: 65, backgroundColor:'#222831'}}>

            </View>

            <ScrollableTabView
              tabBarActiveTextColor="#53ac49"
              renderTabBar={() => <TabBar underlineColor="#53ac49" />}>
              <Page tabLabel={{label: "Tháng Trước"}} label="Page #1"/>
              <Page tabLabel={{label: "Tháng  Này", badge: 3}} label="Page #2 aka Long!"/>
              <Page tabLabel={{label: "Tương Lai"}} label="Page #3"/>
              <Page tabLabel={{label: "Page #4 aka Page"}} label="Page #4 aka Page"/>
              <Page tabLabel={{label: "Page #5"}} label="Page #5"/>
            </ScrollableTabView>
        </View>
    )
  }
}