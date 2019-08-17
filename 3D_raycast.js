let part;
let wall=[];
let x1,x2,y1,y2;
let boundary=[];
let w=[];
let dists=[];
let view_width;
let view_height;
let wall_number=8;
let max;

function setup(){

  createCanvas(windowWidth-20,800);
  part = new particle(20,20);
  for(let i=0;i<wall_number;i++){
    //commented lines below were when createCanvas was (800,800);
    x1=random(0,200);//width/4);
    y1=random(0,200);//height/4);
    x2=random(0,200);//width/4);
    y2=random(0,200);//height/4);
    wall[i]= new walls(x1,y1,x2,y2);
  }

  boundary[0]=new walls(0,0,0,200);//width/4);
  boundary[1]=new walls(200,0,200,200);//width/4,0,width/4,height/4);
  boundary[2]=new walls(0,0,200,0);//height/4,0);
  boundary[3]=new walls(0,200,200,200);//height/4,width/4,height/4);
  wa=wall.concat(boundary);
}



function draw(){

  max=0;
  background(0);
  line(200,0,200,800);//width/4,0,width/4,height)
  part.show();
  part.update(20,20);

  for(w of wa ){
    stroke(255);
    w.show();
  }
  dists=part.shine(wa);

  if(Math.max(...dists)>max){
    max=Math.max(...dists);
  }

  view_width=(3*200)/(dists.length)//width/4)/dists.length;

  for(let p =0;p<dists.length;p++){
    push();
    rectMode(CENTER);
    translate(width/4+p*view_width,0);
    fill(map(dists[p],0,max,255,0));
    //fill(map(dists[p],0,Math.max(...dists),255,0));
    view_height=map(dists[p],0,max,500,100);//width/4,500,100);
    //stroke(255);
    noStroke();
    rect(p*view_width/2,height/2,view_width+3,view_height+1);
    pop();
  }

}
