  var system;
  var img;
  var img2;
  var img3;
  var img4;
  var dir1=0;
  var dir2=0;
  var f = 0;
  var r;
  var bug; 
  // A sound file object
  var song;


  function preload() {
    // Load a sound file
    song = loadSound('a.mp3');

  }

  function setup() {
    createCanvas(720, 400);
    song.loop();
    img = loadImage("bunsu.PNG");
    img2 = loadImage("s.png");
    img3 = loadImage("s2.png");
    img4 = loadImage("ball.png");
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

    // Set the volume to a range between 0 and 1.0
    var volume = map(30+mouseX, 0, width, 0, 1);
    volume = constrain(volume, 0, 1);
    song.amp(volume);

    // Set the rate to a range between 0.1 and 4
    // Changing the rate alters the pitch
    var speed = map(mouseY, 0.1, height, 0, 2);
    speed = constrain(speed, 0.01, 4);
    song.rate(speed);

    // Draw some circles to show what is going on
    stroke(0);
    fill(51, 100);
    star(mouseX, 0, 80, 100, 40); 
    stroke(0);
    fill(51, 100);
    ellipse(100, mouseY, 48, 48);

  }
  function greet() {
    var name = input.value();
    greeting.html('hello '+name+'!');
    input.value('');

    for (var i=0; i<200; i++) {
      push();
      fill(random(255), 255, 255);
      translate(random(width), random(height));
      rotate(random(2*PI));
      text(name, 0, 0);
      pop();
    }
  }

  function drawBang() {
    
    bug.move();
    bug.display();
  }


  function Jitter() {
    this.x = random(width);
    this.y = random(15);
    this.diameter = random(10, 30);
    this.speed = 1;

    this.move = function() {
      this.x += random(-this.speed, this.speed);
      this.y += random(-this.speed, this.speed);
    };

    this.display = function() {
     image(img4,360,this.y, 30, 30);
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