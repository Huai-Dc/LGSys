'use strict';
const useStaticData = false;
// const serverDebug = 'http://192.168.1.19:8000/';
// const serverRelease = 'http://192.168.1.178:9012/';
//const companyServer = 'http://des.cifi.com.cn:8033/';
const companyServer = 'http://api.meng-zheng.com.cn';
const appVersion = 'V0';

export default {
    companyServer,
    // checkIOSVersion: serverRelease + `Home/UpdateVersions_PM?visionType=${appVersion}&platform=ios`,


    // 获取不同项目配置路径
    // indexUrl: 'http://192.168.1.19:8000/zttx/configtest.json',
    // 项目列表数据
    // projectData: {
    //     pageKey: 'projectData',
    //     pageUrl: useStaticData ?
    //     serverDebug + 'appData/indexData.json' :
    //     '/home/CityEngList',
    // },
    // projectInfoPageUrl: '/home/EngineerInfo',
    // projectSummaryUrl: '/home/ProjectSummaryJson',
    // projectIntroduce: '/home/ProjectIntroduceJson',
    // projectIndexSummary: '/home/ProjectIndexSummaryJson',
    // projectDesigner: '/home/ProjectDesignerJson',
    // // 获取审批流程
    // flowData: {
    //     historyFlowKey: 'historyFlowKey',
    //     currentFlowKey: 'currentFlowKey',
    //     pageUrl: useStaticData ?
    //     serverDebug + 'appData/indexData.json' :
    //         '/home/GetApprovalList',
    // },
    // flowContent: {
    //     pageKey: 'flowContent',
    //     pageUrl: '/home/GetCommonPeddingInstance',
    // },
    // commonApproveLogUrl: '/home/GetApproveLog',
    // SelectUserPage: {
    //     pageKey: 'SelectUserPage',
    //     pageUrl: useStaticData ?
    //     serverDebug + 'appData/indexData.json' :
    //     '/home/CityEngList',
    // },
    changeUserPwdData: '/Account/ChangePassword',
    homeIndexData: './home/HomeIndexJson', // 首页图片 及新闻数据
    loginData: '/Account/AjaxMobileLogin/', // 登录提交代码
    getAllData: 'http://api.meng-zheng.com.cn/Home/InitialAPPSettings?customerCode=6E890E12-AB2D-415E-9F22-8C79F20FE3LG',
};
