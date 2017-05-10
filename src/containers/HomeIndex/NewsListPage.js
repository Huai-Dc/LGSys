/**
 * Created by sujiexu on 17/5/10.
 */
import React, { Component } from 'react';
import {
    ListView, View, Text, Image, StyleSheet,
    ScrollView,
} from 'react-native';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class NewsListPage extends Component {
    constructor(props) {
        super(props);
        // 初始状态]
        console.log(this.props)
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
    }
    renderRow(rowData) {
        return (
            <View>
                <Text>{rowData.name}</Text>
            </View>
        );
    }

    render() {
        console.log(this.props)
        return (
            <View>
                <View style={styles.listSectionHeader}>
                    <Text>新闻快讯</Text>
                </View>
                <View style={styles.container}>
                    <ScrollView>
                        {this.state.dataSource ? (
                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRow}
                                contentContainerStyle={styles.contentViewStyle}
                                initialListSize={5}
                                pageSize={5}
                            />
                        ) : (
                            <View style={styles.center}><Text>列表加载中...</Text></View>
                        )}
                    </ScrollView>
                </View>
            </View>
        );
    }

    componentDidMount() {
        console.log(this.state);
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        height: 100,
    },
    listSectionHeader: {
        backgroundColor: '#eee',
        height: 30,
        padding: 5,
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
});

export default NewsListPage;