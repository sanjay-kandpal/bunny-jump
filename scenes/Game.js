import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene{
    constructor(){
        super('game');
    }
    preload(){
      this.load.image('background','assets/background/bg_layer1.png')

      //   load the platform image
      this.load.image('platform','assets/Environment/ground_grass.png')

      this.load.image('bunny-stand','assets/Player/bunny1_stand.png');
    }
    player;
    create(){
      this.add.image(240,320,'background');
      
     //   create the group
     const platforms = this.physics.add.staticGroup();

     //  then create 5 platforms from the group
     for(let i = 0; i < 5 ; i++){
        const x = Phaser.Math.Between(80,400);
        const y = 150 * i;
        
        const platform = platforms.create(x,y,'platform');
        platform.scale = 0.5;

        const body = platform.body;
        body.updateFromGameObject();
      }
      // create a bunny sprite
      this.player = this.physics.add.sprite(240,320,'bunny-stand')
      .setScale(0.5);

      // create a collider
      this.physics.add.collider(platforms, this.player);

      this.player.body.checkCollision.up = false;
      this.player.body.checkCollision.left = false;
      this.player.body.checkCollision.right = false;

      this.cameras.main.startFollow(this.player);
    }
    update(){
      // find out from Arcade physics if the player's physics body
      // is touching something below it
      const touchingDown = this.player.body.touching.down;
      if(touchingDown){

        // this make the bunny jump straight up
        this.player.setVelocityY(-300);
      }
    }
}