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
    image: "images/bvg_j/thumbnail.png",
    detailImage: 'images/bvg_j/thumbnail.png',
    gallery: [ 
      'images/bvg_j/1.png',
      'images/bvg_j/2.png',
      'images/bvg_j/3.png',
      'images/bvg_j/4.png',
    ],
    desc: 'new generation of Berlin U-Bahn trains, expected to enter service in 2026 to modernize the Großprofil network.',
    longDesc: 'This addon using the BVG J-series model which BVG ordered in 2022 for the large network on the Berlin U-bahn, but has experienced delays with the estimated completion in 2026 for the first delivery',
    features: [
      'Acceleration: Normal',
      'Maximum Speed: 120 Kmh',
      'Braking: Normal',
      'Capacity: 14 passengers + 1 driver'

    ],
    version: 'v1.3.0',
    mcVersion: 'BE 1.21',
    downloadUrl: '#',
    pxPattern: [[0,1,1,0,1,1,0],[1,1,0,1,1,0,1],[0,2,2,2,2,2,0],[0,0,2,2,2,0,0],[0,0,0,2,0,0,0]],
    changelog: [
      {ver:'v1.3.0', notes:['Beta release',]},
    ]
  },
  {
    id: 'DB-1004-CRRC',
    name: 'DB 1004 CRRC',
    category: 'Train',
    categoryLabel: 'Train',
    image: "images/db_1004/thumbnail.png",
    detailImage: 'images/db_1004/thumbnail.png',
    gallery: [ 
      // 'images/db_1004/1.png',
      // 'images/db_1004/2.png',
      // 'images/db_1004/3.png',
      // 'images/db_1004/4.png',
    ],
    desc: '12 new ocean mobs with unique behaviors, loot tables, and custom AI.',
    longDesc: 'This addon using the BVG J-series model which BVG ordered in 2022 for the large network on the Berlin U-bahn, but has experienced delays with the estimated completion in 2026 for the first delivery',
    features: [
      'use iron ingot to activate coupler',
      '4 speed (80KM/H)',
      '17 livery options',
      'Capacity: 2 driver'

    ],
    version: 'v1.3.0',
    mcVersion: 'BE 1.21',
    downloadUrl: '#',
    pxPattern: [[0,1,1,0,1,1,0],[1,1,0,1,1,0,1],[0,2,2,2,2,2,0],[0,0,2,2,2,0,0],[0,0,0,2,0,0,0]],
    changelog: [
      {ver:'v1.3.0', notes:['Beta release',]},
    ]
  },
  {
    id: 'NEXORA-Monorail',
    name: 'NEXORA Monorail',
    category: 'Train',
    categoryLabel: 'Train',
    image: "images/nexora/thumbnail.png",
    detailImage: 'images/nexora/thumbnail.png',
    gallery: [ 
      'images/nexora/1.png',
      'images/nexora/2.png',
      'images/nexora/3.png',
      'images/nexora/4.png',
    ],
    desc: '12 new ocean mobs with unique behaviors, loot tables, and custom AI.',
    longDesc: 'you can put a barrier on the rails, without it you will be on the rails when you exit the monorail. dont spawn the monorail in an area with a barrier',
    features: [
      '6 speed ( 120+km/h)',
      'Capacity: 30 passengers + 2 driver'
    ],
    version: 'v1.3.0',
    mcVersion: 'BE 1.21',
    downloadUrl: '#',
    pxPattern: [[0,1,1,0,1,1,0],[1,1,0,1,1,0,1],[0,2,2,2,2,2,0],[0,0,2,2,2,0,0],[0,0,0,2,0,0,0]],
    changelog: [
      {ver:'v1.3.0', notes:['Beta release',]},
    ]
  },
  {
    id: 'American-cargo-pack',
    name: 'American Cargo Pack',
    category: 'Train',
    categoryLabel: 'Train',
    image: "images/american-cargo-pack/thumbnail.png",
    detailImage: 'images/american-cargo-pack/thumbnail.png',
    gallery: [ 
      'images/american-cargo-pack/1.png',
      'images/american-cargo-pack/2.png',
      'images/american-cargo-pack/3.png',
      'images/american-cargo-pack/4.png',
      'images/american-cargo-pack/5.png',
    ],
    desc: '12 new ocean mobs with unique behaviors, loot tables, and custom AI.',
    longDesc: 'you can put a barrier on the rails, without it you will be on the rails when you exit the monorail. dont spawn the monorail in an area with a barrier',
    features: [
      'Procor Tank Cars | GR01 - Black color | GR02 - White color | GR03 - Cyan color',
      'Procor Hopper Cars | GR01 - Black color | GR02 - White color | GR03 - Cyan color',
      'TTX Well Cars | GR01 - No Container | GR02-GR04 - Single Container | GR05-GR08 - Double Container',
    ],
    version: 'v1.3.0',
    mcVersion: 'BE 1.21',
    downloadUrl: '#',
    pxPattern: [[0,1,1,0,1,1,0],[1,1,0,1,1,0,1],[0,2,2,2,2,2,0],[0,0,2,2,2,0,0],[0,0,0,2,0,0,0]],
    changelog: [
      {ver:'v1.3.0', notes:['Beta release',]},
    ]
  },
]