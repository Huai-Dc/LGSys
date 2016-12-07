/**
 * Created by sujiexu on 16/8/23.
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    ScrollView,
    PixelRatio,
    Dimensions,
} from 'react-native';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import GlobalData from '../../GlobalData';
import { Ionicons, Toast, Modal, Actions } from '../../modules/adapter';
import { connect } from 'react-redux';

class SearchUserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            keyword: '',
            loading: false,
            selectedUser: null,
            btnPending: false,
        };
    }
    handleKeywordChange(keyword) {
        this.setState({
            keyword,
        });
    }
    handleSearch() {
        this.setState({
            loading: true,
            keyword: '',
        });
        GlobalData.GET(GlobalData.user.server + '/home/SearchSysUserList', {
            keyWord: this.state.keyword,
        }).then(data => {
            if (!data.length) {
                Toast.show('没有相关数据!', 1);
            }
            this.setState({
                users: data,
                loading: false,
            });
        }, err => {
            console.log(err);
            this.setState({
                loading: false,
            });
        });
    }
    chooseUser(user) {
        if (typeof this.props.onSelected === 'function') this.props.onSelected(user);
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <TextInput
                        onChangeText={this.handleKeywordChange.bind(this)}
                        onSubmitEditing={this.handleSearch.bind(this)}
                        style={styles.searchInput}
                        placeholder="输入搜索人员姓名"
                        value={this.state.keyword}
                    />
                    <Button
                        disable={this.state.keyword === ''}
                        onPress={this.handleSearch.bind(this)}
                        style={styles.searchBtn}
                        text="搜索"
                    />
                </View>
                <ScrollView style={styles.items}>
                    {this.state.loading && (
                        <Loading />
                    )}
                    {!!this.state.users.length && this.state.users.map((user, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.itemBtn}
                                onPress={this.chooseUser.bind(this, user)}>
                                <View style={styles.item}>
                                    <Ionicons name="ios-checkmark-circle-outline" style={styles.icon} size={30} color="#ccc" />
                                    <Text style={styles.userName}>{user.userName}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex: {
        flex: 1,
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
    searchBtn: {
        width: 50,
        height: 30,
        borderRadius: 3,
        marginLeft: 5,
    },
    items: {
        flex: 1,
        padding: 10,
        backgroundColor: GlobalData.colors.body,
    },
    itemBtn: {
        height: 50,
        borderWidth: 1,
        borderColor: GlobalData.colors.lineLight,
        borderRadius: 5,
        paddingBottom: 10,
        backgroundColor: '#ffffff',
        marginTop: 10,
    },
    item: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        flex: 1,
        fontSize: 18,
    },
    icon: {
        margin: 10,
    },
    bottomBar: {
        height: 50,
        borderColor: GlobalData.colors.iconLight,
        borderTopWidth: 1 / PixelRatio.get(),
        padding: 5,
        paddingLeft: 0,
        flexDirection: 'row',
    },
    bottomBarButton: {
        flex: 1,
        paddingLeft: 5,
    },
    modalBox: {
        flex: 1,
        backgroundColor: '#ffffff',
        width: Dimensions.get('window').width,
    },
    input: {
        marginTop: 5,
        height: 80,
        backgroundColor: '#fafafa',
        textAlignVertical: 'top',
        textAlign: 'left',
        padding: 5,
        borderColor: GlobalData.colors.lineLight,
        borderWidth: 1 / PixelRatio.get(),
    },
    modalRightButton: {
        paddingRight: 10,
        width: 30,
    },
});

export default SearchUserComponent;
