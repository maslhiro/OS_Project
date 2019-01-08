import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, BackHandler, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'
import {
  StackActions,
  NavigationActions,
} from 'react-navigation';
import { Badge } from 'react-native-elements'
import Lightbox from 'react-native-lightbox';
import { ImageProgress } from '../../components'
import { objectsRef, FirebaseAuth } from '../../configs'
export class InfoScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: FirebaseAuth.currentUser ? FirebaseAuth.currentUser.uid : "",
      // uid : "11",
      data: {
        userFavo: []
      }
    }
  }

  toHome = () => {
    // let toStack = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: "Home" })],
    // });
    // this.props.navigation.dispatch(toStack);
    this.props.navigation.goBack();
  }

  checkFollow = () => {
    if (this.state.uid) {
      if (this.checkUserFavo()) this.unFollow()
      else this.onFollow()
    }
    else this.askSignIn()

  }

  askSignIn = () => {
    Alert.alert(
      "Warning",
      "Bạn cần đăng nhập để thực hiện tính năng này",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Sign In") },
        {
          text: "Sign Up",
          onPress: () => {
            this.props.navigation.push("SignUp");
          }
        },
        {
          text: "Sign In",
          onPress: () => {
            this.props.navigation.push("SignIn");
          }
        }
      ],
      { cancelable: false }
    );
  }

  checkUserFavo = () => {
    console.log("Check favo", this.state.data.userFavo.indexOf(this.state.uid))
    if (this.state.data.userFavo.indexOf(this.state.uid) != -1)
      return true
    return false

  }

  onFollow = () => {

    objectsRef.child(this.state.data.key).child("userFavo").child(this.state.uid).set("Uid")
  }

  unFollow = () => {
    objectsRef.child(this.state.data.key).child("userFavo").child(this.state.uid).remove()
  }

  render() {
    let { data } = this.state

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
              <Text style={styles.textHeader}>Detail</Text>
            </View>
            <View style={styles.touchHeader}>
            </View>
          </View>

          <Lightbox>
            <ImageProgress
              style={styles.image}
              source={{ uri: data.linkImg }}
            />
          </Lightbox>
          <View style={{ margin: 10, backgroundColor: 'white' }}>
            <Text style={{ fontSize: 20, fontWeight: '500', color: 'black' }}>{data.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Badge containerStyle={{ backgroundColor: '#393e46' }}>
                <Text style={{ color: 'white' }}>{data.nameType}</Text>
              </Badge>
              <Badge containerStyle={{ backgroundColor: '#393e46' }}>
                <Text style={{ color: 'white' }}>{data.nameMuseum}</Text>
              </Badge>
            </View>
            <Text style={{ fontSize: 18, color: 'black' }}>Description : </Text>
            <Text style={{ fontSize: 18, color: 'black' }}>{data.description}</Text>
          </View>


        </View>
        <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-evenly', marginBottom: 5 }}>
          <TouchableOpacity
            onPress={() => { this.checkFollow() }}
            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <Icon name="ios-heart" color={this.checkUserFavo() ? "red" : "black"} size={30} />
            <Text style={{ color: 'red' }}>  {data.userFavo.length} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { this.props.navigation.push("Comment", { data: this.props.navigation.getParam("data") }) }}
            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <Icon name="ios-chatboxes" color="black" size={30} />
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    })
    let idObj = this.props.navigation.getParam("data")
    // let idObj = "-LTaCm5-yAfUYX9Pfg16"
    objectsRef.child(idObj).on("value", (child) => {
      let da = child.toJSON()
      da.key = child.key
      if (da.userFavo) {
        console.log("Obj", Object.keys(da.userFavo))
        da.userFavo = Object.keys(da.userFavo)
      }
      else {
        da.userFavo = []
      }
      this.setState({
        isLoading: false,
        data: da
      })

    }
    )
  }


  componentWillUnmount() {
    this.backHandler.remove();
  }
}
