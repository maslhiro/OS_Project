import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  BackHandler
} from 'react-native';
import {
  StackActions,
  NavigationActions,
} from 'react-navigation';
import styles from './styles';
import img_Background from '../../assets/img_Background.jpg'
import AwesomeAlert from 'react-native-awesome-alerts';
import FastImage from 'react-native-fast-image'
import { FirebaseAuth } from '../../configs'


export class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false, // bien de spiner xoay xoay khi fetch du lieu
      txtEmail: "",
      txtPassword: "",
      errEmail: false,
      errPassword: false,
      linkAva: "",
      errCode: "",
      showAlert: 0, // 1  - Thanh Cong / 2 - Sai Username-Pass / 3 - Loi Ket Noi
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
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.toHome(); // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  checkData = () => {
    if (this.state.txtEmail === "" || this.state.txtPassword === "") {

      this.setState({
        errEmail: !this.state.txtEmail,
        errPassword: !this.state.txtPassword
      })
    }
    else {

      this.setState(
        {
          errEmail: false,
          errPassword: false,
          isLoading: true
        }, () => {
          this.onSignIn()
          //  Test 
          //   setTimeout(()=>{
          //       this.setState({
          //         isLoading:false
          //       })
          //   },3000)
        })

    }
  }

  onChangeText_Pass = (text) => {
    this.setState(
      {
        txtPassword: text
      });
  }

  onChangeText_Email = (text) => {
    this.setState(
      {
        txtEmail: text
      });
  }

  onSignIn = () => {
    FirebaseAuth.signInWithEmailAndPassword(this.state.txtEmail, this.state.txtPassword)
      .then((data) => {
        let user = (data.user.uid)
        console.log("SIGN IN", user)

        if (user) {
          this.setState({
            showAlert: 1,
            isLoading: false,
            // linkAva : da 
          }, () => {
              // FirebaseAuth.signOut()
            })
        }
        else {
          this.setState({
            isLoading: false,
            showAlert: 2
          })
        }
      }).catch((error) => {
        console.log("Err Sign In ", error)
        this.setState({
          isLoading: false,
          showAlert: 3,
          errCode: error.message
        })
      })
  }

  onPress_Open_Sign_Up_Screen = () => {
    console.log("User", FirebaseAuth.currentUser)
    this.props.navigation.push('SignUp');
  }

  onPress_Open_Home_Screen = () => {
    let toStack = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })],
    });
    this.props.navigation.dispatch(toStack);
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
            title="Chúc Mừng !"
            message="Bạn đã đăng nhập thành công ^^"
            confirmText=" OK "
            closeOnTouchOutside={false}
            onConfirmPressed={() => this.setState({ showAlert: 0 }, () => this.onPress_Open_Home_Screen())}
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
            message="Username hoặc mật khẩu không chính xác:<"
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

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={img_Background}
          style={styles.backgroundContainer}>
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          >

            <View style={styles.overlayContainer}>
              <View style={styles.logoContainer}>
                <FastImage
                  style={styles.logoStyle}
                  source={{ uri: "https://uphinhnhanh.com/images/2018/12/17/Krown-Creatives.png" }}
                  resizeMode={FastImage.resizeMode.cover}
                />

              </View>

              <View style={styles.inputContainer}>
                <View style={{ flex: 1, marginVertical: 12, marginHorizontal: 20 }}>
                  <View style={{ flex: 1, backgroundColor: 'white', padding: 5, }}>
                    <Text style={{ color: 'black' }}>Username</Text>
                    {this.state.errEmail ? <Text style={styles.textErrStyle}>*Username can not be empty or null</Text> : null}
                    <TextInput
                      style={styles.inputStyle}
                      defaultValue={this.state.txtEmail}
                      autoCorrect={false}
                      underlineColorAndroid="#679186"
                      onChangeText={text => this.onChangeText_Email(text)}
                    />

                    <Text style={{ color: 'black' }}>Password</Text>
                    {this.state.errPassword ? <Text style={styles.textErrStyle}> *Password can not be empty or null</Text> : null}

                    <TextInput
                      style={styles.inputStyle}
                      defaultValue={this.state.txtPassword}
                      secureTextEntry={true}
                      autoCorrect={false}
                      underlineColorAndroid="#679186"
                      onChangeText={text => this.onChangeText_Pass(text)}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.touchStyle}
                  onPress={() => { this.checkData() }}>
                  <Text style={styles.textTouchStyle}> Sign In </Text>
                </TouchableOpacity>

              </View>

            </View>

          </ScrollView>

          <View style={styles.bottomContainer}>
            <Text style={styles.textStyle} > Not Registered ? </Text>
            <TouchableOpacity onPress={() => { this.onPress_Open_Sign_Up_Screen() }}>
              <Text style={styles.textStyle} > Create Account </Text>
            </TouchableOpacity>
          </View>

          <AwesomeAlert
            show={this.state.isLoading}
            showProgress={true}
            title="Loading !"
            message="Please wait ..."
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={false}
          />
          {this.renderAlert()}

        </ImageBackground>
      </View>
    );
  }

}