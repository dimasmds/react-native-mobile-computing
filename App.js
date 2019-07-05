import React, { Component } from 'react'

import { createStackNavigator, createAppContainer } from "react-navigation";
import BoardingScreen from './src/screen/BoardingScreen'
import HomeScreen from './src/screen/HomeScreen'


const AppNavigator = createStackNavigator(
  {
    Boarding: {
      screen: BoardingScreen,
      navigationOptions: {
        header: null
      }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions:  {
        header: null
      }
    }
  }
)


const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component {

  render() {
    return <AppContainer />
  }
}
