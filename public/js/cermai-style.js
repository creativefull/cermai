$(function() {
	// $(".cermai-logo").css({"margin-top" : '-20px'}, 200);
	cermaiLoading();
})


function cermaiLoading() {
	$(".cermai-loading").delay(2000).fadeOut(200, function() {
		$(".cermai-header").fadeIn(200);
	});
}