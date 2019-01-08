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
import { objectsRef,FirebaseAuth } from '../../configs'
import { ImageProgress } from '../../components'
import AwesomeAlert from "react-native-awesome-alerts";

export class ArticlesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true,
            uid : FirebaseAuth.currentUser ? FirebaseAuth.currentUser.uid : ""
        }
    }
    checkUserFavo = (data) => {
        if(!data) return false
        if (data.userFavo.indexOf(this.state.uid) != -1)
          return true
        return false
        
    }

    renderItem = (item) => {
        if(item.isActivated=="true")
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.push("Info", { data: item.key })}
                style={{ backgroundColor: 'white', margin: 10, borderRadius: 5 }}>
                <View style={{ backgroundColor: 'white', margin: 15, marginBottom: 5 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500', color: 'black' }}>{item.name}</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <Badge containerStyle={{ backgroundColor: '#393e46' }}>
                            <Text style={{ color: 'white' }}>{item.nameType}</Text>
                        </Badge>
                    </View>

                </View>
                <View style={styles.imageItem}>
                    <ImageProgress
                        source={{ uri: item.linkImg }}
                        style={{ flex: 1 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-evenly', marginBottom: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <Icon name="ios-heart" color={this.checkUserFavo(item)?"red":"black"} size={30} />
                        <Text style={{color:'black'}}>  {item.userFavo.length}</Text> 
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <Icon name="ios-chatboxes" color="black" size={30} />
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
                    removeClippedSubviews
                    disableVirtualization
                    data={this.state.data}
                    keyExtractor={(item) => item.idObject}
                    renderItem={({ item }) => this.renderItem(item)} />
                <AwesomeAlert
                    show={this.state.isLoading}
                    showProgress={true}
                    title="Loading !"
                    message="Please wait ..."
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={false}
                />
            </View>

        )
    }

    componentDidMount() {
        objectsRef.on('value', (child) => {
            let data = []
            child.forEach((item) => {
                // console.log("ITEM", item.toJSON())
                let da = item.toJSON()
                da.key = item.key
                if(da.userFavo)
                {
                    console.log("Obj",Object.keys(da.userFavo))
                    da.userFavo = Object.keys(da.userFavo)
                }
                else 
                {
                    da.userFavo = []
                }
                data.push(da)
            })
            this.setState({
                data: data,
                isLoading: false
            },()=>console.log("UPdated", this.state.data))
        }, (err) => {
            console.log("Errr Home", err)
            alert.show(err)
            this.setState({
                // data:data,
                isLoading: false
            })
        })
    }
}

