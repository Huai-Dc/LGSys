/**
 * 加载中组件
 * @example:  <Loading />
 */
'use strict';
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ProgressBarAndroid,
    Platform,
} from 'react-native';

function Loading(props) {
    return (
        Platform.OS === 'android' ?
            <View style={[styles.container, props.style]}>
                <ProgressBarAndroid styleAttr="Small" color={props.color} />
            </View> :
            <View style={[styles.container, props.style]}>
                <ActivityIndicator color={props.color} />
            </View>
    );
}
Loading.propTypes = {
    style: PropTypes.any,
    color: PropTypes.string,
};
Loading.defaultProps = {
    style: {},
    color: '#999999',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Loading;
