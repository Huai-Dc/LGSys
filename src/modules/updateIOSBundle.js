'use strict';
import { Platform, AsyncStorage } from 'react-native';

import RNFS from 'react-native-fs';
import GlobalData from '../GlobalData';
import pageConfig from '../pageConfig';

const STORAGE_APP_VERSION_KEY = 'STORAGE_APP_VERSION_KEY';

function updateBundle() {
    AsyncStorage.getItem(STORAGE_APP_VERSION_KEY)
        .then((appVersion) => {
            GlobalData.GET(pageConfig.checkIOSVersion).then((data) => {
                if (Platform.OS === 'ios') {
                    const onlineVersion = data.version;
                    if (appVersion === onlineVersion) {
                        //alert('same');
                        return;
                    }

                    const bundleUrl = data.url.url;
                    const filepath = RNFS.DocumentDirectoryPath + '/bundle_tmp';
                    const destpath = RNFS.DocumentDirectoryPath + '/bundle';

                    RNFS.downloadFile(bundleUrl, filepath).then(data => {
                        //alert('loaded!');
                        RNFS.unlink(destpath).then(() => {
                            RNFS.moveFile(filepath, destpath).then(() => {
                                AsyncStorage.setItem(STORAGE_APP_VERSION_KEY, String(onlineVersion));
                            });
                        }, (e) => {
                            console.log(e);
                            RNFS.moveFile(filepath, destpath).then(() => {
                                AsyncStorage.setItem(STORAGE_APP_VERSION_KEY, String(onlineVersion));
                            });
                        });
                    }, err => {
                        console.log(err);
                    });
                }
            }, (e) => {
                console.log('error !!', e);
            });

            console.log('appVersion end', appVersion);
        });
}

export default updateBundle;
module.exports = updateBundle;
