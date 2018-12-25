import React, { Component } from 'react'
import {StyleSheet, Text, View, FlatList, Button, Image} from "react-native"

import { advlist } from "../api/cm"

export default class BannerList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrBanner: [],
        }
    }
    componentDidMount () {
        this._advlist()
    }
    _advlist = () => {
        let params = {}
        advlist(params).then( res => {
            if (res.result === '000000') {
                this.setState({arrBanner: res.data.datas})
            }
            console.log('banner列表', res)
        })
    }
    render () {
        return (
            <View>
                <View style={{alignItems: 'center'}}>
                    <Button
                        onPress={() => this.props.navigation.navigate('AddBanner',{onSuccess: () => this._advlist()})}
                        title="添加banner广告"
                        color="#fc635e"
                        style={styles.btn}
                    />
                </View>
                <View style={styles.content}>
                    <FlatList
                        data={this.state.arrBanner}
                        renderItem={({item}) => (
                            <View style={styles.detail}>
                                <Image
                                    style={styles.image}
                                    resizeMode='contain'
                                    source={{uri: global.constants.FILE_IMGSRC + item.advPicpath}}
                                />
                                <View style={{marginLeft: 15}}>
                                    <View style={styles.detail_title}>
                                        <Text style={{marginRight: 10}}>广告名称:</Text>
                                        <Text>{item.advName}</Text>
                                    </View>
                                    <View style={styles.detail_title}>
                                        <Text style={{marginRight: 10}}>广告位置:</Text>
                                        <Text>{item.ADVBOARDNAME}</Text>
                                    </View>
                                    <View style={styles.detail_title}>
                                        <Text style={{marginRight: 10}}>广告类型:</Text>
                                        <Text>{item.advType === 'T' ? '图片广告' : '幻灯广告'}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        padding: 15,
    },
    image: {
        width: 150,
        height: 150,
    },
    detail: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center'
    },
    detail_title: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    btn: {
        marginTop: 20,
    }
})