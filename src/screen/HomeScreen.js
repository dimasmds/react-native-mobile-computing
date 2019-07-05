import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'


export default class HomeScreen extends Component {

    _titleCase = (name) => {
        name = name.toLowerCase().split(' ');
        let final = [];

        for(let word of name) {
            final.push(word.charAt(0).toUpperCase() + word.slice(1));
        }

        return final.join(' ')
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            error: null,
            refreshing: false
        }
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const { page } = this.state;
        const url = `https://randomuser.me/api/?page=${page}&results=20&nat=US`;
        this.setState({ loading: true })
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    data: page === 1 ? response.results : [...this.state.data, ...results.results],
                    error: response.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({
                    error,
                    loading: false
                });
            });
    }

    keyExtractor = (item, index) => index.toString()
    
    renderItem = ({ item }) => (
        <ListItem
            roundAvatar
            title={`${this._titleCase(item.name.first)} ${this._titleCase(item.name.last)}`}
            subtitle={item.phone}
            leftAvatar= {
                <Avatar
                    rounded
                    source={{
                        uri: `${item.picture.thumbnail}`
                    }}
                />
            }
        />
    )



    render() {
        return (
            <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.data}
                renderItem={this.renderItem}
            />
        );
    }
}