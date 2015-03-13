(function() {
	
	var include = [];
	var exclude = [];
	
	var includeLoaded = false;
	var excludeLoaded = false;
	
	function setup()
	{
		loadOptions();
		setInterval(blockExits, 1000);
	}
	
	function loadOptions(){
		chrome.extension.sendRequest({method: "getLocalStorage", key: "blockExitSiteExclude"}, function(response) {
			if(response.data!="") exclude = response.data.split("\n");
			excludeLoaded = true;
		});
		
		chrome.extension.sendRequest({method: "getLocalStorage", key: "blockExitSiteInclude"}, function(response) {
			if(response.data!="") include = response.data.split("\n");
			includeLoaded = true;
		});
	}
	
	function blockExits()
	{
		if(!excludeLoaded || !includeLoaded) return;
		
		var url = window.location.href;
		var canContinue = true;
		
		//exclude sites
		if(exclude.length>0){
			exclude.forEach(function(str) {
				if(url.indexOf(str)>-1){
					canContinue = false;
				}
			});
		}
		
		//include sites
		if(include.length>0){
			var found = false;
			include.forEach(function(str) {
				if(url.indexOf(str)>-1){
					found = true;
				}
			});
			if(!found) {
				canContinue = false;
			}
		}
		
		if(!canContinue) return;
		
		//clear all links
		$("a").replaceWith(function() {
			return $(this).contents();
		});
		
		//prevent right click
		$(document).bind('contextmenu', function (e) {
		  e.preventDefault();
		});
		
		//make text unselectable
		$("*").attr('unselectable', 'on')
			 .css('user-select', 'none')
			 .on('selectstart', false);
	}

	setup();

})();