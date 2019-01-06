import React, { Component } from 'react';
import {
    FlatList,
    Image,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'

const data = [
    {
        description: "Thẻ thu tô loại 1 đấu, 10 đấu, 100 đấu và thẻ đếm bao lúa xuất nhập kho",
        idMuseum: "M001",
        idObject: "-LTaCm5-yAfUYX9Pfg16",
        idType: "T008",
        nameType:"Phong kiến",
        isActivated: "true",
        linkImg: "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/Resized%2F0001%20(Copy).JPG?alt=media&token=49111e1a-fee6-49d3-9b92-eb7f70273dcd",
        name: "Thẻ thu tô"
    },
    {
        description: "Đơn vị đong theo lít, nửa lít và lon ",
        idMuseum: "M001",
        idObject: "-LTaCm55g0mrhgiF97CM",
        idType: "T006",
        nameType:"Phong kiến",
        isActivated: "true",
        linkImg: "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/Resized%2F0002%20(Copy).JPG?alt=media&token=0ed8e4cf-a1ac-4926-8b3e-3f67141ef40c",
        name: "Các đơn vị đong hạt rời "
    },
    {
        description: " ",
        idMuseum: "M001",
        idObject: "-LTaCm5Sml823aBtqwct",
        idType: "T007",
        nameType:"Phong kiến",
        isActivated: "true",
        linkImg: "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/Resized%2F0003%20(Copy).JPG?alt=media&token=488ee708-5f62-4ef4-831f-e4cbc200f920",
        name: "Neo, bích neo, xích neo"
    },
    {
        description: " ",
        idMuseum: "M001",
        idObject: "-LTaCm5Sml823aBtqwcu",
        idType: "T007",
        nameType:"Phong kiến",
        isActivated: "true",
        linkImg: "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/Resized%2F0004%20(Copy).JPG?alt=media&token=26156e39-e0a7-4c8b-ad07-91d752b25add",
        name: "Bích neo sừng bò"
    },
    {
        description: " ",
        idMuseum: "M001",
        nameType:"Phong kiến",
        idObject: "-LTaCm5TbRmVNq0Kx_q2",
        idType: "T007",
        isActivated: "true",
        linkImg: "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/Resized%2F0005%20(Copy).JPG?alt=media&token=12464d22-816c-4cfa-a32b-6ac603257cb3",
        name: "Tay lái tàu"
    },
    {
        description: " ",
        idMuseum: "M001",
        nameType:"Phong kiến",
        idObject: "-LTaCm5TbRmVNq0Kx_q3",
        idType: "T007",
        isActivated: "true",
        linkImg: "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/Resized%2F0006%20(Copy).JPG?alt=media&token=87ba4e26-b477-40aa-9abc-e09e934f7065",
        name: "Còi tàu"
    },
]


export class ArticlesScreen extends Component {
    renderItem = (item) => {
        return (
            <TouchableOpacity 
                onPress={()=>this.props.navigation.push("Info",{data:item})}
                style={{ backgroundColor: 'white', margin: 10, borderRadius: 5 }}>
                <View style={{ backgroundColor: 'white', margin: 15, marginBottom: 5 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500', color: 'black' }}>{item.name}</Text>
                    <View style={{alignItems:'center', justifyContent:'flex-start',flexDirection:'row'}}>
                        <Badge containerStyle={{ backgroundColor: '#393e46' }}>
                            <Text style={{color:'white'}}>{item.nameType}</Text>
                        </Badge>
                    </View>
                   
                </View>
                <View style={styles.imageItem}>
                    <Image
                        source={{ uri: item.linkImg }}
                        style={{ flex: 1 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-evenly', marginBottom: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <Icon name="ios-heart" color="red" size={30} />
                        <Text style={{ color: 'red' }}> 10 </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <Icon name="ios-chatboxes" color="black" size={30} />
                        <Text style={{ color: 'black' }}> 10 </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        {/* <Icon name="ios-heart" color="black" size={30}/>
                        <Text style={{color:'black'}}>10</Text> */}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.push("Menu")}
                        style={styles.touchHeader}>
                        <Icon name="ios-menu" size={30} color="white" />
                    </TouchableOpacity>
                    <View style={styles.viewHeader}>
                        <Text style={styles.textHeader}>Home</Text>
                    </View>
                    <View style={styles.touchHeader}>
                    </View>
                </View>

                <FlatList
                    data={data}
                    keyExtractor={(item) => item.idObject}
                    renderItem={({ item }) => this.renderItem(item)} />
            </View>

        )
    }
}

