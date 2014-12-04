var system;
var img;
var img2;

function setup() {
  createCanvas(720, 400);
  img = loadImage("bunsu.PNG");
  img2 = loadImage("cupido.gif")
  system = new ParticleSystem(createVector(width/2, 50));
  smallPoint = 4;
  largePoint = 40;
  imageMode(CENTER);
  noStroke();
}

function draw() {
  
  background(img);
  system.addParticle();
  system.run();
  image(img2);
  
}

function mouseClicked(){
  if(f===0){
        f=1;
    }else if(f===1){
        f=0;
    }
  
}
function drawDot() { 
  var pointillize = map(mouseX, 0, width, smallPoint, largePoint);
  var x = floor(random(img.width));
  var y = floor(random(img.height));
  var pix = img.get(x, y);
  fill(pix, 128);
  ellipse(x, y, pointillize, pointillize);
}
// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.get();
  this.lifespan = 255.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.get();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};