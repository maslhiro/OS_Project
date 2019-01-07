import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Button,
  BackHandler
} from "react-native";
import styles from "./styles";
import img_Background from '../../assets/img_Background.jpg'
import { ImageProgress } from "../../components";
import AwesomeAlert from 'react-native-awesome-alerts'
import Icon from "react-native-vector-icons/Ionicons";
import { FirebaseAuth, objectsRef, profileRef } from '../../configs'
import {
  StackActions,
  NavigationActions,
} from 'react-navigation';
const defaultImg = "https://img.freepik.com/free-photo/3d-tree-against-a-moon-night-sky_1048-9259.jpg?size=338&ext=jpg"

export class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: FirebaseAuth.currentUser?FirebaseAuth.currentUser.uid:"",
      user :{},
      // uid : "YsibMUzeZYXxidiMCeFi3Yxnwnd2",
      data: [],
      showAlert: 0
    };
  }

  toHome = () => {
    let toStack = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })],
    });
    this.props.navigation.dispatch(toStack);
    // this.props.navigation.goBack();
  }
  
  renderItem = (item) => {

        return (
          <TouchableOpacity
            onPress={() => {this.props.navigation.push("Info",{data:item.key}) }}
            style={{ flex: 1, height: 200, margin: 5, backgroundColor: 'black' }}>

            <ImageProgress
              style={{ flex: 1 }}
              source={{ uri: item.linkImg }} />

          </TouchableOpacity>
        )
  };

  goBack = () => {
    this.props.navigation.goBack()
  }

  onPress_Open_Home_Screen = () => {

    this.props.navigation.navigate("Home")

  }

  renderAlert = () => {
    switch (this.state.showAlert) {
      case 0: {
        return null
        break
      }
      case 1: {
        return (
          <AwesomeAlert
            show={true}
            title="Cảnh Báo !"
            message="Bạn có chắc muốn đăng xuất không ?"
            confirmText=" OK "
            closeOnTouchOutside={false}
            onConfirmPressed={() => {
              let check = container.clearInfo_User()
              if (check) {
                this.setState({ showAlert: 0 }, () => this.onPress_Open_Home_Screen())

              }
              else {
                this.setState({ showAlert: 3 })
              }
            }
            }
            onCancelPressed={() => { this.setState({ showAlert: 0 }) }}
            closeOnHardwareBackPress={true}
            showCancelButton={true}
            showConfirmButton={true}
          />
        )
        break
      }
      case 2: {
        return (
          <AwesomeAlert
            show={true}
            title="Thông Báo !"
            message="Đăng xuất thành công"
            confirmText=" OK "
            closeOnTouchOutside={false}
            onConfirmPressed={() => this.setState({ showAlert: 0 })}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
          />
        )
        break
      }
      case 3: {
        return (
          <AwesomeAlert
            show={true}
            title="Opps!"
            message="Có lỗi xảy ra, bạn vui lòng thử lại nhé"
            confirmText=" OK "
            closeOnTouchOutside={false}
            onConfirmPressed={() => this.setState({ showAlert: 0 })}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
          />
        )
        break
      }
      default: {
        return null
      }
    }


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
            <Text style={styles.textHeader}>Profile</Text>
          </View>
          <View style={styles.touchHeader}>
          </View>
        </View>
        <ImageBackground
          source={img_Background}
          style={styles.bgContainer}>

          <View style={styles.userContainer}>

            <View style={styles.userContainer01}>

              <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20, backgroundColor: 'white' }}>

                <View style={{ flex: 5, backgroundColor: 'white', flexDirection: 'row' }}>
                  <View style={styles.avaContainer}>
                    <ImageProgress
                      style={{ height: 80, width: 80 }}
                      source={{ uri: this.state.user?this.state.user.urlAvatar:defaultImg }}
                    />
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.textName}>{this.state.user?this.state.user.name:"Khách"}</Text>
                  </View>
                </View>
                <View style={{ flex: 2, backgroundColor: 'white', padding: 5, justifyContent: 'space-evenly' }}>
                  <Text style={{ color: 'black' }}>List Favorites : </Text>
                  <View style={{ height: 1, backgroundColor: 'black' }} />
                </View>

              </View>

            </View>
          </View>

          <View style={{ flex: 3, backgroundColor: 'transparent' }}>
            <FlatList
              disableVirtualization
              removeClippedSubviews
              keyExtractor={(item)=>item.key}
              style={{ flex: 1 }}
              data={this.state.data}
              numColumns={1}
              renderItem={({ item }) => this.renderItem(item)}
            />
          </View>


          {/* this.renderAlert() */}

        </ImageBackground>
      </View>
    );
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.toHome(); // works best when the goBack is async
      return true;
    });

    if(this.state.uid)
    objectsRef.on("value", (child) => {
      let data = []
        child.forEach((item)=>{
          let da = item.toJSON()
          da.key = item.key
          if(da.userFavo)
          {
              console.log("Obj",Object.keys(da.userFavo))
              da.userFavo = Object.keys(da.userFavo)
              if(da.userFavo.indexOf(this.state.uid)!=-1) data.push(da)
          }
       
        })
        this.setState_User(data)
    })
  }
  
  setState_User = (data)=>{     
    profileRef.child(this.state.uid).on('value',(child)=>{
      console.log("CHidle", child.toJSON())
      this.setState({
          data : data,
          user : child.toJSON()
      }, ()=> {
        console.log("Data",this.state.data)
        console.log("User",this.state.user)

      })
    })
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
}