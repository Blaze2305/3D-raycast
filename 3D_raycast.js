let part;
let wall=[];
let x1,x2,y1,y2;
let boundary=[];
let w=[];
let dists=[];
let view_width;
let view_height;

function setup(){

  createCanvas(800,800);
  part = new particle(300,300);
  for(let i=0;i<2;i++){
    x1=random(0,width/4);
    y1=random(0,height/4);
    x2=random(0,width/4);
    y2=random(0,height/4);
    wall[i]= new walls(x1,y1,x2,y2);
  }

  boundary[0]=new walls(0,0,0,width/4);
  boundary[1]=new walls(width/4,0,width/4,height/4);
  boundary[2]=new walls(0,0,height/4,0);
  boundary[3]=new walls(0,height/4,width/4,height/4);
  wa=wall.concat(boundary);
}



function draw(){


  background(0);
  line(width/4,0,width/4,height)
  part.show();
  part.update(mouseX,mouseY);

  for(w of wa ){
    stroke(255);
    w.show();
  }
  dists=part.shine(wa);
  view_width=(3*width/4)/dists.length;
  for(let p =0;p<dists.length;p++){
    push();
    rectMode(CENTER);
    translate(width/4+p*view_width,0);
    fill(map(dists[p]%255,0,width/4,255,0));
    view_height=map(dists[p],0,sqrt(2)*width/4,400,100);
    stroke(255);

    rect(p*view_width/2,height/2,view_width,view_height);
    pop();
  }

}
