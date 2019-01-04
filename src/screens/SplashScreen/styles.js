import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';

import { scale, scaleVertical } from '../../utils';


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
      color : '#222831'
    },
    appName: {
      fontSize: 54, 
      color : '#222831',
      fontWeight: '500',
  
    },
    progress: {
      alignSelf: 'center',
      marginBottom: 35,
      backgroundColor: '#e5e5e5',
    },
  });