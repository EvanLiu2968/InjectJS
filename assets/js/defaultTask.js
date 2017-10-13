//扩展Date原型,增加格式化 fmt="yyyy-MM-dd HH:mm:ss 星期E"
Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //12小时制
		"H+": this.getHours(), //24小时制
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	var week = {
		"0": "\u65e5",
		"1": "\u4e00",
		"2": "\u4e8c",
		"3": "\u4e09",
		"4": "\u56db",
		"5": "\u4e94",
		"6": "\u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};
(function() {
	console.info("%c Inject JS is running at "+ new Date().format('yyyy-MM-dd HH:mm:ss 星期E'),"color:red");
	function deleteCookie(name, path) {
		var name = escape(name);
		var expires = new Date(0);
		path = path == "" ? "" : ";path=" + path;
		document.cookie = name + "=" + ";expires=" + expires.toUTCString() + path;
	}

	function setCookie(name, value, hours, path) {
		var name = escape(name);
		var value = escape(value);
		path = path == "" ? "" : ";path=" + path;
		_expires = (typeof hours) == "string" ? "" : ";expires=" + hours.toUTCString();
		document.cookie = name + "=" + value + _expires + path;
	}

	function getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

		if (arr = document.cookie.match(reg))

			return unescape(arr[2]);
		else
			return null;
	}
})();