// 在你的 sketch.js 里（或新文件）

let trail = [];
function setup(){
  let c = createCanvas(windowWidth, windowHeight);
  c.position(0,0);
  c.style('z-index','1000');
  c.style('pointer-events','none');
  noStroke();
}

function draw(){
  clear();
  trail.push({x:mouseX,y:mouseY,alpha:255});
  for(let i=trail.length-1;i>=0;i--){
    let t=trail[i];
    fill(77,124,255,t.alpha);
    ellipse(t.x,t.y,10);
    t.alpha-=5;
    if(t.alpha<=0) trail.splice(i,1);
  }
}
