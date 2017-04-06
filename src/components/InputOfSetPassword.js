/**
 * 单选组件
 */
'use strict';
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    PixelRatio,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import GlobalData from '../GlobalData';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { Modal, Ionicons } from '../modules/adapter';

import Header from './Header';
import Button from './Button';

class InputOfSetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            oldVal: '',
            newVal: '',
        };
    }
    onOldPWD(e) {
        this.setState({
            oldVal: e.nativeEvent.text,
        });
    }

    onNewPWD(e) {
        this.setState({
            newVal: e.nativeEvent.text,
        });
    }
    onFinish() {
        if (typeof this.props.onFinish === 'function') {
            this.props.onFinish({
                newPassword: this.state.newVal,
                oldPassword: this.state.oldVal,
            });
        }
        this.setState({
            modalVisible: false,
        });
    }
    onClose() {
        this.setState({
            modalVisible: false,
        });
    }
    rightButton() {
        return (
            <TouchableOpacity
                style={styles.modalRightButton}
                onPress={this.onClose.bind(this)}>
                <Ionicons name="md-close" size={24} color="#ffffff"/>
            </TouchableOpacity>
        );
    }
    showOptions() {
        this.setState({
            modalVisible: true,
        });
    }

    render() {
        return (
            <View>
                <Button text="修改密码" onPress={this.showOptions.bind(this)}/>
                <Modal visible={this.state.modalVisible}>
                    <View style={styles.container}>
                        <Header
                            title="修改密码"
                            rightButton={this.rightButton.bind(this)}
                        />
                        <View style={styles.container}>
                            <TextInput
                                autoFocus
                                style={styles.input}
                                onChange={this.onOldPWD.bind(this)}
                                placeholder="输入旧密码"
                                underlineColorAndroid="transparent"
                            />
                            <TextInput
                                style={styles.input}
                                onChange={this.onNewPWD.bind(this)}
                                placeholder="输入新密码"
                                underlineColorAndroid="transparent"
                            />
                            <Button
                                onPress={this.onFinish.bind(this)}
                                style={{ margin: 20 }}
                                disable={this.state.oldVal === '' || this.state.newVal === ''}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
// <TouchableOpacity onPress={this.showOptions.bind(this)} underlayColor={GlobalData.colors.pressed}>
//     <View style={styles.select}>
//         <View style={styles.selectTitle}>
//             <Text style={{ color: GlobalData.colors.fontStrong }}>修改密码</Text>
//         </View>
//         <View style={styles.selectContent}>
//             <Text style={styles.selectContentText}>...</Text>
//         </View>
//         <View style={styles.selectGo}>
//             <Ionicons name="ios-arrow-forward" color={GlobalData.colors.iconLight} size={15} />
//         </View>
//     </View>
// </TouchableOpacity>
InputOfSetPassword.propTypes = {
    onFinish: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalData.colors.body,
        flex: 1,
        width: Dimensions.get('window').width,
    },
    select: {
        borderBottomColor: GlobalData.colors.lineLight,
        borderBottomWidth: 1 / PixelRatio.get(),
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#fff',
    },
    selectTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    selectContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
    },
    selectGo: {
        width: 20,
        justifyContent: 'center',
    },
    modalView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    picker: {
        backgroundColor: '#ffffff',
    },
    itemStyle: {
        fontSize: 25,
        color: 'red',
        textAlign: 'left',
        fontWeight: 'bold',
    },
    header: {
        height: 30,
        backgroundColor: '#ffffff',
        padding: 5,
        borderBottomColor: GlobalData.colors.lineLight,
        borderBottomWidth: 1 / PixelRatio.get(),
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerBtn: {
        width: 40,
    },
    headerTitle: {
        alignItems: 'center',
        flex: 1,
    },
    headerTitleText: {
        fontSize: 16,
    },
    cell: {
        height: 40,
        justifyContent: 'center',
        marginLeft: 10,
        borderBottomColor: GlobalData.colors.lineLight,
        borderBottomWidth: 1 / PixelRatio.get(),
    },
    modal: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    input: {
        height: 50,
        padding: 10,
        marginTop: 10,
        borderBottomColor: GlobalData.colors.lineLight,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderTopColor: GlobalData.colors.lineLight,
        borderTopWidth: 1 / PixelRatio.get(),
        backgroundColor: '#ffffff',
        fontSize: 14,
    },
    modalRightButton: {
        paddingRight: 10,
        width: 30,
    },
    navBarText: {
        marginTop: 2,
        color: '#ffffff',
        fontSize: 16,
    },
});

export default InputOfSetPassword;
