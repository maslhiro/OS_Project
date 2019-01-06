import React, {
    Component
  } from 'react';
  import {
    StyleSheet,
    Dimensions
  } from 'react-native';
  
  import {
    scale,
    scaleVertical
  } from '../../utils';
  import {
    colorHome
  } from '../../colors'
  let {height, width} = Dimensions.get("window")


  export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'flex-end'
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
    image : {
      height: scaleVertical(250),
      width: width
    }
  });