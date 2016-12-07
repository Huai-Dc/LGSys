/**
 * Created by huangzuizui on 16/5/29.
 */
'use strict';
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    AsyncStorage,
    Platform,
    View,
} from 'react-native';

import { connect } from 'react-redux';
import Loading from '../components/Loading';
import NetError from '../components/NetError';
import { setPageData } from '../actions/pageData.action';
import GlobalData from '../GlobalData';
import TimerMixin from 'react-timer-mixin';

class LoadingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pageData: props.pageData,
            isConnected: true,
            error: false,
            timeout: false,
        };
        this.webParams = {};
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pageUrl !== nextProps.pageUrl) {
            this.props = nextProps;
            this.reloadPage(true);
        }
    }

    componentWillMount() {
        if (this.props.pageStorageKey) {
            AsyncStorage.getItem(this.props.pageStorageKey)
                .then((data) => {
                    if (!data) return;
                    if (this.props.pageKey) {
                        this.props.setPageData(this.props.pageKey, JSON.parse(data));
                    }
                    this.setState({
                        loading: false,
                        pageData: JSON.parse(data),
                    });
                });
        }
        if (this.state.pageData) {
            this.setState({
                loading: false,
            });
        } else {
            this.loadPage();
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                timeout: true,
            });
        }, 600);
    }

    loadPage() {
        return new Promise((resolve, reject) => {
            if (Platform.OS === 'web') {
                try {
                    this.webParams = this.props.routeParams ? JSON.parse(this.props.routeParams.passProps) : this.webParams;
                } catch (e) {
                    console.log(e);
                }
            }

            const url = (this.props.navigationState && this.props.navigationState.pageUrl) || this.props.pageUrl || this.webParams.pageUrl;
            if (url) {
                GlobalData.GET(url).then(data => {
                    if (this.props.pageKey) {
                        this.props.setPageData(this.props.pageKey, data);
                    }
                    if (this.props.pageStorageKey) {
                        AsyncStorage.setItem(this.props.pageStorageKey, JSON.stringify(data))
                            .then(() => {
                                console.log('tips catched!!!!!');
                            });
                    }
                    this.setState({
                        loading: false,
                        pageData: data,
                        isConnected: true,
                        error: false,
                    });
                    resolve(data);
                }, err => {
                    this.setState({
                        error: true,
                        errorData: err,
                        loading: false,
                    });
                    reject(err);
                });
            } else {
                this.setState({
                    isConnected: false,
                    errorData: { error: true, code: 0, message: '无网络连接' },
                    loading: false,
                });
                reject({ error: true, code: 0, message: '无网络连接' });
            }
        });
    }

    reloadPage(loadingState) {
        if (loadingState) {
            this.setState({
                loading: true,
            });
        }
        return this.loadPage();
    }

    render() {
        if (this.state.loading || !this.state.timeout) {
            return (
                <Loading />
            );
        }
        if (this.state.error || !this.state.isConnected) {
            return (
                <View style={styles.container}>
                    <NetError
                        reConnect={this.reloadPage.bind(this)}
                        errorMessage={this.state.errorData.message + '(' + this.state.errorData.code + ')'}
                    />
                </View>
            );
        }
        // console.log('this.webParams:', this.webParams);
        return (<this.props.view pageData={this.state.pageData} {...this.props.navigationState} {...this.props} {...this.webParams} refresh={this.reloadPage.bind(this)}/>);
    }
}
LoadingView.propTypes = {
    state: PropTypes.object,
    setPageData: PropTypes.func,
    data: PropTypes.object,
    pageUrl: PropTypes.string,
    pageKey: PropTypes.string,
    pageStorageKey: PropTypes.string,
    navigationState: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default connect(null, { setPageData })(LoadingView);
