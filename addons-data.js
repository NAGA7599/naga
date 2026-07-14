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
      'images/detail/bvg_j/1.png',
      'images/detail/bvg_j/2.png',
      'images/detail/bvg_j/3.png',
      'images/detail/bvg_j/4.png'
    ],
    desc: '12 new ocean mobs with unique behaviors, loot tables, and custom AI.',
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
]