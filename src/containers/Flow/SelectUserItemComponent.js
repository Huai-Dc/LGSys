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
} from 'react-native';

import { Actions, FontAwesome, Ionicons } from '../../modules/adapter';
import GlobalData from '../../GlobalData';

class SelectUserItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps, nextState) {
        const shouldSelectedUserUpdate = !!nextProps.data.itemVisible && this.props.selectedUser !== nextProps.data.selectedUser;
        const shouldItemDataUpdate = this.props.data !== nextProps.data;

        return shouldItemDataUpdate || shouldSelectedUserUpdate;
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
                            <TouchableOpacity key={index} onPress={this.props.selectUser.bind(null, { ...itemData, department: data.name, flowPosId: data.flowPosId })}>
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
});

export default SelectUserItemComponent;
