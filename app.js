const KEY="VESPER_DB";
const ORDER_KEY="VESPER_ORDERS";

function db(){ return JSON.parse(localStorage.getItem(KEY)||"{}"); }
function saveDB(d){ localStorage.setItem(KEY,JSON.stringify(d)); }

function orders(){ return JSON.parse(localStorage.getItem(ORDER_KEY)||"[]"); }
function saveOrders(o){ localStorage.setItem(ORDER_KEY,JSON.stringify(o)); }

/* HOME */
function renderHome(){
  const grid=document.getElementById("grid");
  if(!grid) return;
  const d=db(); grid.innerHTML="";
  for(const id in d){
    const p=d[id];
    grid.innerHTML+=`
    <div class="card glass">
      <div class="img-grid">
  ${p.images.slice(0,6).map(i=>`<img src="${i}">`).join("")}
</div>
      ${p.stock<=2?`<div class="badge">ONLY ${p.stock}</div>`:""}
      <h3>${p.name}</h3>
      <<p class="desc-scroll">${p.desc}</p>
      <div class="price">From Rp ${Object.values(p.durations)[0]}</div>
      <a class="btn" href="product.html?id=${id}">VIEW</a>
    </div>`;
  }
}

/* PRODUCT */
function renderProduct(){
  const id=new URLSearchParams(location.search).get("id");
  if(!id) return;
  const p=db()[id];
  if(!p) return;

  document.getElementById("name").innerText=p.name;
  document.getElementById("desc").innerText=p.desc;

  const imgBox=document.getElementById("imgs");
  imgBox.innerHTML="";
  p.images.forEach(i=>{
    imgBox.innerHTML+=`<img src="${i}" style="height:220px;border-radius:14px">`;
  });

  const dur=document.getElementById("dur");
  dur.innerHTML="";
  for(const k in p.durations){
    dur.innerHTML+=`<option value="${p.durations[k]}">${k}</option>`;
  }
  const price=document.getElementById("price");
  price.innerText="Rp "+dur.value;
  dur.onchange=()=>price.innerText="Rp "+dur.value;

  document.getElementById("toCheckout").onclick=()=>{
    location.href=`checkout.html?id=${id}&price=${dur.value}&dur=${dur.selectedOptions[0].text}`;
  };
}
// Scroll reveal animation
window.addEventListener("scroll",()=>{
  document.querySelectorAll(".reveal").forEach(el=>{
    const r = el.getBoundingClientRect().top;
    if(r < window.innerHeight - 80){
      el.classList.add("active");
    }
  });
  });
/* STORY TYPING EFFECT — CINEMATIC VERSION */
document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("typing");
  if(!box) return;

  const paragraphs = [
    "Ratusan orang sudah bergabung dan berhasil naik level.",
    "Bukan cuma skill trading, tapi juga soft skill penting lainnya seperti manajemen emosi, disiplin, dan cara berpikir sebagai trader profesional.",
    "Sekarang bukan soal bisa atau tidak — sekarang giliran kamu."
  ];

  let p = 0;
  let c = 0;

  function type(){
    if(p >= paragraphs.length) return;

    if(c === 0){
      const el = document.createElement("p");
      box.appendChild(el);
    }

    const current = box.lastElementChild;
    current.innerHTML += paragraphs[p].charAt(c);
    c++;

    if(c < paragraphs[p].length){
      setTimeout(type, 24);
    }else{
      p++;
      c = 0;
      setTimeout(type, 520); // jeda dramatis
    }
  }

  type();
});
