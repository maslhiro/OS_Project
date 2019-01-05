import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {scale,scaleVertical} from '../utils'

export const Page = ({ label, props = {} }) => (
    <View style={{flex: 1}}>
        <TouchableOpacity 
            onPress={()=>{props.navigate("Statistics")}}
            style={{ margin: 10, backgroundColor: '#eeeeee', height: scaleVertical(200), borderColor: '#222831', borderWidth: 0 }}>
            <View style={{ backgroundColor: 'transparent', flexDirection: 'row', flex: 2 }}>
                <View style={{ flex: 4, backgroundColor: 'transparent' , padding:5, justifyContent:'center'}}>
                    <Text style={{ color: 'black', fontWeight: '300', fontSize: 18 }}>Tổng Quan</Text>
                    <Text style={{ color: 'black', fontWeight: 'normal', fontSize: 14 , opacity: 0.5}}>Chạm để xem báo cáo đầy đủ</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent:'center', alignItems:"center" }}>
                    <Icon name="ios-arrow-forward" size={30} color="black" />
                </View>
            </View>
            <View style={{backgroundColor:'gray', height:1,marginHorizontal:10, opacity:0.5}}/>
            <View style={{ backgroundColor: 'transparent', flex: 3 ,flexDirection:'row'}}>
                <View style={{flex:3,backgroundColor:'transparent', padding:5,justifyContent:'space-evenly'}}>
                    <Text style={{ color: 'black', fontWeight: 'normal', fontSize: 16 ,}}>Tiền vào</Text>
                    <Text style={{ color: 'black', fontWeight: 'normal', fontSize: 16 ,}}>Tiền ra</Text>
                    <View style={{height:1,}}/>
                    <Text/>
                </View>
                <View style={{flex:2,backgroundColor:'transparent', padding:5,justifyContent:'space-evenly',}}>
                    <Text style={{ color: 'black', fontWeight: 'normal', fontSize: 16 ,alignSelf:'center'}}> 400.000 đ </Text>
                    <Text style={{ color: 'black', fontWeight: 'normal', fontSize: 16 ,alignSelf:'center'}}> 40.000 đ </Text>
                    <View style={{height:1,marginHorizontal:5,backgroundColor:'gray'}}/>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 ,alignSelf:'center'}}> 360.000 đ </Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>
);