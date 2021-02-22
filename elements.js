function Elements() {
    let centralElement;
    let actualElement = int(random(0, 7));
  
    let matrix = [];
    let blockX = [];
    let blockY = [];
    let colorOfBlock = [];
  
    this.rotate = 0;
    this.timer = 0;
    this.speed = 600;
    let oldSpeed = 600;
    let speedIndex = 0;
    let score = 0;
    this.direction = createVector(0, -3);
    let firstElement = true;
    let next = int(random(0, 7));
  
    let gameOver = false;
    let pause = false;
    let visible = true;
  
    this.main = function() {
      if (!elements.pause && start) {
        this.move();
        this.fall();
      }
    }
  
    this.preCalc = function() {
  
      for (let y = 0; y < 19; y++) {
        matrix[y] = [];
        colorOfBlock[y] = [];
        for (let x = 0; x < 11; x++) {
          matrix[y][x] = 0;
          colorOfBlock[y][x] = -1;
        }
      }
  
      centralElement = createVector(5, -2);
  
      blockX[0] = [
        [0, 1, 2, 1],
        [0, 0, 0, 1],
        [0, -1, 0, 1],
        [0, 0, 0, -1]
      ];
  
      blockY[0] = [
        [0, 0, 0, -1],
        [0, -1, -2, -1],
        [0, -1, -1, -1],
        [0, -1, -2, -1]
      ];
  
      blockX[1] = [
        [-1, 0, 0, 1],
        [0, 0, 1, 1],
        [-1, 0, 0, 1],
        [0, 0, 1, 1]
      ];
  
      blockY[1] = [
        [-1, -1, 0, 0],
        [-1, 0, -2, -1],
        [-1, -1, 0, 0],
        [-1, 0, -2, -1]
      ];
  
      blockX[2] = [
        [-1, 0, 0, 1],
        [-1, -1, 0, 0],
        [-1, 0, 0, 1],
        [-1, -1, 0, 0]
      ];
  
      blockY[2] = [
        [0, -1, 0, -1],
        [-2, -1, -1, 0],
        [0, -1, 0, -1],
        [-2, -1, -1, 0]
      ];
  
      blockX[3] = [
        [0, 0, 0, 1],
        [0, 1, 2, 2],
        [0, 1, 1, 1],
        [0, 0, 1, 2]
      ];
  
      blockY[3] = [
        [-2, -1, 0, -2],
        [-1, -1, -1, 0],
        [0, -2, -1, 0],
        [-1, 0, 0, 0]
      ];
  
      blockX[4] = [
        [0, 0, 1, 2],
        [0, 1, 1, 1],
        [0, 1, 2, 2],
        [0, 0, 0, 1]
      ];
  
      blockY[4] = [
        [-1, 0, -1, -1],
        [-2, -2, -1, 0],
        [0, 0, -1, 0],
        [-2, -1, 0, 0]
      ];
  
  
      blockX[5] = [
        [0, 0, 0, 0],
        [-1, 0, 1, 2],
        [0, 0, 0, 0],
        [-1, 0, 1, 2]
      ];
  
      blockY[5] = [
        [-3, -2, -1, 0],
        [0, 0, 0, 0],
        [-3, -2, -1, 0],
        [0, 0, 0, 0]
      ];
  
      blockX[6] = [
        [0, 0, 1, 1],
        [0, 0, 1, 1],
        [0, 0, 1, 1],
        [0, 0, 1, 1]
      ];
  
      blockY[6] = [
        [-1, 0, -1, 0],
        [-1, 0, -1, 0],
        [-1, 0, -1, 0],
        [-1, 0, -1, 0]
      ];
  
    }
  
    this.clickToStart = function() {
      if (this.timer < millis()) {
        this.timer = millis() + 150;
        visible = visible ? !visible : !visible;
      }
  
      if (visible) {
        fill(0);
        textSize(6 * size);
        text(
          "Click to Start!",
          width / 2.45,
          height / 4 - textSize() / 2.75
        );
      }
  
    }
  
    this.move = function() {
      centralElement.x += this.direction.x;
      centralElement.y += this.direction.y;
      this.direction.x = 0;
      this.direction.y = 0;
    }
  
    this.fall = function() {
      let result = [];
      if (!gameOver) {
        if (this.timer < millis()) {
          this.timer = millis() + this.speed;
          result[0] = elements.collosion(0, 1);
          if (!result[0]) {
            elements.direction.y = 1;
          } else {
            elements.saveElement();
          }
        }
      }
    }
  
    this.nextElement = function() {
      next = int(random(0, 7));
    }
  
    this.collosion = function(dx, dy) {
      if (!firstElement) {
        for (let y = 0; y < 19; y++) {
          for (let x = 0; x < 11; x++) {
            if (matrix[y][x] == 1) {
              let i = actualElement;
              for (let ii = 0; ii < 4; ii++) {
                let pos = createVector(
                  centralElement.x + blockX[i][this.rotate][ii] + dx,
                  centralElement.y + blockY[i][this.rotate][ii] + dy
                );
                if ((x == pos.x && y == pos.y) || pos.y > 18 || pos.x >= 11 || pos.x < 0) {
                  if (pos.y <= 0 && pos.x < 11 && pos.x >= 0) {
                    gameOver = true;
                  }
                  return true;
                }
              }
            }
          }
        }
        return false;
      } else {
        let i = actualElement;
        for (let ii = 0; ii < 4; ii++) {
          let pos = createVector(
            centralElement.x + blockX[i][this.rotate][ii] + dx,
            centralElement.y + blockY[i][this.rotate][ii] + dy
          );
          if (pos.y > 18 || pos.x >= 11 || pos.x < 0) {
            if (pos.y > 18) {
              firstElement = false;
            }
            return true;
          }
        }
      }
    }
  
    this.checkInMatrix = function(dx, dy) {
      let i = actualElement;
      for (let ii = 0; ii < 4; ii++) {
        let pos = createVector(
          centralElement.x + blockX[i][this.rotate][ii] + dx,
          centralElement.y + blockX[i][this.rotate][ii] + dy
        );
        if (pos.x < 0 || pos.x > 10) {
          return false;
        }
      }
      return true;
    }
  
    this.saveElement = function() {
      for (let y = 0; y < 19; y++) {
        for (let x = 0; x < 11; x++) {
          let i = actualElement;
          for (let ii = 0; ii < 4; ii++) {
            let pos = createVector(
              centralElement.x + blockX[i][this.rotate][ii],
              centralElement.y + blockY[i][this.rotate][ii]
            );
            if (x == pos.x && y == pos.y) {
              matrix[y][x] = 1;
              colorOfBlock[y][x] = i;
            }
          }
        }
      }
  
      this.deleteRows();
      centralElement = createVector(5, -3);
      actualElement = next;
      this.rotate = int(random(0, 4));
      this.speed = oldSpeed;
      this.nextElement();
      score += int(map(oldSpeed, 600, 0, 10, 100));
      speedIndex++;
      if (speedIndex >= 15) {
        if (this.speed - 30 >= 0) {
          this.speed -= 30
        } else {
          this.speed = 0
        }
        oldSpeed = this.speed;
        speedIndex = 0;
      }
    }
  
    this.deleteRows = function() {
      let elementInRow;
      for (let y = 0; y < 19; y++) {
        elementInRow = 0;
        deletedRow = -1;
        for (let x = 0; x < 11; x++) {
          if (matrix[y][x] == 1) {
            elementInRow++;
          }
        }
        if (elementInRow == 11) {
          deletedRow = y;
          for (let x = 0; x < 11; x++) {
            matrix[y][x] = 0;
          }
          for (let y = deletedRow; y > 0; y--) {
            for (let x = 0; x < 11; x++) {
              matrix[y][x] = matrix[y - 1][x];
              colorOfBlock[y][x] = colorOfBlock[y - 1][x]
            }
          }
          score += int(map(oldSpeed, 600, 0, 100, 1000));
        }
      }
    }
  
    this.show = function() {
      let i = actualElement;
  
      strokeWeight(0.4 * size);
      stroke(0);
  
      for (let y = 0; y < 19; y++) {
        for (let x = 0; x < 11; x++) {
          if (matrix[y][x] == 1) {
  
            let pos = createVector(
              24 * size + x * 3.5 * size + 1 * size * x,
              23 * size + y * 3.5 * size + 1 * size * y
            );
  
            noFill();
            rect(pos.x,
              pos.y,
              3.5 * size,
              3.5 * size
            );
  
            this.setColor(colorOfBlock[y][x]);
  
            rect(pos.x + 0.75 * size,
              pos.y + 0.75 * size,
              3.5 * size - 1.5 * size,
              3.5 * size - 1.5 * size);
          }
        }
      }
  
      for (let ii = 0; ii < 4; ii++) {
  
        let pos = createVector(
          24 * size + (centralElement.x + blockX[i][this.rotate][ii]) * 3.5 * size + 1 * size * (centralElement.x + blockX[i][this.rotate][ii]),
          23 * size + (centralElement.y + blockY[i][this.rotate][ii]) * 3.5 * size + 1 * size * (centralElement.y + blockY[i][this.rotate][ii])
        );
  
        if (centralElement.y + blockY[i][this.rotate][ii] >= 0) {
          noFill();
          rect(pos.x,
            pos.y,
            3.5 * size,
            3.5 * size
          );
  
          this.setColor(i);
  
          rect(pos.x + 0.75 * size,
            pos.y + 0.75 * size,
            3.5 * size - 1.5 * size,
            3.5 * size - 1.5 * size
          );
        }
  
      }
    }
  
    this.show2 = function() {
      let typ = [];
  
      typ = [
        [2, 23, 1, 1],
        [2, 40.5, 0, 1],
        [2, 53.5, 6, 0],
        [6, 70, 0, 3],
        [1.5, 87.5, 4, 1],
        [6, 109, 5, 0],
        [114, 23, 2, 1],
        [114, 40.5, 0, 3],
        [109.5, 53.5, 6, 0],
        [109.5, 70, 0, 1],
        [109.5, 87.5, 3, 0],
        [109.5, 109, 5, 0],
      ]
  
      for (let i = 0; i < typ.length; i++) {
        for (let ii = 0; ii < 4; ii++) {
  
          let pos = createVector(
            typ[i][0] * size + (blockX[typ[i][2]][typ[i][3]][ii]) * 3.5 * size + 1 * size * (blockX[typ[i][2]][typ[i][3]][ii]),
            typ[i][1] * size + (blockY[typ[i][2]][typ[i][3]][ii]) * 3.5 * size + 1 * size * (blockY[typ[i][2]][typ[i][3]][ii])
          );
  
          noFill();
          rect(pos.x,
            pos.y,
            3.5 * size,
            3.5 * size
          );
  
          this.setColor(typ[i][2]);
  
          rect(pos.x + 0.75 * size,
            pos.y + 0.75 * size,
            3.5 * size - 1.5 * size,
            3.5 * size - 1.5 * size
          );
  
        }
      }
  
      fill(5,9,239);
      textStyle(BOLD)
      noStroke();
      textSize(5.9* size);
      text("Next", width / 1.35, height / 9.314);
      text("Score", width / 1.35, height / 4);
      text("Level", width / 1.35, height / 3);
      let level = map(oldSpeed, 600, 0, 0, 20);
      text(int(level), width / 1.36, height / 2.79);
      textAlign(CENTER, CENTER);
      text(score, width / 1.36, height / 3.6);
      stroke(0);
  
      textAlign(CENTER, CENTER);
  
      for (let ii = 0; ii < 4; ii++) {
  
        let pos = createVector(
          85 * size + (blockX[next][0][ii]) * 3.5 * size + 1 * size * (blockX[next][0][ii]),
          41 * size + (blockY[next][0][ii]) * 3.5 * size + 1 * size * (blockY[next][0][ii])
        );
  
        noFill();
        rect(pos.x,
          pos.y,
          3.5 * size,
          3.5 * size
        );
  
        this.setColor(next);
  
        rect(pos.x + 0.75 * size,
          pos.y + 0.75 * size,
          3.5 * size - 1.5 * size,
          3.5 * size - 1.5 * size
        );
  
      }
  
      textSize(10 * size);
      if (gameOver) {
        fill(0);
        rect(
          width / 2.5 - textWidth("Game Over") / 2,
          height / 4 - textSize() / 2.75,
          textWidth("Game Over"),
          textSize() / 1.35
        );
        fill(255, 120, 255);
        stroke(0);
        text("Game Over", width / 2.5, height / 4);
      }
  
      textSize(4 * size);
      for (let i = 0; i < 360; i += 90) {
        fill(253, 227, 78);
        stroke(200, 180, 60);
        circle(30 * size + 15 * size * cos(i),
          150 * size + 15 * size * sin(i),
          12 * size
        );
        noStroke();
        fill(235, 212, 61);
        circle(30 * size + 15 * size * cos(i),
          150 * size + 15 * size * sin(i),
          9 * size
        );
  
        fill(0);
        switch (i) {
          case 0:
            text("D", 30 * size + 15 * size * cos(i), 150 * size + 15 * size * sin(i));
            break;
          case 90:
            text("S", 30 * size + 15 * size * cos(i), 150 * size + 15 * size * sin(i));
            break;
          case 180:
            text("A", 30 * size + 15 * size * cos(i), 150 * size + 15 * size * sin(i));
            break;
        }
      }
  
      fill(53, 27, 78);
      stroke(200, 180, 60);
      circle(90 * size, 150 * size, 18 * size);
  
      noStroke();
      fill(3, 7, 248);
      circle(90 * size, 150 * size, 13.5 * size);
      fill(0);
      text("W", 90 * size, 150 * size);
  
      textSize(20 * size);
      fill(5, 2, 245);
      translate(width / 2, 190 * size);
      rotate(-15);
      text("GameBone", 0, 0);
      rotate(15);
      translate(-width / 2, -190 * size);
  
    }
  
    this.setColor = function(i) {
      switch (i) {
        case 0:
          fill(255);
          break;
        case 1:
          fill(0, 176, 240);
          break;
        case 2:
          fill(112, 48, 160);
          break;
        case 3:
          fill(0, 176, 80);
          break;
        case 4:
          fill(255, 255, 0);
          break;
        case 5:
          fill(255, 192, 0);
          break;
        case 6:
          fill(255, 0, 0);
          break;
        default:
          fill(0);
          break;
      }
    }
  }
  
  function keyPressed() {
    let result = [];
  
    if (!elements.pause) {
      if (key == "a") {
        result[0] = elements.collosion(-1, 0);
        result[1] = elements.checkInMatrix(-1, 0);
        if (!result[0] && result[1]) {
          elements.direction.x = -1;
        }
      }
  
      if (key == "d") {
        result[0] = elements.collosion(1, 0);
        result[1] = elements.checkInMatrix(1, 0);
        if (!result[0] && result[1]) {
          elements.direction.x = 1;
        }
      }
  
      if (key == "w") {
        elements.rotate++;
        if (elements.rotate >= 4) {
          elements.rotate = 0;
        }
        result[0] = elements.collosion(0, 0);
        if (result[0]) {
          elements.rotate--;
          if (elements.rotate <= -1) {
            elements.rotate = 3;
          }
        }
      }
  
      if (key == "s") {
        elements.speed = 0;
        elements.timer = millis();
      }
    }
  
    if (key == "p") {
      if (!elements.pause) {
        elements.pause = true;
      } else {
        elements.pause = false;
      }
    }
  
  }
  
  function mousePressed() {
    start = true;
  }