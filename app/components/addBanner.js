import React, { Component } from 'react'
import {StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, Alert} from "react-native"
import ImagePicker from 'react-native-image-picker'

import { advadd } from "../api/cm"
import { upload } from '../api/file'
import fetch from "../api/fetch";
import axios from 'axios'

export default class AddBanner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarSource: null,
            // videoSource: null,
            advboardId: 'ADVBOARD20181024010000000002',
            advName: '',
            advPicpath: '201812/25/15457129861450773.jpg',
            advType: '',
        }
    }
    // 选择图片
    selectPhotoTapped() {
        const options = {
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择照片',
            customButtons: [
                {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high',
            durationLimit: 10,
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.8,
            angle: 0,
            allowsEditing: false,
            noData: false,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });

                // let oMyForm = new FormData()
                //
                // let file = {uri: response.uri, type: 'multipart/form-data', name: 'image.jpg'};   //这里的key(uri和type和name)不能改变,
                // oMyForm.append('file', file)

                // window.fetch('http://192.168.11.207:8093/fileservice/api/file/upload',{
                //     method: 'POST',
                //     headers: {
                //         'Content-Type' : 'multipart/form-data;charset=utf-8'
                //     },
                //     body: oMyForm,
                // }).then( res => res.json())

                // upload(oMyForm).then( res => {
                //     console.log('图片上传', res)
                // })
                // window.fetch('http://192.168.11.207:8093/fileservice/api/file/upload',{
                //     method: 'post',
                //     headers: {
                //         'Content-Type' : 'multipart/form-data'
                //     },
                //     body: oMyForm,
                // }).then( res => res.json())
                //     .then( res => console.log('图片上传', res))

                // axios.post('http://192.168.11.207:8093/fileservice/api/file/upload', oMyForm, {
                //     headers: {
                //         'Content-Type' : 'multipart/form-data'
                //     }
                // }).then(res => console.log('tupianshangchuasn', res.data))
            }
        });
    }
    // 提交
    onPressLearnMore = () => {
        this._advadd()
    }
    // 添加广告
    _advadd () {
        let params = {
            advboardId: this.state.advboardId,
            advName: this.state.advName,
            advLinkurl: '',
            advPicpath: this.state.advPicpath,
            advType: this.state.advType === '图片广告' ? 'T' : 'H',
        }
        console.log('添加广告参数', params)
        console.log('图片', this.state.avatarSource)
        advadd(params).then(res => {
            if(res.result === '000000') {
                Alert.alert(
                    '提示',
                    '添加成功',
                    [
                        {text: 'OK', onPress: () => {
                            this.props.navigation.navigate('BannerList')
                            this.props.navigation.state.params.onSuccess()
                        }},
                    ],
                    { cancelable: false }
                )

            } else {
                alert(res.msg)
            }
            console.log('添加广告', res)
        })
    }
    render () {
        return (
            <View style={styles.container}>
                <View style={styles.agentItem}>
                    <Text style={{marginRight: 5}}>广 告 类 型: </Text>
                    <TextInput
                        style={styles.ipt}
                        clearTextOnFocus={true}
                        onChangeText={(advType) => this.setState({advType})}
                        placeholder='请输入广告类型'
                    />
                </View>
                <View style={styles.agentItem}>
                    <Text style={{marginRight: 5}}>广 告 位 置: </Text>
                    <TextInput
                        style={styles.ipt}
                        clearTextOnFocus={true}
                        value='顶部'
                        editable={false}
                        onChangeText={(userName) => this.setState({userName})}
                        placeholder='请输入广告位置'
                    />
                </View>
                <View style={styles.agentItem}>
                    <Text style={{marginRight: 5}}>广 告 名 称: </Text>
                    <TextInput
                        style={styles.ipt}
                        clearTextOnFocus={true}
                        onChangeText={(advName) => this.setState({advName})}
                        placeholder='请输入广告名称'
                    />
                </View>
                <View style={styles.agentItem}>
                    <Text style={{marginRight: 5}}>上 传 图 片:</Text>
                    <View style={{width: 300, height: 100}}>
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            <View style={[styles.avatar, styles.avatarContainer]}>
                                { this.state.avatarSource === null ? <Text>选择照片</Text> :
                                    <Image style={styles.avatar} source={this.state.avatarSource} />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width: 300, marginTop: 20}}>
                    <Button
                        onPress={this.onPressLearnMore}
                        title="提交"
                        color="#fc635e"
                        style={styles.btn}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    ipt: {
        width: 300,
        height: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        padding: 0,
        paddingLeft: 5,
    },
    agentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        // borderRadius: 50,
        width: 100,
        height: 100
    }
})