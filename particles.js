const c=document.getElementById("particles");
if(c){
const x=c.getContext("2d");
let w,h;function r(){w=c.width=innerWidth;h=c.height=innerHeight}
addEventListener("resize",r);r();
let p=[...Array(80)].map(()=>({
x:Math.random()*w,
y:Math.random()*h,
vx:(Math.random()-.5)*.6,
vy:(Math.random()-.5)*.6
}));
(function a(){
x.clearRect(0,0,w,h);
p.forEach(o=>{
o.x+=o.vx;o.y+=o.vy;
if(o.x<0||o.x>w)o.vx*=-1;
if(o.y<0||o.y>h)o.vy*=-1;
x.beginPath();
x.arc(o.x,o.y,1.4,0,7);
x.fillStyle="rgba(255,0,51,.6)";
x.fill();
});
requestAnimationFrame(a);
})();
}
