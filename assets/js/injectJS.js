require.config({ paths: { 'vs': 'monaco-editor/min/vs' }});
require(['vs/editor/editor.main'], function() {
	// init editor
	var editor = monaco.editor.create(document.getElementById("editor"), {
		value: "// First line\nfunction hello() {\n\talert('Hello world!');\n}\n// Last line",
		language: "javascript",
	
		lineNumbers: false,
		roundedSelection: false,
		scrollBeyondLastLine: false,
		readOnly: false,
		theme: "vs-dark",
	});
	actionInit();
	function actionInit(){
		var interval = document.querySelector("#interval");
		var runBtn = document.querySelector("#runBtn");
		var stopBtn = document.querySelector("#stopBtn");
		// chrome.tabs.query({
		// 	active: true
		// }, function(t) {
		// 	console.log(t);
		// 	autoTask();
		// });
		chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT, function(w) {
			console.log(w);
		});
		runBtn.onclick = function() {
			chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT, function(w) {
				console.log(w);
			});
		}
	}
});
