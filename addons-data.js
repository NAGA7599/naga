/* ══════════════════════════════════════════════
   ADDONS DATA — single source of truth
   Tambah addon baru = tambah 1 object di array ADDONS.
   Semua tampilan (card di homepage + halaman detail)
   otomatis mengikuti data di sini.

   Field "image" (opsional):
   - Kosongkan / hapus field ini -> tampil pixel-art (pxPattern).
   - Isi dengan path file gambar (mis. "images/deep-creatures.png")
     -> otomatis tampil gambar itu, menggantikan pixel-art.
   - Dipakai di CARD homepage (index.html).

   Field "detailImage" (opsional):
   - Foto PERSEGI yang tampil di halaman detail (addon.html),
     terpisah dari "image" di atas. Kalau dikosongkan, halaman
     detail akan pakai "image" sebagai cadangan, lalu pixel-art
     kalau dua-duanya kosong.

   Field "gallery" (opsional, array):
   - Daftar foto tambahan yang tampil sebagai galeri di bawah
     deskripsi pada halaman detail. Boleh diisi berapa saja
     (0, 1, 5, dst) -> otomatis menyesuaikan.
══════════════════════════════════════════════ */
const ADDONS = [
  {
    id: 'BVG-J-Series',
    name: 'BVG J-Series',
    category: 'Train',
    categoryLabel: 'Train',
    image: "images/thumbnail/bvg_j_1.png",
    detailImage: 'images/detail/bvg_j_1.png',
    gallery: [ 
      'images/thumbnail/bvg_j_1.png',
      'images/thumbnail/bvg_j_1.png',
      'images/thumbnail/bvg_j_1.png'
    ],
    tutorial: [
      'images/thumbnail/bvg_j_1.png',
      'images/thumbnail/bvg_j_1.png'
    ],
    desc: '12 new ocean mobs with unique behaviors, loot tables, and custom AI.',
    longDesc: 'Deep Creatures introduces a full ecosystem of new ocean mobs to Minecraft Bedrock. Each entity ships with hand-tuned AI behavior, unique loot tables, and custom animation controllers — built to feel native alongside vanilla mobs.',
    features: [
      '12 new ocean entities with custom AI',
      'Unique loot tables and rare drops',
      'Compatible with vanilla biomes',
      'Animation controller animations'
    ],
    version: 'v1.3.0',
    mcVersion: 'BE 1.21',
    downloadUrl: '#',
    pxPattern: [[0,1,1,0,1,1,0],[1,1,0,1,1,0,1],[0,2,2,2,2,2,0],[0,0,2,2,2,0,0],[0,0,0,2,0,0,0]],
    changelog: [
      {ver:'v1.3.0', notes:['Added 2 bioluminescent jellyfish variants','Fixed spawn rates in warm ocean biomes','Improved AI pathfinding for eels']},
      {ver:'v1.2.0', notes:['Added anglerfish with lure attack','New rare drop: Deep Pearl']},
      {ver:'v1.0.0', notes:['Initial release with 10 base mobs']}
    ]
  },
]