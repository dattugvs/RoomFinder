$("#slider-range").slider({
    range: true,
    min: 0,
    max: 5000,
    step: 25,
    values: [0, 5000],
    slide: function (e, ui) {
$('.slider-price').html(ui.values[0]);
if(ui.values[1]==5000)
  ui.values[1]="5000+";
$('.slider-price2').html(ui.values[1]);
    }
});