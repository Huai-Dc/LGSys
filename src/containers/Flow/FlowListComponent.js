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
    ListView,
    RefreshControl,
} from 'react-native';

import { Actions, Ionicons } from '../../modules/adapter';
import ListItem from '../../components/ListItem';
import pageConfig from '../../pageConfig';
import GlobalData from '../../GlobalData';
import Loading from '../../components/Loading';
import { flowDataLoadMore } from '../../actions/pageData.action';
import { connect } from 'react-redux';

class FlowListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
        };
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    onRefresh() {
        this.setState({
            isRefreshing: true,
        });

        this.props.refresh().then(() => {
            GlobalData.toast('已更新!');
            this.setState({
                isRefreshing: false,
            });
        }, () => {
            this.setState({
                isRefreshing: false,
            });
        });
    }

    renderLoading() {
        if (this.props.pageData.pageIndex === -1) {
            return (
                <View style={styles.pageLoading}>
                    <Text style={styles.fontLight}>没有更多内容了</Text>
                </View>
            );
        }
        if (this.state.pageLoading) {
            return (
                <View style={styles.pageLoading}>
                    <Loading />
                </View>
            );
        }
        return <View style={styles.pageLoading} />;
    }

    loadMore() {
        console.log('loadmore');
        const { flowDataLoadMore, pageData, flowType } = this.props;

        // -1代表没有更多内容可加载,
        // 加载中或者无更多内容加载时,结束加载.
        if (pageData.pageIndex === -1 || this.state.pageLoading) return;

        const pageIndex = pageData.pageIndex || 1;
        const loadPageIndex = pageIndex + 1;

        this.setState({
            pageLoading: true,
        });

        GlobalData.GET(GlobalData.user.server + pageConfig.flowData.pageUrl, {
            type: flowType,
            userId: GlobalData.user.guid,
            current: loadPageIndex,
            pageSize: 15,
        }).then((data) => {
            console.log(loadPageIndex);
            if (!data.length) {
                this.setState({
                    pageLoading: false,
                });
                flowDataLoadMore({
                    flowType,
                });
            } else {
                flowDataLoadMore({
                    flowType,
                    pageIndex: loadPageIndex,
                    list: data,
                });
                this.setState({
                    pageLoading: false,
                });
            }
        }, () => {
            this.setState({
                pageLoading: false,
            });
        });
    }

    toFlowContentPage(rowData) {
        Actions.FlowContentPage({
            pageKey: pageConfig.flowContent.pageKey,
            pageUrl: GlobalData.addParams(GlobalData.user.server + pageConfig.flowContent.pageUrl, {
                referFieldValue: rowData.referFieldValue,
                tableName: rowData.tableName,
                referFieldName: rowData.referFieldName,
                userId: GlobalData.user.guid,
            }),
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.pageData.list === 'reload') {
            this.props.refresh(true);
            return false;
        }
        return true;
    }

    renderRow(rowData) {
        return (
            <ListItem
                data={{
                    title: rowData.title,
                    subTitle: rowData.projName,
                    date: rowData.StartDate,
                    intro: rowData.StartMan,
                }}
                onPress={this.toFlowContentPage.bind(this, rowData)}
            />
        );
    }
    render() {
        const { pageData } = this.props;
        return (
            <View style={styles.container}>
                {pageData.list.length ? (
                    <ListView
                        enableEmptySections
                        refreshControl={(
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.onRefresh.bind(this)}
                                tintColor="#999999"
                                colors={[GlobalData.colors.main, GlobalData.colors.mainStrong, GlobalData.colors.mainLight]}
                                progressBackgroundColor="#ffffff"
                            />
                        )}
                        dataSource={this.ds.cloneWithRows(pageData.list)}
                        style={styles.list}
                        renderRow={this.renderRow.bind(this)}
                        initialListSize={15}
                        pageSize={15}
                        onEndReachedThreshold={2}
                        onEndReached={this.loadMore.bind(this)}
                        renderFooter={this.renderLoading.bind(this)}
                    />
                ) : (
                    <View style={styles.pageLoading}>
                        <Text style={styles.fontLight}>暂无数据!</Text>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 50,
    },
    pageLoading: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fontLight: {
        color: GlobalData.colors.fontLight,
    },
});

export default connect(
    null,
    { flowDataLoadMore },
)(FlowListComponent);
