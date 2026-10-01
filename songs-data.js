// Data lagu untuk grid cover.
// "cover" sekarang masih gradasi warna (placeholder).
// Kalau sudah ada gambar asli, taruh filenya di folder assets/covers/
// lalu ganti value "cover" jadi path gambarnya, contoh:
// cover: "assets/covers/trap.jpg"

const sections = [
  { title: "Trending by genre", items: [
    { badge: "Trending", t: "Trap", sub: "Trending", cover: "linear-gradient(150deg,#2a2a2a,#111)" },
    { badge: "Trending", t: "All Genres", sub: "Trending", cover: "linear-gradient(150deg,#b23a6a,#241018)" },
    { badge: "Trending", t: "Punk", sub: "Trending", cover: "linear-gradient(150deg,#c94a2a,#221410)" },
    { badge: "Trending", t: "Ambient", sub: "Trending", cover: "linear-gradient(150deg,#3a4a6a,#10141c)" },
    { badge: "Trending", t: "Industrial", sub: "Trending", cover: "linear-gradient(150deg,#8a5a2a,#221810)" },
    { badge: "Trending", t: "Lo-fi", sub: "Trending", cover: "linear-gradient(150deg,#3a6a5a,#0f1a16)" },
  ]},
  { title: "Artists to watch out for", items: [
    { badge: "Buzzing", t: "Rock", sub: "New!", cover: "linear-gradient(150deg,#6a2ac9,#160c26)" },
    { badge: "Buzzing", t: "R&B", sub: "New!", cover: "linear-gradient(150deg,#c92a5a,#26101a)" },
    { badge: "Buzzing", t: "Mexico", sub: "New!", cover: "linear-gradient(150deg,#2ac9a0,#0c2620)" },
    { badge: "Buzzing", t: "Rap & Hip-Hop", sub: "New!", cover: "linear-gradient(150deg,#c9702a,#261a0c)" },
    { badge: "Buzzing", t: "Pop", sub: "New!", cover: "linear-gradient(150deg,#2a7ac9,#0c1926)" },
  ]},
  { title: "Curated by SoundCloud", items: [
    { badge: "", t: "Emerging Indie Dreams", sub: "Scenes: Indie", cover: "linear-gradient(150deg,#e0629a,#120a14)" },
    { badge: "", t: "New Plugg Music: Pluggz", sub: "Hustle Rap & Hip-Hop", cover: "linear-gradient(150deg,#2a2a2a,#050505)" },
    { badge: "", t: "New Techno Now: Techno", sub: "Main Room: Dance", cover: "linear-gradient(150deg,#2ad0e0,#0a2226)" },
    { badge: "", t: "Best UK Rap: Bars", sub: "SoundCloud UK", cover: "linear-gradient(150deg,#e0c02a,#221c08)" },
    { badge: "", t: "EDM Next: The Peak", sub: "The Peak", cover: "linear-gradient(150deg,#3a3a3a,#0a0a0a)" },
  ]},
];
