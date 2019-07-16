import { config } from '../config/config'

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: config.scenes.menu })
  }

  create() {
    const { width } = this.game.renderer
    const { height } = this.game.renderer

    this.add.image(width / 2, height * 0.2, config.images.logo).setDepth(1)

    this.add
      .image(0, 0, config.images.bg)
      .setOrigin(0)
      .setAlpha(0.6)
      .setDepth(0)
      .setScale(0.4)

    this.sound.play(config.audio.bgm, { loop: true })
    // this.sound.pauseOnBlur = false

    let hoverSprite = this.add.sprite(100, 100, config.sprites.fire1.key)
    hoverSprite.setVisible(false)
    this.anims.create({
      key: 'fire1',
      frameRate: 20,
      repeat: -1,
      frames: this.anims.generateFrameNumbers(config.sprites.fire1.key, {
        start: 0,
        end: 60
      })
    })

    const playButton = this.add.image(width / 2, height / 2, config.images.playButton).setDepth(1)
    playButton.setInteractive()

    playButton.on('pointerover', () => {
      hoverSprite.setVisible(true)
      hoverSprite.play('fire1')
      hoverSprite.x = playButton.x - 100
      hoverSprite.y = playButton.y - 10
    })

    playButton.on('pointerout', () => {
      hoverSprite.setVisible(false)
    })

    playButton.on('pointerup', () => {
      this.scene.start(config.scenes.play)
    })
  }
}
