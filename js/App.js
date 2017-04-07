//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform} from 'react-native';
import { Router, Scene, Actions, Schema } from 'react-native-router-flux';

import * as system from './common/System'
import TabBarItem from './ui/TabBarItem'

import HomeScene from './scene/HomeScene'
import PictureScene from './scene/PictureScene'
import RankingScene from './scene/RankingScene'
import MoreScene from './scene/MoreScene'

import StoryDetailScene from './scene/story/StoryDetailScene'

// create a component
class App extends Component {
    render() {
        return (
            <Router
                titleStyle={styles.navigationBarTitle}
                barButtonIconStyle={styles.navigationBarButtonIcon}
                navigationBarStyle={styles.navigationBarStyle}
                getSceneStyle={this.sceneStyle}
            >

                <Scene
                    initial
                    key='tabBar'
                    tabs
                    tabBarStyle={styles.tabBar}
                    tabBarSelectedItemStyle={styles.tabBarSelectedItem}

                    tabBarSelectedTitleStyle={styles.tabBarSelectedTitle}
                    tabBarUnselectedTitleStyle={styles.tabBarUnselectedTitle}

                    tabBarSelectedImageStyle={styles.tabBarSelectedImage}
                    tabBarUnselectedImageStyle={styles.tabBarUnselectedImage}
                >
                    <Scene
                        key='home'
                        title='逛一逛'
                        component={HomeScene}
                        image={require('./img/item0.png')}

                        icon={TabBarItem}
                    />

                    <Scene
                        key='picture'
                        component={PictureScene}
                        title='真相'
                        image={require('./img/item1.png')}

                        icon={TabBarItem}
                    />
                    <Scene
                        key='ranking'
                        component={RankingScene}
                        title='排行'
                        image={require('./img/item2.png')}

                        icon={TabBarItem}
                    />
                    <Scene
                        key='more'
                        component={MoreScene}
                        title='更多'
                        image={require('./img/item3.png')}

                        icon={TabBarItem}
                    />
                </Scene>

                <Scene key='storyDetail' component={StoryDetailScene} title='糗事详情' hideTabBar clone />
                
            </Router>
        );
    }


    sceneStyle = (props, computedProps) => {
        const style = {
            flex: 1,
            backgroundColor: '#f7f7f7',
            // backgroundColor: '#ffffff',
            shadowColor: null,
            shadowOffset: null,
            shadowOpacity: null,
            shadowRadius: null,
        };
        if (computedProps.isActive) {
            style.marginTop = computedProps.hideNavBar ? (system.isIOS ? 20 : 0) : (system.isIOS ? 64 : 54);
            style.marginBottom = computedProps.hideTabBar ? 0 : 50;
        }
        return style;
    };

}

// define your styles
const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#f4f4f4',
    },
    tabBarSelectedItem: {
        backgroundColor: '#f4f4f4',
    },

    tabBarSelectedTitle: {
        color: '#ff0000',
    },
    tabBarUnselectedTitle: {
        color: '#919292',
    },

    tabBarSelectedImage: {
        tintColor: '#ff0000'
    },
    tabBarUnselectedImage: {
        tintColor: '#919292'
    },

    navigationBarStyle: {
        backgroundColor: '#C30213'
    },
    navigationBarTitle: {
        color: '#ffffff'
    },
    navigationBarButtonIcon: {
        tintColor: '#ffffff'
    },
});

//make this component available to the app
export default App;
