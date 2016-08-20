'use strict';
import actionTypes from './actionTypes';

export function setPageData(pageKey, pageData) {
    return {
        type: actionTypes.pageData,
        payload: {
            pageKey,
            pageData,
        },
    };
}
export function clearPageData() {
    return {
        type: actionTypes.clearPageData,
    };
}
