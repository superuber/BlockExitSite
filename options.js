function bes_save() {
	localStorage["blockExitSiteExclude"] = document.getElementById("exclude").value;
	localStorage["blockExitSiteInclude"] = document.getElementById("include").value;
	document.getElementById("changeEffect").className = "show";
	setTimeout(function(){ document.getElementById("changeEffect").className = ""; }, 5000);
}
function bes_load() {
	if (localStorage["blockExitSiteExclude"] != undefined) document.getElementById("exclude").value = localStorage["blockExitSiteExclude"];
	if (localStorage["blockExitSiteInclude"] != undefined) document.getElementById("include").value = localStorage["blockExitSiteInclude"];
}

window.addEventListener('load', function() {
	document.body.className = "loaded";
	bes_load();
	
	document.getElementById("exclude").onchange = bes_save;
	document.getElementById("include").onchange = bes_save;
	
}, false);
