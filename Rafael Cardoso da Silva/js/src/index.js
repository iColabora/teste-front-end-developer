$(function(){

	// Change page
    $(window).on('hashchange', hashchanged);
    //hashchanged();	

});

function hashchanged(){

	// load page
	var hash = location.hash.replace(/[#\/]/g, '') || 'home';
	$("#main").load(hash + '.html #content');
}