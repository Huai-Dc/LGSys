/**
 * Created by sujiexu on 16/6/16.
 */
const Ionicons = require('react-native-vector-icons/Ionicons');
const FontAwesome = require('react-native-vector-icons/FontAwesome');
const MaterialIcons = require('react-native-vector-icons/MaterialIcons');

import { ToastAndroid } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Modal from 'react-native-root-modal';
import { Actions } from 'react-native-router-flux';
import SwipeableViews from 'react-swipeable-views/lib/index.native.scroll.js';
import Communications from 'react-native-communications';

const Toast = {
    show(msg) {
        ToastAndroid.show(msg, 900);
    },
};
export {
    Actions,
    Modal,
    FontAwesome,
    Ionicons,
    MaterialIcons,
    KeyboardSpacer,
    SwipeableViews,
    Communications,
    Toast,
};
