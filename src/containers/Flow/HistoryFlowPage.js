/**
 * Created by sujiexu on 16/8/17.
 */
'use strict';
//import React, {
//    Component,
//    StyleSheet,
//    Text,
//    View,
//    TouchableOpacity,
//} from 'react-native';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

class HistoryFlowPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>HistoryFlowPage</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HistoryFlowPage;
