/**
 * 页签组件
 */
'use strict';

import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    PixelRatio,
} from 'react-native';
import GlobalData from '../GlobalData';

class TabBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentViewIndex: 0,
        };
    }
    tabView(key) {
        this.setState({ currentViewIndex: key });
    }
    render() {
        const currentTabView = this.props.data[this.state.currentViewIndex].view(this.state.currentViewIndex);
        return (
            <View style={styles.flex}>
                <View style={styles.tabHeader}>
                    {this.props.data.map((item, key) => {
                        const hasBorder = key + 1 !== this.props.data.length && {
                            borderRightColor: GlobalData.colors.lineStrong,
                            borderRightWidth: 1 / PixelRatio.get(),
                        };
                        const hightlinghted = key === this.state.currentViewIndex && { color: GlobalData.colors.fontOrange };
                        return (
                            <TouchableOpacity
                                key={key}
                                style={styles.tabTitleBox}
                                onPress={this.tabView.bind(this, key)}>
                                <View style={[styles.tabTitle, hasBorder]}>
                                    <Text style={hightlinghted}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style={styles.flex}>
                    {currentTabView}
                </View>
            </View>
        );
    }
}
TabBox.propTypes = {
    data: PropTypes.array,
};
TabBox.defaultProps = {
    data: [
        {
            title: 'tab1',
            view(index) {
                return (
                    <View><Text>{index}</Text></View>
                );
            },
        },
        {
            title: 'tab2',
            view(index) {
                return (
                    <View><Text>{index}</Text></View>
                );
            },
        },
    ],
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    tabHeader: {
        flexDirection: 'row',
        height: 50,
        borderBottomColor: GlobalData.colors.lineStrong,
        borderBottomWidth: 1 / PixelRatio.get(),
    },
    tabTitleBox: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
    },
    tabTitle: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TabBox;
