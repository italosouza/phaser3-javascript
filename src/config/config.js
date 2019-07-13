export const config = {
  scenes: {
    load: 'load',
    menu: 'menu',
    play: 'play'
  },
  audios: {
    bgm: 'soundtrack_1.mp3'
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
