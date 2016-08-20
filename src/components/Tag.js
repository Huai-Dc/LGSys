/**
 * 标签组件
 */
'use strict';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
} from 'react-native';
import GlobalData from '../GlobalData';

function Tag(props) {
    return (
        <View style={[styles.tag, props.style, { borderColor: props.color }]}>
            <Text style={[styles.tagText, { color: props.color }]}>{props.text}</Text>
        </View>
    );
}

Tag.defaultProps = {
    text: '标签文本',
    color: GlobalData.colors.orange,
};

const styles = StyleSheet.create({
    tag: {
        borderStyle: 'solid',
        borderWidth: 1 / PixelRatio.get(),
        borderRadius: 3,
        padding: 2,
        width: 30,
    },
    tagText: {
        fontSize: 8,
        textAlign: 'center',
    },
});

export default Tag;
