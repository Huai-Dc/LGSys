'use strict';
import actionTypes from './actionTypes';
import enumData from '../enumData';

export function setPageData(pageKey, pageData) {
    return {
        type: actionTypes.pageData,
        payload: {
            pageKey,
            pageData,
        },
    };
}

export function flowDataLoadMore(data) {
    switch (data.flowType) {
        case enumData.flowType.currentFlow:
            return {
                type: actionTypes.currentFlowDataLoadMore,
                payload: data,
            };

        case enumData.flowType.historyFlow:
            return {
                type: actionTypes.historyFlowDataLoadMore,
                payload: data,
            };
    }
}
export function historyFlowDataLoadMore(data) {
    console.log('historyFlowDataLoadMore');
    return {
        type: actionTypes.historyFlowDataLoadMore,
        payload: data,
    };
}

export function currentFlowDataLoadMore(data) {
    return {
        type: actionTypes.currentFlowDataLoadMore,
        payload: data,
    };
}

export function clearPageData() {
    return {
        type: actionTypes.clearPageData,
    };
}

export function refreshFlowData() {
    return {
        type: actionTypes.refreshFlowData,
    };
}
