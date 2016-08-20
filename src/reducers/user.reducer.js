'use strict';
import actionTypes from '../actions/actionTypes';
import GlobalData from '../GlobalData';
import { AsyncStorage } from 'react-native';

const initState = {
    //communityName: '中央公园',
    //gender: '0',
    //communityID: '29',
    //// 0游客,1注册未验证,2已验证业主,3屋主.
    //status: '3',
    //phone: '13358210592',
    //id: '56d26cf7a09d9323688f1c28',
    //avatar: 'http://59.61.72.34:10888/Upload/Head/20160611064325068.jpg',
    //address: '宁德 中央公园 9栋 301号',
    //houseID: '527',
    //name: '刘惠李',
};

const userReducer = function (state = initState, action = {}) {
    let userData;
    switch (action.type) {
        case actionTypes.login:
            userData = {
                ...state,
                ...action.payload,
            };
            AsyncStorage.setItem(GlobalData.STORAGE_UESER_KEY, JSON.stringify(userData));
            return userData;
        case actionTypes.updateUserData:
            userData = {
                ...state,
                ...action.payload,
            };
            AsyncStorage.setItem(GlobalData.STORAGE_UESER_KEY, JSON.stringify(userData));
            return userData;
        case actionTypes.clearUserData:
            AsyncStorage.removeItem(GlobalData.STORAGE_UESER_KEY);
            return initState;
        default:
            return state;
    }
};

export default userReducer;
