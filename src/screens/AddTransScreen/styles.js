import React, {
  Component
} from 'react';
import {
  StyleSheet,
} from 'react-native';

import {
  scale,
  scaleVertical
} from '../../utils';
import {
  Home
} from '../../colors'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'flex-end'
  },
  header: {
    height: 65,
    backgroundColor: Home.header,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  textHeader: {
    color: Home.textHeader,
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
  }
});