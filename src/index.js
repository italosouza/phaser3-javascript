/** @type { import("../typings/phaser")} */

import Phaser from 'phaser'

import { LoadScene } from './scenes/LoadScene'
import { MenuScene } from './scenes/MenuScene'
import { PlayScene } from './scenes/PlayScene'

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: [LoadScene, MenuScene, PlayScene],
  render: {
    pixelArt: true
  },
  loader: {
    // baseURL: ""
    path: 'assets/'
    // maxParallelDownloads: 32,
    // crossOrigin: 'anonymous',
    // timeout: 0
  },
  scale: {
    mode: Phaser.Scale.PORTRAIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  title: 'Memory Puzzle',
  url: 'http://localhost:3000'
}

const game = new Phaser.Game(config)
