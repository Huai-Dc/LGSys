/**
 * Created by sujiexu on 16/6/16.
 */
import { Modal, View, ToastAndroid } from 'react-native';
import React from 'react';
import { FontAwesome, Ionicons, MaterialIcons } from '../web/modules/fontIcons/index';
import SwipeableViews from 'react-swipeable-views';
import { Actions } from '../web/testPage/NavigatorView';


const KeyboardSpacer = function () {
    return <View />;
};
const Communications = {
    phonecall(phoneNumber, bool) {
        console.log(phoneNumber);
    },
}
const Toast = ToastAndroid;
export {
    Modal,
    Actions,
    FontAwesome,
    Ionicons,
    MaterialIcons,
    KeyboardSpacer,
    SwipeableViews,
    Communications,
    Toast,
};
