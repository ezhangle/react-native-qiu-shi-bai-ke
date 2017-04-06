//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import StoryScene from './story/StoryScene'

// create a component
class PictureScene extends Component {
    render() {
        let storys = [
            {
                title: '硬菜',
                node: 'article/list/imgrank'
            },
            {
                title: '时令',
                node: 'article/list/images'
            }
        ]
        return (
            <StoryScene storys={storys} />
        )
    }
}

//make this component available to the app
export default PictureScene;
