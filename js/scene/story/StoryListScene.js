//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, RefreshControl, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';

import RefreshListView, { RefreshState } from '../../common/RefreshListView'

import StoryCell from './StoryCell'
import config from '../../common/Config'

const kPageSize = 3;

// create a component
class StoryListScene extends Component {
    constructor(props) {
        super(props)

        this.dataList = [];

        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            page: 0,
        };
    }

    componentDidMount() {
        this.refs.listView.startHeaderRefreshing();
    }

    requestList(isReload: boolean) {
        let page = this.state.page + 1;
        let url = `${config.host}${this.props.requestNode}?page=${page}&count=${kPageSize}`
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                if (isReload) {
                    this.dataList = json.items;
                } else {
                    this.dataList.push(...json.items);
                }

                this.setState({
                    page: page,
                    dataSource: this.state.dataSource.cloneWithRows(this.dataList)
                })

                let footerState = RefreshState.Idle
                if (json.items.count < kPageSize) {
                    footerState = RefreshState.NoMoreData
                }
                this.refs.listView.endRefreshing(RefreshState.Idle)

                console.log('Success!! page:' + page);
            }).catch((error) => {
                console.log('error  ' + error);
                this.refs.listView.endRefreshing(RefreshState.Failure)
            });
    }

    selectRow(rowData) {
        Actions.storyDetail({info: rowData})
    }

    render() {
        return (
            <View style={styles.container}>
                <RefreshListView
                    ref='listView'
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <StoryCell
                            info={rowData}
                            onPress={() => this.selectRow(rowData)}
                        />
                    }
                    onHeaderRefresh={() => this.requestList(true)}
                    onFooterRefresh={() => this.requestList(false)}
                />
            </View>
        );
    }


}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
});

//make this component available to the app
export default StoryListScene;
