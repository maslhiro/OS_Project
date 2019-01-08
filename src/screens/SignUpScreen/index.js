import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from './styles';
import img_Background from '../../assets/img_Background.jpg'
import AwesomeAlert from "react-native-awesome-alerts";
import { FirebaseAuth } from '../../configs'
import Icon from 'react-native-vector-icons/Ionicons'

export class SignUpScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      txtEmail: '',
      txtPassword: '',
      showAlert: 0,
      errCode: "",
      errEmail: false,
      errPassword: false,
    };
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
          this.onSignUp()


          // Test 
          // setTimeout(()=>{
          //     this.setState({
          //       isLoading:false,
          //       showAlert: 1
          //     })
          // },3000)
        })

    }
  }

  onSignUp = () => {
    FirebaseAuth.createUserWithEmailAndPassword(this.state.txtEmail, this.state.txtPassword)
      .then((data) => {
        console.log("User", data)
        this.setState({
          isLoading: false,
        }, () => this.props.navigation.push("SetInfo"))
      }).catch((error) => {
        this.setState({
          isLoading: false,
          showAlert: 2,
          errCode: error.message
        })
        console.log(`Register fail `, error);
      });
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
            title="Opps!"
            message="Lỗi kết nối, bạn vui lòng thử lại nhé :<"
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
      case 2: {
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
      case 3: {
        return (
          <AwesomeAlert
            show={true}
            title="Chúc mừng !"
            message="Bạn đã đăng nhập thành công :3"
            confirmText=" OK "
            closeOnTouchOutside={false}
            onConfirmPressed={() => this.setState({ showAlert: 0, }, () => this.props.navigation.navigate("SetInfo", { uid: this.state.uid }))}
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

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.goBack()}
            style={[styles.touchHeader, { alignItems: 'flex-start', paddingLeft: 10 }]}>
            <Icon name="md-arrow-dropleft" size={40} color="white" />
          </TouchableOpacity>
          <View style={styles.viewHeader}>
            <Text style={styles.textHeader}>Sign Up</Text>
          </View>
          <View style={styles.touchHeader}>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: 'blue', }} >
          <ScrollView
            style={{ flex: 1, backgroundColor: 'yellow', }}
            showsVerticalScrollIndicator={false} >
            <ImageBackground
              source={img_Background}
              style={styles.infoContainer}>

              <View style={styles.overlayContainer}>
                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                  <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 28, color: 'white' }}> Sign Up</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 28, color: 'white' }}>  1 of 2</Text>
                  </View>
                </View>
                <View style={styles.overlayContainer_01}>
                  <View style={{ padding: 5, margin: 5, }}>
                    <Text style={styles.text}>Email :</Text>
                    {this.state.errEmail ? <Text style={styles.textErrStyle}> *Email can not be empty or null</Text> : null}
                    <TextInput
                      style={styles.textInputNameUser}
                      keyboardType='email-address'
                      autoCorrect={false}
                      placeholderTextColor='black'
                      underlineColorAndroid='black'
                      onChangeText={(text) => this.onChangeText_Email(text)}
                    />
                    <Text style={styles.text}>Password :</Text>
                    {this.state.errPassword ? <Text style={styles.textErrStyle}> *Password can not be empty or null</Text> : null}
                    <TextInput
                      style={styles.textInputNameUser}
                      secureTextEntry={true}
                      autoCorrect={false}
                      placeholderTextColor='black'
                      underlineColorAndroid='black'
                      onChangeText={(text) => this.onChangeText_Pass(text)}
                    />

                  </View>
                </View>

                <TouchableOpacity
                  style={styles.touchView}
                  onPress={() => this.checkData()}>
                  <Text style={styles.textTouch}> Next </Text>
                </TouchableOpacity>

                <AwesomeAlert
                  show={this.state.isLoading}
                  showProgress={true}
                  title="Đang tải"
                  message="Bạn chờ tí nhé ^^"
                  closeOnTouchOutside={false}
                  closeOnHardwareBackPress={false}
                />
                {this.renderAlert()}

              </View>

            </ImageBackground>
          </ScrollView>

        </View>
      </View>
    );
  }
}