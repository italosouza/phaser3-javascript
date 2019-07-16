export const config = {
  scenes: {
    load: 'load',
    menu: 'menu',
    play: 'play'
  },
  audio: {
    bgm: 'soundtrack_1.mp3',
    flip: 'bookFlip2.ogg',
    flipFail: 'bookFlip3.ogg',
    flipSuccess: 'bookFlip1.ogg',
    menuSelect: 'menu_select.wav',
    levelCompleted: 'level_completed.wav'
  },
  sprites: {
    fire1: { key: 'fire1', url: 'fire1_64.png', frameConfig: { frameWidth: 64, frameHeight: 64 } }
  },
  atlas: [{ key: 'items', atlasURL: 'items.json' }],
  images: {
    logo: 'logo.png',
    bg: 'bg_03.jpg',
    playButton: 'play.png'
  }
}
