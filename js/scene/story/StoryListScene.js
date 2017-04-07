//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, RefreshControl, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';

import RefreshListView, { RefreshState } from '../../ui/RefreshListView'
import ListRequest from '../../common/ListRequest'

import StoryCell from './StoryCell'

// create a component
class StoryListScene extends Component {
    constructor(props) {
        super(props)

        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = {
            dataSource: ds.cloneWithRows([]),
            page: 0,
        };

        this.listRequest = new ListRequest(this.props.requestNode)
        this.listRequest.onSuccess = () => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.listRequest.dataList)
            })
            let footerState = this.listRequest.noMoreData ? RefreshState.NoMoreData : RefreshState.Idle
            this.refs.listView.endRefreshing(footerState)
        }
        this.listRequest.onFailure = () => {
            this.refs.listView.endRefreshing(RefreshState.Failure)
        }
    }

    componentDidMount() {
        this.refs.listView.startHeaderRefreshing();
    }

    selectRow(rowData) {
        Actions.storyDetail({ info: rowData })
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
                    onHeaderRefresh={() => this.listRequest.requestFirstPage()}
                    onFooterRefresh={() => this.listRequest.requestNextPage()}
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
});

//make this component available to the app
export default StoryListScene;
