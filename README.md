# InjectJS
> 可注入JS的chrome extension

chrome api中文文档：[https://chajian.baidu.com](https://chajian.baidu.com/developer/extensions/api_index.html) <br>
编辑器文档(vscode core)：[https://microsoft.github.io/monaco-editor/](https://microsoft.github.io/monaco-editor/api/index.html)


### 初始需求
需要在浏览器打开的网站页面注入一些js脚本实现某些简单功能(抢月饼？)
然后在本地写了个js以扩展属性content_scripts加载，但毕竟操作不便，于是想能否开发一个扩展界面来自由注入js

暂定需求如下：
1. 界面存在一个javascript编辑器，点击运行可将js注入页面执行；
2. 输入的JS代码和执行时机等配置项需要可缓存于浏览器中；

### 开始使用
1. 下载本项目；
2. 你可以在chrome的extensions界面，选中开发者模式，加载已解压的扩展程序；
3. 右上角点开图标输入需要运行的javascript代码，保存然后刷新网页。

### 核心API及关键点
因为content_scripts运行于隔离环境，chrome.tabs获取的窗口也只是部分只读属性，将界面输入的JS如何注入页面并控制页面DOM是个关键，核心API chrome.tabs.executeScript~