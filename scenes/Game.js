import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene{
  cursors  
  constructor(){
        super('game');
  }
    preload(){
      this.cursors = this.input.keyboard.createCursorKeys();
      this.load.image('background','assets/background/bg_layer1.png')

      //   load the platform image
      this.load.image('platform','assets/Environment/ground_grass.png')

      this.load.image('bunny-stand','assets/Player/bunny1_stand.png');
    }
  
    platforms
    player
    create(){
      this.add.image(240,320,'background')
      .setScrollFactor(1,0);
      this.add.image(240,320,'background');
      
     //   create the group
     this.platforms = this.physics.add.staticGroup();

     //  then create 5 platforms from the group
     for(let i = 0; i < 5 ; i++){
        const x = Phaser.Math.Between(80,400);
        const y = 150 * i;
        
        const platform = this.platforms.create(x,y,'platform');
        platform.scale = 0.5;

        const body = platform.body;
        body.updateFromGameObject();
      }
      // create a bunny sprite
      this.player = this.physics.add.sprite(240,320,'bunny-stand')
      .setScale(0.5);

      // create a collider
      this.physics.add.collider(this.platforms, this.player);

      this.player.body.checkCollision.up = false;
      this.player.body.checkCollision.left = false;
      this.player.body.checkCollision.right = false;

      this.cameras.main.startFollow(this.player);

      this.cameras.main.startFollow(this.player);

      // set the horizontal dead zone 1.5x game width
      this.cameras.main.setDeadzone(this.scale.width * 1.5);
    }
    update(t,dt){

      this.platforms.children.iterate(child => {
        const platform = child;
        const scrollY = this.cameras.main.scrollY;

        if(platform.y >= scrollY + 700){
          platform.y = scrollY - Phaser.Math.Between(50,100);
          platform.body.updateFromGameObject()
        }
      })
    
      // find out from Arcade physics if the player's physics body
      // is touching something below it
      const touchingDown = this.player.body.touching.down;
      if(touchingDown){

        // this make the bunny jump straight up
        this.player.setVelocityY(-300);
      }
      if(this.cursors.left.isDown && !touchingDown){
        this.player.setVelocityX(-200);
      }else if(this.cursors.right.isDown && !touchingDown){
        this.player.setVelocityX(200);
      }else{
        // stop movement if not left or right
        this.player.setVelocityX(0);
      }
    }
}