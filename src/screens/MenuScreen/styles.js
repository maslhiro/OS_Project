import React, { Component } from "react";
import { StyleSheet,Dimensions } from "react-native";
import {scale, scaleModerate} from '../../utils'
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default styles = StyleSheet.create(
    {
        container :{
            flex:1,
            justifyContent: 'center',
            backgroundColor:'white',
            paddingBottom:10
        },
        button:{
            backgroundColor: '#e5e5e5',
            justifyContent:'center',
            alignItems: 'center',
            margin: 10,
            width: scale(width*35/100),
            height: scale(width*35/100)
        },
        grid:{
            // flex:1,
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        text : {
            fontWeight : 'bold',
            color: '#222831',
            fontSize : 14
        }
    }
);