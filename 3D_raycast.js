let part;
let wall=[];
let x1,x2,y1,y2;
let boundary=[];
let w=[];


function setup(){

  createCanvas(800,800);
  part = new particle(300,300);
  for(let i=0;i<5;i++){
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
  part.show();
  part.update(mouseX,mouseY);

  for(w of wa ){
    stroke(255);
    w.show();
  }
  part.shine(wa);


}
