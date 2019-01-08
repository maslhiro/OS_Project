import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");
import {colorHome} from '../../colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding:5,
    backgroundColor: "white"
  },  
  header: {
    height: 65,
    backgroundColor: colorHome.header,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  textHeader: {
    color: colorHome.textHeader,
    fontWeight: '300',
    fontSize: 20
  },
  touchHeader: {
    width: 65,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewHeader: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlayContainer : {
    width: (width * 80) / 100,
    height: (height * 70) / 100,
    backgroundColor: 'transparent',
    justifyContent: 'space-evenly',
  },
  overlayContainer_01 : {
    padding: 5,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    flex: 1
  },
  chooseAvtContainer: {
    flexDirection: 'row',
    padding:5,
    // alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  infoContainer: {
    width: (width * 100) / 100,
    height: (height - 88),
    backgroundColor: "red",
    alignItems: "center",
    padding:5,
    justifyContent: "center"
  },
  touchView: {
    height: 60,
    backgroundColor: '#f79f24',
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchChoosePhotoView: {
    borderRadius: 25,
    backgroundColor: '#f79f24',
    margin:10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 14,
//    color: '#679186'
    color:'black'
},
  textHeader: {
    fontSize: 16,
    color: 'white'
  },
  textErrStyle : {
    color:'red',
    fontSize:12
  } ,
  textInputNameUser:
  {
    backgroundColor: 'white',
    color:'black',
    alignSelf:'center',
    width: (width * 70) / 100,
    padding: 5
  },
  textTouch: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 14
  }

})

export default styles