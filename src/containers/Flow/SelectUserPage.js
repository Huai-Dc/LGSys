/**
 * Created by sujiexu on 16/8/17.
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    PixelRatio,
    Dimensions,
    TextInput,
    ListView,
} from 'react-native';

import LoadView from '../../modules/LoadView';
import pageConfig from '../../pageConfig';
import { connect } from 'react-redux';
import GlobalData from '../../GlobalData';
import { Actions, Modal, Ionicons, Toast } from '../../modules/adapter';
import SelectUserItemComponent from './SelectUserItemComponent';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { refreshFlowData } from '../../actions/pageData.action';

class SelectUserPage extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.data = props.pageData.list.slice();
        this.state = {
            dataSource: this.ds.cloneWithRows(this.data),
            selectedUser: {},
            showModal: false,
            transmitContent: '',
            loading: false,
        };
    }

    toggleChildren(index) {
        this.data = [
            ...this.data.slice(0, Number(index)),
            { ...this.data[index], itemVisible: !this.data[index].itemVisible },
            ...this.data.slice(Number(index) + 1),
        ];
        this.setState({
            dataSource: this.ds.cloneWithRows(this.data),
        });
    }
    selectUser(user) {
        const { userId } = user;
        console.log(userId, userId);
        if (this.state.selectedUser[userId]) {
            delete this.state.selectedUser[userId];
            this.setState({
                selectedUser: { ...this.state.selectedUser },
            });
        } else {
            this.state.selectedUser[userId] = user;
            this.setState({
                selectedUser: { ...this.state.selectedUser },
            });
        }
    }

    renderRow(item, sectionID, rowID) {
        return (
            <SelectUserItemComponent
                toggleChildren={this.toggleChildren.bind(this, rowID)}
                selectUser={this.selectUser.bind(this)}
                selectedUser={this.state.selectedUser}
                data={item}
            />
        );
    }
    confirmUser() {
        this.setState({
            showModal: true,
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
        const { auditData } = this.props;
        this.setState({
            loading: true,
        });
        
        let flowPosUserStr = '';
        for (const i in this.state.selectedUser) {
            flowPosUserStr += this.state.selectedUser[i].flowPosId + '|Y|' + this.state.selectedUser[i].userId + '|H|';
        }
        const url = GlobalData.user.server +  auditData.url
        const data = {
            flowPosUserStr, // 选择的流程部门和负责人的字符串（格式：flowPosId|Y|userId|H|flowPosId|Y|userId|H|…）
            flowId: auditData.flowId, // 流程ID
            flowInstanceId: auditData.flowInstanceId, // 流程实例ID
            curStepId: auditData.stepId, // 当前步骤ID
        };
        console.log(url);
        console.log(data);

        GlobalData.POST({
            data,
            url,
            // headers: { 'Content-Type': 'application/x-www-form-urlencoded;' },
        }).then(res => {
            console.log(res);
            if (res.Success) {
                console.log(res);
                Actions.popTo('FlowContentPage');
                this.props.refreshFlowData();
                Toast.show('操作成功');
            } else {
                Toast.show('操作失败');
                this.setState({
                    loading: false,
                });
            }
        }, err => {
            this.setState({
                loading: false,
            });
            console.log(err);
        });
    }
    render() {
        this.currentTime = new Date();
        return (
            <View style={styles.container}>
                <ListView
                    removeClippedSubviews
                    dataSource={this.state.dataSource}
                    style={styles.list}
                    renderRow={this.renderRow.bind(this)}
                    initialListSize={15}
                    pageSize={12}
                />
                <View style={styles.bottomBar}>
                    <View style={styles.bottomBarButton}>
                        <Button
                            disable={!Object.keys(this.state.selectedUser).length}
                            onPress={this.confirmUser.bind(this)}
                            text={`确定人选(${Object.keys(this.state.selectedUser).length})`}
                        />
                    </View>
                </View>
                {this.state.showModal && (
                    <Modal visible>
                        <Header title="填写会签意见" rightButton={this.modalRightButton.bind(this)} />
                        <View style={styles.modalBox}>
                            <View style={styles.flex}>
                                <View style={{ padding: 10 }}>
                                    <TextInput
                                        multiline
                                        placehoder="填写会签意见"
                                        underlineColorAndroid="transparent"
                                        onChangeText={transmitContent => this.setState({ transmitContent })}
                                        value={this.state.text}
                                        style={styles.input}
                                        textAlignVertical="top"
                                    />
                                    <View style={styles.mt10}>
                                        <Text>相关人员:</Text>
                                    </View>
                                    {Object.keys(this.state.selectedUser).map((key, index) => {
                                        const user = this.state.selectedUser[key];
                                        return (
                                            <View key={index}>
                                                <Text>{user.department} - {user.name}</Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                            <View style={styles.bottomBar}>
                                <View style={styles.bottomBarButton}>
                                    <Button disable={this.state.transmitContent === ''} pending={this.state.loading} onPress={this.doTransmit.bind(this)} text="确认"/>
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
    list: {
        flex: 1,
        overflow: 'hidden',
    },
    bottomBar: {
        height: 50,
        borderColor: GlobalData.colors.iconLight,
        borderTopWidth: 1 / PixelRatio.get(),
        padding: 5,
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
    mt10: {
        marginTop: 10,
    },
});

// export default connect()(props => <LoadView view={SelectUserPage} {...props}/>);
export default connect(
    state => ({
        pageData: state.getIn(['pageData', pageConfig.SelectUserPage.pageKey]) && state.getIn(['pageData', pageConfig.SelectUserPage.pageKey]).toJS(),
        userData: state.get('userData'),
    }),
    { refreshFlowData }
)(props => {
    const pageConfigData = {
        // pageUrl: 'http://192.168.1.178:9012/Home/GetFlowPosition?flowInstanceId=3985',
        pageUrl: GlobalData.user.server + '/Home/GetFlowPosition?flowInstanceId=' + props.auditData.flowInstanceId,
        pageKey: pageConfig.SelectUserPage.pageKey,
    };
    return (
        <LoadView view={SelectUserPage} {...props} {...pageConfigData} />
    );
});
