<?php
    echo '
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="utf-8">
          <title>Jeu du serpent</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
          <link rel="stylesheet" href="./add/style.css">
        </head>
        <body>
          <a href="../proj.php" class="btn btn-light btn-menu">
            <i class="fas fa-home"></i> Retour au bazar
            </a>';
    include './includes/gameboy.html';
    include './includes/menu.html';
    echo '<script
        src="http://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
        <script src="./add/script.js"></script>
        <script src="./add/cartouche_SNAKE.js"></script>
    </body>
  </html>';

?>
