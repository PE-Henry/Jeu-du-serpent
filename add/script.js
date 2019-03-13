$(document).ready(function() {
  //initialisation de la gameboy

  var gamerunning = true;
  var c = document.getElementById("game");
  var w_screengb = $('#playground').width();
  var h_screengb = $('#playground').height();
  c.width = w_screengb;
  c.height = h_screengb;
  $(window).resize(function () {
    var w_screengb = $('#playground').width();
    var h_screengb = $('#playground').height();
    c.height = h_screengb;
    c.width = w_screengb;
  });

    var cp = $("#coul_prim").val();
    var cs = $("#coul_secon").val();
    var ld = $('input[name=ld]:checked').val()

  $( "#screen" ).on('click', function() {
    console.log("clic sur l'écran de la gameboy");
    var cp = $("#coul_prim").val();
    var cs = $("#coul_secon").val();
    var ld = $('input[name=ld]:checked').val()
    $("#screen").addClass('special'); //Allume la led de la console (change du rouge en vert)
    game_snake(gamerunning, c, cp, cs, ld);
    $("#notice").css("display","none");
  });
  console.log("Console prête !");

  $( "#set_ok").click(function() {
    var cp = $("#coul_prim").val();
    var cs = $("#coul_secon").val();
    var ld = $('input[name=ld]:checked').val()
    game_snake(gamerunning, c, cp, cs, ld);
  });

  $( "#par_def").click(function() {
    $("#coul_prim").val("#96C94E");
    $("#coul_secon").val("#5A7052");
    $("#moyen").prop("checked", true);
    game_snake(gamerunning, c, cp, cs, ld);
  });

  $( "#settings").click(function(){
    if ( $( "#settings_full" ).is( ":hidden" ) ) {
      $( "#settings_full" ).css("display","block");
      $( ".param" ).animate({width:"30vw",height:"80vh",borderRadius: 10})
    } else {
      $( "#settings_full" ).css("display","none");
      $( ".param" ).animate({width:"5vw", height:"5vw",borderRadius: 50});
    }
  });
    $("#gameboy").click(function(){
      if ( $( "#settings_full" ).is( ":visible" ) ) {
        $( "#settings_full" ).css("display","none");
        $( ".param" ).animate({width:"5vw", height:"5vw",borderRadius: 50});
      }
  });
});
