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
- `src/audio.js` — all synthesised: per-bird coo pitch + 5 coo shapes, trumpet/laugher voices, SFX; generative soundtrack as a song table (`SONGS`): day playlist Pigeon Strut / Breadcrumb Waltz (3/4) / Bench Shuffle (swing) rotating every 16 bars, night Strut-after-dark / Streetlamp Lullaby, and event songs that cut in with a sting: UFO → Close Encounter, dance → Coo Fever (disco), conga → Conga Line. `renderMusic()` renders any song offline (clip soundtracks, level tests). Ducked when paused. Separate sfx/music buses (toggles + sliders, saved). Master compressor.
- `src/clip.js` — 6 s vertical (1080×1920, 30 fps) video clips of a bird: offline frame-by-frame render, orbit camera (fountain-aware, blockers hidden), sticker captions, offline soundtrack, WebCodecs + mediabunny (lazy chunk) → MP4 H.264/AAC or WebM VP9/Opus. See `notes/video-clips.md` for platform requirements and what direct posting would take.
- `src/util.js` — shared helpers: `damp`, `raySphere`, `toScreen`.
- Family tree: `sim.family` (lineage id → name, compact genome, parents, origin), persistent lineage ids (`p.lid`, `sim.lids`), pruned to great-grandparents on save; `sim.familyTree(lid)`, `sim.whereIs(lid)`; UI `openFamily`.
- Trait finder: `Game.findTrait(key)` (30 s), `M.traitStatus` (2 show / 1 carry), instanced gems + rings in `FlockView.updateFind` (reuse the sparkle program), `#finder` banner. Entry points: inspector chips, Pigeonpedia "Find in park", registry recipe chips.
- Desktop camera keys: WASD / arrows pan (relative to view, speed ∝ zoom), Q/E rotate; orbit unclamped (full 360°), `nearAz` makes recentring take the short way.
- Photo mode (`Game.photo`): park birds = one-off 2400² render of the real scene from a close camera (full LOD forced); roost birds = studio portrait; composed onto a captioned PNG card; Download / Web Share.
- `src/achievements.js` + `src/monuments.js` — 14 milestones; each builds a procedural monument in a fixed lawn slot; click → pane (rendered picture via `Game.renderView`, blurb, progress list).
- Secret codes (`CODES` in main.js): rizz, ore, bread, boogie — typed anywhere or Settings → Secret code.
- `src/ui.js` — DOM HUD; `src/portraits.js` — 3D portraits for HUD (own materials — see gotcha).
- `src/main.js` — boot, warm-up, input, save/load (key `pigeon-park-3d-v1`, imports prototype `pigeon-park-save-v1`), `window.pp` debug API.

## Debug hooks (`window.pp`, always on; `?debug` shows overlay)
getState (now also find/findMarks/camAz/camTarget/dialog/familySize, pigeon lid), freeze/step(n)/resume, pause(v), happen(kind), happenings(), setTimeOfDay(h), setSeed, setSpeed, spawn(kind|breedId|genomeOverrides — an allele or an explicit [a,b] pair, {x,z,dir,accessory}), clearAll, teleport(id,x,z), select, cam(name) — overview/hud-check/fountain/dovecote/hero-close/follow, screenOf(id), screenOfWorld, pickAt, win/lose, hideHud, find(key), family(id), songs(), songLevel(id), audio() (incl. song), clipSupport(), clip(id, {w,h,secs,peek,bytes}), clipScript(id).
URL params: `seed`, `hour`, `simdt`, `nosave`, `fresh`, `quality=high|medium|low`, `debug`.

## Tests
- `npm test` → `tests/run.mjs`: sim suite then every browser suite in turn (`-- --dist` for the build). Set `PW_CHROMIUM=/opt/pw-browsers/chromium` when Playwright's pinned browser isn't downloaded (cloud containers).
- `node tests/features.mjs` — finder (inspector chip + Pigeonpedia, 3 green / 4 yellow staged), family dialog (desktop + phone fit, tap a living relative), WASD/QE keyboard (incl. W+A, full rotation, short-way recentre).
- `node tests/clip.mjs` — clip file parsed back with mediabunny (tracks, size, duration), sampled caption frames, real Clip button → preview + Download, renderer/sim restored, no new programs.
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

## v0.8 pass (this round)
- Features: family tree, trait finder, WASD/QE camera, video clips, 5 new songs (2 park, 1 night, 3 event) — see Layout.
- Cleanup/perf: Start over no longer resets Weirdness; contact-shadow instance buffer can't overflow (4× `ore`); selected bird's name tag hides when it goes behind the camera; allocation-free sky keyframe sampling (drizzle was re-allocating ~20 Colors per frame), Fx.update, bubble layer, FlockView sets; inspector computes a cheap key before rebuilding (and now refreshes when a UFO hat changes the bird); clock redraws only when it changes; rAF callback bound once; shared `util.js` (damp/raySphere/toScreen) replacing 6 copies; `breedGenome()` replaces 3 hand-built copies; dead code removed (Audio.muted shim, portrait sleep option, write-only world fields, duplicate icon, dead CSS); favicon (the only console error on boot was its 404); `npm test` runner existed only in package.json — now real.
- Numbers (v0.8, headless SwiftShader, 40 birds): overview 140 draws / 369k tris, close 118 / 621k — same as v0.7; 26 shader programs, constant; CPU per frame 0.19–0.30 ms (run-to-run noise, same range as v0.7). Finder adds 2 instanced draws only while active. Build: main JS 787 KB (221 KB gzip, +23 KB raw for all v0.8 features), clip chunk 252 KB (65 KB gzip, loaded only on Clip).
- Verified (headless): every suite in `npm test` passes; seeded flocks identical to v0.7 (boot warm-up restores the RNG). Clip path verified as WebM VP9+Opus only (no H.264 encoder in Playwright Chromium).
- Not verified: real phones/GPUs; clip MP4 H.264/AAC path; clip filming time + memory at 1080×1920 on phones; share sheet targets; new songs by ear (levels checked numerically; WAV renders in captures/music/).

## v0.8.1 pass
- Birds don't walk through each other: `Sim.separate()` — body capsules (chest→most of the tail, breed size ×
  chick age), 6 relaxation passes with the fountain rim + park edge applied inside each pass, sweep-and-prune
  along x (~0.02 ms/step for a full park). Crossing capsules separate centre-to-centre. A walker blocked ~0.7 s
  stops (and may say a bump line). Courting pairs may touch. Test: no pair overlaps > 3 cm for more than 3 steps.
- Speech: pools roughly doubled/tripled (130 thoughts, 44 replies, 26 night, 25 held, 22 baby, 21 courting, 19 bump);
  `M.say(pool, sim.said)` holds back the recent half of each pool (history per Sim → replays stay deterministic).
- Phones: toasts lift above the bird card / intro bottom sheet (`UI.placeToasts`, layout box not the animated rect).
- Cleanup #2 (review agent + CPU profile): clip coos scheduled in time order (most were being dropped); the clip
  owns the renderer (resize / photos / monument pictures wait, dialog can't be closed mid-film, encoder cancelled
  on error, synchronous busy flag); finder markers suppressed in clips without clobbering the player's finder;
  roosting a courting bird frees its partner (`endCourt()` shared by grab/roost/think); photo/clip blobs revoked on
  close; family records pruned every 60 sim-s (not only on save); chick/grandchick counts consistent; portrait
  cache capped at 300; hot-path lookup tables hoisted; finder key split cached; shared `toScreen` result; bubble
  transforms written only when they change; Music/PLAYLISTS/FIND_COLORS no longer exported.

## Next
- Try Clip on a real iPhone + Android (MP4 path, filming time); fall back to 720×1280 on phones if slow. Add a Cancel button to filming.
- Listen to the new songs; tune levels/instruments by ear.
- Test on a real phone; step-down ladder only exercised via `?quality`.
- Roosted birds perched on the dovecote in-world; hatch shell pieces; fireflies at night.
- Rosewing/beard markings still subtle at overview distance.
