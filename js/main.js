function checkPosition() {
    var ps2 = $('#paper_sheet_2');
    var hgt = $(window).height();
    if($(window).scrollTop() >= hgt) {
        ps2.css('position','absolute');
        ps2.css('top', hgt + 'px');
    }
    else {
       ps2.css('position','fixed');
        ps2.css('top', 0 + 'px'); 
    }
}

$(document).ready(function() {
    var cards = $('#paper_sheet_1 .card');
    cards.css('height', Math.max.apply(null, cards.map(function () { return $(this).height(); }).get()) + 'px');
    $('.separator').css('width','500px');
});