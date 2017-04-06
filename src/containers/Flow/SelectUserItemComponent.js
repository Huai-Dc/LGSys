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
    PixelRatio,
    Dimensions,
} from 'react-native';

import { Actions, FontAwesome, Ionicons, Modal } from '../../modules/adapter';
import GlobalData from '../../GlobalData';
import SearchUserComponent from './SearchUserComponent';
import Header from '../../components/Header';

class SelectUserItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSelectModal: false,
            addedUser: [],
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        const shouldSelectedUserUpdate = !!nextProps.data.itemVisible && this.props.selectedUser !== nextProps.data.selectedUser;
        const shouldItemDataUpdate = this.props.data !== nextProps.data;

        return shouldItemDataUpdate || shouldSelectedUserUpdate;
    }
    getUser() {
        console.log('get user!');
        this.props.getUser();
    }
    modalRightButton() {
        return (
            <TouchableOpacity
                style={styles.modalRightButton}
                onPress={() => { this.setState({ showModal: false, userSelectModal: false, transmitContent: '' }); }}>
                <Ionicons name="md-close" size={24} color="#ffffff"/>
            </TouchableOpacity>
        );
    }
    getUser(){
        this.setState({
            userSelectModal: !this.state.userSelectModal,
        });
    }
    onUserSelected(selectedUser) {
        console.log('selectedUser', selectedUser);
        this.setState({
            addedUser: [...this.state.addedUser, selectedUser],
            userSelectModal: false,
        });
        this.props.selectUser({
            name: selectedUser.userName,
            userId: selectedUser.userId,
            department: this.props.data.name,
            flowPosId: this.props.data.flowPosId,
        });
    }
    render() {
        const { data } = this.props;
        console.log('data.userList', data.userList);
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={this.props.toggleChildren} >
                    <View style={styles.itemHeader}>
                        <View style={styles.collapse}>
                            {!data.itemVisible ? <FontAwesome name="plus" size={20} color="#ccc" /> : <FontAwesome name="minus" size={20} color="#ccc" /> }
                        </View>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>{data.name}</Text>
                        </View>
                        <View style={styles.number}>
                            <View style={styles.numberTextBox}>
                                <Text style={styles.numberText}>{data.userList.length}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                {!!data.itemVisible && !!data.userList.length && (
                    data.userList.map((itemData, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={this.props.selectUser.bind(null, { name: itemData.userName, userId: itemData.userId, department: data.name, flowPosId: data.flowPosId })}>
                                <View style={styles.childItem}>
                                    <View style={styles.action}>
                                        {console.log('hhxixi', !this.props.selectedUser[itemData.userId])}
                                        {!this.props.selectedUser[itemData.userId] ? <Ionicons name="ios-checkbox-outline" size={20} color="#ccc" /> : <Ionicons name="ios-checkbox" size={20} color={GlobalData.colors.main} />}
                                    </View>
                                    <View style={styles.title}>
                                        <Text style={styles.titleText}>{itemData.name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                )}
                {!!data.itemVisible && !!this.state.addedUser && !!this.state.addedUser.length && (
                    this.state.addedUser.map((itemData, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={this.props.selectUser.bind(null, { ...itemData, department: data.name, flowPosId: data.flowPosId })}>
                                <View style={styles.childItem}>
                                    <View style={styles.action}>
                                        {console.log('hhxixi', !this.props.selectedUser[itemData.userId])}
                                        {!this.props.selectedUser[itemData.userId] ? <Ionicons name="ios-checkbox-outline" size={20} color="#ccc" /> : <Ionicons name="ios-checkbox" size={20} color={GlobalData.colors.main} />}
                                    </View>
                                    <View style={styles.title}>
                                        <Text style={styles.titleText}>{itemData.userName}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                )}
                {!!data.itemVisible && (
                    <TouchableOpacity onPress={this.getUser.bind(this)}>
                        <View style={styles.childItem}>
                            <View style={styles.title}>
                                <Text style={{ marginLeft: 10 }}>选择指定人员</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                {!!this.state.userSelectModal && (
                    <Modal visible>
                        <Header title="搜索人员" rightButton={this.modalRightButton.bind(this)} />
                        <View style={styles.modalBox}>
                            <SearchUserComponent onSelected={this.onUserSelected.bind(this)} />
                        </View>
                    </Modal>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemHeader: {
        flexDirection: 'row',
        height: 50,
        borderBottomColor: GlobalData.colors.lineStrong,
        borderBottomWidth: 1 / PixelRatio.get(),
        backgroundColor: '#f6f6f6',
    },
    collapse: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        justifyContent: 'center',
    },
    number: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberTextBox: {
        backgroundColor: '#eeeeee',
        borderRadius: 10,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    numberText: {
    },
    childItem: {
        flexDirection: 'row',
        height: 40,
        borderBottomColor: GlobalData.colors.lineLight,
        borderBottomWidth: 1 / PixelRatio.get(),
    },
    action: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        flex: 1,
        backgroundColor: '#ffffff',
        width: Dimensions.get('window').width,
    },
    modalRightButton: {
        paddingRight: 10,
        width: 30,
    },
});

export default SelectUserItemComponent;
