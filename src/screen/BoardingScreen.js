import React, {Component} from 'react'
import {StyleSheet, Image} from 'react-native'
import OnBoarding from 'react-native-onboarding-swiper'

const imageStyle = StyleSheet.create({
    boardImage: {
        width: 250,
        height: 250
    }
})

export default class BoardingScreen extends Component {
    render() {
        return(
            <OnBoarding
        pages={[
            {
                backgroundColor: '#27ae60',
                image: <Image style={imageStyle.boardImage} source={require('../../assets/images/boy.png')} />,
                title: 'Temukan teman baru!',
                subtitle: 'Ayo berkenalan dengan orang - orang baru!',
            },
            {
                backgroundColor: '#e67e22',
                image: <Image style={imageStyle.boardImage} source={require('../../assets/images/save.png')} />,
                title: 'Simpan kontaknya!',
                subtitle: 'Tetap stay in touch walau baru kenal!',
            },
        ]}
        onDone = {this._navigateHome}
        onSkip = {this._navigateHome}
    />
        );
    }

    _navigateHome = () => {
        this.props.navigation.navigate('Home')
    }

}