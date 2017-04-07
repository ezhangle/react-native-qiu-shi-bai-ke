//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import StoryList from './StoryListScene'
import color from '../../ui/Color'

// create a component
class StoryScene extends Component {
    render() {
        let storyListViews = [];
        for (let i=0; i<this.props.storys.length; i++) {
            let story = this.props.storys[i]
            let storyListView = <StoryList tabLabel={story.title} requestNode={story.node} key={story.node}/>
            storyListViews.push(storyListView)
        }

        return (
            <ScrollableTabView
                tabBarBackgroundColor='#f3f3f3'
                tabBarActiveTextColor='#222222'
                tabBarInactiveTextColor='#555555'
                tabBarTextStyle={styles.tabBarText}
                tabBarUnderlineStyle={styles.tabBarUnderline}
                // renderTabBar={() => <DefaultTabBar style={styles.tabBar}/>}
            >
                {storyListViews}
            </ScrollableTabView>
        );
    }

    renderTabBar() {
        return (
            <View style={styles.tabBar}>

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    // tabBar: {
    //     height: 40,
    // },
    tabBarText: {
        fontSize: 15,
        marginTop: 13,
    },
    tabBarUnderline: {
        backgroundColor: color.theme
    }
});


//make this component available to the app
export default StoryScene;
