/**
 * Created by huangzuizui on 16/5/29.
 */
'use strict';
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    AsyncStorage,
    Platform,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loading from '../components/Loading';

import * as pageDataAction from '../actions/pageData.action.js';

class LoadingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pageData: undefined,
        };
    }

    componentWillMount() {
        if (this.props.pageStorageKey) {
            AsyncStorage.getItem(this.props.pageStorageKey)
                .then((data) => {
                    if (!data) return;
                    if (this.props.pageKey) {
                        this.props.actions.setPageData(this.props.pageKey, JSON.parse(data));
                    }
                    this.setState({
                        loading: false,
                        pageData: JSON.parse(data),
                    });
                });
        }
        this.loadPage();
    }

    loadPage() {
        const url = (this.props.navigationState && this.props.navigationState.pageUrl) || this.props.pageUrl;
        console.log(url);
        if (url) {
            return fetch(url).then(res => res.json()).then(data => {
                if (this.props.pageKey) {
                    this.props.actions.setPageData(this.props.pageKey, data);
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
                });
            });
        }
    }

    reloadPage() {
        console.log('zz reload');
        this.loadPage();
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading />
            );
        }
        return (
            <this.props.PageComponent pageData={this.state.pageData} {...this.props.navigationState} {...this.props} refresh={this.reloadPage.bind(this)}/>
        );
    }
}
LoadingView.propTypes = {
    state: PropTypes.object,
    actions: PropTypes.object,
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

export default function (data) {
    let { pageUrl, pageKey, pageStorageKey, pageData } = data || {};
    return function (PageComponent) {
        return function (props) {
            // 如果已经传递了页面数据则不会从网络加载数据
            //console.log('loadPageData', props);

            let webParams = {};
            if (Platform.OS === 'web') {
                try {
                    webParams = props.routeParams && JSON.parse(props.routeParams.passProps);
                } catch (e) {
                    console.log(e);
                }
            }

            const pData = pageData || props.pageData;

            if (pData) {
                return <PageComponent pageData={pData} {...props}/>;
            }
            //console.log(webParams);
            const LoadingViewPage = connect(
                () => ({
                    PageComponent,
                    pageUrl,
                    pageKey,
                    pageStorageKey,
                    ...props,
                    ...webParams,
                }),
                dispatch => ({
                    actions: bindActionCreators(pageDataAction, dispatch),
                })
            )(LoadingView);

            return <LoadingViewPage {...props}/>;
        };
    };
}
