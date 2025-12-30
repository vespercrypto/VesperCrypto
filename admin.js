/* ===== ADD PRODUCT ===== */
function add(){
  const d = db();
  const id = pid.value.trim();

  if(!id || d[id]){
    alert("ID invalid / sudah ada");
    return;
  }

  // parse duration
  const dur = {};
  pdur.value.split("\n").forEach(l=>{
    const [k,v] = l.split("=");
    if(k && v) dur[k.trim()] = Number(v.trim());
  });

  if(Object.keys(dur).length === 0){
    alert("Durasi belum diisi dengan benar");
    return;
  }

  d[id] = {
    name: pname.value,
    desc: pdesc.value,
    images: pimgs.value.split(",").map(x=>x.trim()),
    durations: dur,
    stock: Number(pstock.value)
  };

  saveDB(d);
  alert("Produk berhasil ditambahkan");
  location.reload();
}

/* ===== DELETE PRODUCT ===== */
function deleteProduct(id){
  const d = db();

  if(!d[id]){
    alert("Produk tidak ditemukan");
    return;
  }

  if(confirm("Yakin hapus produk ini?")){
    delete d[id];
    saveDB(d);
    alert("Produk berhasil dihapus");
    location.reload();
  }
}
