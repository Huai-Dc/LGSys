/**
 * Created by sujiexu on 16/8/19.
 */
'use strict';
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    PixelRatio,
} from 'react-native';

import LoadView from '../../modules/LoadView';
import pageConfig from '../../pageConfig';
import { connect } from 'react-redux';
import GlobalData from '../../GlobalData';
import { Actions, Ionicons, Modal } from '../../modules/adapter';
import Button from '../../components/Button';
import Header from '../../components/Header';
import DownloadItem from './DownloadItem';

class FlowContentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAuditModal: false,
            showActionButtons: false,
            commentText: '',
        };
    }

    showAudit() {
        // this.setState({
        //     showAuditModal: true,
        //     showActionButtons: false,
        // });
        Actions.FlowAuditPage({
            pageData: this.props.cacheData,
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
    doTransmit() {

    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.cacheData.reload) {
            this.props.refresh(true);
            return false;
        }
        return true;
    }
    goFlowApproveLogPage() {
        const pageUrl = GlobalData.addParams(GlobalData.user.server + pageConfig.commonApproveLogUrl, {
            flowInstanceId: this.props.cacheData.flowInstanceId,
        })
        Actions.FlowApproveLogPage({
            pageUrl,
        });
    }
    render() {
        // console.log(this.props.pageData);
        const { cacheData } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.flex}>
                    {cacheData.showFields.map((item, index) => {
                        return (
                            <View key={index} style={styles.flowItem}>
                                <Text style={styles.flowItemTitle}>{item.showName}</Text>
                                <Text style={styles.flowItemInfo}>{item.showValue}</Text>
                            </View>
                        );
                    })}
                    <View style={styles.sectionHeader}>
                        <Text>相关附件{cacheData.fileList.length}</Text>
                    </View>
                    {cacheData.fileList.map((item, index) => {
                        return (
                            <DownloadItem key={index} data={item} />
                        );
                    })}
                </ScrollView>
                <View style={styles.bottomBar}>
                    {!!cacheData.actList.length && (
                        <View style={styles.bottomBarButton}>
                            <Button onPress={this.showAudit.bind(this)} text="我要审批"/>
                        </View>
                    )}
                    <View style={styles.bottomBarButton}>
                        <Button onPress={this.goFlowApproveLogPage.bind(this)} text="查看审批意见"/>
                    </View>
                </View>
            </View>
        );
    }
}
FlowContentPage.propTypes = {
    cacheData: PropTypes.object,
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
});

export default connect(
    state => ({
        cacheData: state.getIn(['pageData', pageConfig.flowContent.pageKey]) && state.getIn(['pageData', pageConfig.flowContent.pageKey]).toJS(),
        userData: state.get('userData'),
    })
)(props => {
    return (
        <LoadView view={FlowContentPage} {...props} />
    );
});
