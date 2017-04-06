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

import GlobalData from '../../GlobalData';
import SearchUserComponent from './SearchUserComponent';
import Header from '../../components/Header';
import { Modal, Ionicons, Toast, Actions } from '../../modules/adapter';
import { Map } from 'immutable';
import Button from '../../components/Button';
import { refreshFlowData } from '../../actions/pageData.action';
import { connect } from 'react-redux';

class NotifyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSelectModal: false,
            selectedUsers: Map({}),
            remark: '',
        };
    }
    onUserSelected(selectedUser) {
        this.setState({
            selectedUsers: this.state.selectedUsers.set(selectedUser.userId, selectedUser),
            userSelectModal: false,
        });
    }
    modalRightButton() {
        return (
            <TouchableOpacity
                style={styles.modalRightButton}
                onPress={() => { this.setState({ userSelectModal: false }); }}>
                <Ionicons name="md-close" size={24} color="#ffffff"/>
            </TouchableOpacity>
        );
    }
    showModal(){
        this.setState({
            userSelectModal: !this.state.userSelectModal,
        });
    }
    doTransmit() {
        this.setState({
            btnPending: true,
        });
        const data = {
            flowId: this.props.auditData.flowId,
            givenUserIds: Object.keys(this.state.selectedUsers.toObject()).join(','),
            grantUserId: GlobalData.user.userId,
            remark: this.state.remark,
        };
        console.log(data);

        GlobalData.POST({
            data,
            url: this.props.auditData.url,
            // headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        }).then(res => {
            console.log('resresres', res);
            if (res.Success) {
                console.log(res);
                this.props.refreshFlowData();
                this.setState({
                    btnPending: false,
                });
                Actions.popTo('FlowContentPage');
                // Toast.show('操作成功'); // Toast和安卓下键盘出现冲突,在有TextInput和界面跳转时不宜出现页面跳转.
            } else {
                Toast.show('操作失败');
                this.setState({
                    btnPending: false,
                });
            }
        }, err => {
            console.log('errerrerrerr', err);
            this.setState({
                btnPending: false,
            });
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flex}>
                    <View>
                        <Text>填写知会意见:</Text>
                    </View>
                    <TextInput
                        multiline
                        underlineColorAndroid="transparent"
                        onChangeText={remark => this.setState({ remark })}
                        value={this.state.remark}
                        style={styles.input}
                        textAlignVertical="top"
                    />
                    <View style={styles.usersBox}>
                        {this.state.selectedUsers.map((userData, userId) => {
                            return (
                                <View key={userId} style={styles.userItem}><Text style={styles.userItemText}>{userData.userName}</Text></View>
                            );
                        }).toArray()}
                    </View>
                    <TouchableOpacity
                        style={styles.addUserButton}
                        onPress={this.showModal.bind(this)}>
                        <View style={styles.addUserButtonText}>
                            <Ionicons name="md-add" size={20} color="#999999"/>
                            <Text style={{ marginLeft: 10 }}>选择知会人员</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomBar}>
                    <View style={styles.bottomBarButton}>
                        <Button disable={this.state.remark === '' || this.state.selectedUsers.isEmpty()} pending={this.state.btnPending} onPress={this.doTransmit.bind(this)} text="确认知会"/>
                    </View>
                </View>

                {!!this.state.userSelectModal && (
                    <Modal visible>
                        <Header title="搜索人员" rightButton={this.modalRightButton.bind(this)} />
                        <View style={styles.modalBox}>
                            <SearchUserComponent onSelected={this.onUserSelected.bind(this)} />
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
    modalBox: {
        flex: 1,
        backgroundColor: '#ffffff',
        width: Dimensions.get('window').width,
    },
    flex: {
        flex: 1,
        padding: 10,
    },
    modalRightButton: {
        paddingRight: 10,
        width: 30,
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
    addUserButton: {
        alignItems: 'center',
        marginTop: 10,
    },
    addUserButtonText: {
        width: 150,
        borderRadius: 20,
        height: 30,
        borderColor: GlobalData.colors.lineStrong,
        borderWidth: 1 / PixelRatio.get(),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    usersBox: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    userItem: {
        borderRadius: 15,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: GlobalData.colors.mainLight,
        paddingHorizontal: 10,
        marginRight: 10,
        marginBottom: 5,
    },
    userItemText: {
        color: '#ffffff',
    },
});

// export default NotifyPage;
export default connect(null, { refreshFlowData })(NotifyPage);
