/**
 * Created by sujiexu on 16/8/19.
 */
'use strict';
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    PixelRatio,
    TextInput,
    Dimensions,
} from 'react-native';

import LoadView from '../../modules/LoadView';
import pageConfig from '../../pageConfig';
import { connect } from 'react-redux';
import GlobalData from '../../GlobalData';
import { Actions, Ionicons, Modal } from '../../modules/adapter';
import Button from '../../components/Button';
import Header from '../../components/Header';

class FlowContentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAuditModal: false,
        };
    }

    doAudit() {
        this.setState({
            showAuditModal: true,
        });
    }

    modalRightButton() {
        return (
            <TouchableOpacity
                style={styles.modalRightButton}
                onPress={() => { this.setState({ showAuditModal: false }) }}>
                <Ionicons name="md-close" size={24} color="#ffffff"/>
            </TouchableOpacity>
        );
    }
    render() {
        console.log(this.props.pageData);
        const { pageData } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.flex}>
                    {pageData.showFields.map((item, index) => {
                        return (
                            <View key={index} style={styles.flowItem}>
                                <Text style={styles.flowItemTitle}>{item.showName}</Text>
                                <Text style={styles.flowItemInfo}>{item.showValue}</Text>
                            </View>
                        );
                    })}
                    <View style={styles.sectionHeader}>
                        <Text>相关附件</Text>
                    </View>
                    {pageData.fileList.map((item, index) => {
                        return (
                            <View key={index} style={styles.fileItem}>
                                <View style={styles.fileItemTitle}>
                                    <Text>{item.name}</Text>
                                </View>
                                <View style={styles.fileItemBtn}>
                                    
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
                <View style={styles.bottomBar}>
                    <View style={styles.bottomBarButton}>
                        <Button onPress={this.doAudit.bind(this)} text="我要审批"/>
                    </View>
                    <View style={styles.bottomBarButton}>
                        <Button text="查看审批意见"/>
                    </View>
                </View>
                {this.state.showAuditModal && (
                    <Modal visible>
                        <Header title="我要审批" rightButton={this.modalRightButton.bind(this)} />
                        <ScrollView style={styles.modalBox}>
                            <View>
                                <Text>填写审批意见:</Text>
                            </View>
                            <TextInput
                                multiline
                                underlineColorAndroid="transparent"
                                onChangeText={text => this.setState({ text })}
                                value={this.state.text}
                                style={styles.input}
                                textAlignVertical="top"
                            />
                            <Button
                                style={styles.button}
                                text="提交"
                            />
                            <Button
                                style={styles.button}
                                text="加签"
                            />
                            <Button
                                style={styles.button}
                                text="已阅"
                            />
                            <Button
                                style={styles.button}
                                text="回退"
                            />
                            <Button
                                style={styles.button}
                                text="当前会签"
                            />
                            <Button
                                style={styles.button}
                                text="继续"
                            />
                            <Button
                                style={styles.button}
                                text="终止"
                            />
                            <Button
                                style={styles.button}
                                text="转办"
                            />
                        </ScrollView>
                    </Modal>
                )}
            </View>
        );
    }
}
FlowContentPage.propTypes = {
    pageData: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: GlobalData.headerbarHeight,
    },
    flex: {
        flex: 1,
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
    flowItem: {
        padding: 10,
        borderColor: GlobalData.colors.lineLight,
        borderBottomWidth: 1 / PixelRatio.get(),
    },
    flowItemTitle: {
        fontSize: 16,
    },
    flowItemInfo: {
        marginTop: 10,
        fontSize: 14,
        color: GlobalData.colors.fontLight,
    },
    sectionHeader: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#eeeeee',
    },
    fileItem: {
        padding: 10,
        borderColor: GlobalData.colors.lineLight,
        borderBottomWidth: 1 / PixelRatio.get(),
        flexDirection: 'row',
        height: 50,
    },
    fileItemTitle: {
        flex: 1,
        justifyContent: 'center',
    },
    fileItemBtn: {
        backgroundColor: '#ff6600',
        width: 50,
    },
    modalBox: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
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
    button: {
        marginTop: 10,
    },
    modalRightButton: {
        width: 30,
        alignItems: 'flex-end',
    },
});

export default connect(
    state => ({
        userData: state.get('userData'),
    })
)(props => {
    const pageConfigData = {
        pageUrl: 'http://192.168.1.178:9012/home/GetCommonPeddingInstance?referFieldValue=213&tableName=FreeFlow_FreeTask&referFieldName=freeTaskId&userId=1',
    };
    return (
        <LoadView view={FlowContentPage} {...props} {...pageConfigData} />
    );
});
