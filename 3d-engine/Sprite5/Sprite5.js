/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite5 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite5/costumes/costume1.svg", {
        x: 48,
        y: 50
      }),
      new Costume("costume2", "./Sprite5/costumes/costume2.svg", {
        x: 46,
        y: 53
      }),
      new Costume("costume3", "./Sprite5/costumes/costume3.svg", {
        x: 22.364094842473378,
        y: 28.28828673581569
      })
    ];

    this.sounds = [new Sound("Meow", "./Sprite5/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.KEY_PRESSED, { key: "t" }, this.whenKeyTPressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "1" }, this.whenKey1Pressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "2" }, this.whenKey2Pressed)
    ];
  }

  *goTo(x4, y4, z4) {
    this.stage.vars.x =
      x4 * this.stage.vars.m1 +
      (y4 * this.stage.vars.m2 + z4 * this.stage.vars.m3);
    this.stage.vars.y =
      x4 * this.stage.vars.m4 +
      (y4 * this.stage.vars.m5 + z4 * this.stage.vars.m6);
    this.stage.vars.z =
      x4 * this.stage.vars.m7 +
      (y4 * this.stage.vars.m8 + z4 * this.stage.vars.m9);
    this.stage.vars.x =
      (this.stage.vars.x * this.stage.vars.viewFactor) /
      (this.stage.vars.z + 280);
    this.stage.vars.y =
      (this.stage.vars.y * this.stage.vars.viewFactor) /
      (this.stage.vars.z + 280);
    this.goto(this.stage.vars.x, this.stage.vars.y);
  }

  *calcRotMatrix() {
    this.stage.vars.m1 = Math.cos(this.degToRad(this.stage.vars.rotY));
    this.stage.vars.m2 = 0;
    this.stage.vars.m3 = 0 - Math.sin(this.degToRad(this.stage.vars.rotY));
    this.stage.vars.m4 =
      0 -
      Math.sin(this.degToRad(this.stage.vars.rotY)) *
        Math.sin(this.degToRad(this.stage.vars.rotX));
    this.stage.vars.m5 = Math.cos(this.degToRad(this.stage.vars.rotX));
    this.stage.vars.m6 =
      0 -
      Math.cos(this.degToRad(this.stage.vars.rotY)) *
        Math.sin(this.degToRad(this.stage.vars.rotX));
    this.stage.vars.m7 =
      Math.cos(this.degToRad(this.stage.vars.rotY)) *
      Math.sin(this.degToRad(this.stage.vars.rotX));
    this.stage.vars.m8 = Math.sin(this.degToRad(this.stage.vars.rotX));
    this.stage.vars.m9 =
      Math.cos(this.degToRad(this.stage.vars.rotY)) *
      Math.cos(this.degToRad(this.stage.vars.rotX));
  }

  *render() {
    yield* this.calcRotMatrix();
    this.penSize = 5;
    yield* this.goTo(50, 50, 0);
    this.penDown = true;
    yield* this.goTo(50, -50, 0);
    yield* this.goTo(-50, -50, 0);
    yield* this.goTo(-50, 50, 0);
    yield* this.goTo(50, 50, 0);
    this.penDown = false;
  }

  *whenGreenFlagClicked() {
    this.restartTimer();
  }

  *debugRender() {
    this.clearPen();
    yield* this.calcRotMatrix();
    this.penSize = 5;
    yield* this.goTo(50, 50, 0);
    yield* this.wait(this.stage.vars.renderSpeedDebug);
    this.penDown = true;
    yield* this.goTo(50, -50, 0);
    yield* this.wait(this.stage.vars.renderSpeedDebug);
    yield* this.goTo(-50, -50, 0);
    yield* this.wait(this.stage.vars.renderSpeedDebug);
    yield* this.goTo(-50, 50, 0);
    yield* this.wait(this.stage.vars.renderSpeedDebug);
    yield* this.goTo(50, 50, 0);
    yield* this.wait(this.stage.vars.renderSpeedDebug);
    this.penDown = false;
  }

  *whenKeyTPressed() {
    this.restartTimer();
    this.stage.vars.rotX = 0;
    this.stage.vars.rotY = 0;
    this.stage.vars.viewFactor = 300;
    while (true) {
      this.stage.vars.rotX = this.timer * this.stage.vars.speed;
      this.stage.vars.rotY = this.timer * this.stage.vars.speed;
      yield* this.render();
      this.penColor = Color.rgb(255, 24, 24);
      yield;
    }
  }

  *whenKey1Pressed() {
    this.visible = true;
  }

  *whenKey2Pressed() {
    this.visible = false;
  }
}
