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
import NetImage from '../components/NetImage';
import Button from '../components/Button';
import GlobalData from '../GlobalData';
import { Actions, Toast } from '../modules/adapter';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userNameVal: '',
            userPwdVal: '',
            loading: false,
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
    doLogin() {
        if (this.state.userNameVal === '' || this.state.userPwdVal === '') return;
        this.setState({
            loading: true,
        });
        GlobalData.POST(this.props.companyData.url + '/Account/AjaxMobileLogin', {
            userName: this.state.userNameVal,
            passWord: this.state.userPwdVal,
            // userName: 'admin',
            // passWord: 'MZA3zhengshi@flkl',
        }).then(data => {
            if (data.state === 1) {
                Actions.pop();
                console.log(data);
                GlobalData.user = {
                    userId: data.userId,
                    name: data.name,
                    loginName: data.loginName,
                    server: this.props.companyData.url,
                    logo: this.props.companyData.logo,
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
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <NetImage style={styles.logoImg} url={this.props.companyData.logo} />
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
                    />
                </View>
            </ScrollView>
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
        width: 200,
        height: 120,
        marginTop: 20,
        marginBottom: 10,
        resizeMode: Image.resizeMode.contain,
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
});

export default LoginPage;
