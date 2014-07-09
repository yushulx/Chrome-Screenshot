chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.captureVisibleTab(null, function(src) {
			var link = document.createElement('a');
			link.download = "download.jpg";
			link.href = src.replace("image/png", "image/octet-stream");
			link.click();
		});
});
