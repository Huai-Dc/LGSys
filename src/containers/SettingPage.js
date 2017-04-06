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
import { xhLogo1 } from '../assets/assets';
import UmengPush from 'react-native-umeng-push';
import InputOfSetPassword from './../components/InputOfSetPassword';
import pageConfig from '../pageConfig';

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
            Toast.show('暂无缓存文件!');
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
            Actions.LoginPage({
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
        //  <Button text="获取DeviceToken" onPress={this.getDeviceToken.bind(this)} />
        UmengPush.getDeviceToken(deviceToken => {
            console.log('deviceToken: ', deviceToken);
            alert('deviceToken: ' + deviceToken);
            alert(deviceToken);
        });
    }
    goGetUser() {
        Actions.NotifyPage({
            title: '选择人员',
        });
    }

    onPasswordChange(passwordData) {
        console.log('password passwordData', passwordData);

        GlobalData.POST(GlobalData.user.server + pageConfig.changeUserPwdData, {
            newPwd: passwordData.newPassword,
            oldPwd: passwordData.oldPassword,
            userId: GlobalData.user.guid,
        }).then((data) => {
            if (data.Success) {
                Alert.alert('提示', '修改成功');
            } else {
                Alert.alert('提示', data.Message);
            }
        }, (data) => {
            Alert.alert('提示', data.Message);
            console.log(data.message);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoBox}>
                    <Image source={xhLogo1} style={styles.logo} />
                </View>
                <Text style={styles.p20}>
                    旭辉设计系统
                </Text>
                <View style={styles.btnContainer}>
                    <Button text="清除缓存" onPress={this.clearCache.bind(this)} />
                    <View style={{ marginTop: 10 }}>
                        <InputOfSetPassword onFinish={this.onPasswordChange.bind(this)} />
                    </View>
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

// <Button text="清除缓存" onPress={this.clearCache.bind(this)} />
// <Button text="搜索用户" onPress={this.goGetUser.bind(this)} />


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
        textAlign: 'center',
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
