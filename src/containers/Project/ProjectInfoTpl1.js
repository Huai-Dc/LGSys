/**
 * Created by sujiexu on 16/8/17.
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
} from 'react-native';

import LoadView from '../../modules/LoadView';
import { connect } from 'react-redux';
import NetImage from '../../components/NetImage';
import SwipeableView from '../../components/SwipeableView';

class ProjectInfoTpl1 extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { pageData } = this.props;

        console.log(pageData);
        if (!pageData.introduce) {
            return (
                <View style={styles.container}>
                    <View style={styles.center}>
                        <Text>暂无数据</Text>
                    </View>
                </View>
            );
        }
        console.log('pageData.imgList', pageData.imgList);
        return (
            <ScrollView style={styles.container}>
                <SwipeableView style={styles.swiperBanner}>
                    {!!pageData.imgList && !!pageData.imgList.length && pageData.imgList.map((item, index) => {
                        return (
                            <View key={index}>
                                <NetImage url={item.src} style={styles.swiperBanner} />
                            </View>
                        );
                    })}
                </SwipeableView>
                <Text style={styles.content}>{pageData.introduce}</Text>
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
    swiperBanner: {
        height: 160,
        width: Dimensions.get('window').width,
    },
    content: {
        padding: 10,
        lineHeight: 20,
    },
});

export default connect()(props => <LoadView view={ProjectInfoTpl1} {...props}/>);
