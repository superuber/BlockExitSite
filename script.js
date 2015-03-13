(function() {
		
	function blockExits()
	{
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

	blockExits();
	setInterval(blockExits, 1000);

})();