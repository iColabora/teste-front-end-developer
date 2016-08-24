$(function(){

	// Change page
    $(window).on('hashchange', hashchanged);
    hashchanged();	

    // click btn start
    $(".container-start > button").click(function(){
    	window.location.href = "#task";
    });	

    // active submenu item
    $(".submenu a").click(function(){
		$(".submenu a").removeClass("active");
		$(this).addClass("active");
    })
});

function hashchanged(){

	// load page
	var hash = location.hash.replace(/[#\/]/g, '') || 'dashboard1';
	
	// show content page
	if( hash != "#" )
		$("#main").load(hash + '.html');
}