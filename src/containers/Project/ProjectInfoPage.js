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
    goProjectDetailPage(proj) {
        Actions.ProjectDetailPage({
            projId: proj.projId,
            title: proj.name,
        });
    }
    render() {
        console.log(this.props.pageData);
        const { pageData } = this.props;
        const sections = [];
        for (let i = 0, len = pageData.projList.length; i < len; i += 2) {
            const item1 = pageData.projList[i];
            const item2 = pageData.projList[i + 1];
            sections.push(
                <View key={i} style={styles.section}>
                    <TouchableHighlight onPress={this.goProjectDetailPage.bind(this, item1)} style={styles.sectionItem} underlayColor={GlobalData.colors.pressed} >
                        <View style={styles.sectionItemBox}>
                            <NetImage style={styles.sectionItemImage} url={item1.thumbPic} />
                            <View style={styles.sectionItemInfo}>
                                <Text style={styles.sectionItemName}>{item1.name}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    {!!item2 && (
                        <TouchableHighlight onPress={this.goProjectDetailPage.bind(this, item2)} style={styles.sectionItem} underlayColor={GlobalData.colors.pressed}>
                            <View style={styles.sectionItemBox}>
                                <NetImage style={styles.sectionItemImage} url={item2.thumbPic} />
                                <View style={styles.sectionItemInfo}>
                                    <Text style={styles.sectionItemName}>{item2.name}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )}
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <ScrollView style={styles.flex}>
                    <View style={styles.sections}>
                        {sections}
                    </View>
                </ScrollView>
            </View>
        );
    }
}
ProjectInfoPage.propTypes = {
    pageData: PropTypes.object,
};

// <View style={styles.header}>
//     <View style={styles.headerTitle}>
//         <NetImage url={pageData.thumbPic} style={styles.headerImage}/>
//     </View>
//     <View style={styles.headerInfo}>
//         <Text style={styles.headerText}>总占地面积: {pageData.area}</Text>
//         <Text style={styles.headerText}>总建筑面积: {pageData.BuildArea}</Text>
//         <Text style={styles.headerText}>容积率: 住宅{pageData.volumeRate}%</Text>
//     </View>
// </View>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: GlobalData.headerbarHeight,
    },
    flex: {
        flex: 1,
    },
    header: {
        backgroundColor: '#eeeeee',
        flexDirection: 'row',
        padding: 10,
    },
    headerTitle: {
        
    },
    headerImage: {
        width: 80,
        height: 60,
    },
    headerInfo: {
        flex: 1,
        marginLeft: 10,
    },
    headerText: {
        marginBottom: 5,
    },
    sections: {
    },
    section: {
        paddingTop: 10,
        paddingRight: 10,
        flexDirection: 'row',
    },
    sectionItem: {
        flex: 1,
        padding: 5,
        borderColor: GlobalData.colors.lineLight,
        borderWidth: 1 / PixelRatio.get(),
        marginLeft: 10,
    },
    sectionItemBox: {
        flexDirection: 'row',
    },
    sectionItemImage: {
        height: 50,
        width: 50,
    },
    sectionItemInfo: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 5,
    },
    sectionItemName: {

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
    return (
        <LoadView view={ProjectInfoPage} {...props} />
    );
});
