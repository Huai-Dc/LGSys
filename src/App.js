import React, { Component } from 'react';
import {
    StatusBar,
    Platform,
    AsyncStorage,
    BackAndroid,
    NetInfo,
    View,
} from 'react-native';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import GlobalData from './GlobalData';
import actionTypes from './actions/actionTypes';
import { Actions } from 'react-native-router-flux';
import Routes from './Routes';
import reducers from './reducers/rootReducer';
import TimerMixin from 'react-timer-mixin';
//import updateIOSBundle from './modules/updateIOSBundle';


const store = createStore(
    reducers
);
if (Platform.OS === 'ios') {
    StatusBar.setBarStyle('light-content');
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkLogin: undefined,
        };
        this.readyToExit = false;
        this.androidExit = this.androidExit.bind(this);
        AsyncStorage.getItem(GlobalData.STORAGE_UESER_KEY)
            .then(userData => {
                const isLogin = !!(userData && JSON.parse(userData).userId);
                if (isLogin) {
                    GlobalData.user = JSON.parse(userData);
                    GlobalData.server = GlobalData.user.url;
                }
                this.setState({
                    checkLogin: isLogin,
                });
                console.log('GlobalData.userData:', userData);
            });
    }
    componentDidMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPeress', this.androidExit);
        }
        // if (Platform.OS === 'ios') {
        //     updateIOSBundle();
        // }
        NetInfo.addEventListener(
            'change',
            this.handleConnectionInfoChange.bind(this)
        );
        NetInfo.fetch().done(this.handleConnectionInfoChange);
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPeress', this.androidExit);
        }
        NetInfo.removeEventListener(
            'change',
            this.handleConnectionInfoChange.bind(this)
        );
    }

    handleConnectionInfoChange(connectionInfo) {
        GlobalData.netInfo.connectionInfo = connectionInfo;
        if (Platform.OS === 'ios') {
            switch (connectionInfo.toLowerCase()) {
                case 'wifi':
                    GlobalData.netInfo.isExpensive = false;
                    GlobalData.netInfo.isConnected = true;
                    break;
                case 'cell':
                    GlobalData.netInfo.isExpensive = true;
                    GlobalData.netInfo.isConnected = true;
                    GlobalData.toast('当前不是wifi网络,请注意流量使用哦');
                    break;
                default:
                    GlobalData.netInfo.isExpensive = false;
                    GlobalData.netInfo.isConnected = false;
                    GlobalData.toast('无网络连接,请检查网络设置');
            }
        } else {
            switch (connectionInfo.toLowerCase()) {
                case 'none':
                case 'unknown':
                    GlobalData.netInfo.isExpensive = false;
                    GlobalData.netInfo.isConnected = false;
                    GlobalData.toast('无网络连接,请检查网络设置');
                    break;
                default:
                    GlobalData.netInfo.isConnected = true;
            }
            NetInfo.isConnectionExpensive((isConnectionExpensive) => {
                if (isConnectionExpensive) {
                    GlobalData.netInfo.isExpensive = true;
                    GlobalData.toast('当前为付费网络,请注意流量使用哦');
                } else {
                    GlobalData.netInfo.isExpensive = false;
                }
            });
        }
    }

    androidExit() {
        if (this.readyToExit) {
            return false;
        }
        if (!Actions.pop()) {
            const duration = 2000;

            this.readyToExit = true;
            TimerMixin.setTimeout(() => {
                this.readyToExit = false;
            }, duration);
            GlobalData.toast('再按一次退出');
            return true;
        }
        return true;
    }
    render() {
        if (this.state.checkLogin === undefined) {
            return <View />;
        }

        return (
            <Provider store={store}>
                <Routes isLogin={this.state.checkLogin} />
            </Provider>
        );
    }
}

export default App;
