// Krijg de huidige rotatie angle
(function($) {
  $.fn.rotationDegrees = function() {
    var matrix = this.css("-webkit-transform") ||
      this.css("-moz-transform") ||
      this.css("-ms-transform") ||
      this.css("-o-transform") ||
      this.css("transform");
    if (typeof matrix === 'string' && matrix !== 'none') {
      var values = matrix.split('(')[1].split(')')[0].split(',');
      var a = values[0];
      var b = values[1];
      var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    } else {
      var angle = 0;
    }
    return angle;
  };
}(jQuery));
jQuery.fn.rotate = function(degrees) {
  $(this).css({
    '-webkit-transform': 'rotate(' + degrees + 'deg)',
    '-moz-transform': 'rotate(' + degrees + 'deg)',
    '-ms-transform': 'rotate(' + degrees + 'deg)',
    'transform': 'rotate(' + degrees + 'deg)'
  });
  return $(this);
};

// Initialiseer willekeurige punten op de cirkel, update aantal cijfers
var angle;
var digits = 8;
var counter = 0;

function init($param) {
    angle = Math.floor((Math.random() * 720) - 360);
    $("#circle2").rotate(angle);
    $("#container > p").html($param);
    if($param!=1)
      $("#container > p").append("<br><h4>Hoeveelheid rondes</h4>");
    else
      $("#container > p").append("<br><h4>Volgende ronde</h4>");
  }

$(document).ready(function() {
  init(digits);

  $(document).keydown(function(event) {
    // Als spatiebalk wordt ingedrukt
    if (event.which == 32) {
      // Huidige rotatie opgeslagen in een variabele
      var unghi = $('#circle').rotationDegrees();
      // Als de spatiebalk wordt ingedrukt en de punt wordt geraakt
      if (unghi > angle - 25 && unghi < angle + 25) {
        digits--;
        // Als game over, hide the game, display end of game options
        if (!digits) {
          $("#circle").addClass("hidden");
          $("#circle2").addClass("hidden");
          $("#container > p").addClass("hidden");
          $("#retry2").removeClass("hidden");
        }
        // Als, voeg een andere punt toe en onthoud de nieuwe hoek van rotatie
        else init(digits);
        angle = $("#circle2").rotationDegrees();
      }
      // Als, de speler "mist" en begint het spel opnieuw
      else {
        $("#circle").addClass("hidden");
        $("#circle2").addClass("hidden");
        $("#container > p").addClass("hidden");
        $("#retry").removeClass("hidden");
      }
      counter++;
      // De snelheid van de spin
      if (counter % 2) {
        $('#circle').rotate(-6000);
      } else $('#circle').rotate(8000);
    }
  });  
      $('#retry').click(function() {
          $("#circle").removeClass("hidden");
          $("#circle2").removeClass("hidden");
          $("#container > p").removeClass("hidden");
          $("#retry").addClass("hidden");
          digits=8;
          init(digits);
          angle = $("#circle2").rotationDegrees();
          $("#circle").rotate(2440);
          counter=0;
      });
   $('#retry2').click(function() {
       $("#retry2").addClass("hidden");   $("#circle").removeClass("hidden");
          $("#circle2").removeClass("hidden");
          $("#container > p").removeClass("hidden");
          digits=8;
          init(digits);
          angle = $("#circle2").rotationDegrees();
          $("#circle").rotate(2440);
          counter=0;
      });
});