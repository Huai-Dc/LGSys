/**
 * Created by sujiexu on 16/8/17.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    PixelRatio,
    ListView,
    TextInput,
    Dimensions,
} from 'react-native';

import LoadView from '../modules/LoadView';
import pageConfig from '../pageConfig';
import { connect } from 'react-redux';
import GlobalData from '../GlobalData';
import { Actions, Ionicons } from '../modules/adapter';
import Button from '../components/Button';

class CompanyIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            matchedCompanyList: [],
            selectedCompany: undefined,
            textValue: '',
        };
    }

    selectCompany(company) {
        this.setState({
            selectedCompany: company,
            textValue: company.name,
            matchedCompanyList: [],
        });
    }
    enterCompanyName(name) {
        if (name === '') {
            this.setState({
                matchedCompanyList: [],
                selectedCompany: undefined,
                textValue: name,
            })
            return;
        }
        const tempList = this.props.pageData.filter(item => item.name.indexOf(name) > -1);

        this.setState({
            matchedCompanyList: tempList,
            textValue: name,
        });
    }
    goLogin() {
        Actions.LoginPage({
            companyData: this.state.selectedCompany,
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>请输入公司名称</Text>
                <View style={styles.inputBox}>
                    <View style={styles.inputBorder}>
                        <TextInput
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="公司名称"
                            onChangeText={this.enterCompanyName.bind(this)}
                            ref="input"
                            value={this.state.textValue}
                        />
                    </View>
                    <Button
                        style={{transform: [{ 'translate': [0,0,1]}], marginTop: 20 }}
                        onPress={this.goLogin.bind(this)}
                        text="开始使用"
                        disable={this.state.selectedCompany === undefined}
                    />
                    <View style={styles.hintList}>
                        {this.state.matchedCompanyList.map((com, i) => {
                            return (
                                <TouchableHighlight
                                    key={i}
                                    onPress={this.selectCompany.bind(this, com)}
                                    underlayColor="#eee"
                                    style={styles.hintButton}>
                                    <Text>{com.name}</Text>
                                </TouchableHighlight>
                            );
                        })}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: GlobalData.colors.body,
    },
    title: {
        marginTop: 100,
        fontSize: 20,
    },
    inputBox: {
        position: 'relative',
        alignSelf: 'stretch',
    },
    hintList: {
        backgroundColor: '#fefefe',
        position: 'absolute',
        transform: [{ 'translate': [0,0,1] }],
        top: 50,
        alignSelf: 'stretch',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 3,
    },
    hintButton: {
        width: Dimensions.get('window').width - 20,
        height: 40,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        padding: 10,
    },
    inputBorder: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        alignSelf: 'stretch',
        padding: 10,
    },
    button: {
        height: 40,
        alignSelf: 'stretch',
        backgroundColor: '#ef473a',
        borderColor: '#e42112',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default connect()(props => <LoadView pageUrl={pageConfig.indexUrl} view={CompanyIndex} {...props}/>);
