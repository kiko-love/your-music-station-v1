const path = require('path');
const {generateTheme} = require('antd-theme-generator');
// ant-design-vue/dist/antd.less
const options = {
    antDir: path.join(__dirname, './node_modules/ant-design-vue'), //antdv对应具体位置
    stylesDir: path.join(__dirname, './src/renderer/styles'),    //less文件夹对应具体位置
    varFile: path.join(__dirname, './src/renderer/styles/variables.less'), //文件夹变量对应具体位置
    mainLessFile: path.join(__dirname, './src/renderer/styles/index.less'),
    themeVariables: [
        '@primary-color',
    ],
    indexFileName: '.src/renderer/index.html',//首页路径
    outputFilePath: path.join(__dirname, './src/renderer/color.less'),//打包出来的文件
}
generateTheme(options)
    .then(() => {
    console.log('Theme generated successfully');
    })
    .catch(error => {
        console.log('Error', error);
    });

