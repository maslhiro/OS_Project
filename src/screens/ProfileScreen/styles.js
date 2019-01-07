import {
  StyleSheet,
  Dimensions
} from "react-native";
import {
  scale,
  scaleVertical
} from '../../utils';
import {
  colorHome
} from '../../colors'

let {height, width} = Dimensions.get("window")

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
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
  bgContainer: {
    flex: 1,
    padding: 5
  },
  userContainer: {
    flex: 2,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  userContainer01: {
    height: height * 30 / 100,
    width: width * 80 / 100,
    backgroundColor: 'white'
  },
  avaContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 5
  },



  textName: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
    color: 'black'
  }







}));