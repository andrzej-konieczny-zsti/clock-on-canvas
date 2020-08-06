import * as clockAPI from "./main.mjs";

var clock = new clockAPI.Clock(document.querySelector("#canvas"));

clock.start();
