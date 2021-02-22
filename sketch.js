let graphic;
let elements;
let size = 2.7;
let song;
let timerOfSong = 0;

let start = false;

// a

function setup() {
  createCanvas(120 * size, 222 * size);
  // createCanvas(windowWidth, windowHeight)
  textFont(BOLD);
  textFont('Courier New');
  angleMode(DEGREES);

  graphic = new Graphic();
  elements = new Elements();

  elements.preCalc();

}

function update() {
  elements.main();
  // if (timerOfSong < millis()) {
  //   timerOfSong = millis() + 38000;
  //   song.play();
  // }
}

function draw() {

  update();

  background(28, 14, 239);
  graphic.show();
  elements.show();
  elements.show2();

  if (!start) {
    elements.clickToStart();
  }

}