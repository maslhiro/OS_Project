import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions, Picker } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text'

import styles from './styles'
import {
  StackActions,
  NavigationActions,
} from 'react-navigation';
export class AddTransScreen extends Component {


  toHome = () => {
    // let toStack = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: "Home" })],
    // });
    // this.props.navigation.dispatch(toStack);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.toHome()}
            style={[styles.touchHeader, { alignItems: 'flex-start', paddingLeft: 10 }]}>
            <Icon name="md-arrow-dropleft" size={40} color="white" />
          </TouchableOpacity>
          <View style={styles.viewHeader}>
            <Text style={styles.textHeader}>Add Transaction </Text>
          </View>
          <TouchableOpacity style={styles.touchHeader}>
            <Icon name="ios-checkmark" size={50} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={{ margin: 5, backgroundColor: 'white' }}>
            <FormLabel labelStyle={{ fontSize: 16, color: "#393e46" }}>Name</FormLabel>
            <FormInput
              inputStyle={{ color: 'black' }}
              clearButtonMode="while-editing"
              underlineColorAndroid="black" />
            <FormLabel labelStyle={{ fontSize: 16, color: "#393e46" }}>Amount</FormLabel>
            <View
              style={{ flexDirection: 'row', marginRight: 5, marginLeft: 15, backgroundColor: 'white' }}
            >
              <TextInputMask
                type={'money'}
                keyboardType='numeric'
                style={{ width: Dimensions.get("window").width - 30 }}
                options={{
                  precision: 0,
                  unit: 'VND ',
                  delimiter: ','
                }}
                underlineColorAndroid='black' />

            </View>

            <FormLabel labelStyle={{ fontSize: 16, color: "#393e46" }}>Date</FormLabel>
            <FormInput
              inputStyle={{ color: 'black' }}
              clearButtonMode="while-editing"
              underlineColorAndroid="black" />
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <FormLabel labelStyle={{ fontSize: 16, color: "#393e46" }}>Category</FormLabel>
              <Picker
                selectedValue={"edu"}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => {}}>
                <Picker.Item label="Edu" value="edu" />
                <Picker.Item label="Give" value="give" />
                <Picker.Item label="Live" value="live" />
                <Picker.Item label="Play" value="play" />
              </Picker>
            </View>

            <FormLabel labelStyle={{ fontSize: 16, color: "#393e46" }}>Description</FormLabel>
            <FormInput
              multiline
              inputStyle={{ color: 'black' }}
              clearButtonMode="while-editing"
              underlineColorAndroid="black" />
          </View>
        </ScrollView>
      </View>
    )
  }
}
