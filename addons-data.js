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
    id: 'deep-creatures',
    name: 'Deep Creatures',
    category: 'mob',
    categoryLabel: 'mob',
    image: "images/thumbnail/bvg_j_1.png",
    detailImage: 'images/detail/bvg_j_1.png',
    gallery: [ 
      'images/gallery/deep-creatures-1.png',
      'images/gallery/deep-creatures-2.png',
      'images/gallery/deep-creatures-3.png'
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
  {
    id: 'tidal-arsenal',
    name: 'Tidal Arsenal',
    category: 'item',
    categoryLabel: 'item',
    image: 'images/thumbail/tidal-arsenal.png',
    desc: 'A weapon and tool expansion built on deep-sea materials. 20+ new craftables.',
    longDesc: 'Tidal Arsenal expands survival progression with a full line of deep-sea weapons and tools. Every item is survival-balanced and comes with lore-driven enchantments themed around the ocean.',
    features: [
      '20+ new craftable weapons and tools',
      'Custom enchantments with lore text',
      'Trident combo attack system',
      'Fully survival-balanced recipes'
    ],
    version: 'v2.0.1',
    mcVersion: 'BE 1.21',
    downloadUrl: '#',
    pxPattern: [[0,0,1,0,0,0,0],[0,0,1,0,0,0,0],[1,1,1,1,1,1,0],[0,0,1,0,0,0,0],[0,0,2,0,0,0,0]],
    changelog: [
      {ver:'v2.0.1', notes:['Hotfix: corrected trident damage scaling','Improved enchantment descriptions']},
      {ver:'v2.0.0', notes:['Major overhaul — Trident combo system','New material: Abyssite','8 new craftable items']},
      {ver:'v1.0.0', notes:['Initial release with 12 weapons and tools']}
    ]
  },
  {
    id: 'abyssal-biomes',
    name: 'Abyssal Biomes',
    category: 'world',
    categoryLabel: 'world',
    image: null,
    desc: '5 new deep-ocean biomes with procedural structures and bioluminescent particles.',
    longDesc: 'Abyssal Biomes overhauls deep-ocean world generation with five new sub-biomes, procedurally placed ruins, and ambient bioluminescent particle effects for an immersive underwater exploration experience.',
    features: [
      '5 new deep-ocean sub-biomes',
      'Procedurally placed ruins and temples',
      'Bioluminescent ambient particles',
      'New ores found only underwater'
    ],
    version: 'v1.1.0',
    mcVersion: 'BE 1.21',
    downloadUrl: '#',
    pxPattern: [[0,0,1,0,0,0,0],[0,1,1,1,0,0,0],[1,2,1,2,1,0,0],[2,2,2,2,2,1,0],[2,2,2,2,2,2,1]],
    changelog: [
      {ver:'v1.1.0', notes:['Added Bioluminescent Trench biome','New ore: Lumite']},
      {ver:'v1.0.0', notes:['Initial release with 4 biomes']}
    ]
  },
  {
    id: 'hud-plus',
    name: 'HUD+',
    category: 'ui',
    categoryLabel: 'ui / utility',
    image: null,
    desc: 'A clean HUD overhaul — armor durability, XYZ coordinates, and hunger always visible.',
    longDesc: 'HUD+ is a minimal, always-on heads-up display overhaul focused on the information survival players actually need — durability, coordinates, and hunger — without cluttering the screen.',
    features: [
      'Real-time armor durability display',
      'XYZ coordinate overlay',
      'Compact hunger and saturation bar',
      'Fully toggleable via settings'
    ],
    version: 'v1.0.4',
    mcVersion: 'BE 1.21',
    downloadUrl: '#',
    pxPattern: [[2,2,2,2,2,2,2],[2,1,0,0,0,0,2],[2,1,1,0,0,0,2],[2,1,1,1,0,0,2],[2,2,2,2,2,2,2]],
    changelog: [
      {ver:'v1.0.4', notes:['Fixed coordinate display on split-screen','Performance optimisation for low-end devices']},
      {ver:'v1.0.0', notes:['Initial release']}
    ]
  },
  {
    id: 'apex-predators',
    name: 'Apex Predators',
    category: 'mob',
    categoryLabel: 'mob',
    image: null,
    desc: 'Ocean predators with pack behavior, dynamic territories, and boss variants.',
    longDesc: 'Apex Predators raises the stakes of ocean exploration with pack-hunting predators, dynamic aggro territories, and rare boss-tier encounters that reward endgame players.',
    features: [
      '6 new predator species',
      'Dynamic territory and aggro zones',
      'Rare boss-tier encounters',
      'Drops for endgame crafting'
    ],
    version: 'v1.2.0',
    mcVersion: 'BE 1.21',
    downloadUrl: '#',
    pxPattern: [[0,0,1,0,0,0,0],[0,1,1,0,0,0,0],[1,1,1,2,0,0,0],[1,2,2,2,2,0,0],[2,2,2,2,2,2,0]],
    changelog: [
      {ver:'v1.2.0', notes:['Added Void Leviathan boss','Territory alarm mechanic','New endgame drops']},
      {ver:'v1.0.0', notes:['Initial release with 4 predator species']}
    ]
  },
  {
    id: 'sunken-kingdoms',
    name: 'Sunken Kingdoms',
    category: 'world',
    categoryLabel: 'world',
    image: null,
    desc: 'Massive underwater dungeons with puzzles, lore scrolls, and a boss arena.',
    longDesc: 'Sunken Kingdoms adds hand-designed underwater dungeons packed with puzzle-lock vaults, readable lore fragments, and a multi-room boss arena for late-game players seeking a real challenge.',
    features: [
      '3 unique dungeon types underwater',
      'Puzzle-lock treasure vaults',
      'Readable lore fragments inside',
      'Multi-room boss arena + custom boss'
    ],
    version: 'v1.0.0',
    mcVersion: 'BE 1.21',
    downloadUrl: '#',
    pxPattern: [[1,0,1,0,1,0,1],[1,1,1,1,1,1,1],[0,2,1,2,1,2,0],[0,2,1,2,1,2,0],[0,2,2,2,2,2,0]],
    changelog: [
      {ver:'v1.0.0', notes:['Initial release — 3 dungeon types, boss arena, lore fragments']}
    ]
  }
];