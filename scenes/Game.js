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
      this.add.image(240,320,'platform')
      .setScale(0.5);
    }
}