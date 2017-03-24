console.log(Phaser);
var spaceKey;



var ground;
var player;
var obstacle;
var music;
var score = -1;



var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){
game.load.image('background', 'assets/Backup.png');
game.load.image('player', 'assets/Flash.png');
game.load.image('ground', 'assets/wallHorizontal.png');
game.load.image('obstacle', 'assets/Reverse.png');

  game.load.audio('backgroundMusic', 'assets/flash.mp3');


};

function create(){
game.add.tileSprite(0, 0, 800, 600, 'background');
game.physics.startSystem(Phaser.Physics.Arcade);
player = game.add.sprite(game.width/8, game.world.height*(5/8), 'player');
//This creates the first obstacle on the right side of the screen.
obstacle = game.add.sprite(700,game.world.height, 'obstacle');
//ground= game.add.sprite('ground')
obstacle.scale.setTo(1,1);
obstacle.anchor.setTo(0,1);
platforms = game.add.group();
platforms.enableBody = true;

ground = platforms.create(0, GAME_HEIGHT, 'ground');
ground.anchor.setTo(0,1);
ground.scale.setTo(4,1);

game.physics.arcade.enable(player);

game.physics.arcade.enable(ground);
ground.body.immovable = true;

game.physics.arcade.enable(obstacle);
obstacle.body.immovable = true;

spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

player.body.bounce.y = 0.2;
player.body.gravity.y = 600;

scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000'});

  music = game.add.audio('backgroundMusic');
  music.play();


};

function update(){
  //This is where the game engine recognizes collision betwen the player and the ground or the obstacle.
  game.physics.arcade.collide(player, ground);
  game.physics.arcade.collide(player, obstacle);

  if (spaceKey.isDown){
  player.body.velocity.y = -300;
}

  if (obstacle.x > 600) {
  obstacle.x -= 0.05;
  }
  if (obstacle.x < 0) { 
  obstacle.kill();
  obstacle = game.add.sprite(900, GAME_HEIGHT, 'obstacle');
  obstacle.scale.setTo(1,1);
  obstacle.anchor.setTo(0,1);
  game.physics.arcade.enable(obstacle);
  obstacle.body.immovable = true;
  }
  
  if (obstacle.x < 5 && player.x > 5){
  score++;
  scoreText.text = 'score: ' + score;};

  if (player.x < 0){
  	scoreText = game.add.text(350,200, 'The Speed Force is not with you' , {fill: '#17202A'});
  	obstacle.kill();
  	player.kill();
  }
};




var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });
game.state.start();
