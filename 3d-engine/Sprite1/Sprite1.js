/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.svg", {
        x: 48,
        y: 50
      }),
      new Costume("costume2", "./Sprite1/costumes/costume2.svg", {
        x: 20.281224378737704,
        y: 37.099149646899804
      })
    ];

    this.sounds = [new Sound("Meow", "./Sprite1/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.KEY_PRESSED, { key: "t" }, this.whenKeyTPressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "1" }, this.whenKey1Pressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "2" }, this.whenKey2Pressed)
    ];
  }

  *goTo(x5, y5, z5) {
    this.stage.vars.x =
      x5 * this.stage.vars.m1 +
      (y5 * this.stage.vars.m2 + z5 * this.stage.vars.m3);
    this.stage.vars.y =
      x5 * this.stage.vars.m4 +
      (y5 * this.stage.vars.m5 + z5 * this.stage.vars.m6);
    this.stage.vars.z =
      x5 * this.stage.vars.m7 +
      (y5 * this.stage.vars.m8 + z5 * this.stage.vars.m9);
    this.stage.vars.x =
      (this.stage.vars.x * this.stage.vars.viewFactor) /
      (this.stage.vars.z + 250);
    this.stage.vars.y =
      (this.stage.vars.y * this.stage.vars.viewFactor) /
      (this.stage.vars.z + 250);
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
    this.clearPen();
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
      this.stage.vars.rotX = this.timer * (this.stage.vars.speed * -1);
      this.stage.vars.rotY = this.timer * this.stage.vars.speed;
      yield* this.render();
      this.penColor = Color.rgb(0, 203, 214);
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
