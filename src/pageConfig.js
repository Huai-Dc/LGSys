'use strict';
const useStaticData = false;
const serverDebug = 'http://192.168.1.19:8000/';
const serverRelease = 'http://192.168.1.178:9012/';
const companyServer = 'http://59.61.72.34:19029/';
//const companyServer = 'http://192.168.1.25:8030/';
//const serverRelease = 'http://192.168.1.122:8050/';
const appVersion = 'V0';

export default {
    companyServer,
    checkIOSVersion: serverRelease + `Home/UpdateVersions_PM?visionType=${appVersion}&platform=ios`,


    // 获取不同项目配置路径
    indexUrl: 'http://192.168.1.19:8000/zttx/configtest.json',
    // 项目列表数据
    projectData: {
        pageKey: 'projectData',
        pageUrl: useStaticData ?
        serverDebug + 'appData/indexData.json' :
        '/home/CityEngList',
    },
    projectInfoPageUrl: '/home/EngineerInfo',
    projectSummaryUrl: '/home/ProjectSummaryJson',
    projectIntroduce: '/home/ProjectIntroduceJson',
    projectIndexSummary: '/home/ProjectIndexSummaryJson',
    projectDesigner: '/home/ProjectDesignerJson',
    // 获取审批流程
    flowData: {
        historyFlowKey: 'historyFlowKey',
        currentFlowKey: 'currentFlowKey',
        pageUrl: useStaticData ?
        serverDebug + 'appData/indexData.json' :
            '/home/GetApprovalList',
    },
    flowContent: {
        pageKey: 'flowContent',
        pageUrl: '/home/GetCommonPeddingInstance',
    },
    commonApproveLogUrl: '/home/GetCommonApproveLog',
    SelectUserPage: {
        pageKey: 'SelectUserPage',
        pageUrl: useStaticData ?
        serverDebug + 'appData/indexData.json' :
        '/home/CityEngList',
    },
};
