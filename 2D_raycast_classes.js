
class particle{

  constructor(x,y){
    this.pos=createVector(x,y);
    this.left=0;
    this.right=70;
    this.b=0;
    this.x1=0;
  }

  update(x,y){


    if(keyIsDown(LEFT_ARROW)){
      // if(this.left>0){
        this.left-=1;
        this.right-=1;
      //}
    }


    if(keyIsDown(RIGHT_ARROW)){
    //  if(this.right<360){
        this.right+=1;
        this.left+=1;
      }
    //}

    // Below is for actually moving up down left and right
    // 87=w, 65=a, 83=s , 68 =d : event keycodes http://keycode.info/;     https://p5js.org/reference/#/p5/keyCode



    if(keyIsDown(87)){  //W
      if(this.pos.y>5 && this.pos.y<height/4-5 && this.pos.x>5 && this.pos.x<width/4-10){
        let mid=(this.right+this.left)/2
        let px=cos(mid*PI/180)
        let py=sin(mid*PI/180)
        let a=this.pos.x+px
        let b=this.pos.y+py
       if(a>5 && a<height/4-5 && b>5 && b<width/4-10){
         this.pos.x+=px
         this.pos.y+=py

       }


        // this.pos.y-=2;
      }
    }



    if(keyIsDown(65)){  //A
      if(this.pos.y>5 && this.pos.y<height/4-5 && this.pos.x>5 && this.pos.x<width/4-10){
        let mid=(this.right+this.left)/2
        let px=cos(mid*PI/180-PI/2)
        let py=sin(mid*PI/180-PI/2)
        let a=this.pos.x+px
        let b=this.pos.y+py
      
        if(a>5 && a<height/4-5 && b>5 && b<width/4-10){
          this.pos.x+=px
          this.pos.y+=py
 
        }
        // this.pos.x-=2;
      }
    }


    if(keyIsDown(83)){   //S
      if(this.pos.y>5 && this.pos.y<height/4-5 && this.pos.x>5 && this.pos.x<width/4-10){
        let mid=(this.right+this.left)/2
        let px=cos(mid*PI/180)
        let py=sin(mid*PI/180)
        let a=this.pos.x-px
        let b=this.pos.y-py
        if(a>5 && a<height/4-5 && b>5 && b<width/4-10){
          this.pos.x-=px
          this.pos.y-=py
 
        }

        // this.pos.y+=2;
      }
    }



    if(keyIsDown(68)){ //D
      if(this.pos.y>5 && this.pos.y<height/4-5 && this.pos.x>5 && this.pos.x<width/4-10){
        let mid=(this.right+this.left)/2
        let px=cos(mid*PI/180+PI/2)
        let py=sin(mid*PI/180+PI/2)
        
        let a=this.pos.x+px
        let b=this.pos.y+py
        if(a>5 && a<height/4-5 && b>5 && b<width/4-10){
          this.pos.x+=px
          this.pos.y+=py
 
        }
        // this.pos.x+=2;
      }
    }

  }

  turn(){

  }

  show(){
    push();
    translate(this.pos.x,this.pos.y);
    stroke(255);
    ellipse(0,0,10,10);
    pop();
  }

  shine(walls){
    push();
    const dists=[];
    let rays=[];
    for(let i=this.left;i<this.right;i+=1){
      stroke(255,100);
      rays[i]=new ray(this.pos,radians(i));
      let buffer =Infinity;
      let closest = null;
      for(let j of walls){
        let point=rays[i].check(j);

        if(point){
          let d= dist(this.pos.x,this.pos.y,point.x,point.y);
          if(d<buffer){
            buffer =d;
            closest = point;
          }
        }
      }

      if(closest){
        line(this.pos.x,this.pos.y,closest.x,closest.y);
      }
      dists.push(buffer);  // do not use dists[i]=buffer; cuz if i changes , then dists will not be properly set for -ve index
    }
    return(dists);
    pop();
  }
}


class walls{

  constructor(x1,y1,x2,y2){
    this.a=createVector(x1,y1);
    this.b=createVector(x2,y2);
  }

  show(){
    line(this.a.x,this.a.y,this.b.x,this.b.y);
  }

}


class ray{

  constructor(pos,angle){
    this.pos=pos;
    this.dir=p5.Vector.fromAngle(angle);
  }

  check(wall){  //https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
    let t,u;

    const x1 = wall.a.x;
    const x2 = wall.b.x;
    const x3= this.pos.x;
    const x4 = this.pos.x+this.dir.x;

    const y1 =wall.a.y;
    const y2 = wall.b.y;
    const y3= this.pos.y;
    const y4 = this.pos.y+this.dir.y;

    const denom = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
    if(denom == 0){
      return;
    }
    else{
      t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/denom;
      u= -1*((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3))/denom;
    }

    if(t>0 && t<1  && u>0){
      const a=(x1+t*(x2-x1));
      const b=(y1+t*(y2-y1));
      let pt =createVector(a,b);
      return(pt);
    }

  }

}
