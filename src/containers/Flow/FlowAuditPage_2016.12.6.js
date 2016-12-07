/**
 * Created by sujiexu on 16/8/27.
 */
'use strict';
import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions,
    PixelRatio,
    Platform,
} from 'react-native';

import Button from '../../components/Button';
import GlobalData from '../../GlobalData';
import Loading from '../../components/Loading';
import { Actions, Toast, Modal } from '../../modules/adapter';
import pageConfig from '../../pageConfig';
import { refreshFlowData } from '../../actions/pageData.action';
import { connect } from 'react-redux';

class FlowAuditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: '',
            loading: false,
        };
    }
    showMoreActionButtons() {
        this.setState({
            showActionButtons: !this.state.showActionButtons,
        });
    }
    doAction(action) {
        let url;
        let data;
        const { pageData } = this.props;
        const flowData = {
            flowId: pageData.flowId, // 流程ID
            flowInstanceId: pageData.flowInstanceId, // 流程实例ID
            stepId: pageData.stepId, // 当前步骤ID
            content: this.state.commentText, // 审批意见
            actId: action.actId, // 动作ID（取通过的actId）
        }
        switch (action.type) {
            case 1:// 会签确认
                url = '/Home/DoAction';
                data = {
                    ...flowData,
                    attitude: 1,  // 动作的属性值：1（已阅2，通过1，不通过0）。
                }
                break;
            case 2: //  通过/提交
                url = '/Home/DoAction';
                data = {
                    ...flowData,
                    attitude: 1, // 动作的属性值：1（已阅2，通过1，不通过0）。
                }
                break;
            case 3: //  驳回
                url = '/Home/DoAction';
                data = {
                    ...flowData,
                    attitude: 0, // 动作的属性值：1（已阅2，通过1，不通过0）。
                }
                break;
            case 4: // 集团驳回
                url = '/Home/DoAction';
                data = {
                    ...flowData,
                    attitude: 0, // 动作的属性值：1（已阅2，通过1，不通过0）。
                }
                break;
            case 5: // 交办/转办
                // $state.go('eventmenu.transmit',{flowInstanceId: $scope.item.flowInstanceId, flowId:$scope.item.flowId})
                // $scope.modal.hide();

                console.log(data);
                url = GlobalData.user.server + '/Home/TurnOnToUser/' + flowData.flowInstanceId
                Actions.SearchUserPage({
                    auditData: { ...flowData, url },
                });
                return;
            case 6: // 阅读完毕确认

                url = '/Home/CirculateComplete/' + $scope.item.flowInstanceId;
                data = {
                    // flowId: $scope.item.flowId, // '<%=flowId %>',
                    // remark: $scope.item.remark, // remark,
                    // stepId: $scope.item.stepId // stepId
                }
                break;
            case 7: // 终止
                url = '/Home/ForceCompleteInstance/'
                data = {
                    ...flowData,
                }
                break;
            case 8: // 已阅
                url = '/Home/DoAction'
                data = {
                    ...flowData,
                    attitude: 2, // 动作的属性值：本功能选择2（已阅2，通过1，不通过0）。
                }
                break;
            case 9: //  继续

                url = '/Home/DoAction'
                data = {
                    ...flowData,
                    attitude: 0, // 动作的属性值：0
                }
                break;
            case 10: // 当前会签

                url = '/Home/AddCounterSignStep';
                data = {
                    ...flowData,
                    url,
                    typeName: '会签',
                }
                Actions.SelectUserPage({
                    title: '选择会签人员',
                    auditData: data,
                })
                return;
            case 11: // 加签
                url = '/Home/AddAuditStep';
                data = {
                    ...flowData,
                    url,
                    typeName: '加签',
                }
                console.log(data);
                Actions.SelectUserPage({
                    title: '选择加签人员',
                    auditData: data,
                })
                return;
            case 12: // 回退
                url = '/Home/BackSpaceAction';
                data = {
                    ...flowData,
                    attitude: 0, // 动作的属性值0（是已阅2，通过1还是不通过0）。
                }
                break;
        }

        console.log(url);
        console.log(data);
        console.log(action);

        const pageUrl = GlobalData.addParams(GlobalData.user.server + pageConfig.commonApproveLogUrl, {
            flowInstanceId: data.flowInstanceId,
        })

        GlobalData.POST({
            data,
            url: GlobalData.user.server + url,
            //headers: { 'Content-Type': 'application/x-www-form-urlencoded;' },
        }).then(res => {
            console.log(res)
            if (res.Success) {
                console.log(res);
                this.setState({
                    loading: false,
                });
                this.props.refreshFlowData();
                Actions.popTo('FlowContentPage');
                // Toast.show('操作成功'); // Toast和安卓下键盘出现冲突,在有TextInput和界面跳转时不宜出现页面跳转.
            } else {
                Toast.show('操作失败');
                this.setState({
                    loading: false,
                });
            }
        }, err => {
            console.log(err);
            this.setState({
                loading: false,
            });
        });
    }

    doAudit(action) {
        console.log('do audit', action);
        const { pageData } = this.props;
        const nextActions = action.nextBtn;
        let url, data;
        const flowData = {
            flowId: pageData.flowId, // 流程ID
            flowInstanceId: pageData.flowInstanceId, // 流程实例ID
            stepId: pageData.stepId, // 当前步骤ID
            content: this.state.commentText, // 审批意见
            actId: action.actId, // 动作ID（取通过的actId）
        }

        switch (action.type) {
            case 5: // 交办/转办
                // $state.go('eventmenu.transmit',{flowInstanceId: $scope.item.flowInstanceId, flowId:$scope.item.flowId})
                // $scope.modal.hide();
                console.log(data);
                url = GlobalData.user.server + '/Home/TurnOnToUser/' + flowData.flowInstanceId
                Actions.SearchUserPage({
                    auditData: { ...flowData, url },
                });
                return;
            case 10: // 当前会签
                url = '/Home/AddCounterSignStep';
                data = {
                    ...flowData,
                    url,
                    typeName: '会签',
                }
                Actions.SelectUserPage({
                    title: '选择会签人员',
                    auditData: data,
                })
                return;
            case 11: // 加签
                url = '/Home/AddAuditStep';
                data = {
                    ...flowData,
                    url,
                    typeName: '加签',
                }
                console.log(data);
                Actions.SelectUserPage({
                    title: '选择加签人员',
                    auditData: data,
                })
                return;
        }

        if (nextActions) {
            let childActions;
            if (Platform.OS === 'ios') {
                childActions = [{ text: '取消', onPress: () => console.log('cancel Pressed!') }];
            } else {
                childActions = [];
            }
            nextActions.forEach((actionItem) => {
                childActions.push({ text: actionItem.name, onPress: this.doAction.bind(this, actionItem) });
            })
            Alert.alert(
                '驳回流程',
                '请选择流程操作',
                childActions
            );
        } else {
            Alert.alert(
                '请确认审批操作',
                `您选择的审批操作为"${action.name}"`,
                [
                    { text: '确认', onPress: this.doAction.bind(this, action) },
                    { text: '取消', onPress: () => console.log('OK Pressed!') },
                ]
            );
        }
    }

    render() {
        const { pageData } = this.props;
        return (
            <View style={styles.container}>
                {this.state.loading && (
                    <Modal visible >
                        <Loading color="#ffffff" />
                    </Modal>
                )}
                <View style={styles.modalContainer}>
                    <View>
                        <Text>填写审批意见:</Text>
                    </View>
                    <TextInput
                        multiline
                        underlineColorAndroid="transparent"
                        onChangeText={commentText => this.setState({ commentText })}
                        value={this.state.commentText}
                        style={styles.input}
                        textAlignVertical="top"
                    />
                    {this.state.showActionButtons && (
                        <TouchableOpacity onPress={() => this.setState({ showActionButtons: false })} style={styles.moreActionButtonsBox}>
                            <View style={styles.ButtonsBox}>
                                {pageData.actList.filter((item, index) => index > 1).map((item, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            style={styles.mt5}
                                            onPress={this.doAudit.bind(this, item)}
                                            text={item.name}
                                        />
                                    );
                                })}
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.bottomBar}>
                    {!!pageData.actList[0] && (
                        <View style={styles.bottomBarButton}>
                            <Button onPress={this.doAudit.bind(this, pageData.actList[0])} text={pageData.actList[0].name} />
                        </View>
                    )}
                    {!!pageData.actList[1] && (
                        <View style={styles.bottomBarButton}>
                            <Button onPress={this.doAudit.bind(this, pageData.actList[1])} text={pageData.actList[1].name} />
                        </View>
                    )}
                    {pageData.actList.length > 2 && (
                        <View style={styles.bottomBarMoreButtonBox}>
                            <Button
                                onPress={this.showMoreActionButtons.bind(this)}
                                style={styles.bottomBarMoreButton}
                                textStyle={styles.bottomBarMoreButtonText}
                                underlayColor="#aaa"
                                text="更多"
                            />
                        </View>
                    )}
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
    bottomBarMoreButtonBox: {
        width: 70,
        paddingLeft: 5,
    },
    bottomBarMoreButton: {
        backgroundColor: '#eeeeee',
        borderColor: '#bbbbbb',
    },
    bottomBarMoreButtonText: {
        color: GlobalData.colors.fontStrong2,
    },
    modalBox: {
        flex: 1,
        backgroundColor: '#ffffff',
        width: Dimensions.get('window').width,
    },
    input: {
        marginTop: 5,
        height: 120,
        backgroundColor: '#fafafa',
        textAlignVertical: 'top',
        textAlign: 'left',
        padding: 5,
        borderColor: GlobalData.colors.lineLight,
        borderWidth: 1 / PixelRatio.get(),
    },
    button: {
        marginTop: 10,
    },
    modalRightButton: {
        width: 40,
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    modalContainer: {
        padding: 10,
        position: 'relative',
        flex: 1,
    },
    moreActionButtonsBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
    },
    ButtonsBox: {
        position: 'absolute',
        bottom: 3,
        right: 3,
        width: 130,
        padding: 5,
        paddingTop: 0,
        backgroundColor: '#fff',
        borderColor: GlobalData.colors.lineLight,
        borderWidth: 1 / PixelRatio.get(),
    },
    mt5: {
        marginTop: 5,
    },
});

// export default FlowAuditPage;
export default connect(null, { refreshFlowData })(FlowAuditPage);
