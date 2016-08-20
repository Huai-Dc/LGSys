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

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="Main" type="replace" tabs tabBarStyle={styles.tabBarStyle}>
                        <Scene icon={TabIcon} iconName="ios-paper-outline" iconActiveName="ios-paper" key="HomePage" component={CurrentFlowPage} title="待审流程" hideNavBar/>
                        <Scene icon={TabIcon} iconName="ios-time-outline" iconActiveName="ios-time" key="HotNewsPage" component={HistoryFlowPage} title="相关流程" hideNavBar/>
                        <Scene icon={TabIcon} iconName="ios-apps-outline" iconActiveName="ios-apps" key="NotePage" component={ProjectPage} title="项目" hideNavBar/>
                        <Scene icon={TabIcon} iconName="ios-settings-outline" iconActiveName="ios-settings" key="UserPage" component={SettingPage} title="设置" hideNavBar/>
                    </Scene>
                    <Scene key="FlowContentPage" component={FlowContentPage} title="审批中心" {...navBarConf}/>
                    <Scene initial key="ProjectInfoPage" component={ProjectInfoPage} title="项目" {...navBarConf}/>
                    <Scene key="FlowApproveLogPage" component={FlowApproveLogPage} title="审批意见" {...navBarConf}/>
                </Scene>
            </Router>
        );
    }
}
const styles = StyleSheet.create({
    backButtonBox: {
        flex: 1,
        alignSelf: 'flex-start',
        marginTop: Platform.OS === 'ios' ? 10 : 0,
    },
    backButton: {
        flex: 1,
        width: 30,
        paddingLeft: 10,
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
