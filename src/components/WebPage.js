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
    WebView,
} from 'react-native';
import GlobalData from '../GlobalData';

function WebPage(props) {
    // console.log(props);
    return (
        <View style={styles.container}>
            <WebView
                javaScriptEnabled
                domStorageEnabled
                startInLoadingState
                style={styles.webView}
                source={{ uri: props.url }}
                decelerationRate="normal"
            />
        </View>
    );
}
WebPage.propTypes = {
    style: PropTypes.any,
    color: PropTypes.string,
};
WebPage.defaultProps = {
    style: {},
    color: '#999999',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webView: {
        marginTop: GlobalData.headerbarHeight,
        flex: 1,
    },
});

export default WebPage;
