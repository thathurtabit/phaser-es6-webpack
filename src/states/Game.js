/* globals __DEV__ */
import Phaser from 'phaser'

// Set init global vars
// var player
// var platforms

export default class extends Phaser.State {
  constructor () {
    super()
    this.player = this.player
    this.platforms = this.platforms
    this.hitPlatform = this.hitPlatform
    this.cursors = this.cursors
  }

  init () {}
  preload () {
    this.load.image('sky', 'assets/images/sky.png')
    this.load.image('ground', 'assets/images/platform.png')
    this.load.image('star', 'assets/images/star.png')
    this.load.spritesheet('dude', 'assets/images/dude.png', 32, 48)
  }

  // Platforms
  platformBuilder () {
    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.add.group()

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true

    // Here we create the ground.
    let ground = this.platforms.create(0, this.world.height - 64, 'ground')

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2)

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true

    //  Now let's create two ledges
    let ledge = this.platforms.create(400, 400, 'ground')

    ledge.body.immovable = true

    ledge = this.platforms.create(-150, 250, 'ground')

    ledge.body.immovable = true
  }

  // Player
  playerBuilder () {
    // The player and its settings
    this.player = this.add.sprite(32, 0, 'dude')

    //  We need to enable physics on the player
    this.physics.arcade.enable(this.player)

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.8
    this.player.body.gravity.y = 300
    this.player.body.collideWorldBounds = true

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3], 10, true)
    this.player.animations.add('right', [5, 6, 7, 8], 10, true)
  }

  movementEvents () {
    this.cursors = this.input.keyboard.createCursorKeys()
    //  Reset the players velocity (movementEvents)
    this.player.body.velocity.x = 0

    if (this.cursors.left.isDown) {
      //  Move to the left
      this.player.body.velocity.x = -150

      this.player.animations.play('left')
    } else if (this.cursors.right.isDown) {
      //  Move to the right
      this.player.body.velocity.x = 150
      this.player.animations.play('right')
    } else {
      //  Stand still
      this.player.animations.stop()
      this.player.frame = 4
    }
    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.player.body.touching.down && this.hitPlatform) {
      this.player.body.velocity.y = -350
    }
  }

  create () {
    //  We're going to be using physics, so enable the Arcade Physics system
    this.physics.startSystem(Phaser.Physics.ARCADE)

    //  A simple background for our game
    this.add.sprite(0, 0, 'sky')

    this.platformBuilder()
    this.playerBuilder()
  }

  update () {
    //  Collide the player and the stars with the platforms
    this.hitPlatform = this.physics.arcade.collide(this.player, this.platforms)
    this.movementEvents()
  }

  render () {
    if (__DEV__) {
    }
  }
}
