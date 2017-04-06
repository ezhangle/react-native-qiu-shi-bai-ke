//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import StoryScene from './story/StoryScene'

// create a component
class HomeScene extends Component {
    render() {
        let storys = [
            {
                title: '干货',
                node: 'article/list/suggest'
            },
            {
                title: '嫩草',
                node: 'article/list/latest'
            }
        ]
        return (
            <StoryScene storys={storys} />
        )
    }
}

//make this component available to the app
export default HomeScene;
