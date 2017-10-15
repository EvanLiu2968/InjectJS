// injectJS.js
require.config({ paths: { 'vs': 'monaco-editor/min/vs' }});
require(['vs/editor/editor.main'], function() {
	var $saveBtn=$("#saveBtn"),$closeBtn=$("#closeBtn"),$message=$(".task-message");
	var defaultValue=`<script>\n
		alert("inject JS is Running!");\n
		document.title="inject JS | " + document.title;\n
	</script>`;
	// init editor
	var editor = monaco.editor.create(document.getElementById("editor"), {
		value: defaultValue,
		language: "html",
	
		lineNumbers: false,
		roundedSelection: false,
		scrollBeyondLastLine: false,
		readOnly: false,
		theme: "vs-dark",
	});
	co(function*() {
		const chromep = new ChromePromise();
		const { storageKey, storageSourceKey } = defaultSetting;
		const fileReader = FileReaderPromise();
	
		const onSaveClick = (event) => {
			co(function *() {
				let theSource = editor.getValue()// state.sontent;
				let theMode = $('[name="mode"]:checked').val();

				let saveObj = {
					[storageKey]: {
						mode: theMode
					}
				};
	
				saveObj[storageSourceKey] = theSource;
	
				yield chromep.storage.local.set(saveObj);
	
				let backgroundWindow = chrome.extension.getBackgroundPage();
				backgroundWindow.initScript();
	
				$message.html(`<span class="text-danger">save success !</span>`);
				yield sleep(2000);
				$message.text("");
			});
		}
	
		$saveBtn.on('click', onSaveClick);
	
		const onSaveKeyup = (event) => {
			if (event.ctrlKey == true && event.keyCode == 19) {
				onSaveClick(event);
			}
		}
	
		$(document.body).on('keypress', onSaveKeyup);
	
	
		$('#editor').on('drop', (event) => {
			event.preventDefault();
			console.log(event);
			var fileList = event.originalEvent.dataTransfer.files;
			if (fileList.length == 0) {
				return false;
			}
	
			co(function*() {
				let result = yield fileReader.readAsText(fileList[0]);
				if (!(/<script>[\s\S]*<\/script>/.test(result))) {
					result = "<script>\n" + result + "\n</script>";
				}
				editor.setValue(result);
				onSaveClick();
			});
		});
		co(function*() {
			var sourceKeyList = [];
			var valueArray = yield chromep.storage.local.get([storageKey, storageSourceKey]);
			var source = valueArray[storageSourceKey];
	
			if (valueArray[storageKey]) {
				$(`[name="mode"][value="${valueArray[storageKey].mode}"]`).prop('checked', 'true');
				editor.setValue(source);
			}
		});
	}).catch(function (err) {
		console.log(err.toString());
		console.error(err);
		throw err;
	});
});
