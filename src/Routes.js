'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PixelRatio, Platform, Dimensions } from 'react-native';

import { FontAwesome, Ionicons } from './modules/adapter';
import GlobalData from './GlobalData';

import { Router, Scene, Actions } from 'react-native-router-flux';

import CurrentFlowPage from './containers/Flow/CurrentFlowPage';
import HistoryFlowPage from './containers/Flow/HistoryFlowPage';
import ProjectPage from './containers/Project/ProjectPage';
import SettingPage from './containers/SettingPage';
import FlowContentPage from './containers/Flow/FlowContentPage';
import FlowApproveLogPage from './containers/Flow/FlowApproveLogPage';
import ProjectInfoPage from './containers/Project/ProjectInfoPage';
import ProjectDetailPage from './containers/Project/ProjectDetailPage';
import SelectUserPage from './containers/Flow/SelectUserPage';
import SearchUserPage from './containers/Flow/SearchUserPage';
import FlowAuditPage from './containers/Flow/FlowAuditPage';
import CompanyIndex from './containers/CompanyIndex';
import LoginPage from './containers/LoginPage';

function TabIcon(props) {
    if (props.selected) {
        return (
            <View style={styles.tabIconBox}>
                <Ionicons name={props.iconActiveName} size={30} color={GlobalData.colors.mainLight} />
                <Text style={[styles.tabIconText, { color: GlobalData.colors.mainLight }]}>{props.title}</Text>
            </View>
        );
    }
    return (
        <View style={styles.tabIconBox}>
            <Ionicons name={props.iconName} size={30} color={"#666666"} />
            <Text style={[styles.tabIconText, { color: '#666666' }]}>{props.title}</Text>
        </View>
    );
}

function BackButton() {
    return (
        <View style={styles.backButtonBox}>
            <TouchableOpacity style={styles.backButton} onPress={Actions.pop}>
                <FontAwesome name="angle-left" size={32} color="#fff"/>
            </TouchableOpacity>
        </View>
    );
}

TabIcon.propTypes = {
    iconName: PropTypes.string,
    selected: PropTypes.bool,
};

const navBarConf = {
    renderBackButton: BackButton,
    navigationBarStyle: {
        backgroundColor: GlobalData.colors.main,
        borderBottomWidth: 0,
        height: GlobalData.headerbarHeight,
    },
    renderTitle(props) {
        return (
            <View style={styles.title}>
                <Text style={styles.titleStyle}>{props.title}</Text>
            </View>
        );
    },
};
const barConf = {
    navigationBarStyle: {
        backgroundColor: GlobalData.colors.main,
        borderBottomWidth: 0,
        height: GlobalData.headerbarHeight,
    },
    renderTitle(props) {
        return (
            <View style={styles.title}>
                <Text style={styles.titleStyle}>{props.title}</Text>
            </View>
        );
    },
}

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log('this.props.isLogin', this.props.isLogin);
        return (
            <Router>
                <Scene key="root">
                    <Scene initial={this.props.isLogin} key="Main" type="replace" tabs tabBarStyle={styles.tabBarStyle}>
                        <Scene icon={TabIcon} iconName="ios-paper-outline" iconActiveName="ios-paper" key="CurrentFlowPage" component={CurrentFlowPage} title="待审流程" {...barConf} />
                        <Scene icon={TabIcon} iconName="ios-time-outline" iconActiveName="ios-time" key="HistoryFlowPage" component={HistoryFlowPage} title="相关流程" {...barConf} />
                        <Scene icon={TabIcon} iconName="ios-apps-outline" iconActiveName="ios-apps" key="NotePage" component={ProjectPage} title="项目" {...barConf} />
                        <Scene icon={TabIcon} iconName="ios-settings-outline" iconActiveName="ios-settings" key="SettingPage" component={SettingPage} title="设置" {...barConf} />
                    </Scene>
                    <Scene key="FlowContentPage" component={FlowContentPage} title="审批中心" {...navBarConf}/>
                    <Scene key="FlowAuditPage" component={FlowAuditPage} title="我要审批" {...navBarConf}/>
                    <Scene key="FlowApproveLogPage" component={FlowApproveLogPage} title="审批意见" {...navBarConf}/>
                    <Scene key="ProjectInfoPage" component={ProjectInfoPage} title="项目内页" {...navBarConf}/>
                    <Scene key="ProjectDetailPage" component={ProjectDetailPage} title="项目详情" {...navBarConf}/>
                    <Scene key="SelectUserPage" component={SelectUserPage} title="人员选择" {...navBarConf}/>
                    <Scene key="SearchUserPage" component={SearchUserPage} title="人员选择" {...navBarConf}/>
                    <Scene initial={!this.props.isLogin} key="CompanyIndex" component={CompanyIndex} title="选择公司" {...barConf}/>
                    <Scene key="LoginPage" component={LoginPage} title="登录" {...navBarConf}/>
                </Scene>
            </Router>
        );
    }
}
const styles = StyleSheet.create({
    backButtonBox: {
        flex: 1,
        alignSelf: 'flex-start',
        marginTop: Platform.OS === 'ios' ? 4 : 0,
    },
    backButton: {
        flex: 1,
        width: 30,
        paddingLeft: 0,
        justifyContent: 'center',
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: GlobalData.headerbarHeight,
        marginTop: Platform.OS === 'ios' ? 8 : 0,
    },
    titleStyle: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize: 16,
        alignSelf: 'center',
    },
    tabIconBox: {
        alignItems: 'center',
    },
    tabIconText: {
        alignItems: 'center',
        fontSize: 8,
    },
    tabBarStyle: {
        height: 50,
        backgroundColor: '#f5f5f5',
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: '#d5d5d5',
    },
});

export default Routes;
