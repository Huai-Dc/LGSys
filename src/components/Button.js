/**
 *
 * 按钮组件
 * @example: <Button text="我知道了" onPress={} />
 */
'use strict';
import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

import Loading from './Loading';

function Button(props) {
    if (props.disable) {
        return (
            <View
                style={[styles.button, props.style, { opacity: 0.5 }]}>
                <Text style={[styles.buttonText, props.textStyle]}>{props.text}</Text>
            </View>
        );
    }

    if (props.pending) {
        const pending = {
            position: 'absolute',
            right: 10,
            top: 10,
            width: 20,
            height: 20,
        };
        return (
            <View
                style={[styles.button, props.style, { opacity: 0.8 }]}>
                <Text style={[styles.buttonText, props.textStyle]}>{props.text}</Text>
                <Loading style={pending} color={props.paddingColor} />
            </View>
        );
    }

    return (
        <TouchableHighlight
            onPress={props.onPress}
            underlayColor={props.underlayColor}
            style={[styles.button, props.style]}>
            <Text style={[styles.buttonText, props.textStyle]}>{props.text}</Text>
        </TouchableHighlight>
    );
}

Button.defaultProps = {
    text: '提交',
    style: null,
    textStyle: null,
    underlayColor: '#ef2112',
    disable: false,
    pending: false,
    paddingColor: '#ffffff',
    onPress: () => {
        console.log('button pressed');
    },
};
Button.propTypes = {
    text: PropTypes.string,
    style: PropTypes.any,
    textStyle: PropTypes.object,
    underlayColor: PropTypes.string,
    disable: PropTypes.bool,
    pending: PropTypes.bool,
    paddingColor: PropTypes.string,
    onPress: PropTypes.func,
};

const styles = StyleSheet.create({
    button: {
        height: 40,
        alignSelf: 'stretch',
        backgroundColor: '#ef473a',
        borderColor: '#e42112',
        borderWidth: 1,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    buttonText: {
        color: '#fff',
    },
});

export default Button;
