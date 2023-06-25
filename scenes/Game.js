import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene{
    constructor(){
        super('game');
    }
    preload(){
      this.load.image('background','assets/background/bg_layer1.png')

    //   load the platform image
      this.load.image('platform','assets/Environment/ground_grass.png')
    }
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

    }
}