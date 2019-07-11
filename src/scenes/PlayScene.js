import { config } from "../config/config";

export class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: config.scenes.play });
  }
  create() {}
}
