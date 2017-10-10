(function resizer() {

	var customTime = document.querySelector("#custom-time");
	var customBtn = document.querySelector("#custom-run");
	var customMessage = document.querySelector("#custom-message");
	// chrome.tabs.query({
	// 	active: true
	// }, function(t) {
	// 	console.log(t);
	// 	autoTask();
	// });
	chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT, function(w) {
		console.log(w);
		var target = w.document.querySelector('[name="btn1747"]');
	});
	var counter = 1;
	customBtn.onclick = function() {
		chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT, function(w) {
			var m = Number(customTime.value);
			var autoTask = function() {
				chrome.notifications.create("autoTask", {
						type: "basic",
						iconUrl: "assets/icons/resize256.png",
						title: "通知",
						message: "当前运行次数：" + counter
					},
					function() {});
				console.log("当前运行次数：" + counter);
				customMessage.innerHtml = "当前运行次数：" + counter;
				w.submitVote('57080', '1', 'vote1747');
				chrome.cookies.set({
					"url": "http://www.appstar.com.cn/upload/html/57080.html",
					"name": "vote1747",
					"value": ""
				});
				w.location.href = w.location.href;
				counter++;
				setTimeout(autoTask, m * 60 * 1000)
			};
			autoTask();
		});

	}

})();