
/**
 * API清除工具
 * coded by wangshengwe1@tal.com 2020/11/16
 */
const fs = require('fs');
const outPath = '../api/';

deleteFolderRecursive(outPath);
function deleteFolderRecursive(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
                console.log('删除' + curPath + '成功!')
            }
        });
        console.log('目标路径下所有文件清除完成!请重新执行createApi脚本生成!');
        // fs.rmdirSync(path);
    }

};