const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');

var particleSystem = [];
var startMult = 0; 


// BUTTTON ASSIIGNMENTS
document.getElementById("button").onclick = click;
var slider = document.getElementById("myRange");
var output = document.getElementById("sliderValue");
output.innerHTML = slider.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  startMult = this.value;
  output.innerHTML = this.value;
}

/// MAIN FUNCTION
window.requestAnimationFrame(draw);
function draw() {
  // EMITTER ( CREATE PARTICLE AND SAVE TO PARTICLE SYSTEM )
  emit();
  // REMOVE OLD PARTICLES
  remove();
  // UPDATES LOCATION OF ALL PARTICLES
  update();
  
  // ITERATE
  window.requestAnimationFrame(draw);
}
/// END ITERATION 

console.log("width"+ canvas.width);
console.log("height"+ canvas.height);
//// FUNCS
function random (min, max) {
  return Math.random() * (max - min) + min;
}

/// CREATE A NEW PARTICLE FUNCTION
function newParticle(){
  const particle = {
    x: canvas.width / 2 + ((Math.random()- 0.5)*startMult),
    y: canvas.height / 2 + ((Math.random()- 0.5)*startMult),
    // 
    xvel: (Math.random()- 0.5) * 4,
    yvel: (Math.random()- 0.5) * 4,
    color: `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
    size: 6,
  };

  return particle; 
}

function emit(){
  // NEW PARTICLE
  const particle = newParticle();

  // PUSH PARTICLE ON PARTICLESYSTEM
  particleSystem.push(particle);
}

function remove(){
  var bool = false;
  // DELETE PARTICLE BY LEAVING CANVAS
  if(bool){
    for (let i = 0; i < particleSystem.length; i += 1){
      if(particleSystem[i].x > canvas.width || particleSystem[i].x < 0 || particleSystem[i].y > canvas.height || particleSystem[i].y <0){
        particleSystem.splice(i,1)
        console.log("Deleted particle nr.: " + i )
      }
    }
  }
  
  // DELETE PARTICLE BY REACHING LIVETIME
  if(!bool){
    if(particleSystem.length > 200){
      particleSystem.shift();
    }
  }

}

function update(){
  //CLEAR CANVAS
  //context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particleSystem.length; i += 1){ 
    const p = particleSystem[i];
    // CALCULATE NEW LOCATION
    p.x += p.xvel;
    p.y += p.yvel;
    //DRAW THE CRICLE WITH SAVED PARAMETERS IN PARTICLE SYSTEM
    context.beginPath();
    context.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
    context.fillStyle = p.color;
    context.fill();
    context.closePath();
  }
}

function click(){
  particleSystem = []; 
}