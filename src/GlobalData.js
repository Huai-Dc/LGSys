/**
 * 系统全局数据
 */
import {
    Platform,
} from 'react-native';

import TimerMixin from 'react-timer-mixin';
import { Toast } from './modules/adapter';
const appVersion = 'V0';
import RNFS from 'react-native-fs';

const requestTimeout = 20000;


/**
 * 注:所有下一页都是通过改变page参数获取,默认0和1为第一页
 */
const Data = {
    // 网络连接状态信息
    netInfo: {
        connectionInfo: 'init',
        isExpensive: false,
        isConnected: true,
    },
    FilePath: Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath + '/files' : RNFS.ExternalDirectoryPath + '/files',

    headerbarHeight: Platform.OS === 'ios' ? 64 : 55,

    // 系统常量定义
    STORAGE_UESER_KEY: 'user_key',
    STORAGE_HOME_DATA_KEY: 'home_key',
    STORAGE_TIPS_DATA_KEY: 'tips_key',
    STORAGE_COOKBOOK_DATA_KEY: 'cookbook_key',
    STORAGE_APP_VERSION_KEY: 'STORAGE_APP_VERSION_KEY',

    getUserData() {
        return this.userData;
    },

    user: {
        // userId: data.userId,
        // name: data.name,
        // server: this.props.companyData.url,
        // logo: this.props.companyData.logo,
    },
    // server: this.props.companyData.url,
    
    // 统一风格样式定义
    colors: {
        body: '#f3f3f3',
        page: '#ffffff',
        pressed: '#e1e1e1',
        lineLight: '#eeeeee',
        lineStrong: '#b3b3b3',
        fontLight: '#999999',
        fontNormal: '#666666',
        fontStrong: '#333333',
        fontStrong2: '#1b1b1b',
        fontBule: '#00acde',
        fontOrange: '#ff5019',
        fontOrangeLight: '#fd865b',
        iconLight: '#cccccc',
        orange: '#ff5019',
        footerBar: '#ffffff',
        highlight: '#ff6600',
        main: '#d33e39',
        mainLight: '#e73318',
        mainStrong: '#b41f19',
    },

    // 解析服务器返回的html字符串,
    // 字符串必须只包含p标签和img标签,p标签不能嵌套p标签
    parseHTML(html, callback) {
        const regTagP = /<(\w).*?>([\w\W]*?)<\/\1>/g;
        const regTagBold = /^<(strong|b).*?>(.*?)<\/\1>$/ig;
        const regTagImg = /<img.*(?:src=('|")(.*)\1).*\/>/g;
        const arr = [];
        let i = 0;

        html.replace(regTagP, (patten, tag, content) => {
            const isImg = regTagImg.exec(content);
            const isBold = regTagBold.exec(content);

            if (isImg) {
                arr.push(callback('image', isImg[2], i++));
            } else if (isBold) {
                arr.push(callback('bold', isBold[2], i++));
            } else {
                arr.push(callback('text', content, i++));
            }
        });
        return arr;
    },

    addParams(url, params) {
        let paramsArr = [];
        for (let k in params) {
            paramsArr.push(encodeURIComponent(k) + '=' + encodeURIComponent(params[k]));
        }
        paramsArr = paramsArr.join('&');
        return url.indexOf('?') > 0 ? url + '&' + paramsArr : url + '?' + paramsArr;
    },

    GET(url, params) {
        // 测试服务器无响应, 500, 404, 切换wifi,移动网络, 错误是点击刷新, 下拉刷新
        return new Promise((resolve, reject) => {
            if (!Data.netInfo.isConnected) {
                Data.toast('无网络连接,请连接网络后再试!')

                reject({ error: true, code: 0, message: '无网络连接' });
                return;
            }

            if (typeof url === 'object') {
                params = url;
                url = params.url;
            }

            let paramsArr = [];
            for (let k in params) {
                paramsArr.push(encodeURIComponent(k) + '=' + encodeURIComponent(params[k]));
            }
            paramsArr = paramsArr.join('&');

            url = url.indexOf('?') > 0 ? url + '&' + paramsArr : url + '?' + paramsArr;

            // 设置个请求为错误网址, 默认的请求超时时间超过1分钟.
            const timer = TimerMixin.setTimeout(() => {
                //reject({ error: true, code: 1, message: '请求超时' });
            }, requestTimeout);

            console.log(url)

            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onerror = function (e) {
                TimerMixin.clearTimeout(timer);
                console.log(e);
                reject({ error: true, code: 6, message: '网络连接错误' });
            };
            xhr.onload = function (data) {
                TimerMixin.clearTimeout(timer);

                if (data.target.status >= 500 && data.target.status < 600) {
                    reject({ error: true, code: 5, message: '服务器错误' });
                }
                if (data.target.status >= 400 && data.target.status < 500) {
                    reject({ error: true, code: 4, message: '连接错误' });
                }
                try {
                    resolve(JSON.parse(data.target.responseText));
                } catch (e) {
                    reject({ error: true, code: 6, message: '数据解析错误' });
                }
            }
            xhr.send(null);
        });
    },

    POST(pUrl, pramas) {
        let url, headers, data;
        if (typeof pUrl === 'object') {
            pramas = pUrl;
            url = pramas.url;
            headers = pramas.headers;
            data = pramas.data;
        } else {
            data = pramas;
            url = pUrl;
        }
        return new Promise((resolve, reject) => {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', url);

                const formData = new FormData();
                for (const key in data) {
                    formData.append(String(key), String(data[key]));
                }
                if (headers) {
                    for (const key in headers) {
                        xhr.setRequestHeader(key, headers[key]);
                    }
                }
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                };

                console.log('ready to post data!!!');
                console.log(url);
                console.log(headers);
                console.log(data);
                xhr.send(formData);
            } catch (e) {
                console.log(e);
            }
        });
    },

    baiduKey: 'E1bd1eee53e90361c60eaca778fa1a91',

    getLocationInfo(lon, lat) {
        const baiduKey = Data.baiduKey;
        const baiduApi = 'http://api.map.baidu.com/telematics/v3/reverseGeocoding?location=116.3017193083,40.050743859593&output=json&coord_type=gcj02&ak=' + baiduKey;
        fetch(baiduApi).then(response =>
            response.json()
        ).then((data) => {
            alert(data.city);
        }).catch(e => console.log('Oops, error', e));
    },

    toast: (data) => {
        Toast.show(data.toString(), 1000);
    },
}

export default Data;
