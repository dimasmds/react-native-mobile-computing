import React, { Component } from 'react'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { createStackNavigator, createAppContainer } from "react-navigation";
import BoardingScreen from './src/screen/BoardingScreen'
import HomeScreen from './src/screen/HomeScreen'
import DetailScreen from './src/screen/DetailScreen';


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
      navigationOptions: {
        header: null
      }
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
        header: null
      }
    }
  }
)


const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = { initialLoading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ initialLoading: false });
  }

  render() {
    if (this.state.initialLoading) {
      return <AppLoading />
    }
    return <AppContainer />
  }
}
