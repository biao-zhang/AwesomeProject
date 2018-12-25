
import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage   } from "react-native"
import CaptchaImage from './captchaImage'
import {uclogin} from '../api/uc'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '', // 用户名
            pwd: '',       // 密码
            captcha: '',   // 验证码
            imgtoken: '',
        }
    }
    onPressLearnMore = () => {
        this._uclogin()
    }

    componentWillMount () {
        // console.log('this.state.imgtoken', this.state.imgtoken)
    }
    render = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>优路教育网站联盟后台管理系统</Text>
                <TextInput
                    style={styles.ipt}
                    clearTextOnFocus={true}
                    onChangeText={(userName) => this.setState({userName})}
                    placeholder='请输入用户名'
                />
                <TextInput
                    style={styles.ipt}
                    clearTextOnFocus={true}
                    secureTextEntry={true}
                    onChangeText={(pwd) => this.setState({pwd})}
                    placeholder='请输入密码'
                />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                        style={styles.ipt_capcha}
                        clearTextOnFocus={true}
                        onChangeText={(captcha) => this.setState({captcha})}
                        placeholder='请输入验证码'
                    />
                    <CaptchaImage style={styles.img} imgtoken={val => this.setState({imgtoken: val})}/>
                </View>
                <View style={{width: 300, marginTop: 20}}>
                    <Button
                        onPress={this.onPressLearnMore}
                        title="登录"
                        color="#fc635e"
                        style={styles.btn}
                    />
                </View>
            </View>
        )
    }
    // 登录
    _uclogin = () => {
        let params = {
            userLoginname: this.state.userName,
            userLoginpwd: this.state.pwd,
            captcha: {captchaToken: this.state.imgtoken, captchaValue: this.state.captcha},
        }
        uclogin(params).then( res => {
            if (res.result === '000000') {
                AsyncStorage.setItem('adminToken', res.data.token)
                this.props.navigation.navigate('List')
            } else {
                alert(res.msg)
            }
            console.log('fetch请求登录', res)
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    ipt_capcha: {
        width: 200,
        height: 50,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
    },
    ipt: {
        width: 300,
        height: 50,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
    },
    img: {
        width: 90,
        height: 50,
        marginLeft: 10,
    },
    btn: {
        width: 300,
        marginTop: 20,
    }
});
