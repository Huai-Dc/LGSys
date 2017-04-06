/**
 * Created by sujiexu on 16/8/23.
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    ScrollView,
    PixelRatio,
    Dimensions,
} from 'react-native';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import GlobalData from '../../GlobalData';
import { Ionicons, Toast, Modal, Actions } from '../../modules/adapter';
import { refreshFlowData } from '../../actions/pageData.action';
import { connect } from 'react-redux';
import SearchUserComponent from './SearchUserComponent';

class SearchUserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            keyword: '',
            loading: false,
            showModal: false,
            selectedUser: null,
            transmitContent: '',
            btnPending: false,
        };
    }
    handleKeywordChange(keyword) {
        this.setState({
            keyword,
        });
    }
    handleSearch() {
        this.setState({
            loading: true,
            keyword: '',
        });
        GlobalData.GET(GlobalData.user.server + '/home/SearchSysUserList', {
            keyWord: this.state.keyword,
        }).then(data => {
            if (!data.length) {
                Toast.show('没有相关数据!', 1);
            }
            this.setState({
                users: data,
                loading: false,
            });
        }, err => {
            console.log(err);
            this.setState({
                loading: false,
            });
        });
    }
    chooseUser(user) {
        this.setState({
            showModal: true,
            selectedUser: user,
        });
    }

    modalRightButton() {
        return (
            <TouchableOpacity
                style={styles.modalRightButton}
                onPress={() => { this.setState({ showModal: false, transmitContent: '' }); }}>
                <Ionicons name="md-close" size={24} color="#ffffff"/>
            </TouchableOpacity>
        );
    }
    doTransmit() {
        this.setState({
            btnPending: true,
        });
        const data = {
            flowId: this.props.auditData.flowId,
            givenUserId: this.state.selectedUser.userId,
            grantUserId: GlobalData.user.userId,
            remark: this.state.transmitContent,
        };
        console.log(data);
        console.log(this.props.auditData);

        GlobalData.POST({
            data,
            url: this.props.auditData.url,
            // headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        }).then(res => {
            console.log(res);
            if (res.Success) {
                console.log(res);
                this.props.refreshFlowData();
                Actions.popTo('FlowContentPage');
                // Toast.show('操作成功'); // Toast和安卓下键盘出现冲突,在有TextInput和界面跳转时不宜出现页面跳转.
            } else {
                Toast.show('操作失败');
                this.setState({
                    btnPending: false,
                });
            }
        }, err => {
            console.log(err);
            this.setState({
                btnPending: false,
            });
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <SearchUserComponent onSelected={this.chooseUser.bind(this)} />
                {this.state.showModal && (
                    <Modal visible>
                        <Header title="填写转办意见" rightButton={this.modalRightButton.bind(this)} />
                        <View style={styles.modalBox}>
                            <View style={styles.flex}>
                                <View style={{ padding: 10 }}>
                                    <View>
                                        <Text>转办给{this.state.selectedUser.userName}:</Text>
                                    </View>
                                    <TextInput
                                        multiline
                                        placehoder="填写转办意见"
                                        underlineColorAndroid="transparent"
                                        onChangeText={transmitContent => this.setState({ transmitContent })}
                                        value={this.state.text}
                                        style={styles.input}
                                        textAlignVertical="top"
                                    />
                                </View>
                            </View>
                            <View style={styles.bottomBar}>
                                <View style={styles.bottomBarButton}>
                                    <Button disable={this.state.transmitContent === ''} pending={this.state.btnPending} onPress={this.doTransmit.bind(this)} text="确认转办"/>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: GlobalData.headerbarHeight,
    },
    flex: {
        flex: 1,
    },
    searchBar: {
        height: 40,
        flexDirection: 'row',
        padding: 5,
        borderColor: GlobalData.colors.lineLight,
        borderBottomWidth: 1 / PixelRatio.get(),
    },
    searchInput: {
        padding: 3,
        paddingHorizontal: 10,
        flex: 1,
        borderWidth: 1,
        borderColor: GlobalData.colors.lineLight,
        backgroundColor: '#f9f9f9',
        borderRadius: 3,
        height: 30,
        fontSize: 14,
    },
    searchBtn: {
        width: 50,
        height: 30,
        borderRadius: 3,
        marginLeft: 5,
    },
    items: {
        padding: 10,
        backgroundColor: GlobalData.colors.body,
    },
    itemBtn: {
        height: 50,
        borderWidth: 1,
        borderColor: GlobalData.colors.lineLight,
        borderRadius: 5,
        paddingBottom: 10,
        backgroundColor: '#ffffff',
        marginTop: 10,
    },
    item: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        flex: 1,
        fontSize: 18,
    },
    icon: {
        margin: 10,
    },
    bottomBar: {
        height: 50,
        borderColor: GlobalData.colors.iconLight,
        borderTopWidth: 1 / PixelRatio.get(),
        padding: 5,
        paddingLeft: 0,
        flexDirection: 'row',
    },
    bottomBarButton: {
        flex: 1,
        paddingLeft: 5,
    },
    modalBox: {
        flex: 1,
        backgroundColor: '#ffffff',
        width: Dimensions.get('window').width,
    },
    input: {
        marginTop: 5,
        height: 80,
        backgroundColor: '#fafafa',
        textAlignVertical: 'top',
        textAlign: 'left',
        padding: 5,
        borderColor: GlobalData.colors.lineLight,
        borderWidth: 1 / PixelRatio.get(),
    },
    modalRightButton: {
        paddingRight: 10,
        width: 30,
    },
});

export default connect(null, { refreshFlowData })(SearchUserPage);
