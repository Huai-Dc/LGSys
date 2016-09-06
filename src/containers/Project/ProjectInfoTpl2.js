/**
 * Created by sujiexu on 16/8/17.
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    ScrollView,
} from 'react-native';

import LoadView from '../../modules/LoadView';
import { connect } from 'react-redux';
import GlobalData from '../../GlobalData';

class ProjectInfoTpl2 extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { pageData } = this.props;
        if (!pageData.data.length) {
            return (
                <View style={styles.container}>
                    <View style={styles.center}>
                        <Text>暂无数据</Text>
                    </View>
                </View>
            );
        }
        return (
            <ScrollView style={styles.container}>
                {pageData.data.map((item, index) => {
                    return (
                        <View key={index} style={styles.item}>
                            <View style={styles.itemKey}><Text style={styles.itemKeyText}>{item.key}</Text></View>
                            <View style={styles.itemValue}><Text style={styles.itemValueText}>{item.value}</Text></View>
                        </View>
                    );
                })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: GlobalData.colors.lineLight,
        padding: 10,
    },
    itemKey: {
        width: 80,
    },
    itemKeyText: {
        color: GlobalData.colors.fontLight,
    },
    itemValue: {
        flex: 1,
    },
    itemValueText: {

    },
});

export default connect()(props => <LoadView view={ProjectInfoTpl2} {...props}/>);
