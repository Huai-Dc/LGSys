/**
 * Created by sujiexu on 16/8/25.
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicatorIOS,
    ProgressBarAndroid,
    Platform,
    PixelRatio,
} from 'react-native';
import RNFS from 'react-native-fs';
import FileOpener from 'react-native-file-opener';
import GlobalData from '../../GlobalData';
import { Circle } from 'react-native-progress';
import mimeType from '../../modules/mimeType';


const ProgressIndicator = Platform.OS === 'ios' ? Circle : ProgressBarAndroid;


class DownloadItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            fileLoaded: false,
            fileLoading: false,
        };
        this.sampleFileURL = props.data.url;
        this.sampleFilePath = GlobalData.FilePath + '/' + props.data.guid + props.data.ext;
    }

    componentWillMount() {
        RNFS.readDir(GlobalData.FilePath).then(() => {
            console.log('dir is there');
        }, () => {
            RNFS.mkdir(GlobalData.FilePath).then(() => {
                console.log('dir created!');
            }, () => {
                console.log('dir create err!');
            });
        })
        RNFS.exists(this.sampleFilePath).then((e) => {
            this.setState({
                fileLoaded: e,
            });
        }, e => {
            console.log('err:', e);
        });
    }
    doDownload() {
        const This = this;
        This.setState({
            progress: 0,
            fileLoading: true,
            fileLoaded: false,
        });
        RNFS.downloadFile({
            fromUrl: this.sampleFileURL,
            toFile: this.sampleFilePath,
            progress(res) {
                This.setState({
                    progress: (res.bytesWritten / res.contentLength).toFixed(2),
                });
            },
        }).promise.then(() => {
            This.setState({
                progress: 100,
                fileLoaded: true,
                fileLoading: false,
            });
        }, (e) => {
            console.log('err:', e);
            This.setState({
                progress: 0,
                fileLoaded: false,
                fileLoading: false,
            });
        });
    }
    openFile() {
        FileOpener.open(
            this.sampleFilePath,
            mimeType[this.props.data.ext.replace('.', '')]
        ).then(() => {
            console.log('flie open success!!');
        }, e => {
            console.log('error!!');
        });
    }
    render() {
        const { data } = this.props;
        return (
            <View style={styles.fileItem}>
                <View style={styles.fileItemTitle}>
                    <Text>{data.name + data.ext}</Text>
                </View>
                {this.state.fileLoaded ? (
                    <View style={styles.fileItemBtn}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.openFile.bind(this)}>
                            <Text style={styles.btnText}>打开</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.doDownload.bind(this)}>
                            <Text style={styles.btnText}>重新下载</Text>
                        </TouchableOpacity>
                    </View>
                ) : this.state.fileLoading ? (
                    <View style={styles.fileItemBtn}>
                        <ProgressIndicator progress={Number(this.state.progress)} size={24} color={GlobalData.colors.main} />
                    </View>
                ) : (
                    <View style={styles.fileItemBtn}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.doDownload.bind(this)}>
                            <Text style={styles.btnText}>下载</Text>
                        </TouchableOpacity>
                    </View>
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
    fileItem: {
        padding: 10,
        borderColor: GlobalData.colors.lineLight,
        borderBottomWidth: 1 / PixelRatio.get(),
        flexDirection: 'row',
        height: 50,
    },
    fileItemTitle: {
        flex: 1,
        justifyContent: 'center',
    },
    fileItemBtn: {
        flexDirection: 'row',
    },
    button: {
        height: 30,
        alignSelf: 'stretch',
        backgroundColor: '#ef473a',
        borderColor: '#e42112',
        borderWidth: 1,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: 5,
        marginLeft: 5,
    },
    btnText: {
        color: '#ffffff',
    },
});

export default DownloadItem;
