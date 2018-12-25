
import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableNativeFeedback } from "react-native"

export default class List extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={[
                        {key: 'Banner列表'},
                        {key: '栏目列表'},
                        {key: '资讯列表'},
                        {key: '代理商列表'},
                        {key: '单个班级'},
                        {key: '组合班级'},
                        {key: '文字广告'},
                        {key: '图片广告'},
                    ]}
                    renderItem={({item, index}) =>{
                        if (index === 0) {
                            return (
                                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('BannerList')}>
                                    <Text style={styles.item}>{item.key}</Text>
                                </TouchableNativeFeedback>
                            )
                        } else {
                            return (
                                <TouchableNativeFeedback onPress={() => alert('暂未开放')}>
                                    <Text style={styles.item}>{item.key}</Text>
                                </TouchableNativeFeedback>
                            )
                        }
                    }

                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})