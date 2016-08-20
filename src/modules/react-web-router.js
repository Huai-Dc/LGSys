'use strict';
import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NativeModules,
    Platform,
} from 'react-native';
import { Router as ORouter, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import NavigatorView from '../web/testPage/NavigatorView';
function Hello(props) {
    return (
        <View><Text>Test View</Text></View>
    )
}
function Routes(props) {
    return (
        <View path="/FacultyPage" component={Hello} />
    )
}
function Router(props) {
    console.log('Router props', props);
    return (
        <ORouter history={hashHistory}>
            <Route path="/" component={NavigatorView} >
                {props.children}
            </Route>
        </ORouter>
    );
}
//function Scene(props) {
//    console.log('scene props', props);
//    if (props.key === 'root') {
//        return (
//            <Route path="/" component={NavigatorView} {...props}/>
//        );
//    }
//    return (
//        <Route {...props}/>
//    );
//}
class ZZScenes extends Component {
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }
    render() {
        console.log('scene props', this.props);
        if (this.props.key !== 'root') {
            return (
                <View></View>
            );
        }

    }
}

//class Routes extends Component {
//    render() {
//        return (
//            <Router history={hashHistory}>
//                <Route path="/" component={NavigatorView}>
//                    <Route path="/FacultyPage" title="FacultyPage" component={FacultyPage} />
//                    <Route path="/FacultyContentPage" title="FacultyContentPage" component={PageF} />
//                </Route>
//            </Router>
//        );
//    }
//};

export { Router, ZZScenes };
