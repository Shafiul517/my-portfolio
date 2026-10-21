const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
/* Menu: three dots on mobile, normal top bar on large screens */
const mb=$('#mb'),nav=$('#nav'),cl=$('#cl');
function tm(o){nav.classList.toggle('o',o);cl.classList.toggle('o',o);mb.setAttribute('aria-expanded',o)}
mb.onclick=()=>tm(!nav.classList.contains('o'));cl.onclick=()=>tm(false);
$$('#nav a').forEach(a=>a.onclick=()=>tm(false));
addEventListener('keydown',e=>{if(e.key==='Escape')tm(false)});
addEventListener('resize',()=>{if(innerWidth>820)tm(false)});
/* Typing words in the hero: edit this list */
const words=['selling to shopkeepers','solving customer problems','handling reports and data','working under pressure'];
let wi=0,ci=0,del=false;
(function ty(){const w=words[wi];ci+=del?-1:1;$('#ty').textContent=w.slice(0,ci);let t=del?35:70;
if(!del&&ci===w.length){del=true;t=1400}else if(del&&ci===0){del=false;wi=(wi+1)%words.length;t=300}setTimeout(ty,t)})();
/* Reveal on scroll + bars */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('go');
$$('.bar i').forEach(i=>{if(e.target.contains(i))i.style.width=i.dataset.w+'%'});io.unobserve(e.target)}}),{threshold:.15});
$$('.rv').forEach(x=>io.observe(x));
/* Number counters */
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);
const n=+e.target.dataset.n,t0=performance.now();(function f(t){const p=Math.min((t-t0)/1400,1);e.target.textContent=Math.round(n*p);if(p<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
$$('.cn').forEach(x=>co.observe(x));
/* Highlight the current section in the menu */
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{threshold:.45});
$$('section').forEach(s=>so.observe(s));
addEventListener('scroll',()=>{$('#bar').style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100)+'%'});
/* Experience cards open / close */
$$('.jh').forEach(b=>b.onclick=()=>b.parentElement.classList.toggle('open'));
/* Skill filter */
$$('#ft .tb').forEach(b=>b.onclick=()=>{$$('#ft .tb').forEach(x=>x.classList.toggle('on',x===b));
$$('.chip').forEach(c=>c.classList.toggle('h',b.dataset.f!=='all'&&c.dataset.c!==b.dataset.f))});
/* Copy email */
$('#cp').onclick=async()=>{const t=$('#ts');try{await navigator.clipboard.writeText('shafiulislam517@gmail.com');t.textContent='Email copied'}catch(_){t.textContent='shafiulislam517@gmail.com'}
t.classList.add('s');setTimeout(()=>t.classList.remove('s'),1800)};