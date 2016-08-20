'use strict';
const useStaticData = false;
const serverDebug = 'http://192.168.1.19:8000/';
const serverRelease = 'http://192.168.1.178:9012/';
//const serverRelease = 'http://192.168.1.122:8050/';
const appVersion = 'V0';

export default {

    checkIOSVersion: serverRelease + `Home/UpdateVersions_PM?visionType=${appVersion}&platform=ios`,


    // 项目列表数据
    projectData: {
        pageKey: 'projectData',
        pageUrl: useStaticData ?
        serverDebug + 'appData/indexData.json' :
        serverRelease + 'home/CityEngList',
    },
    // 获取审批流程
    flowData: {
        historyFlowKey: 'historyFlowKey',
        currentFlowKey: 'currentFlowKey',
        pageUrl: useStaticData ?
        serverDebug + 'appData/indexData.json' :
        serverRelease + 'home/PeddingDesignChangeList?current=1&loginName=admin&type=2',
    },
};
