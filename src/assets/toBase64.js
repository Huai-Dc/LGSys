/**
 * Created by Administrator on 2016/8/4.
 */
const path = require('path');
const fs = require('fs');
const hostname = 'http://localhost:3001';

fs.readFile('./assets.js', function(err, data){
    const assetsStr = data.toString();
    console.log(assetsStr);
    const appContent = assetsStr.replace(/require\(([\W\w]{2,}?\.([\W\w]{1,}?))\)/g, function (a, path, extname) {
        var path = path.replace(/[\"\']/g, '');
        var extname = extname.replace(/[\"\']/g, '');

        const filepath = fs.realpathSync(path.replace(/[\"\']/g, ''));
        const imageContent = new Buffer(fs.readFileSync(filepath)).toString('base64');

        return '{ uri: \'data:image/' + extname.replace(/[\"\']/g, '').toLowerCase() + ';base64,' + imageContent + '\'}';
    });
    const webContent = assetsStr.replace(/require\(([\W\w]{2,}?)\)/g, function (a, path) {
        var path = path.replace(/[\"\']/g, '').replace(/^\.\//g, '');
        return '\'' + hostname + '/' + path + '\'';
    });
    const appBuf = new Buffer(appContent);
    fs.writeFile('assets.ios.js', appBuf, function(err) {
        if(err) throw err;
        console.log('assets.ios.js ok!');
    });
    fs.writeFile('assets.android.js', appBuf, function(err) {
        if(err) throw err;
        console.log('assets.android.js ok!');
    });
    const webBuf = new Buffer(webContent);
    fs.writeFile('assets.web.js', webBuf, function(err) {
        if(err) throw err;
        console.log('assets.web.js ok!');
    });
})
