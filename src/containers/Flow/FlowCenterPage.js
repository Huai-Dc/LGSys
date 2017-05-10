/**
 * Created by sujiexu on 17/5/9.
 */
import React, { Component } from 'react';
import {
    View, StyleSheet,
} from 'react-native';
import CurrentFlowPage from './CurrentFlowPage';
import HistoryFlowPage from './HistoryFlowPage';
import TabBox from '../../components/TabBox';
import GlobalData from '../../GlobalData';


class FlowCenterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const tabData = [
            {
                title: '待审流程',
                view() {
                    return (
                        <CurrentFlowPage />
                    );
                },
            },
            {
                title: '已审流程',
                view() {
                    return (
                        <HistoryFlowPage />
                    );
                },
            },
        ];
        return (
            <View style={styles.container}>
                <TabBox data={tabData} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: GlobalData.headerbarHeight,
    },
});

export default FlowCenterPage;