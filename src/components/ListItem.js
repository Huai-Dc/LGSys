/**
 * 可带图片 标题 副标题 标签 列表项组件
 */
'use strict';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    PixelRatio,
} from 'react-native';
import GlobalData from '../GlobalData';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '../modules/adapter';

import NetImage from './NetImage';
import Tag from './Tag';


function ListItem2(props) {
    let itemHeight;
    let titleHeight;
    let Image;
    if (props.data.image) {
        itemHeight = 80;
        titleHeight = 50;
        Image = (
            <View style={styles.itemImageBox}>
                <NetImage style={{ width: 80, height: 60 }} url={props.data.image} />
            </View>
        );
    } else {
        itemHeight = 60;
        titleHeight = 30;
        Image = null;
    }
    return (
        <TouchableHighlight overlayColor={GlobalData.colors.pressed} onPress={props.onPress}>
            <View style={styles.item}>
                {Image}
                <View style={[styles.itemInfo]}>
                    <View style={[styles.itemTitle, { height: titleHeight }]}>
                        <Text style={[styles.itemTitleText, { height: titleHeight - 10 }]}>
                            {props.data.title}
                        </Text>
                    </View>
                    <View style={styles.tags}>
                        {!!props.data.intro && <Text>{props.data.intro}</Text>}
                    </View>
                    <View style={styles.tags}>
                        {!!props.data.subTitle && <Text style={styles.itemSubTitle}>{props.data.subTitle}</Text>}
                        {!!props.data.date && <Text style={styles.itemDate}>{props.data.date}</Text>}
                        {!!props.data.tag && <Tag color={props.tagColor} text={props.data.tag}/>}
                    </View>
                </View>
                {props.arrow && (
                    <View style={[styles.itemGo]}>
                        <Ionicons name="ios-arrow-forward" color={GlobalData.colors.iconLight} size={20} />
                    </View>
                )}
            </View>
        </TouchableHighlight>
    );
}
ListItem2.defaultProps = {
    data: {
        title: '此处填写标题',
        subTitle: undefined,
        tag: undefined,
        date: '2011/01/01',
        intro: '此处填写介绍',
        image: 'http://192.168.1.19:9000/appData/p1.jpg',
    },
    arrow: true, // 配置是否显示列表项右侧箭头.
    onPress: () => {},
    tagColor: GlobalData.colors.orange,
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        borderBottomColor: GlobalData.colors.lineStrong,
        borderBottomWidth: 1 / PixelRatio.get(),
        paddingBottom: 5,
    },
    itemImageBox: {
        marginTop: 10,
        width: 90,
    },
    itemInfo: {
        flex: 1,
        overflow: 'hidden',
    },
    itemTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemTitleText: {
        marginTop: 5,
        flex: 1,
        overflow: 'hidden',
        fontSize: 15,
        lineHeight: 20,
        color: GlobalData.colors.fontStrong,
    },
    itemSubTitle: {
        flex: 1,
        fontSize: 12,
        color: GlobalData.colors.fontLight,
    },
    itemDate: {
        fontSize: 12,
        color: GlobalData.colors.fontLight,
    },
    tags: {
        flexDirection: 'row',
        marginTop: 5,
    },
    itemGo: {
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ListItem2;
