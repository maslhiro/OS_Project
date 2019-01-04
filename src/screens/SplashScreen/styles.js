import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';

import { scale, scaleVertical } from '../../utils';
import {Splash} from '../../colors'

export default styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      justifyContent: 'space-between',
      flex: 1,
    },
    image: {
      resizeMode: 'cover',
      height: scaleVertical(430),
    },
    text: {
      alignItems: 'center',
    },
    hero: {
      fontSize: 30,
      color : Splash.text
    },
    appName: {
      fontSize: 54, 
      color : Splash.text,
      fontWeight: '500',
  
    },
    progress: {
      alignSelf: 'center',
      marginBottom: 35,
      backgroundColor: Splash.bg_processBar,
    },
  });