/**
 * 网络图片组件
 * @example: <NetImage style={{width:100, height: 80}} url='http://192.168.1.106:9000/appData/p1.jpg' />
 */
'use strict';
import React, { Component, PropTypes } from 'react';
import {
    Image,
    StyleSheet,
    Animated,
} from 'react-native';
import { noPic } from '../assets/assets';
const DefaultImage = noPic;

const animatedOpacity = new Animated.Value(0);

class NetImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            loading: false,
            progress: 0,
            imageUri: null,
        };
    }

    componentWillMount() {
        this.setState({
            imageUri: this.props.url ? { uri: this.props.url } : DefaultImage,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.url !== this.props.url) {
            this.setState({
                imageUri: nextProps.url ? { uri: nextProps.url } : DefaultImage,
            });
        }
    }

    onLoad() {
        Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: 400,
        }).start();
    }

    onProgress(e) {
        this.setState({
            progress: Math.round(100 * e.nativeEvent.loaded / e.nativeEvent.total),
        });
    }

    onError(e) {
        this.setState({
            error: e.nativeEvent.error,
            loading: false,
            imageUri: DefaultImage,
        });
    }

    render() {
        return (
            <Animated.View ref="imageBox" style={{ opacity: animatedOpacity }}>
                <Image
                    source={this.state.imageUri}
                    style={[styles.base, this.props.style]}
                    onLoadStart={() => this.setState({ loading: true })}
                    onError={this.onError.bind(this)}
                    onProgress={this.onProgress.bind(this)}
                    onLoad={this.onLoad.bind(this)}
                />
            </Animated.View>
        );
    }
}
NetImage.propTypes = {
    url: PropTypes.string.isRequired,
    style: PropTypes.any,
};

const styles = StyleSheet.create({
    base: {
        width: 38,
        height: 38,
        backgroundColor: '#eeeeee',
        overflow: 'hidden',
    },
    progress: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        width: 100,
    },
});

export default NetImage;
