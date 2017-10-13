# InjectJS
> 可注入JS的chrome extension

chrome api中文文档：[https://chajian.baidu.com](https://chajian.baidu.com/developer/extensions/api_index.html)
编辑器文档：[https://microsoft.github.io/monaco-editor/](https://microsoft.github.io/monaco-editor/api/index.html)

*先占个坑，以后有时间再写。。。*

### 初始需求
需要在浏览器打开的网站页面注入一些js脚本实现某些简单功能(抢月饼？)
然后在本地写了个js以扩展形式加载，但毕竟操作不便，于是想能否开发一个扩展界面来注入js

暂定需求如下：
1. 界面存在一个javascript编辑器，点击运行可将js注入页面执行；
2. 界面存在一些固定配置项，例如定时刷新，定时执行等，还有输入的js代码，需要可缓存于浏览器中；


### 开始使用
1. 下载本项目；
2. 你可以在chrome的extensions界面，选中开发者模式，加载已解压的扩展程序；
3. 右上角点开图标输入需要运行的javascript代码，点击[执行]即可运行。

### 内置基础库
 - jquery-3.1.1.min.js
 - lodash.3.10.1.js
 - js-cookie.js