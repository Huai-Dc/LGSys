/**
 * Created by sujiexu on 16/8/17.
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    PixelRatio,
    ListView,
    TextInput,
} from 'react-native';

import LoadView from '../../modules/LoadView';
import pageConfig from '../../pageConfig';
import { connect } from 'react-redux';
import GlobalData from '../../GlobalData';
import { Actions, Ionicons } from '../../modules/adapter';

class ProjectPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageData: props.pageData.list,
        }
        function getSectionHeaderData(dataBlob, sectionId) {
            return sectionId;
        }
        function getRowData(dataBlob, sectionId, rowId) {
            return dataBlob[sectionId][rowId];
        }

        this.ds = new ListView.DataSource({
            getRowData,
            getSectionHeaderData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
    }

    renderSectionHeader(rowData) {
        return (
            <View style={styles.listSectionHeader}>
                <Text>{rowData}</Text>
            </View>
        );
    }

    goToProject(rowData) {
        console.log(rowData);
        Actions.ProjectInfoPage({
            pageUrl: GlobalData.addParams(GlobalData.user.server + pageConfig.projectInfoPageUrl, {
                engId: rowData.engId,
                userId: GlobalData.user.guid,
            }),
            title: rowData.name,
        });
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={this.goToProject.bind(this, rowData)}
                underlayColor={GlobalData.colors.pressed}>
                <View style={styles.items}>
                    <View style={styles.itemTitle}><Text style={styles.itemText}>{rowData.name}</Text></View>
                    <View style={styles.itemIcon}>
                        <Ionicons name="ios-arrow-forward" size={15} color={GlobalData.colors.fontLight}/>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    handleSearch(keyword) {
        const pageData = [];
        this.props.pageData.list.forEach(item => {
            const newItem = { ...item };
            newItem.engList = item.engList.filter(proj => proj.name.search(new RegExp(keyword, 'i')) >= 0);
            if (newItem.engList.length) {
                pageData.push(newItem);
            }
        })
        this.setState({
            pageData,
        });
    }
    render() {
        const dataBlob = {};
        this.state.pageData.forEach((item, index) => {
            dataBlob[item.name] = item.engList;
        })

        return (
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <TextInput
                        onChangeText={this.handleSearch.bind(this)}
                        style={styles.searchInput}
                        placeholder="搜索项目"
                    />
                </View>
                <ListView
                    enableEmptySections
                    style={styles.list}
                    dataSource={this.ds.cloneWithRowsAndSections(dataBlob)}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                    renderRow={this.renderRow.bind(this)}
                    initialListSize={15}
                    pageSize={15}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: GlobalData.headerbarHeight,
        marginBottom: 50,
    },
    list: {
        flex: 1,
    },
    listHeader: {
        backgroundColor: '#aaa',
        height: 50,
        padding: 7,
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    listSectionHeader: {
        backgroundColor: '#eee',
        height: 30,
        padding: 5,
        justifyContent: 'center',
    },
    listRow: {
        height: 40,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        justifyContent: 'center',
        padding: 10,
    },
    searchBar: {
        height: 40,
        flexDirection: 'row',
        padding: 5,
        borderColor: GlobalData.colors.lineLight,
        borderBottomWidth: 1 / PixelRatio.get(),
    },
    searchInput: {
        padding: 3,
        paddingHorizontal: 10,
        flex: 1,
        borderWidth: 1,
        borderColor: GlobalData.colors.lineLight,
        backgroundColor: '#f9f9f9',
        borderRadius: 3,
        height: 30,
        fontSize: 14,
    },
    items: {
        flexDirection: 'row',
        height: 50,
        borderBottomColor: GlobalData.colors.lineLight,
        borderBottomWidth: 1 / PixelRatio.get(),
        padding: 10,
    },
    itemTitle: {
        justifyContent: 'center',
        flex: 1,
    },
    itemIcon: {
        width: 10,
        justifyContent: 'center',
    },
});

export default connect(
    state => ({
        pageData: state.getIn(['pageData', pageConfig.projectData.pageKey]) && state.getIn(['pageData', pageConfig.projectData.pageKey]).toJS(),
        userData: state.get('userData'),
    })
)(props => {
    const pageConfigData = {
        pageUrl: GlobalData.addParams(GlobalData.user.server + pageConfig.projectData.pageUrl, {
            userId: GlobalData.user.guid,
        }),
        pageKey: pageConfig.projectData.pageKey,
    };
    return (
        <LoadView view={ProjectPage} {...props} {...pageConfigData} />
    );
});