/**
 * 网络错误提示组件
 */
'use strict';
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '../modules/adapter';
import GlobalData from '../GlobalData';

function NetError(props) {
    return (
        <TouchableOpacity onPress={props.reConnect} style={[styles.container, props.style]}>
            <FontAwesome name="wifi" size={90} color="#cccccc"/>
            <Text style={styles.title}>{props.errorMessage}</Text>
            <Text style={styles.content}>点击屏幕重试</Text>
        </TouchableOpacity>
    );
}

NetError.defaultProps = {
    reConnect: () => {
        console.log('点击重新连接');
    },
    errorMessage: '网络不可用',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: GlobalData.colors.fontStrong2,
        fontSize: 18,
    },
    content: {
        color: GlobalData.colors.fontStrong,
        fontSize: 16,
        marginTop: 5,
    },
});

module.exports = NetError;
export default NetError;
