function Graphic() {
    this.show = function() {
  
      noStroke();
      fill(176, 173, 168);
      rect(0, 0, 120 * size, 222 * size, 30);
  
      strokeWeight(0.2 * size);
      stroke(85, 80, 52);
      fill(160, 170, 137);
      rect(18 * size, 17.5 * size, 83 * size, 95 * size, 2 * size);
  
      strokeWeight(0.7 * size);
      stroke(0);
      rect(20 * size, 19.5 * size, 57 * size, 91 * size);
  
      strokeWeight(0.4 * size);
      stroke(140, 149, 118);
  
      let frame = [];
      frame[0] = createVector(12 * size, 11.5 * size);
      frame[1] = createVector(12 * size, 120.5 * size);
      frame[2] = createVector(107 * size, 120.5 * size);
      frame[3] = createVector(30 * size, 11.5 * size);
      frame[4] = createVector(89 * size, 120.5 * size);
  
      stroke(0);
      strokeWeight(1.5 * size);
      strokeCap(PROJECT);
      line(frame[0].x, frame[0].y, frame[1].x, frame[1].y);
      line(frame[0].x, frame[0].y, frame[3].x, frame[3].y);
      line(frame[1].x, frame[1].y, frame[2].x, frame[2].y);
      line(frame[2].x, frame[2].y, frame[2].x, frame[0].y);
  
      line(frame[2].x, frame[0].y, frame[4].x, frame[0].y);
  
      strokeWeight(0.4 * size);
      stroke(140, 149, 118);
  
      for (let x = 0; x < 11; x++) {
        for (let y = 0; y < 19; y++) {
  
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
  
          fill(140, 149, 118);
          rect(pos.x + 0.75 * size,
            pos.y + 0.75 * size,
            3.5 * size - 1.5 * size,
            3.5 * size - 1.5 * size);
        }
      }
      
    }
  }