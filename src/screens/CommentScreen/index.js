import React, { Component } from 'react'
import { View,Text , TouchableOpacity, TextInput, FlatList, Image, Alert} from 'react-native'
import { commentsRef , profileRef, FirebaseAuth} from '../../configs'
import {ImageProgress} from '../../components'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles'

export class CommentScreen extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      data : [],
      uid : FirebaseAuth.currentUser? FirebaseAuth.currentUser.uid:"",
      // uid : "YsibMUzeZYXxidiMCeFi3Yxnwnd2",
      txtComment:''
    }
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

  checkSend =() => {
    if(this.state.uid) this.onComment()
    else this.askSignIn()
  }

  renderItem = (item,index) => {
    return (
      <View 
        key = {String(index)}
        style={{marginHorizontal:10,marginVertical:2, padding:10, backgroundColor:'white',flexDirection:'row'}}>
        <ImageProgress 
          source={{uri: item.urlAvatar}}
          style={{height:40,width:40}}/>
        <View style={{flex:1, backgroundColor:'white', marginLeft:10, padding:10, paddingTop:5}}>
          <Text style={{fontSize:18,fontWeight:'700'}}>{item.name}</Text>
          <Text style={{fontSize:16,fontWeight:'normal',}}>{item.comment}</Text>
        </View>
      </View>
    )
  }

  render() {
    let { data } = this.state
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                  onPress = {() => this.props.navigation.goBack()}
                  style={[styles.touchHeader, { alignItems: 'flex-start', paddingLeft: 10 }]}>
                  <Icon name="md-arrow-dropleft" size={40} color="white" />
                </TouchableOpacity>
                <View style={styles.viewHeader}>
                  <Text style={styles.textHeader}>Comment</Text>
                </View>
                <View style={styles.touchHeader}>
                </View>
            </View>
            <View style={{flex:1,justifyContent:'flex-end'}}>
                <FlatList
                  disableVirtualization
                  removeClippedSubviews
                  style={{flex:1,backgroundColor:'#eeeeee'}}
                  keyExtractor={(item)=>item.key}
                  data={data}
                  renderItem = {({item,index})=> this.renderItem(item,index)}
                />
                <View style={{flexDirection:'row', width:"100%",height:40}}>
                  <TextInput 
                    style={{flex:1, marginHorizontal:5}}
                    ref={input => { this.textInput = input }}
                    onChangeText={(text)=>this.setState({txtComment:text})}
                    underlineColorAndroid="black"/>
                  <TouchableOpacity 
                    onPress={()=>{this.checkSend()}}
                    style={{height:40,width:40,justifyContent:'center', alignItems:'center'}}
                  >
                    <Icon name="ios-send" color="black" size={30}/>
                  </TouchableOpacity>

                </View>
               

            </View>
        </View>
    )
  }

  onComment = () => {
    let idObj = this.props.navigation.getParam("data")
    // let idObj = "-LTaCm5-yAfUYX9Pfg16"
    if(!this.state.txtComment) return
    commentsRef.child(idObj).push({
      comment : this.state.txtComment,
      uid: this.state.uid
    })
    this.textInput.clear()
    this.setState({
      txtComment:""
    })
  }

  getUser = (data = []) => {
    profileRef.once("value",(child)=>{
      let arrUser = []
      child.forEach((item)=>{
        arrUser.push(item.toJSON())
      })
      
      let newData = data.map((item)=>{
          let itm = item
          let curUser = arrUser.find((user)=>(user.uid==itm.uid))
          if(curUser)
          {
            itm.name = curUser.name
            itm.urlAvatar = curUser.urlAvatar
          }
          return itm
      })

      // console.log("get user",newData)
      this.setState({data: newData}, ()=> console.log("Upder",this.state.data))

    })
  }

  componentDidMount(){
    let idObj = this.props.navigation.getParam("data")
    // let idObj = "-LTaCm5-yAfUYX9Pfg16"
    commentsRef.child(idObj).on("value",(child=> {
      let data = []  
      child.forEach((item)=>{
          let it = item.toJSON()
          it.key = item.key
          data.push(it)
      })
      this.getUser(data)
    }))
  }
}