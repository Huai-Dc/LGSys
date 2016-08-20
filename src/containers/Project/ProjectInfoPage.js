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
    TouchableHighlight,
    PixelRatio,
    TextInput,
    Image,
    Dimensions,
} from 'react-native';

import LoadView from '../../modules/LoadView';
import pageConfig from '../../pageConfig';
import { connect } from 'react-redux';
import GlobalData from '../../GlobalData';
import { Actions, FontAwesome } from '../../modules/adapter';
import NetImage from '../../components/NetImage';

class ProjectInfoPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.pageData);
        const { pageData } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.flex}>
                    <View>
                        <NetImage url={pageData.thumbPic} />
                        <View>
                            <Text>{pageData.name}</Text>
                            <Text>总占地面积: {pageData.area}</Text>
                            <Text>总建筑面积: {pageData.BuildArea}</Text>
                            <Text>容积率: 住宅{pageData.volumeRate}%</Text>
                        </View>
                    </View>
                    <View style={styles.flex}>
                        {pageData.projList.map((item, index) => {
                            return (
                                <TouchableHighlight key={index} style={styles.item}>
                                    <View>
                                        <View style={styles.avatar}>
                                            <NetImage url={item.thumbPic} />
                                        </View>
                                        <View style={styles.info}>
                                            <View style={styles.actionInfo}>
                                                <Text style={styles.actionType}>{item.name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        );
    }
}
ProjectInfoPage.propTypes = {
    pageData: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: GlobalData.headerbarHeight,
    },
    flex: {
        flex: 1,
    },
    item: {
        width: Dimensions.get('window').width / 2 - 60,
        backgroundColor: '#ff6600',
    },

});

export default connect(
    state => ({
        userData: state.get('userData'),
    })
)(props => {
    const pageConfigData = {
        pageUrl: 'http://192.168.1.178:9012/home/EngineerInfo?engId=32',
    };
    return (
        <LoadView view={ProjectInfoPage} {...props} {...pageConfigData} />
    );
});
