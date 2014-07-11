var screenshot = {
	content : document.createElement("canvas"),

	init : function() {
		this.initEvents();
	},
	
	initEvents : function() {
		chrome.browserAction.onClicked.addListener(function(tab) {
			chrome.tabs.captureVisibleTab(null, {
				format : "png",
				quality : 100
			}, function(data) {
				var image = new Image();
				image.onload = function() {
					var canvas = screenshot.content;
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext("2d");
					context.drawImage(image, 0, 0);

					// send an alert message to webpage
					chrome.tabs.query({
						active : true,
						currentWindow : true
					}, function(tabs) {
						chrome.tabs.sendMessage(tabs[0].id, {ready : "ready"}, function(response) {
							if (response.download === "download") {
								// save the image
								var link = document.createElement('a');
								link.download = "download.png";
								link.href = screenshot.content.toDataURL();
								link.click();
							}
						});
					}); 

				};
				image.src = data;
			});
		});
	}
};

screenshot.init();
