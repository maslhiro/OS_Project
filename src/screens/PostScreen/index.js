import React, { Component } from "react";
import {
  Text,
  View,
  Picker,
  TextInput,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  ImageBackground
} from "react-native";
import styles from "./styles.js";
import FastImage from 'react-native-fast-image'
import { objectsRef, UserUpdateRefStorage, MixRef } from "./../../configs";
import Icon from 'react-native-vector-icons/Ionicons'
import AwesomeAlert from "react-native-awesome-alerts";
import img_Background from '../../assets/img_Background.jpg'
import {
  StackActions,
  NavigationActions,
} from 'react-navigation';


import ImagePicker from "react-native-image-picker";

const defaultUri = "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/3c4456be614c1710b655baf00b1e14c0"

export class PostScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showAlert: 0,
      errCode: "",
      txtTitle: "",
      txtDescription: "",
      linkImg: "",
      errTitle: false,
      uriImg: defaultUri,
      arrType:[],
      arrMuseum:[],
      // idType: this.props.navigation.getParam("idType") ? this.props.navigation.getParam("idType") : "",
      // idMuseum: this.props.navigation.getParam("idMuseum") ? this.props.navigation.getParam("idMuseum") : "",
      idType: "T007",
      idMuseum: "M001"
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
  
  onChoose_Photo = () => {
    console.log("PHoto")
    const options = {
      title: "Select Photo",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let uri = response.uri;
        this.setState({  uriImg: uri}, () => this.upLoad_Image(uri))
      }
    });
  };

  upLoad_Image = (uri) => {
    let fileUpload = UserUpdateRefStorage.child(this.state.uid + ".jpg");
    fileUpload.putFile(uri).then(snapshot => {
      this.setState({
        isLoading: false,
        linkImg: snapshot.downloadURL,
      })
    }).catch((err) => {
      this.setState({
        showAlert: 3,
        isLoading: false,
        errCode: err.message
      })
      console.log("Upload Image", err)
    })
  }

  onChangeText_Title = (text) => {
    this.setState({ txtTitle: text }, () => console.log("Value Change", this.state));
  }

  onChangeText_Description = (text) => {
    this.setState({
      txtDescription: text
    });
  }

  onValueChange_Type = (value) => {
    this.setState({
      idType: value
    }, () => console.log("Value Change", this.state))
  }

  onValueChange_Museum = (value) => {
    this.setState({
      idMuseum: value
    })
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  onPost = () => {
    let _idObject = objectsRef.push().key;
    objectsRef.child(_idObject).set(
      {
        idObject: _idObject,
        idMuseum: this.state.idMuseum,
        idType: this.state.idType,
        name: this.state.txtTitle,
        description: this.state.txtDescription,
        linkImg: this.state.linkImg,
        isActivated: "true"
      },
      (error) => {
        if (error) {
          //objectsRef.child(_idObject).remove();
          console.log("Error Post", error)
          this.setState({
            isLoading: false,
            showAlert: 3,
            errCode: error.message
          })
        } else {
          this.setState({
            isLoading: false,
            showAlert: 1,
          })
        }
      }
    );

  }

  renderPicker_Item = (arr) => {
    if ( arr === [] ) return
    return (arr.map(item => {
      return (
        <Picker.Item
          key={item.key}
          label={item.des}
          value={item.key} />
      )
    }))
  }

  renderAlert = (container) => {
    switch (this.state.showAlert) {
      case 0: {
        return null
        break
      }
      case 1: {
        return (
          <AwesomeAlert
            show={true}
            title="Chúc mừng !"
            message="Bạn đã đăng hiện vật thành công ^^"
            confirmText=" OK "
            closeOnTouchOutside={false}
            onConfirmPressed={() => {
              this.props.navigation.push('Home')
            }}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
          />
        )
        break
      }
      case 2: {
        return (
          <AwesomeAlert
            show={true}
            title="Opps !"
            message="Bạn chưa chọn ảnh"
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
            message={this.state.errCode}
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

  checkCompleted = () => {
    if (this.state.txtTitle === "" || this.state.uriImg == defaultUri) {
      this.setState({
        errTitle: !this.state.txtTitle,
        showAlert: this.state.uriImg == defaultUri ? 2 : 0
      })
    }
    else {

      this.setState(
        {
          errTitle: false,
          showAlert: 0,
          isLoading: true
        }, () => {
          this.onPost()
          // Test 
          // setTimeout(()=>{
          //     this.setState({
          //       isLoading:false,
          //       showAlert:2,
          //     })
          // },3000)
        })

    }
  };

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
            <Text style={styles.textHeader}>Post</Text>
          </View>
          <TouchableOpacity style={styles.touchHeader}>
            <Icon name="ios-checkmark" size={50} color="white" />
          </TouchableOpacity>
        </View>
        <ImageBackground
          source={img_Background}
          style={styles.infoContainer}>
          <ScrollView style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}>
            <View style={styles.overlayContainer}>
              <View style={{ flex: 1, backgroundColor: 'green' }}>
                <FastImage
                  style={{ flex: 1 }}
                  source={{ uri: this.state.uriImg }}
                  resizeMode={FastImage.resizeMode.cover}
                />

              </View>
              <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                  <TextInput
                    style={styles.titleInputText}
                    placeholder={"Title"}
                    autoCorrect={false}
                    placeholderTextColor="#679186"
                    underlineColorAndroid="#679186"
                    onChangeText={text => this.onChangeText_Title(text)}
                  />
                  {this.state.errTitle ?
                    <Text style={{ color: 'red', fontSize: 14, marginHorizontal: 25, }}> *Title can not be empty</Text> : null}
                  <TextInput
                    style={styles.descriptionInputText}
                    placeholder={"Description"}
                    autoCorrect={false}
                    multiline={true}
                    placeholderTextColor="#679186"
                    underlineColorAndroid="#679186"
                    onChangeText={text => this.onChangeText_Description(text)}
                  />

                  <View style={styles.pickerContainer}>
                    <Text style={{ fontSize: 15 }}> Loại : </Text>
                    <Picker
                          mode='dialog'
                          selectedValue={this.state.idType}
                          style={{ height: 50, width: 150, alignSelf: 'center' }}
                          onValueChange={(itemValue, itemIndex) => this.onValueChange_Type(itemValue)}>
                          {this.renderPicker_Item(this.state.arrType)}

                        </Picker>
                  </View>



                  <View style={styles.pickerContainer}>
                    <Text style={styles.text}> Bảo Tàng : </Text>
                    <Picker
                          mode='dialog'
                          selectedValue={this.state.idMuseum}
                          style={{ height: 50, width: 180, alignSelf: 'center' }}
                          onValueChange={(itemValue, itemIndex) => this.onValueChange_Museum(itemValue)}>
                          {this.renderPicker_Item(this.state.arrMuseum)}
                        </Picker>
                  </View>

                </View>
              </ScrollView>


              <View style={styles.touchPhotoContainer}>
                <TouchableOpacity
                  style={styles.touchPhoto}
                  activeOpacity={0.8}
                  onPress={() => this.onChoose_Photo()}>
                  <Icon name="md-add" size={30} color="white" />
                </TouchableOpacity>
              </View>


            </View>
          </ScrollView>
        </ImageBackground>
        <AwesomeAlert
          show={this.state.isLoading}
          showProgress={true}
          title="Loading !"
          message="Please wait ..."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
        />
        {/*        
            {this.renderAlert()}
        */}
      </View>
    );
  }

  componentDidMount(){
    MixRef.on("value",(child)=> {
      let arrType = [], arrMuseum = []
      child.forEach((item)=> {
          if(item.key.indexOf("M")!=-1)
          {
            arrMuseum.push({
              key: item.key,
              des : item.val()
            })
          }
          else
          {
            arrType.push({
              key: item.key,
              des : item.val()
            })
          }
      
      })
      // console.log("Type",arrType)
      // console.log("Museum",arrMuseum)
      this.setState({
        arrMuseum:arrMuseum,
        arrType : arrType,
        idMuseum: arrMuseum[0].des,
        idType : arrType[0].des
      })

    })

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.toHome(); // works best when the goBack is async
      return true;
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  
}