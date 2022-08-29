$(document).ready(function() {

	$(".popup-help").show(function(){

		pop_init( "Per scorrere la presentazione usa le frecce di avanti e indietro della tastiera del PC o scorri con le dita sullo schermo dello smartphot o del tablet come se volessi sfogliare un libro" );

	});

});

function pop_init( my_content ) {

	var pop_height = 'auto';
        var pop_html = '<div class="pop-bg"></div><div class="pop-wrap"><p class="pop-x">X</p><div class="pop-content"></div></div>';

	$("body").prepend( pop_html );

	$(".pop-wrap").animate({ "height" : pop_height }, 250).click(function(event){
		event.stopPropagation();
	});

	$(".pop-bg, .pop-x").bind("click", function(event) {
		pop_close();
	});

	$(".pop-content").text(my_content);

}

function pop_close() {
	$(".pop-bg, .pop-wrap").remove();
	$("body").unbind("click");
}