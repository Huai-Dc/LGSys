/**
 * Created by sujiexu on 16/8/22.
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import TabBox from '../../components/TabBox';
import GlobalData from '../../GlobalData';
import pageConfig from '../../pageConfig';
import ProjectInfoTpl1 from './ProjectInfoTpl1';
import ProjectInfoTpl2 from './ProjectInfoTpl2';
import ProjectInfoTpl3 from './ProjectInfoTpl3';

class ProjectDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { projId } = this.props;
        const tabData = [
            {
                title: '项目概要',
                view() {
                    const url = GlobalData.addParams(GlobalData.user.server + pageConfig.projectSummaryUrl, {
                        projId,
                    })
                    return (
                        <ProjectInfoTpl1 pageUrl={url} />
                    );
                },
            },
            {
                title: '项目简介',
                view() {
                    const url = GlobalData.addParams(GlobalData.user.server + pageConfig.projectIntroduce, {
                        projId,
                    })
                    return (
                        <ProjectInfoTpl2 pageUrl={url} />
                    );
                },
            },
            // {
            //     title: '技术指标',
            //     view() {
            //         const url = GlobalData.addParams(GlobalData.user.server + pageConfig.projectIndexSummary, {
            //             projId,
            //         })
            //         return (
            //             <ProjectInfoTpl2 pageUrl={url} />
            //         );
            //     },
            // },
            // {
            //     title: '设计单位',
            //     view() {
            //         const url = GlobalData.addParams(GlobalData.user.server + pageConfig.projectDesigner, {
            //             projId,
            //         })
            //         return (
            //             <ProjectInfoTpl3 pageUrl={url} />
            //         );
            //     },
            // },
        ];
        return (
            <View style={styles.container}>
                <TabBox data={tabData} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: GlobalData.headerbarHeight,
    },
});

export default ProjectDetailPage;
