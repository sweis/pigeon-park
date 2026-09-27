# Pigeon Park — port progress

## Where things are
- Branch `port-threejs`. Engine: three.js 0.186 + Vite 8. Everything is code; no binary assets except two fonts.
- Run: `npm run dev` (http://localhost:5173) or `npm run build` then serve `docs/` with any static server.
  Serving the repo root directly does NOT work (bare `three` imports need Vite); the loading screen now says so after 5 s.
- Deploy: GitHub Pages serves pigeonpark.live from `main` → `/docs`. `npm run build` regenerates `docs/`
  (emptied first; `public/CNAME` + `public/.nojekyll` are copied in). After any source change: build, commit `docs/`, push.
- Prototype sources extracted to `prototype/src/` for reference (genetics, sprites, component, markup, css).

## Layout
- `src/sim.js` — flock simulation (pure, no DOM). Fixed step 1/30 s, 0.45 s "think" tick ported from the prototype, seeded RNG (`src/rng.js`). Emits events (toast/sound/sparkle/hatch…).
- `src/genetics.js` — prototype genetics, extended: 30 loci, 73 breeds (incl. whimsical cryptids: horn, duck bill, googly eyes, noodle neck, chonk, rainbow/toast/zebra/sunset), 79 field notes, big saying pools (THOUGHTS, REPLIES, NIGHT/HELD/BABY/COURT lines). `WILD` + `normalizeGenome` keep old saves loading.
- `src/happenings.js` — 17 random park events (bread, visitor, golden egg, conga, gust, statue, parliament, crisis, dance, moonwalk, seagull, zoomies, staring contest, synchro, UFO, drizzle, runway). Seeded; cadence set by the Weirdness setting (Off/Some/Lots).
- `src/pigeon3d.js` — procedural pigeon: one SkinnedMesh per bird (11 bones), geometry cached per phenotype + LOD (far = ~¼ tris).
- `src/world.js` — plaza, fountain, props (merged static mesh), instanced paving/grass/flowers, sky, keyed day/night.
- `src/view.js` — animation (walk head-bob, peck, sleep, tumble, parlor roll, fly, held, court, blinks), eggs, poop, contact shadows, selection ring.
- `src/audio.js` — all synthesised: per-bird coo pitch + 5 coo shapes, trumpet/laugher voices, SFX; generative soundtrack (C–Am–F–G, coo lead / pizz bass / peck woodblock / flap shaker) with day/night/dance moods, ducked when paused. Separate sfx/music buses (toggles + sliders, saved). Master compressor.
- Photo mode (`Game.photo`): park birds = one-off 2400² render of the real scene from a close camera (full LOD forced); roost birds = studio portrait; composed onto a captioned PNG card; Download / Web Share.
- `src/achievements.js` + `src/monuments.js` — 14 milestones; each builds a procedural monument in a fixed lawn slot; click → pane (rendered picture via `Game.renderView`, blurb, progress list).
- Secret codes (`CODES` in main.js): rizz, ore, bread, boogie — typed anywhere or Settings → Secret code.
- `src/ui.js` — DOM HUD; `src/portraits.js` — 3D portraits for HUD (own materials — see gotcha).
- `src/main.js` — boot, warm-up, input, save/load (key `pigeon-park-3d-v1`, imports prototype `pigeon-park-save-v1`), `window.pp` debug API.

## Debug hooks (`window.pp`, always on; `?debug` shows overlay)
getState, freeze/step(n)/resume, pause(v), happen(kind), happenings(), setTimeOfDay(h), setSeed, setSpeed, spawn(kind|breedId|genomeOverrides, {x,z,dir,accessory}), clearAll, teleport(id,x,z), select, cam(name) — overview/hud-check/fountain/dovecote/hero-close/follow, screenOf(id), screenOfWorld, pickAt, win/lose, hideHud.
URL params: `seed`, `hour`, `simdt`, `nosave`, `fresh`, `quality=high|medium|low`, `debug`.

## Tests
- `node tests/sim.test.mjs` — headless sim: determinism, bounds, births, save round-trip, actions, cheats, every breed sample matches, old genomes load.
- `node tests/e2e.mjs [--dist]` — Playwright, real mouse/touch/keyboard: cold boot 10 s, program count constant, birds render (pixel diff), select/clone/drag-to-roost/drag-drop/orbit/zoom, dialogs, Start over (two-tap), cheats, save→reload, legacy save import, seeded replay, 7-hour stills sweep, phone.
- `node tests/audio-photo.mjs [--dist]` (music audible via analyser RMS, toggles/sliders/persistence, per-bird pitch, photo download park + roost)
- `node tests/happenings.mjs` (every happening in-game + pause button), `node tests/fountain.mjs` (rim crowding)
- `node tests/lifecycle.mjs` (court→egg→hatch captures), `tests/lineup.mjs` (every breed + accessories), `tests/census.mjs` (full park budget), `tests/look.mjs` (quick look-dev).

## Numbers (headless SwiftShader — timings meaningless, counts are real) — `node tests/perf.mjs --dist [--medium]`
- Perf pass (v0.7): bird frustum culling (fixed bounds sphere), no bird sun-shadows on medium/low tiers (blob
  shadows remain), geometry-cache pruning every ~20 s, lighter ground, setHour skip when unchanged, hoisted
  per-frame allocations. 40 birds, high tier: overview 141 draws / 370k tris; close 118 draws / 621k (was 136 / 764k).
  Medium (phones): overview 94 / 222k (was 141 / 377k); close 71 / 283k (was 136 / 752k). CPU per frame ≈ 0.06 ms.
- Full park (47 birds): 119 draw calls; ~380k tris overview (LOD), ~800k close. 24 shader programs, constant from boot across day/night.
- Build (`docs/`): ~740 KB total, JS ~188 KB gzip. Load ~5–6 s headless.
- Passive difficulty: 60 unattended sim-minutes find 6–10 of 55 breeds (8 seeds); 33 breeds never appeared.

## Gotchas learned
- Sharing materials between the park scene and the portrait scene (different light rigs) left three.js per-material state stale → birds invisible. Portraits have their own materials.
- Bone rest poses (upright posture) must be applied AFTER `mesh.bind()`, or they get baked away.
- PCFSoftShadowMap is removed in r18x; use PCFShadowMap.

## Verified / not verified
- Verified headless: everything in the test list above, incl. click-off closing for settings + all dialogs. Not verified: real phones/GPUs (no device testing yet), audio by ear, frame times on real hardware.

## Next
- Test on a real phone; step-down ladder only exercised via `?quality`.
- Roosted birds perched on the dovecote in-world; hatch shell pieces; fireflies at night.
- Rosewing/beard markings still subtle at overview distance.
