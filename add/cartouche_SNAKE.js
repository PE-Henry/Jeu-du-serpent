function game_snake(gamestatus, terrain, cp, cs, ld) {
  //ENSEMBLE DES VARIABLES
  {
  var ctx_game = terrain.getContext('2d');
  var nbr_cellule_hor = 24;
  var nbr_cellule_ver = 18;
  var l = $('#game').width();
  var h = $('#game').height();
  var cellule = l/nbr_cellule_hor;
  var touche = "";
  var snake_food;
  var snake_array;
  var full_array = [];
  var gamerunning = gamestatus;
  var score = 0;
  //couleurs
  var primary = cp; //vert clair
  var secondary = cs; //vert foncé
  var dif = ld;
  }
  //*****
  //ÉCRAN DE LANCEMENT
  {
  ctx_game.fillStyle = primary;
  ctx_game.fillRect(0, 0, l, h);
  ctx_game.fillStyle = secondary;
  ctx_game.font = h/14 + "px 'Press Start 2P'";
  ctx_game.textAlign = "center";
  ctx_game.fillText("Bienvenue sur", l/2, h/4);
  ctx_game.font = h/10 + "px 'Press Start 2P'";
  ctx_game.fillText("SNAKE", l/2, h/2);
  ctx_game.font = h/16 + "px 'Press Start 2P'";
  ctx_game.fillText("Press space to", l / 2, (3 * h) / 4);
  ctx_game.fillText("play", l / 2, (5 * h) / 6);
  }
  //*****
  //ENSEMBLE DES FONCTIONS DU JEU
  {
  // Création du tableau contenant toutes les coordonnées possibles
  function create_full_array() {
    for (var a = 0; a < nbr_cellule_hor; a++) {
      for (var b = 0; b < nbr_cellule_ver; b++) {
        full_array.push({
          x: a,
          y: b
        });
      }}}
  //initialisation du serpent
  function create_snake() {
    //taille du serpent au démarrage
    var snake_size = 6;
    snake_array = [];
    //position de départ du serpent
    for (var a = 0; a < snake_size; a++) {
      snake_array.push({
        x: 1,
        y: 2
      });
    }}
  //définition de la position de départ de la nourriture
  function create_food() {
    coordx = Math.round(Math.random() * (l - cellule) / cellule);
    coordy = Math.round(Math.random() * (h - cellule) / cellule);
    snake_food = {
      x: coordx,
      y: coordy
    };
  }
  //génération de la nourriture en cours de partie
  function generation_food() {
    //Création d'un tableau contenant toutes les positions possibles
    //Comparaison des deux tableaux afin de déterminer les positions libres
    //Choix parmi les positions possibles
    create_full_array();
    for (var t in snake_array) {
      var test = snake_array[t].x + "" + snake_array[t].y;
      for (var u in full_array) {
        var cible = full_array[u].x + "" + full_array[u].y;
        if (cible == test) {
          full_array.splice(u, 1);
        }}}
    var choix = Math.floor(Math.random() * (full_array.length));
    snake_food = {
      x: full_array[choix].x,
      y: full_array[choix].y
    };
    full_array = [];
  }
  //configuration et gestion de la partie
  function config() {
    dessin_terrain(); //dessine le terrain
    dessin_info();    //dessine l'HUD du jeu
    dessin_score();   //dessine le score

    //position du serpent
    pos_x = snake_array[0].x;
    pos_y = snake_array[0].y;

    switch (touche) { //état du déplacement
      case "droite": pos_x++; break;
      case "gauche": pos_x--; break;
      case "bas": pos_y++; break;
      case "haut": pos_y--; break;
    }

    //événement en cas de collision avec le bord ou le serpent
    if (pos_x == -1 || pos_x == nbr_cellule_hor || pos_y == -1 || pos_y == nbr_cellule_ver || collision(pos_x, pos_y, snake_array)) {
      gamerunning = false;
      start();
      return;
    }

    //dessin du jeu en temps réel
    if (pos_x == snake_food.x && pos_y == snake_food.y) { // Si le serpent recontre un bloc de nourriture
      var snake_tail = {
        x: pos_x,
        y: pos_y
      };
      score += 1;
      snake_array.unshift(snake_tail);
      generation_food();
    } else { //si le serpent ne rencontre rien
      var snake_tail = snake_array.pop();
      snake_tail.x = pos_x;
      snake_tail.y = pos_y;
      snake_array.unshift(snake_tail);
    }
    for (var i = 0; i < snake_array.length; i++) { //dessine le serpent sur le terrain
      var c = snake_array[i];
      dessin_serpent(c.x, c.y);
    }

    dessin_nourriture(snake_food.x, snake_food.y);
  }
  //gestion collision serpent/serpent
  function collision(x, y, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].x == x && array[i].y == y) {return true;}
    }return false;
  }
  //écouteur sur le clavier
  $(document).keydown(function(e) {
    var key = e.which;
    if (key == "37" && touche != "droite") {touche = "gauche";
    } else if (key == "38" && touche != "bas") {touche = "haut";
    } else if (key == 39 && touche != "gauche") {touche = "droite";
    } else if (key == 40 && touche != "haut") {touche = "bas";
    } else if (key == 32) {touche = "start";
    start();}
  });
  //lancement du jeu snake
  function start(){
    if (gamerunning){
      touche = "droite";
      create_snake();
      generation_food();
      score = 0;
      if (typeof game_start != "undefined") clearInterval(game_start);
        var vit = 100;
        if (dif == 1){ vit = 130; console.log(vit);}
        if (dif == 2){ vit = 100; console.log(vit);}
        if (dif == 3){ vit = 70; console.log(vit);}
        game_start = setInterval(config, vit);
    } else {
        clearInterval(game_start);
        endgame();
      }
  }
  //fonction fin du jeu
  function endgame(){
    dessin_gameover();
  }
  }
  //*****
  //ENSEMBLE DES FONCTIONS DE DESSINS.
  {
  function dessin_gameover() { //Dessin du message de "Game Over"
    ctx_game.clearRect(0, 0, l, h);
    ctx_game.fillStyle = primary;
    ctx_game.fillRect(0, 0, l, h);
    ctx_game.fillStyle = secondary;
    ctx_game.font = h/10 + "px 'Press Start 2P'";
    ctx_game.textAlign = "center";
    ctx_game.fillText("Game Over", l/2, h/4);
    ctx_game.font = h/14 + "px 'Press Start 2P'";
    ctx_game.fillText("Score : " + score, l/2, h/2);
    ctx_game.font = h/18 + "px 'Press Start 2P'";
    ctx_game.fillText("Click to restart", l / 2, (3 * h) / 4);
  }

  function dessin_score() { //affichage du score en cours de partie
    ctx_game.font = h/16 + "px 'Press Start 2P'";
    ctx_game.textAlign = "center";
    ctx_game.textBaseline = "middle";
    ctx_game.fillStyle = secondary;
    ctx_game.fillText("Score : ", (3 * l)/4 , (13 * h)/16);
    ctx_game.font = h/9 + "px 'Press Start 2P'";
    if (score < 10) {
      ctx_game.fillText("00" + score, (3 * l)/4 , (15 * h)/16);}
    if ((score > 9) && (score < 100)) {
      ctx_game.fillText("0" + score, (3 * l)/4 , (15 * h)/16);}
    if (score > 99) {
      ctx_game.fillText(score, (3 * l)/4 , (15 * h)/16);}
  }

  function dessin_terrain() { //Dessin et coloriage de l'air de jeu
    ctx_game.fillStyle = primary;
    ctx_game.fillRect(0, 0, l, (3 * h)/4);
    ctx_game.strokeStyle = "#000000";
    ctx_game.strokeRect(0, 0, l, (3 * h)/4);
  }

  function dessin_nourriture(x, y) { //Sprite de la nourriture
    ctx_game.fillStyle = secondary;
    ctx_game.beginPath();
    ctx_game.arc(x * cellule + 0.5 * cellule, y * cellule + 0.5 * cellule, cellule / 2, 0, 2 * Math.PI);
    ctx_game.stroke();
    ctx_game.fill();
  }

  function dessin_serpent(x, y) { //Sprite du corps du serpent
    ctx_game.fillStyle = secondary;
    ctx_game.fillRect(x * cellule, y * cellule, cellule, cellule);
    ctx_game.strokeStyle = primary;
    ctx_game.strokeRect(x * cellule, y * cellule, cellule, cellule);
  }

  function dessin_info(){ //nom du jeu en dessous du terrain
    ctx_game.fillStyle = primary;
    ctx_game.fillRect(0, (3 * h)/4, l, h/4);
    ctx_game.strokeStyle = secondary;
    ctx_game.strokeRect(0, (3 * h)/4, l, h/4);
    ctx_game.font = (h/11) + "px 'Press Start 2P'";
    ctx_game.textBaseline = "middle";
    ctx_game.fillStyle = secondary;
    ctx_game.textAlign = "center";
    ctx_game.fillText("SNAKE", (l/4), (9*h)/10);
  }
  }
  //*****
  console.log("Jeu snake chargé !");
}
