import { config } from '../config/config'

export class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: config.scenes.play })
  }

  create() {
    var group = this.add.group({
      key: config.sprites.eyeball,
      frame: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      frameQuantity: 5
    })

    Phaser.Actions.GridAlign(group.getChildren(), {
      width: 10,
      height: 10,
      cellWidth: 32,
      cellHeight: 32,
      x: 100,
      y: 100
    })

    this.add.sprite(400, 300, config.sprites.eyeball, 9)

    const eyeAnim = {
      key: 'eyeAnim',
      frames: this.anims.generateFrameNumbers(config.sprites.eyeball, {
        start: 3,
        end: 5,
        first: 3
      }),
      frameRate: 8,
      repeat: -1
    }

    this.anims.create(eyeAnim)

    this.add.sprite(200, 300, config.sprites.eyeball).play('eyeAnim')
  }
}
