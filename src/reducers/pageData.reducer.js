'use strict';
import actionTypes from '../actions/actionTypes';
import { fromJS } from 'immutable';
import pageConfig from '../pageConfig';

const initState = fromJS({
    //testPage: {
    //    title: 'init title',
    //    content: 'init content',
    //},
});

const pageData = function (state = initState, action = {}) {
    switch (action.type) {
        case actionTypes.pageData:
            return state.set(action.payload.pageKey, fromJS(action.payload.pageData));
        case actionTypes.clearPageData:
            return initState;

        default:
            return state;
    }
};

export default pageData;
