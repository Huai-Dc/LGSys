/**
 * Created by sujiexu on 17/5/2.
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet, View,
    ScrollView, Text,
    Image,
} from 'react-native';
import GlobalData from '../../GlobalData';
import pageConfig from '../../pageConfig';
import CompanySysPage from './CompanySysPage';
import Swiper from 'react-native-swiper';
import NewsList from './NewsListPage';

class HomeIndex extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            appNewsList: null,
            appPicList: null,
            loaded: false,
        };
        this.getIndexData = this.getIndexData.bind(this);
    }

    componentDidMount() {
        this.getIndexData();
    }

    getIndexData() {
        return fetch('http://192.168.1.178:9057/Home/HomeIndexJson')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    appNewsList: responseJson.appNewsList,
                    appPicList: responseJson.appPicList,
                    loaded: true,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    renderImg() {
        const imageViews = [];
        const images = this.state.appPicList;
        if (!this.state.loaded) {
            return (
                <View style={styles.loadingBox}>
                    <Text>数据加载中....</Text>
                </View>
            );
        } else if (!images || images.length === 0) {
            return (
                <View style={styles.loadingBox}>
                    <Text>暂无图片</Text>
                </View>
            );
        } else {
            for (let i = 0; i < images.length; i++) {
                imageViews[imageViews.length] = (
                    <Image
                        key={i}
                        style={{ flex: 1 }}
                        source={{ uri: pageConfig.companyServer + images[i].path }}
                    />
                );
            }
            return imageViews;
        }
    }

    renderNews(){

    }

    render() {
        console.log(this.state)
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Swiper
                        height={200}
                        loop={true}
                        index={0}
                        autoplay={true}
                        horizontal={true}
                        paginationStyle={{ bottom: 10 }}
                    >
                        {this.renderImg()}
                    </Swiper>
                </View>
                <NewsList data={ this.state.appNewsList}/>
                <CompanySysPage />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: GlobalData.headerbarHeight,
    },
    loadingBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    newsContent: {
        height: 100,
    },
});

export default HomeIndex;