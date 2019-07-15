import { config } from '../config/config'
import { isArray } from 'util'

export class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: config.scenes.play })
    this.ui = {}
    this.cards = []
    this.points = 0
    this.currentCard = null
  }

  drawUI() {
    this.ui.score = this.add.text(25, 25, `Pontos: ${this.points}`, {
      font: '16px Courier',
      fill: '#00ff00'
    })
  }

  generateCardDeck() {
    const frameNames = this.anims.generateFrameNames('items', {
      frames: [
        'armor',
        'axe',
        'axeDouble',
        'backpack',
        'bow',
        'coin'
        // 'dagger',
        // 'envelope',
        // 'gemBlue',
        // 'gemGreen',
        // 'gemRed',
        // 'hammer'
      ],
      suffix: '.png'
    })

    this.cardGroup = this.add.group({})

    frameNames.map((frame, i) => {
      const frameKey = `${frame.key}-${i}`
      const card = this.add.sprite(-50, -50, frame.key, frame.frame)

      card.setDataEnabled()
      card.data.set('name', frame.frame)
      card.data.set('selected', 0)
      card.data.set('key', frameKey)
      // card.data.set('flipped', 1)
      // card.setTexture('items', 'map.png')
      this.cardGroup.add(card)

      this.cards.push(card)
    })
  }

  selectCard(card) {
    if (!this.currentCard) {
      this.currentCard = card
      return
    }

    const curCardKey = this.currentCard.data.get('key')
    const selCardKey = card.data.get('key')

    if (curCardKey === selCardKey) {
      console.log('iguais')
      this.currentCard.setVisible(false)
      card.setVisible(false)
      this.currentCard = null
      this.points += 50
    }
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
      scaleX: 1,
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
        this.selectCard(card)
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
        this.ui.score.setText([`Pontos: ${this.points}`])
      })
    })
  }

  drawCards() {
    Phaser.Actions.GridAlign(this.cardGroup.getChildren(), {
      width: 4,
      height: 4,
      cellWidth: 100,
      cellHeight: 120,
      x: 250,
      y: 150
    })
  }

  shuffleCards() {
    Phaser.Actions.Shuffle(this.cardGroup.getChildren())
  }

  create() {
    this.drawUI()
    this.generateCardDeck()
    this.attachCardEvents()
    this.shuffleCards()
    this.drawCards()
  }
}
