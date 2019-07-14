import { config } from '../config/config'

export class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: config.scenes.play })
    this.ui = {}
  }

  drawUI() {
    this.ui.score = this.add.text(25, 25, 'Pontos: ', { font: '16px Courier', fill: '#00ff00' })
  }

  generateCardDeck() {
    const frameNames = this.anims.generateFrameNames('items', {
      frames: ['armor', 'axe', 'wand', 'bow'],
      suffix: '.png'
    })

    this.cards = []
    frameNames.map((frame, i) => {
      const card = this.add.sprite(i * 100, 100, frame.key, frame.frame)

      card.setDataEnabled()
      card.data.set('name', frame.frame)
      card.data.set('selected', 0)
      card.data.set('flipped', 0)

      this.cards.push(card)
    })
  }

  frontFlip(card) {
    this.tweens.add({
      targets: card,
      scaleX: -1,
      scaleY: 1,
      ease: 'Linear',
      duration: 150,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        card.data.set('flipped', 1)
        card.setTexture('items', 'armor.png')
      }
    })
  }

  backFlip(card) {
    this.tweens.add({
      targets: card,
      scaleX: 1,
      scaleY: 1,
      ease: 'Linear',
      duration: 150,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        const name = card.data.get('name')
        card.data.set('flipped', 0)
        card.setTexture('items', name)
      }
    })
  }

  flipCard(card) {
    const flipped = card.data.get('flipped')

    if (flipped) {
      this.backFlip(card)
      return
    }
    this.frontFlip(card)
  }

  attachCardEvents() {
    this.cards.map(card => {
      card.setInteractive()

      card.on('pointerup', () => {
        const selected = card.data.get('selected')
        card.data.set('selected', !selected)
        this.flipCard(card)
      })

      card.on('changedata', (gameObject, key, value) => {
        // console.log(key, value)
        this.ui.score.setText([`Pontos: ${card.data.get('name')}`])
      })
    })
  }

  create() {
    this.drawUI()
    this.generateCardDeck()
    this.attachCardEvents()

    // var group = this.add.group({
    //   key: 'items',
    //   frames: ['armor.png', 'axe.png'],
    //   frameQuantity: 5
    // })
    // Phaser.Actions.GridAlign(group.getChildren(), {
    //   width: 4,
    //   height: 10,
    //   cellWidth: 72,
    //   cellHeight: 82,
    //   x: 250,
    //   y: 80
    // })
    // this.add.sprite(600, 300, config.sprites.fire1.key, 0)
    // this.anims.create({
    //   key: 'eyeAnim',
    //   frames: this.anims.generateFrameNumbers(config.sprites.fire1.key, {
    //     start: 0,
    //     end: 60
    //   }),
    //   frameRate: 20,
    //   repeat: -1
    // })
    // this.add.sprite(600, 500, config.sprites.fire1.key).play('eyeAnim')
    // this.armor = this.add.sprite(200, 200, 'items', 'armor.png')
    // this.armor.setInteractive()
    // this.armor.on('pointerup', () => {
    //   this.tweens.add({
    //     targets: this.armor,
    //     scaleX: -1,
    //     scaleY: 1,
    //     ease: 'Linear',
    //     duration: 150,
    //     repeat: 0,
    //     yoyo: false,
    //     onComplete: () => {
    //       console.log(this.armor.frame.name.texture)
    //       this.armor.setTexture('items', 'bow.png')
    //     }
    //   })
    // })
    // this.add.sprite(200, 300, 'items', 'axe.png')
  }
}
