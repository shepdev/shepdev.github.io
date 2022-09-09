/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.rotX = 815.76;
    this.vars.rotY = 815.76;
    this.vars.viewFactor = 300;
    this.vars.x = -3.813571661219406;
    this.vars.y = -41.42910627469998;
    this.vars.z = 44.754801334619046;
    this.vars.m1 = -0.1003617149;
    this.vars.m2 = 0;
    this.vars.m3 = -0.994951017;
    this.vars.m4 = -0.9899275262293342;
    this.vars.m5 = -0.1003617149;
    this.vars.m6 = 0.09985499030761905;
    this.vars.m7 = -0.09985499030761905;
    this.vars.m8 = 0.994951017;
    this.vars.m9 = 0.01007247381766888;
    this.vars.color = 10000;
    this.vars.speed = 30;
    this.vars.renderSpeedDebug = 0.89;

    this.watchers.viewFactor = new Watcher({
      label: "view factor",
      style: "slider",
      visible: true,
      value: () => this.vars.viewFactor,
      setValue: value => {
        this.vars.viewFactor = value;
      },
      x: 583,
      y: 180
    });
    this.watchers.speed = new Watcher({
      label: "speed",
      style: "slider",
      visible: true,
      value: () => this.vars.speed,
      setValue: value => {
        this.vars.speed = value;
      },
      x: 240,
      y: 180
    });
    this.watchers.renderSpeedDebug = new Watcher({
      label: "render speed (debug)",
      style: "slider",
      visible: true,
      value: () => this.vars.renderSpeedDebug,
      setValue: value => {
        this.vars.renderSpeedDebug = value;
      },
      x: 240,
      y: -139
    });
  }
}
