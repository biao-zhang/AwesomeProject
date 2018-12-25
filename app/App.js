import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import './config/global'

import Login from './components/login'
import List from './components/list'
import AddBanner from './components/addBanner'
import BannerList from './components/bannerList'

const AppNavigator = createStackNavigator(
    {
        Login: Login,
        List: List,
        AddBanner: AddBanner,
        BannerList: BannerList,
    },
    {
        initialRouteName: 'Login'
    }
)
const AppContainer = createAppContainer(AppNavigator)


export default class App extends Component {
    constructor(props) {
        super(props)
    }
    render = () => {
        return (
            <AppContainer />
        )
    }
}