import React, { Component } from 'react'
import { Image, StyleSheet, Alert } from 'react-native'
import { Container, Header, Content, Right, Left, Body, Text, Title, Card, CardItem, Thumbnail, Button, Item, Input, Icon, Root, Form, Label, View, Toast } from 'native-base'

import { firebaseApp } from '../config/FirebaseConfig'

export default class DetailScreen extends Component {

    state = {
        userData: null,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    }

    componentWillMount() {
        const user = this.props.navigation.getParam("user");
        this.setState({
            userData: user,
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            phone: user.phone
        })
    }

    _saveToFirebase = () => {
        if (this._isNullData([
            this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.phone
        ])) {
            Toast.show({
                text: "Data gak boleh kosong",
                buttonText: "Okay",
                duration: 2000
            })
            return;
        }

        Alert.alert("Alert", "Kamu yakin mau simpan ke database?", [
            {
                text: "No",
                style: "cancel"
            },
            {
                text: "Yes",
                onPress: () => {
                    const userData = {
                        picture: {
                            thumbnail: this.state.userData.picture.thumbnail,
                            large: this.state.userData.picture.large
                        },
                        name: {
                            first: this.state.userData.name.first,
                            last: this.state.userData.name.last,
                        },
                        phone: this.state.userData.phone,
                        email: this.state.userData.email
                    }
                    this._saveData(userData)
                }
            }
        ])
    }

    _saveData = (userData) => {
        if (!this.state.userData.itemId) {
            firebaseApp
                .database()
                .ref("users/")
                .push(userData)
                .then(() => {
                    Toast.show({
                        text: "Success",
                        buttonText: "OK",
                        duration: 3000
                    });
                })
                .catch(error => {
                    Toast.show({
                        text: error,
                        buttonText: "OK",
                        duration: 3000
                    });
                });
        } else {
            firebaseApp
                .database()
                .ref("/users/" + this.state.userData.itemId)
                .update(userData)
                .then(() => {
                    Toast.show({
                        text: "Data Saved",
                        buttonText: "OK",
                        duration: 3000
                    });
                })
                .catch(error => {
                    Toast.show({
                        text: error,
                        buttonText: "OK",
                        duration: 3000
                    });
                });
        }
    }

    _isNullData = (datum) => {
        for (const data of datum) {
            if (data.trim() === '') return true;
        }
        return false;
    }

    render() {
        const { userData, firstName, lastName, email, phone } = this.state;
        return (
            <Container>
                <Header style={{ flexDirection: 'row' }}>
                    <Left style={{ flex: 1 }} />
                    <Body style={{ flex: 1, alignItems: 'center' }}>
                        <Title>Ubah User</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Content padder>
                    <Image source={{ uri: userData.picture.large }} style={styles.image} />
                    <Form>
                        <Item inlineLabel last>
                            <Label style={styles.label}>First Name</Label>
                            <Input value={firstName} onChangeText={firstName => this.setState({ firstName })} style={styles.input} />
                        </Item>
                        <Item inlineLabel last>
                            <Label style={styles.label}>Last Name</Label>
                            <Input value={lastName} onChangeText={lastName => this.setState({ lastName })} style={styles.input} />
                        </Item>
                        <Item inlineLabel last>
                            <Label style={styles.label}>Email</Label>
                            <Input value={email} onChangeText={email => this.setState({ email })} style={styles.input} />
                        </Item>
                        <Item inlineLabel last>
                            <Label style={styles.label}>Phone</Label>
                            <Input value={phone} onChangeText={phone => this.setState({ phone })} style={styles.input} />
                        </Item>
                    </Form>
                    <View style={styles.btnContainer}>
                        <Button bordered style={styles.btnSave} onPress ={this._saveToFirebase}>
                            <Text>Simpan ke Firebase</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center'
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        alignSelf: 'center'
    },
    label: {
        flex: 1
    },
    input: {
        flex: 3
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 16
    },
    btnSave: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: "center"
    }
})