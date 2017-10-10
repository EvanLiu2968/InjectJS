(function() {
	console.info("开始运行！");
	setTimeout(request, 3000);
	window.onload = function() {
		setTimeout(function() {
			console.log("目前票数：" + parseInt($('[name="count1747"]').text()));
		}, 1000);
	}

	function request() {
		$.ajax({
			method: "POST",
			url: "http://www.appstar.com.cn/voteCount.html",
			headers: {
				//"Connection": "close",
				//"Cookie": "JSESSIONID=3E9EAA495FE1BD24F99556784F67AA41"
			},
			data: {
				appId: "57080",
				pageId: "1",
				voteId: "vote1747",
				htmlType: "0",
				rnd: "0.6234195426205809"
			},
			success: function(res) {
				var count = parseInt($('[name="count1747"]').text());
				if (count >= 800) return;
				console.log(res);
				if (res.code === "3") {
					setCookie("vote1747", "", new Date(), "/");
					request();
				} else {
					console.log(document.cookie);
					setCookie("vote1747", "", new Date(), "/");
					console.log(document.cookie);
					location.href = location.href;
				}
			},
			error: function(res) {
				console.log(res)
			}
		});
	}

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