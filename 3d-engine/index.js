import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Sprie7 from "./Sprie7/Sprie7.js";
import Sprite6 from "./Sprite6/Sprite6.js";
import Sprite5 from "./Sprite5/Sprite5.js";
import Sprite1 from "./Sprite1/Sprite1.js";
import Sprite2 from "./Sprite2/Sprite2.js";
import Sprite3 from "./Sprite3/Sprite3.js";
import Sprite4 from "./Sprite4/Sprite4.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Sprie7: new Sprie7({
    x: -3.813571661219406,
    y: -41.42910627469998,
    direction: 90,
    costumeNumber: 3,
    size: 25,
    visible: false,
    layerOrder: 4
  }),
  Sprite6: new Sprite6({
    x: -4.243566874462177,
    y: 37.61326730389731,
    direction: 90,
    costumeNumber: 3,
    size: 25,
    visible: false,
    layerOrder: 5
  }),
  Sprite5: new Sprite5({
    x: -4.635576494368277,
    y: -50.35903564698623,
    direction: 90,
    costumeNumber: 3,
    size: 25,
    visible: false,
    layerOrder: 6
  }),
  Sprite1: new Sprite1({
    x: -7.334767065388714,
    y: 65.01242054238944,
    direction: 90,
    costumeNumber: 2,
    size: 25,
    visible: false,
    layerOrder: 7
  }),
  Sprite2: new Sprite2({
    x: -5.68611302197809,
    y: -61.7716412865731,
    direction: 90,
    costumeNumber: 3,
    size: 25,
    visible: false,
    layerOrder: 3
  }),
  Sprite3: new Sprite3({
    x: -9.697083944894354,
    y: -105.34521362036149,
    direction: 90,
    costumeNumber: 3,
    size: 25,
    visible: false,
    layerOrder: 2
  }),
  Sprite4: new Sprite4({
    x: -6.698080372746718,
    y: -72.76524692609959,
    direction: 90,
    costumeNumber: 3,
    size: 25,
    visible: false,
    layerOrder: 1
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
