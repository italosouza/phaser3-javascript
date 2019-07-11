import { config } from "../config/config";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: config.scenes.menu });
  }
  create() {}
}
