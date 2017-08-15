/**
 * Created by sujiexu on 17/5/16.
 */
import React, { Component } from 'react';
import {
    WebView, StyleSheet, View, Text, AlertIOS,
} from 'react-native';
import GlobalData from '../../GlobalData';
import pageConfig from '../../pageConfig';

class MeetList extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        // console.log(GlobalData.user);
        this.state = {
            doMain: 'http://api.meng-zheng.com.cn/',
            indexUrl: '',
            ssoUrl: '',
            loginName: GlobalData.user.loginName,
            // isCpy: 0, // 是否加密
            isLoaded: false,
        };
        console.log(GlobalData.initData);
    }
    // render 调用前初始化数据
    componentWillMount() {
        if (!!GlobalData.initData.doMain) {
            this.setState({
                doMain: GlobalData.initData.doMain,
                indexUrl: GlobalData.initData.indexUrl,
                ssoUrl: GlobalData.initData.ssoUrl,
                isLoaded: true,
            });
        } else {
            GlobalData.GET(pageConfig.getAllData)
                .then()
                .then((data) => {
                    // console.log(data);
                    return JSON.parse(data);
                })
                .then((dataJson) => {
                    // console.log(dataJson);
                    this.setState({
                        // doMain: dataJson.domain,
                        indexUrl: dataJson.indexUrl,
                        ssoUrl: dataJson.ssoUrl,
                        isLoaded: true,
                    });
                });
        }
    }

    render() {
        const getState = this.state;
        // console.log(getState)
        const url = getState.doMain + getState.ssoUrl + '?loginName=' + getState.loginName + '&ReturnUrl=' + getState.indexUrl;
        // const url = 'http://www.58.com';
        // console.log(url);

        return (
            (getState.doMain === '') ? (
                <View style={styles.beCenter}><Text>页面载入中...</Text></View>
            ) : (
            <View style={styles.container}>
                <WebView
                    style={{ backgroundColor: 'gray' }}
                    source={{ uri: url, method: 'GET' }}
                    startInLoadingState={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                    allowsInlineMediaPlayback={true}
                />
            </View>
            )
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        marginBottom: GlobalData.footerbarHeight,
        // paddingTop: 20,
    },
    beCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MeetList;
