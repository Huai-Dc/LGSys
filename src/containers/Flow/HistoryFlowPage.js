/**
 * Created by sujiexu on 16/8/17.
 */
'use strict';
import React, { Component } from 'react';


import LoadView from '../../modules/LoadView';
import pageConfig from '../../pageConfig';
import { connect } from 'react-redux';
import FlowListComponent from './FlowListComponent';
import GlobalData from '../../GlobalData';
import enumData from '../../enumData';

export default connect(
    state => ({
        pageData: state.getIn(['pageData', pageConfig.flowData.historyFlowKey]) && state.getIn(['pageData', pageConfig.flowData.historyFlowKey]).toJS(),
        userData: state.get('userData'),
    })
)(props => {
    const pageUrl = GlobalData.addParams(GlobalData.user.server + pageConfig.flowData.pageUrl, {
        type: enumData.flowType.historyFlow,
        userId: GlobalData.user.guid,
        current: 1,
        pageSize: 15,
    });
    console.log(pageUrl);
    const pageConfigData = {
        pageUrl,
        pageKey: pageConfig.flowData.historyFlowKey,
        flowType: enumData.flowType.historyFlow,
    };
    return (
        <LoadView view={FlowListComponent} {...props} {...pageConfigData} />
    );
});
