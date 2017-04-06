//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import StoryCell from './StoryCell'

// create a component
class StoryDetailScene extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StoryCell info={this.props.info}/>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default StoryDetailScene;
