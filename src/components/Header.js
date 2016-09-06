/**
 * 头部
 */
'use strict';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
} from 'react-native';

import GlobalData from '../GlobalData';

function Header(props) {
    const navBar = Platform.OS === 'android' ? styles.navBarAndroid : styles.navBarIos;
    const title = typeof props.title === 'function' ? props.title() : (<Text style={styles.navBarText}>{props.title}</Text>);
    return (
        <View style={navBar}>
            <View style={styles.navBarLeftButton}>
                {props.leftButton()}
            </View>
            <View style={styles.narBarTitle}>
                {title}
            </View>
            <View style={styles.navBarRightButton}>
                {props.rightButton()}
            </View>
        </View>
    );
}

Header.defaultProps = {
    title: '默认标题',
    rightButton() {
        return null;
    },
    leftButton() {
        return null;
    },
};

const styles = StyleSheet.create({
    navBarIos: {
        height: 60,
        paddingTop: 15,
        backgroundColor: GlobalData.colors.main,
        flexDirection: 'row',
    },
    navBarAndroid: {
        height: 50,
        backgroundColor: GlobalData.colors.main,
        flexDirection: 'row',
    },
    narBarTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarRightButton: {
        padding: 10,
        paddingRight: 0,
    },
    navBarText: {
        color: '#ffffff',
        fontSize: 16,
    },
    navBarLeftButton: {
        padding: 10,
    },
});

export default Header;
