/**
 * Created by sujiexu on 17/5/9.
 */
import React, { Component } from 'react';
import {
    ListView, View, Text, Image, StyleSheet,
    TouchableOpacity, Dimensions,
} from 'react-native';

const screenW = Dimensions.get('window').width;
const cols = 3;
const cellWH = 100;
const vMargin = (screenW - cellWH * cols) / (cols + 1);
const hMargin = 25;

let shareData = [
        { name: '项目管理', eName: 'PROJECT', iconUri: require('../../assets/homeIcon/index_PROJECT.png') },
        { name: '制度流程体系', eName: 'SYSTEM', iconUri: require('../../assets/homeIcon/index_SYSTEM.png') },
        { name: '专业标准体系', eName: 'PROFESSION', iconUri: require('../../assets/homeIcon/index_PROFESSION.png') },
        { name: '产品线体系', eName: 'PRODUCT', iconUri: require('../../assets/homeIcon/index_PRODUCT.png') },
        { name: '产品成本体系', eName: 'COST', iconUri: require('../../assets/homeIcon/index_COST.png') },
        { name: '人才管理体系', eName: 'TALENT', iconUri: require('../../assets/homeIcon/index_TALENT.png') },
        { name: '供应商管理', eName: 'SUPPLIER', iconUri: require('../../assets/homeIcon/index_SUPPLIER.png') },
        { name: '设计论剑', eName: 'DESIGN', iconUri: require('../../assets/homeIcon/index_DESIGN.png') },
        { name: '地区风采', eName: 'STYLE', iconUri: require('../../assets/homeIcon/index_STYLE.png') },
    ];

class sysListView extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(shareData),
        };
    }

    renderRow(rowData) {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <View style={styles.itemStyle}>
                    <Image source={rowData.iconUri} style={styles.itemImageStyle}/>
                    <Text>{rowData.name}</Text>
                    <Text style={styles.eNameStyle}>{rowData.eName}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                contentContainerStyle={styles.contentViewStyle}
            />
        );
    }
}

const styles = StyleSheet.create({
    contentViewStyle: {
        // 主轴方向
        flexDirection: 'row',
        flexWrap: 'wrap',  // 换行
        alignItems: 'center',
        marginBottom: 50,
    },
    itemStyle: {
        alignItems: 'center',
        width: cellWH,
        height: cellWH,
        marginLeft: vMargin,
        marginTop: hMargin,
    },
    itemImageStyle: {
        width: 60,
        height: 60,
        marginBottom: 5,
    },
    eNameStyle: {
        color: '#a4a4a4',
        fontSize: 12,
    },
});

export default sysListView;