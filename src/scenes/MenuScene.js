import { config } from '../config/config'

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: config.scenes.menu })
  }

  create() {
    // this.scene.start(config.scenes.play, this)
    const { width } = this.game.renderer
    const { height } = this.game.renderer

    this.add.image(width / 2, height * 0.2, config.images.logo).setDepth(1)

    this.add
      .image(0, 0, config.images.bg)
      .setOrigin(0)
      .setAlpha(0.6)
      .setDepth(0)
      .setScale(0.4)

    // this.sound.play(config.audios.bgm, { loop: true })
    // this.sound.pauseOnBlur = false

    let hoverSprite = this.add.sprite(100, 100, config.sprites.fire1.key)
    hoverSprite.setVisible(false)
    this.anims.create({
      key: 'fire1',
      frameRate: 20,
      repeat: -1,
      frames: this.anims.generateFrameNumbers(config.sprites.fire1.key, {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      })
    })

    const playButton = this.add.image(width / 2, height / 2, config.images.playButton).setDepth(1)
    playButton.setInteractive()

    playButton.on('pointerover', () => {
      hoverSprite.setVisible(true)
      hoverSprite.play('fire1')
      hoverSprite.x = playButton.x - playButton.width
      hoverSprite.y = playButton.y
    })

    playButton.on('pointerout', () => {
      hoverSprite.setVisible(false)
    })

    playButton.on('pointerup', () => {
      this.scene.start(config.scenes.play)
    })
  }
}
