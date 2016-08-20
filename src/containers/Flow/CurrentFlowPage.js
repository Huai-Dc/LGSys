/**
 * Created by sujiexu on 16/8/17.
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView,
} from 'react-native';


import LoadView from '../../modules/LoadView';
import pageConfig from '../../pageConfig';
import { connect } from 'react-redux';
import GlobalData from '../../GlobalData';
import { Actions, Ionicons } from '../../modules/adapter';
import ListItem from '../../components/ListItem';

class CurrentFlowPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    renderRow(rowData) {
        return (
            <ListItem
                data={{
                    title: rowData.flowName,
                    subTitle: rowData.projName,
                    date: rowData.StartDate,
                    intro: rowData.StartMan,
                }}
            />
        );
    }
    onEndReached() {

    }
    render() {
        console.log(this.props.pageData);
        const { pageData } = this.props;
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections
                    dataSource={this.ds.cloneWithRows(pageData)}
                    style={styles.list}
                    renderRow={this.renderRow.bind(this)}
                    initialListSize={5}
                    pageSize={15}
                    onEndReachedThreshold={2}
                    onEndReached={this.onEndReached.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default connect(
    state => ({
        pageData: state.getIn(['pageData', pageConfig.flowData.currentFlowKey]) && state.getIn(['pageData', pageConfig.flowData.currentFlowKey]).toJS(),
        userData: state.get('userData'),
    })
)(props => {
    const pageConfigData = {
        pageUrl: 'http://192.168.1.178:9012/home/PeddingDesignChangeList?current=1&loginName=admin&type=2',
        pageKey: pageConfig.flowData.currentFlowKey,
    };
    return (
        <LoadView view={CurrentFlowPage} {...props} {...pageConfigData} />
    );
});
