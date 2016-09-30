/**
 * Created by sujiexu on 16/8/17.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    TouchableHighlight,
    Alert,
    PixelRatio,
    Image,
} from 'react-native';
import Button from '../components/Button';
import GlobalData from '../GlobalData';
import RNFS from 'react-native-fs';
import { Actions, Toast } from '../modules/adapter';
import { clearPageData } from '../actions/pageData.action';
import { connect } from 'react-redux';
import { zttxLogo } from '../assets/assets';
import UmengPush from 'react-native-umeng-push';

class SettingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    doClearCatch() {
        RNFS.unlink(GlobalData.FilePath).then(e => {
            console.log('clear ok', e);
            Toast.show('缓存清除成功!');
        }, e => {
            console.log('clear err', e);
            Toast.show('缓存清除出错!');
        });
    }
    clearCache() {
        Alert.alert(
            '确定清除应用相关缓存文件?',
            '清除缓存文件包括所有流程的相关下载附件,清除后需重新下载才能查看.',
            [
                { text: '立即清除', onPress: this.doClearCatch.bind(this) },
                { text: '暂不清除', onPress: () => {} },
            ]
        );
    }
    logout() {
        console.log('logout');
        AsyncStorage.removeItem(GlobalData.STORAGE_UESER_KEY).then(() => {
            Actions.CompanyIndex({
                type: 'replace',
            });
            GlobalData.user = {};
            this.props.clearPageData();
        }, err => {
            console.log('AsyncStorage error!', err);
        });
    }
    getDeviceToken() {
        // 获取DeviceToken
        UmengPush.getDeviceToken(deviceToken => {
            console.log('deviceToken: ', deviceToken);
            alert('deviceToken: ' + deviceToken);
            alert(deviceToken);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoBox}>
                    <Image source={zttxLogo} style={styles.logo} />
                </View>
                <Text style={styles.p20}>
                    指通天下：高层人士由于工作需要，经常离开办公室，仍然需要掌握各种统计数据，才能够快捷的对需要决策的事情做出及时有效的判断。指通天下将采用特殊的公认机制，在确保数据安全的情况下，将公司经营决策的各种类数据进行合并与归类，推送到高层人士的手机端，协助高层人士对照数据做出各类流程的审批决策。
                </Text>
                <View style={styles.btnContainer}>
                    <Button text="获取DeviceToken" onPress={this.getDeviceToken.bind(this)} />
                    <Button text="清除缓存" onPress={this.clearCache.bind(this)} />
                    <Button
                        style={{ marginTop: 10 }}
                        onPress={this.logout.bind(this)}
                        text="退出当前账号"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: GlobalData.headerbarHeight,
    },
    logoBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 50,
        width: 50,
        marginTop: 30,
    },
    p20: {
        padding: 20,
    },
    btnContainer: {
        padding: 20,
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: '#ddd',
    },
    row: {
        height: 60,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        justifyContent: 'center',
        padding: 10,
    },
    item: {
        marginTop: 20,
        height: 50,
        padding: 5,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
    },
});

export default connect(null, { clearPageData })(SettingPage);
