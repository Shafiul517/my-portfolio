const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* Menu: three dots on mobile, top bar on large screens */
const mb=$('#mb'),nav=$('#nav'),cl=$('#cl');
function tm(o){nav.classList.toggle('o',o);cl.classList.toggle('o',o);mb.setAttribute('aria-expanded',o)}
mb.onclick=()=>tm(!nav.classList.contains('o'));cl.onclick=()=>tm(false);
$$('#nav a').forEach(a=>a.onclick=()=>tm(false));
addEventListener('keydown',e=>{if(e.key==='Escape')tm(false)});
addEventListener('resize',()=>{if(innerWidth>820)tm(false)});
/* Moving particles in the background */
const cv=$('#sky'),cx=cv.getContext('2d');let W,H,ps=[],mx=-999,my=-999;
function rs(){const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0);
const n=W<700?42:Math.round(W*H/15000);ps=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28,r:Math.random()*1.4+.4,g:Math.random()<.12,t:Math.random()*6}))}
function fr(){cx.clearRect(0,0,W,H);
for(const p of ps){if(!reduce){p.x+=p.vx;p.y+=p.vy;p.t+=.02}
if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
const dx=p.x-mx,dy=p.y-my,ds=dx*dx+dy*dy;if(ds<16000){const f=1-ds/16000;p.x+=dx*.06*f;p.y+=dy*.06*f}
const a=.45+.4*Math.sin(p.t);cx.fillStyle=p.g?`rgba(226,185,74,${a})`:`rgba(205,222,255,${a*.8})`;cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.283);cx.fill()}
for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const dx=ps[i].x-ps[j].x,dy=ps[i].y-ps[j].y,d=dx*dx+dy*dy;
if(d<9000){cx.strokeStyle=`rgba(140,170,230,${.13*(1-d/9000)})`;cx.beginPath();cx.moveTo(ps[i].x,ps[i].y);cx.lineTo(ps[j].x,ps[j].y);cx.stroke()}}
if(!reduce)requestAnimationFrame(fr)}
rs();fr();addEventListener('resize',()=>{rs();if(reduce)fr()});
/* Mouse: photo tilt, shape parallax, glow, card spotlight */
const stage=$('#stage'),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;root.style.setProperty('--gx',mx+'px');root.style.setProperty('--gy',my+'px');
const r=stage.getBoundingClientRect();
stage.style.setProperty('--px',clamp((mx-(r.left+r.width/2))/(innerWidth/2),-1,1).toFixed(3));
stage.style.setProperty('--py',clamp((my-(r.top+r.height/2))/(innerHeight/2),-1,1).toFixed(3));
const c=e.target.closest&&e.target.closest('.card');if(c){const b=c.getBoundingClientRect();c.style.setProperty('--mx',(mx-b.left)+'px');c.style.setProperty('--my',(my-b.top)+'px')}});
document.addEventListener('pointerleave',()=>{mx=my=-999;stage.style.setProperty('--px',0);stage.style.setProperty('--py',0)});
/* Typing words in the hero: edit this list */
const words=['selling to shopkeepers','solving customer problems','handling reports and data','working under pressure'];
let wi=0,ci=0,del=false;
if(reduce)$('#ty').textContent=words[0];else(function ty(){const w=words[wi];ci+=del?-1:1;$('#ty').textContent=w.slice(0,ci);let t=del?35:70;
if(!del&&ci===w.length){del=true;t=1400}else if(del&&ci===0){del=false;wi=(wi+1)%words.length;t=300}setTimeout(ty,t)})();
/* Reveal on scroll + bars */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('go');
$$('.bar i').forEach(i=>{if(e.target.contains(i))i.style.width=i.dataset.w+'%'});io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach(x=>io.observe(x));
/* Number counters */
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);
const n=+e.target.dataset.n,t0=performance.now();(function f(t){const p=Math.min((t-t0)/1400,1);e.target.textContent=Math.round(n*p);if(p<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
$$('.cn').forEach(x=>co.observe(x));
/* Highlight the current section in the menu */
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{threshold:.3});
$$('section').forEach(s=>so.observe(s));
addEventListener('scroll',()=>{$('#bar').style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100)+'%'});
/* Experience cards: all open at the start, tap to close or open */
$$('.jh').forEach(b=>{b.setAttribute('aria-expanded','true');b.onclick=()=>{const j=b.parentElement;j.classList.toggle('open');b.setAttribute('aria-expanded',j.classList.contains('open'))}});
/* Copy email */
$('#cp').onclick=async()=>{const t=$('#ts');try{await navigator.clipboard.writeText('shafiulislam517@gmail.com');t.textContent='Email copied'}catch(_){t.textContent='shafiulislam517@gmail.com'}
t.classList.add('s');setTimeout(()=>t.classList.remove('s'),1800)};