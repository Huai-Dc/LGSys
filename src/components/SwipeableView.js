/**
 * Created by sujiexu on 16/7/25.
 */
'use strict';
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { SwipeableViews } from '../modules/adapter';
import GlobalData from '../GlobalData';

class SwipeableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
    }
    changeIndex(index) {
        this.setState({
            index,
        });
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <SwipeableViews style={styles.swiperBanner} onChangeIndex={this.changeIndex.bind(this)}>
                    {this.props.children}
                </SwipeableViews>
                <View style={[styles.navIcons, this.props.paginationStyle]}>
                    {this.props.children.map((item, index) => {
                        if (this.state.index === index) {
                            return <View key={index}>{this.props.activeDot}</View>;
                        }
                        return <View key={index}>{this.props.dot}</View>;
                    })}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    navIcons: {
        flexDirection: 'row',
        marginTop: -15,
        height: 15,
        alignSelf: 'center',
    },
    activeDot: {
        height: 6,
        width: 6,
        borderRadius: 3,
        backgroundColor: GlobalData.colors.main,
        margin: 3,
    },
    dot: {
        height: 6,
        width: 6,
        borderRadius: 3,
        backgroundColor: GlobalData.colors.body,
        margin: 3,
    },
    swiperBanner: {
        height: 100,
    },
});
SwipeableView.propTypes = {
    style: PropTypes.any,
    dot: PropTypes.element,
    activeDot: PropTypes.element,
    paginationStyle: PropTypes.any,
    children: PropTypes.any,
}
SwipeableView.defaultProps = {
    style: null,
    dot: <View style={styles.dot} />,
    activeDot: <View style={styles.activeDot} />,
    paginationStyle: null,
}

export default SwipeableView;