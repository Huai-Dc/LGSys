/**
 *
 * 菜谱百科图片组件
 * @example: <ImageItem data={} />
 */
'use strict';
import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    PixelRatio,
} from 'react-native';

import NetImage from './NetImage';
import Tag from './Tag';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '../modules/adapter';

function ImageItem(props) {
    return (
        <TouchableHighlight underlayColor="#eeeeee" onPress={props.onPress}>
            <View style={styles.ItemBox}>
                <View style={styles.image}><NetImage style={{ width: 80, height: 60 }} url={props.data.image} /></View>
                <View style={styles.info}>
                    <View style={styles.title}><Text>{props.data.title}</Text></View>
                    <Tag text={props.data.tag} style={styles.tag}/>
                    <View style={styles.keys}>
                        <View style={styles.infoLeft}>
                            <Ionicons name="md-pricetag" size={11} color="#ed3712" />
                            <Text style={styles.infoText}>{props.data.cate}</Text>
                        </View>
                        <View style={styles.infoCenter} />
                        <View style={styles.infoRight}>
                            <Ionicons name="ios-heart" size={11} color="#737373" />
                            <Text style={styles.infoText}>{props.data.loved}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
}

ImageItem.defaultProps = {
    data: {
        title: '此处填写标题',
        tag: '百科',
        cate: '健康',
        loved: 0,
        image: '',
    },
};
ImageItem.propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func,
};

const styles = StyleSheet.create({
    ItemBox: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#bbbbbb',
        borderBottomWidth: 1 / PixelRatio.get(),
    },
    image: {
        height: 60,
        width: 80,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    title: {
        height: 16,
        overflow: 'hidden',
    },
    tag: {
        marginTop: 10,
    },
    keys: {
        marginTop: 8,
        flex: 1,
        flexDirection: 'row',
    },
    infoText: {
        fontSize: 10,
        marginLeft: 5,
    },
    infoCenter: {
        flex: 1,
        alignSelf: 'stretch',
    },
    infoLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoRight: {
        width: 40,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
});

export default ImageItem;
