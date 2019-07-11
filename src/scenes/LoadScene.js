import { config } from '../config/config'

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: config.scenes.load })
  }
  init() {}

  loadImages() {
    this.load.setPath('assets/images')
    for (let image in config.images) {
      this.load.image(config.images[image], config.images[image])
    }
  }

  loadAudios() {
    this.load.setPath('assets/audios')
    for (let audio in config.audios) {
      this.load.audio(config.audios[audio], config.audios[audio])
    }
  }

  loadSprites(frame) {
    this.load.setPath('assets/sprites')
    for (let sprite in config.sprites) {
      this.load.spritesheet(config.sprites[sprite], config.sprites[sprite], frame)
    }
  }

  preload() {
    this.loadImages()
    this.loadAudios()
    this.loadSprites({ frameWidth: 32, frameHeight: 38 })

    let width = this.cameras.main.width
    let height = this.cameras.main.height

    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Carregando...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    })
    loadingText.setOrigin(0.5, 0.5)

    let loadingBar = this.add.graphics()
    let loadingBox = this.add.graphics({
      fillStyle: { color: 0x222222, alpha: 0.8 }
    })
    loadingBox.fillRect(240, 270, 320, 50)

    this.load.on('progress', value => {
      loadingBar.clear()
      loadingBar.fillStyle(0xffffff, 1)
      loadingBar.fillRect(250, 280, 300 * value, 30)
      percentText.setText(`${parseInt(value * 100)}%`)
    })

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    percentText.setOrigin(0.5, 0.5)

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    assetText.setOrigin(0.5, 0.5)

    this.load.on('fileprogress', file => {
      assetText.setText(`Carregando: ${file.key}`)
    })

    this.load.on('complete', () => {
      loadingBar.destroy()
      loadingBox.destroy()
      loadingText.destroy()
      percentText.destroy()
      assetText.destroy()
      this.scene.start(config.scenes.menu, this)
    })
  }

  create() {}
}
