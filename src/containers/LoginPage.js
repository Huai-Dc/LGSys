/**
 * Created by sujiexu on 16/8/27.
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    ScrollView,
    Image,
    AsyncStorage,
} from 'react-native';
import Button from '../components/Button';
import pageConfig from '../pageConfig';
import GlobalData from '../GlobalData';
import { Actions, Toast } from '../modules/adapter';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userNameVal: '',
            userPwdVal: '',
            loading: false,
            loginUrl: null,
        };
    }
    setUserName(text) {
        this.setState({
            userNameVal: text,
        });
    }
    setUserPwd(text) {
        this.setState({
            userPwdVal: text,
        });
    }
    setLoginUrl() {
        GlobalData.GET(pageConfig.getAllData)
            .then()
            .then((data) => {
                // console.log(data);
                return JSON.parse(data);
            })
            .then((dataJson) => {
                console.log(dataJson);
                this.setState({
                    loginUrl: dataJson.url,
                });
                GlobalData.initData = {
                    customerCode: dataJson.customerCode,
                    doMain: dataJson.domain,
                    indexUrl: dataJson.indexUrl,
                    isActive: dataJson.isActive,
                    name: dataJson.name,
                    ssoUrl: dataJson.ssoUrl,
                    type: dataJson.type,
                    underTable: dataJson.underTable,
                    url: dataJson.url,
                };
            });
    }

    componentWillMount() {
        this.setLoginUrl();
    }
    doLogin() {
        if (this.state.userNameVal === '' || this.state.userPwdVal === '') return;
        this.setState({
            loading: true,
        });
        if (this.state.loginUrl) {
            GlobalData.POST(pageConfig.companyServer + this.state.loginUrl, {
                userName: this.state.userNameVal,
                passWord: this.state.userPwdVal,
            }).then(data => {
                if (data.state === 1) {
                    GlobalData.user = {
                        userId: data.userId,
                        name: data.name,
                        loginName: data.loginName,
                        server: pageConfig.companyServer,
                        guid: data.guid,
                    };
                    AsyncStorage.setItem(GlobalData.STORAGE_UESER_KEY, JSON.stringify(GlobalData.user)).then(() => {
                        Actions.Main({
                            type: 'replace',
                        });
                    }, err => {
                        console.log('AsyncStorage error!', err);
                        this.setState({
                            loading: false,
                        });
                    });
                } else {
                    Toast.show(data.Message);
                    this.setState({
                        loading: false,
                    });
                }
            }, err => {
                console.log('got en error!', err);
                this.setState({
                    loading: false,
                });
            });
        } else {
            Toast.show('数据初始化中,请稍后重试!');
        }
    }
    render() {
        return (
            <Image source={require('../assets/images/backgroundimage.png')} style={styles.bgImage}>
                <ScrollView>
                    <View style={styles.container}>
                        <Image style={styles.logoImg} source={require('../assets/images/login_banner.png')} />
                        <View style={styles.inputBorder}>
                            <TextInput
                                autoFocus
                                underlineColorAndroid="transparent"
                                style={styles.input}
                                placeholder="请输入用户名"
                                ref="userNameInp"
                                onChangeText={this.setUserName.bind(this)}
                                onEndEditing={() => { this.refs.userPwdInp.focus(); }}
                            />
                        </View>
                        <View style={styles.inputBorder}>
                            <TextInput
                                password
                                ref="userPwdInp"
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                                style={styles.input}
                                placeholder="请输入密码"
                                onChangeText={this.setUserPwd.bind(this)}
                                onEndEditing={this.doLogin.bind(this)}
                            />
                        </View>
                        <Button
                            pending={this.state.loading}
                            onPress={this.doLogin.bind(this)}
                            style={{ marginTop: 20 }}
                            disable={this.state.userNameVal === '' || this.state.userPwdVal === ''}
                            text={'登录'}
                        />
                    </View>
                </ScrollView>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: GlobalData.headerbarHeight,
        padding: 10,
    },
    logoImg: {
        width: 250,
        height: 150,
        marginTop: 20,
        marginBottom: 10,
        resizeMode: Image.resizeMode.contain,
        backgroundColor: 'transparent',
    },
    inputBorder: {
        marginTop: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#fff',
        height: 40,
        alignSelf: 'stretch',
    },
    input: {
        height: 40,
        alignSelf: 'stretch',
        padding: 10,
    },
    button: {
        height: 40,
        alignSelf: 'stretch',
        backgroundColor: '#ef473a',
        borderColor: '#e42112',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgImage: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        resizeMode: 'stretch',
        width: null,
        height: null,
    },
});

export default LoginPage;
