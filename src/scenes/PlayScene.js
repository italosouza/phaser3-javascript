import { config } from '../config/config'

export class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: config.scenes.play })
    this.ui = {}
    this.cards = []
  }

  drawUI() {
    this.ui.score = this.add.text(25, 25, 'Pontos: ', { font: '16px Courier', fill: '#00ff00' })
  }

  generateCardDeck() {
    const frameNames = this.anims.generateFrameNames('items', {
      frames: ['armor', 'axe', 'axeDouble', 'backpack', 'bow', 'coin'],
      suffix: '.png'
    })
    this.cardGroup = this.add.group({})

    frameNames.map((frame, i) => {
      const card = this.add.sprite(0, 0, frame.key, frame.frame)

      card.setDataEnabled()
      card.data.set('name', frame.frame)
      card.data.set('selected', 0)
      card.data.set('flipped', 1)
      card.setTexture('items', 'map.png')
      this.cardGroup.add(card)

      this.cards.push(card)
    })
  }

  flip(card) {
    const timeline = this.tweens.createTimeline()
    timeline.add({
      targets: card,
      scaleX: 0,
      scaleY: 1,
      ease: 'Linear',
      duration: 100,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        card.data.set('flipped', 1)
        card.setTexture('items', 'map.png')
      }
    })

    timeline.add({
      targets: card,
      scaleX: -1,
      scaleY: 1,
      ease: 'Linear',
      duration: 100,
      repeat: 0,
      yoyo: false
    })
    timeline.play()
  }

  unflip(card) {
    const timeline = this.tweens.createTimeline()
    timeline.add({
      targets: card,
      scaleX: 0,
      scaleY: 1,
      ease: 'Linear',
      duration: 100,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        const name = card.data.get('name')
        card.data.set('flipped', 0)
        card.setTexture('items', name)
      }
    })

    timeline.add({
      targets: card,
      scaleX: 1,
      scaleY: 1,
      ease: 'Linear',
      duration: 100,
      repeat: 0,
      yoyo: false
    })

    timeline.play()
  }

  flipCard(card) {
    const flipped = card.data.get('flipped')
    if (flipped) {
      this.unflip(card)
      return
    }
    this.flip(card)
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
        this.ui.score.setText([`Pontos: ${card.data.get('name')}`])
      })
    })
  }

  drawCards() {
    Phaser.Actions.GridAlign(this.cardGroup.getChildren(), {
      width: 4,
      height: 10,
      cellWidth: 90,
      cellHeight: 100,
      x: 250,
      y: 150
    })
  }

  create() {
    this.drawUI()
    this.generateCardDeck()
    this.attachCardEvents()
    this.drawCards()
  }
}
