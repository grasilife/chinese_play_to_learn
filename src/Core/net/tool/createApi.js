/**
 * API生成工具
 * coded by wangshengwe1@tal.com 2020/11/16
 */
const apiLists = require('./api');
const fs = require('fs');
const outPath = '../api/';
const MessageFactoryPath = '../MessageFactory.ts';

fs.readdir(outPath, { encoding: 'utf-8' }, (err) => {
    if (err) {
        console.log('err');
        fs.mkdir(outPath, {}, (err) => {
            if (err) {
                return;
            }
            createInterfaceFile();
        })
        return;
    }
    createInterfaceFile();
})

function setClassStr(className, classContent) {
    return `

interface ${className} {
${classContent}}`
}

function createInterfaceFile() {
    if (Object.keys(apiLists).length > 0) {
        let interfaceContent = '';
        let apiListTsStr = ''
        for (const className in apiLists) {
            let classContent = '';
            // 判断属性是否是c_s, 需要拆除url字段
            if (className.indexOf('_c2s') > -1) {
                if (!apiLists[className]['url']) {
                    console.error('请求接口必须要有URL请求地址!')
                }
                if (!apiLists[className]['type']) {
                    console.warn('请求类型缺省为GET!')
                    apiLists[className]['type'] = 'get';
                }
                // addListenerStr += `\t\tApp.MessageCenter.addListener(this.${className}, App.MessageFactory.${className}_handler, App.MessageFactory);\n`;
                // 判断MessageFactory中是否已经存在监听的handler函数,没有则增加
                let msgFactoryContent = fs.readFileSync(MessageFactoryPath, { encoding: 'utf-8' });
                if (msgFactoryContent.indexOf(`${className}`) === -1) {
                    msgFactoryContent = msgFactoryContent.substr(0, msgFactoryContent.length - 1)

                    msgFactoryContent += `
    public ${className}(params: ${className}, thisObj:any = null) {
        this.ajax('${className}', '${apiLists[className]['url']}', params, '${apiLists[className]['type']}', thisObj);
    }\n`;
                    msgFactoryContent += '}';
                    fs.writeFileSync(MessageFactoryPath, msgFactoryContent);
                }
                delete apiLists[className]['url'];
                delete apiLists[className]['type'];

            }
            // 判断属性是否是可选属性
            for (const property in apiLists[className]) {
                let value = apiLists[className][property];
                let required = '';
                if (value[0] === '?') {
                    required = "?";
                    value = value.substr(1);
                }
                classContent += `\t${property}${required}: ${value};\n`;
            }

            interfaceContent += setClassStr(className, classContent);
            apiListTsStr += `\tpublic static ${className}: string = '${className}';\n`;
        }

        // 写入文件
        fs.writeFileSync(outPath + 'ApiInterface' + '.ts', interfaceContent);
        console.log('ApiInterface.ts 类创建成功!')
        fs.writeFileSync(outPath + 'ApiLists.ts', createApiListTsFile(apiListTsStr));
        console.log('ApiLists.ts 类创建成功!')
    }
}

function createApiListTsFile(apiListTsStr) {
    return `
class ApiLists {
${apiListTsStr}
}`;
}




// function createTSFile() {
//     // 生成一个ApiList.ts
//     let apiListTsStr = `
// class ApiLists {
//     private static _instance;
//     public static get instance(): ApiLists {
//         if (this._instance == null)
//             this._instance = new ApiLists();
//         return this._instance;
//     }\n`;

//     // 属性和监听
//     let propertyStr = '';
//     let addListenerStr = '\tconstructor() {\n';

//     if (Object.keys(apiLists).length > 0) {
//         for (const className in apiLists) {
//             let classContent = '';
//             classContent += `class ${className} { \n`;
//             // 监听代码
//             if (className.indexOf('_c2s') > -1) {
//                 addListenerStr += `\t\tApp.MessageCenter.addListener(this.${className}, App.MessageFactory.${className}_handler, App.MessageFactory);\n`;
//                 // 判断MessageFactory中是否已经存在监听的handler函数,没有则增加
//                 let msgFactoryContent = fs.readFileSync(MessageFactoryPath, { encoding: 'utf-8' });
//                 if (msgFactoryContent.indexOf(`${className}_handler`) === -1) {
//                     msgFactoryContent = msgFactoryContent.substr(0, msgFactoryContent.length - 1)

//                     msgFactoryContent += `
//     public ${className}_handler(params: ${className}) {
//         this.ajax('${className}', params);
//     }\n`;
//                     msgFactoryContent += '}';
//                     fs.writeFileSync(MessageFactoryPath, msgFactoryContent);
//                 }
//             }
//             // 属性代码(如果有url,以url为内容)
//             if (apiLists[className]['url'] && className.indexOf('_c2s') > -1) {
//                 propertyStr += `\tpublic ${className}: string = '${apiLists[className]['url']}';\n`;
//                 delete apiLists[className]['url'];
//             } else {
//                 propertyStr += `\tpublic ${className}: string = '${className}';\n`;
//             }
//             for (const property in apiLists[className]) {
//                 classContent += `\t${property}: ${apiLists[className][property]};\n`;
//             }
//             classContent += `}`;
//             // 写入文件
//             fs.writeFileSync(outPath + className + '.ts', classContent);
//             console.log(className + '.ts 类创建成功!')

//         }
//         addListenerStr += `\t}\n`;
//         apiListTsStr += addListenerStr;
//         apiListTsStr += propertyStr;
//         apiListTsStr += `}`;
//         fs.writeFileSync(outPath + 'ApiLists.ts', apiListTsStr);
//         console.log('ApiLists.ts 类创建成功!')
//         console.log('所有接口创建完毕!')
//     }
// }




