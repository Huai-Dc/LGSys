/**
 * Created by sujiexu on 16/8/19.
 */
'use strict';
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    PixelRatio,
    TextInput,
    Image,
    Dimensions,
} from 'react-native';

import LoadView from '../../modules/LoadView';
import pageConfig from '../../pageConfig';
import { connect } from 'react-redux';
import GlobalData from '../../GlobalData';
import { Actions, FontAwesome, Modal } from '../../modules/adapter';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { avatar } from '../../assets/assets';

class FlowApproveLogPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.pageData);
        const { pageData } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.line}/>
                <ScrollView style={styles.flex}>
                    {pageData.map((item, index) => {
                        return (
                            <View key={index} style={styles.item}>
                                <View style={styles.avatar}>
                                    <Image source={avatar} style={styles.avatarImage} />
                                </View>
                                <View style={{ width: 20 }}>
                                    <FontAwesome name="check-circle" color={GlobalData.colors.main} size={18} style={{ backgroundColor: '#fff' }}/>
                                </View>
                                <View style={styles.info}>
                                    <View style={styles.actionInfo}>
                                        <Text style={styles.actionType}>{item.actionTypeName}</Text>
                                        <Text style={styles.actionDate}>{item.createDate}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.preStepName}>{item.approvalUser} - {item.preStepName}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.content}>{item.content}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}
FlowApproveLogPage.propTypes = {
    pageData: PropTypes.array,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: GlobalData.headerbarHeight,
    },
    flex: {
        flex: 1,
    },
    line: {
        position: 'absolute',
        top: 0,
        left: 85,
        width: 2,
        height: 10000,
        backgroundColor: GlobalData.colors.main,
    },
    item: {
        padding: 10,
        flexDirection: 'row',
    },
    avatar: {
        width: 60,
        alignItems: 'center',
        marginRight: 8,
    },
    avatarImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#ffffff',
    },
    avatarName: {
        marginTop: 5,
        fontSize: 12,
    },
    info: {
        flex: 1,
        paddingLeft: 10,
    },
    title: {
        fontSize: 16,
    },
    actionInfo: {
        flexDirection: 'row',
    },
    actionType: {
        fontSize: 16,
        flex: 1,
    },
    actionDate: {
        color: GlobalData.colors.fontLight,
    },
    preStepName: {
        marginTop: 5,
        fontSize: 12,
        color: GlobalData.colors.fontLight,
    },
    content: {
        marginTop: 5,
        fontSize: 14,
        color: GlobalData.colors.fontLight,
    },
});

export default connect(
    state => ({
        userData: state.get('userData'),
    })
)(props => {
    const pageConfigData = {
        pageUrl: 'http://192.168.1.178:9012/home/GetCommonApproveLog?flowInstanceId=3895',
    };
    return (
        <LoadView view={FlowApproveLogPage} {...props} {...pageConfigData} />
    );
});
