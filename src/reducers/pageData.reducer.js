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
            if (Object.prototype.toString.call(action.payload.pageData) === '[object Array]') {
                return state.set(action.payload.pageKey, fromJS({ list: action.payload.pageData }));
            }
            return state.set(action.payload.pageKey, fromJS(action.payload.pageData));
        case actionTypes.clearPageData:
            return initState;
        case actionTypes.refreshFlowData:
            return state
                .setIn([pageConfig.flowContent.pageKey], fromJS({ reload: true }))
                .setIn([pageConfig.flowData.currentFlowKey], fromJS({ list: 'reload' }))

        case actionTypes.currentFlowDataLoadMore:
            if (!action.payload.list) return state.setIn([pageConfig.flowData.currentFlowKey, 'pageIndex'], -1);

            return state.setIn([pageConfig.flowData.currentFlowKey, 'pageIndex'], action.payload.pageIndex)
                .updateIn(
                    [pageConfig.flowData.currentFlowKey, 'list'],
                    list => {
                        return list.concat(action.payload.list);
                    }
                );
        case actionTypes.historyFlowDataLoadMore:
            if (!action.payload.list) return state.setIn([pageConfig.flowData.historyFlowKey, 'pageIndex'], -1);

            return state.setIn([pageConfig.flowData.historyFlowKey, 'pageIndex'], action.payload.pageIndex)
                .updateIn(
                    [pageConfig.flowData.historyFlowKey, 'list'],
                    list => {
                        return list.concat(action.payload.list);
                    }
                );

        default:
            return state;
    }
};

export default pageData;
