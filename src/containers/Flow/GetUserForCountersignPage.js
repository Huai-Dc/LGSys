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
import GlobalData from '../../GlobalData';
import SearchUserComponent from './SearchUserComponent';
import Header from '../../components/Header';
import { Modal, Ionicons } from '../../modules/adapter';

class GetUserForCountersignPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSelectModal: false,
        };
    }

    modalRightButton() {
        return (
            <TouchableOpacity
                style={styles.modalRightButton}
                onPress={() => { this.setState({ userSelectModal: false }); }}>
                <Ionicons name="md-close" size={24} color="#ffffff"/>
            </TouchableOpacity>
        );
    }
    showModal() {
        this.setState({
            userSelectModal: !this.state.userSelectModal,
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.hhh}
                    onPress={this.showModal.bind(this)}>
                    <Text>hhhhh</Text>
                </TouchableOpacity>

                {!!this.state.userSelectModal && (
                    <Modal visible>
                        <Header title="搜索人员" rightButton={this.modalRightButton.bind(this)} />
                        <View style={styles.modalBox}>
                            <SearchUserComponent onSelected={this.props.onUserSelected} />
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
        marginTop: GlobalData.headerbarHeight,
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

export default GetUserForCountersignPage;
