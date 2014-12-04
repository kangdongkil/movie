var system;
var img;
var img2;
var img3;
var dir1=0;
var dir2=0;
var f = 0;
var r;
var bug; 

// Angle and angular velocity, accleration
var theta;
var theta_vel;
var theta_acc;

function setup() {
  createCanvas(720, 400);
  img = loadImage("bunsu.PNG");
  img2 = loadImage("s.png")
  img3 = loadImage("s2.png")
  system = new ParticleSystem(createVector(width/2, 50));
  bug = new Jitter();
 
}

function draw() {
  
  background(img);
  system.addParticle();
  system.run();
  drawSa();
  drawSaram();
  drawBang();
}
function drawBang() {
  
  bug.move();
  bug.display();
}

// Jitter class
function Jitter() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(10, 30);
  this.speed = 1;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {

    ellipse(this.x+300,this.y-100, 30, 30);
  }
};

function mouseClicked(){
  if(f===0){
        f=1;
    }else if(f===1){
        f=0;
    }
  
}
function drawSaram(){
  image(img3,dir1+100,200);
  
   dir1=dir1+3;     
    if(dir1>720){
     dir1=-720;
}
}
function drawSa(){
  image(img2,dir2+500,200);
  
  dir2=dir2+3;     
    if(dir2>720){
     dir2=-720;
}
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
  noStroke();
  
  
  fill(Math.random()*255,Math.random()*255,Math.random()*255,100);
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