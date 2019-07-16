import { config } from '../config/config'

export class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: config.scenes.play })
    this.ui = {}
    this.cards = []
    this.initialize()
  }

  initialize() {
    this.points = 0
    this.currentCard = null
    this.remainingCards = 0
    this.flippedCardCount = 0
    this.triesCount = 0
  }

  drawUI() {
    this.add
      .image(0, 0, config.images.bg)
      .setOrigin(0)
      .setAlpha(0.6)
      .setDepth(0)
      .setScale(0.4)

    this.ui.score = this.add.text(25, 25, `Pontos: ${this.points}`, {
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    })
  }

  setCardData(card, frame) {
    const frameKey = `${frame.key}-${this.cards.length}`

    card.setDataEnabled()
    card.data.set('name', frame.frame)
    card.data.set('selected', 0)
    card.data.set('key', frameKey)
    card.data.set('flipped', 1)
    card.setTexture('items', 'map.png')
  }

  generateCardDeck() {
    const frameNames = this.anims.generateFrameNames('items', {
      frames: ['armor', 'axe', 'axeDouble', 'backpack', 'bow', 'coin', 'dagger', 'envelope'],
      suffix: '.png'
    })

    this.cardGroup = this.add.group({})

    frameNames.map(frame => {
      const card = this.make.sprite(frame.key, frame.frame)
      this.setCardData(card, frame)
      this.cardGroup.add(card)
      this.cards.push(card)
    })

    frameNames.map(frame => {
      const card = this.make.sprite(frame.key, frame.frame)
      this.setCardData(card, frame)
      this.cardGroup.add(card)
      this.cards.push(card)
    })
    this.remainingCards = this.cards.length / 2
  }

  selectCard(card) {
    if (!this.currentCard) {
      this.currentCard = card
      return
    }

    if (this.currentCard.data.get('key') === card.data.get('key')) {
      return
    }

    const curCardName = this.currentCard.data.get('name')
    const selCardName = card.data.get('name')

    if (curCardName === selCardName) {
      this.time.delayedCall(1000, () => {
        this.currentCard.setVisible(false)
        card.setVisible(false)
        this.currentCard = null
        this.remainingCards--
        this.flippedCardCount = 0
        this.finishGame()
      })
      this.points += 50
      return
    }

    this.currentCard = null
    this.time.delayedCall(1000, () => {
      this.triesCount++
      this.flipAll()
    })
  }

  flipAll() {
    this.cards.map(card => {
      const unflipped = !card.data.get('flipped')
      if (unflipped) {
        this.flip(card)
      }
    })
    this.flippedCardCount = 0
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
        const name = card.data.get('name')
        card.data.set('flipped', 0)
        this.selectCard(card)
        card.setTexture('items', name)
        this.flippedCardCount++
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
    // this.flip(card)
  }

  attachCardEvents() {
    this.cards.map(card => {
      card.setInteractive()

      card.on('pointerup', () => {
        if (this.flippedCardCount >= 2) {
          return
        }
        const selected = card.data.get('selected')
        card.data.set('selected', !selected)
        this.flipCard(card)
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

  resetGame() {
    this.initialize()
    this.shuffleCards()
    this.flipAll()
    this.cards.map(card => {
      card.setVisible(true)
    })
    this.drawCards()
  }

  finishGame() {
    if (this.remainingCards !== 0) {
      return
    }
    this.resetGame()
  }

  update() {
    this.ui.score.setText([
      `Pontos: ${this.points}\nFalta: ${this.remainingCards}\nTentativas: ${this.triesCount}`
    ])
  }
}
