'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PixelRatio, Platform, Dimensions } from 'react-native';

import { FontAwesome, Ionicons } from './modules/adapter';
import GlobalData from './GlobalData';

import { Router, Scene, Actions } from 'react-native-router-flux';

import SettingPage from './containers/SettingPage';
// import FlowContentPage from './containers/Flow/FlowContentPage';
// import FlowApproveLogPage from './containers/Flow/FlowApproveLogPage';
// import ProjectInfoPage from './containers/Project/ProjectInfoPage';
// import ProjectDetailPage from './containers/Project/ProjectDetailPage';
// import SelectUserPage from './containers/Flow/SelectUserPage';
// import SearchUserPage from './containers/Flow/SearchUserPage';
// import FlowAuditPage from './containers/Flow/FlowAuditPage';
// import CompanyIndex from './containers/CompanyIndex';
import LoginPage from './containers/LoginPage';
// import WebPage from './components/WebPage';
// import GetUserForCountersignPage from './containers/Flow/GetUserForCountersignPage';
// import NotifyPage from './containers/Flow/NotifyPage';
import MeetList from './containers/Meeting/MeetList';

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
            <Ionicons name={props.iconName} size={30} color={"#bbbbbb"} />
            <Text style={[styles.tabIconText, { color: '#bbbbbb' }]}>{props.title}</Text>
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
        // console.log('this.props.isLogin', this.props.isLogin);
        return (
            <Router>
                <Scene key="root">
                    <Scene initial={this.props.isLogin} key="Main" type="replace" tabs tabBarStyle={styles.tabBarStyle}>
                        <Scene icon={TabIcon} iconName="ios-person-outline" iconActiveName="ios-person" key="MeetList" hideNavBar={true} component={MeetList} title="会议" {...barConf}/>
                        <Scene icon={TabIcon} iconName="ios-settings-outline" iconActiveName="ios-settings" key="SettingPage" component={SettingPage} title="设置" {...barConf} />
                    </Scene>
                    <Scene initial={!this.props.isLogin} key="LoginPage" component={LoginPage} title="登录" {...navBarConf}/>
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
        backgroundColor: '#393939',
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: '#393939',
    },
});

export default Routes;
