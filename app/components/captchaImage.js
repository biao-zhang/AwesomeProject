
import React, { Component } from 'react'
import { Image, TouchableWithoutFeedback } from "react-native"
import { captchatoken } from "../api/sc"

export default class captchaImage extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            imgUrl:'',
            captchaScene:'uc_login',//场景
            captchaType:'RANDOMCODE',//图形验证码类型
            captchaToken:'',
            captchaImage: global.constants.ADMINCAPTCHAIMAGE
        }
    }
    componentDidMount() {
        this._captchatoken()
    }
    _captchatoken () {
        let params ={
            captchaScene: this.state.captchaScene, // 图形验证码场景
            captchaType: this.state.captchaType, // 图形验证码类型
        }

        captchatoken(params).then( res => {
            if(res.result==='000000'){
                this.setState({
                    imgUrl: this.state.captchaImage + '?captchaToken=' + res.data.captchaToken,
                })
                this.props.imgtoken(res.data.captchaToken)
                console.log(this.state.imgUrl)
            }
            console.log('验证码', res)
        })
    }

    handleClick = () => {
        // console.log('普通函数的this', this) // 包裹他的组件，本例中指TouchableWithoutFeedback
        // console.log('箭头函数的this', this) // 指当前组件
        this._captchatoken()
    }
    render = () => {
        return (
            <TouchableWithoutFeedback onPress={this.handleClick}>
                <Image
                    style={this.props.style}
                    resizeMode='contain'
                    // source={require('../images/logo.png')}
                    source={{uri: this.state.imgUrl}}
                />
            </TouchableWithoutFeedback>

        )
    }

}
