# Video clips — what it takes to post Pigeon Park clips to TikTok / Reels / Shorts

Status: **built and working in-browser** (Clip button on any park bird's card). This note covers what was
built, what each platform needs, and what it would take to go further (posting directly from the game).

## What the game does now (src/clip.js)

- **Format:** 9:16, 1080 × 1920, 30 fps, 6 s. That shape is the recommended one for all three platforms.
- **Rendered offline, frame by frame**, not screen-recorded: each frame steps the real park one sim tick,
  renders it from a clip camera at 1080 × 1920, draws captions on a 2D canvas and hands the canvas to
  WebCodecs. Device speed changes how long filming takes, not how the clip looks. A mid-range phone should
  take roughly 10–20 s. Headless SwiftShader takes about 2 min for a 540 × 960 clip, so there's no real
  number yet.
- **Camera:** starts at the bird's three-quarter front, swings toward its face and pushes in. It picks a
  start angle whose whole path sees past the fountain, never enters the basin, and hides birds that
  wander into the sight line for that frame.
- **Captions ("stickers") over 6 s:** Pigeon Park bug → MEET → name → breed badge (or colour) → the
  breed blurb or the Pigeonpedia note for the bird's rarest trait → three facts: generation, rarest trait,
  hidden genes → end card "breed your own → pigeonpark.live". In-world speech bubbles are drawn too.
  Captions avoid the platform UI: nothing in the top ~6 %, the bottom ~18 % or the right ~14 %.
- **Sound:** rendered offline. It's the park's current song (or the happening's song), plus the bird
  cooing on cue at 0.55 s and 3.3 s, plus every coo the park made while filming, at its moment.
- **Encoding / muxing:** WebCodecs `VideoEncoder`/`AudioEncoder` + [mediabunny](https://mediabunny.dev)
  (MPL-2.0, lazy-loaded chunk, not in the boot bundle).
  - H.264 available (Chrome/Edge on Win/Mac/Android, Safari 16.4+) → **MP4, H.264 + AAC**, moov atom up
    front (`fastStart: 'in-memory'`). This is what every platform wants.
  - H.264 available but no AAC encoder (e.g. Chrome on Linux) → MP4, H.264 + Opus.
  - No H.264 (open-source Chromium, some Firefox builds) → **WebM, VP9 + Opus**. The dialog says
    "for Instagram, convert to MP4 first".
  - No WebCodecs at all → friendly error in the dialog.
- **Getting it out:** Download (all devices). On phones, **Share** goes through the Web Share API
  (`navigator.share({ files: [mp4] })`) to the OS share sheet, which lists the installed TikTok,
  Instagram and YouTube apps. That's the one-tap route to posting that exists today, with no accounts,
  API keys or review.

## Platform requirements (checked September 2026)

| | TikTok | Instagram Reels | YouTube Shorts |
|---|---|---|---|
| Shape | 9:16, 1080×1920 recommended | 9:16 recommended, ≤1920 px wide | vertical or square, ≤3 min counts as a Short |
| Container / codec | MP4, WebM or MOV | MP4/MOV, **H.264 or HEVC + AAC**, moov at front, closed GOP, ≤48 kHz | MP4, WebM and most others |
| Our MP4 (H.264+AAC) | ✓ | ✓ | ✓ |
| Our WebM fallback | ✓ | ✗ (convert) | ✓ |
| Direct-post API | Content Posting API | Instagram Graph API (Reels publishing) | Data API `videos.insert` |

## What posting straight from the game would take (not built)

Every platform's posting API needs OAuth on the user's account plus a registered app. Some also need a
server, so it doesn't fit a static GitHub Pages site as-is:

1. **TikTok — Content Posting API (Direct Post).** Register a developer app and verify the site URL.
   Until TikTok audits the app (reported 2–6 weeks, with a demo video), every post is forced to
   private (`SELF_ONLY`). TikTok's content-sharing guidelines forbid apps from adding brand names,
   logos, watermarks or promotional links to shared content. An API-posted clip would therefore need a
   **clean variant** without the "Pigeon Park" bug and the end card. `drawCaptions` would need a flag
   for that. The "Upload" (inbox/draft) flow has fewer restrictions than Direct Post.
2. **Instagram — Graph API Reels publishing.** Needs a professional (Business/Creator) account and a Meta
   app with `instagram_content_publish` and app review. The video must be MP4 H.264 + AAC, so the Opus
   and WebM fallbacks won't publish. It must be uploaded from a public URL or via Meta's resumable
   upload, which means a small server or storage bucket to host the file. API-published Reels are
   reportedly capped at 90 s, well above our 6 s.
3. **YouTube — Data API v3 `videos.insert`.** Google OAuth consent screen, verified for the upload scope.
   Each upload costs 1,600 of the default 10,000 daily quota units, about 6 uploads a day for the whole
   app unless Google grants more. Like TikTok, uploads from an API project that hasn't passed Google's
   API compliance audit are locked to private. Vertical and ≤3 min makes it a Short automatically.

Common to all three: a backend (even a serverless function) to hold client secrets and exchange OAuth
codes, privacy policy and terms pages for the review, and per-platform upload code. Rough effort: a few
days of code per platform, plus the review wait (weeks for TikTok and Meta).

**Recommendation:** keep the share sheet (phones) and Download (desktop) as the posting path. It already
reaches all three apps with the user's own account, and the user adds their caption and music in the
app. Build direct posting only if in-game sharing becomes a growth priority. All three require an audit
before posts can be public, so plan for the review time first.

## Not verified

- Real devices: H.264/AAC encoding on iPhone Safari and Android Chrome, filming time, memory at
  1080 × 1920, and share-sheet targets. Headless tests only cover the VP9/Opus WebM path, because
  Playwright's Chromium has no H.264 encoder.
- An actual upload to TikTok, Instagram or YouTube.
- Audio by ear. Levels are checked numerically (RMS per song) only.

## Ideas for later

- Clip length and shape options: 15 s, and 1:1 for feeds.
- Clip a happening (conga line, UFO) instead of a single bird: the camera frames the group and the
  captions narrate the event.
- A "clean" export toggle (no bug or end card) for TikTok API compliance.
- Burned-in subtitles of the bird's speech bubbles are already there; a caption `.srt` sidecar could
  help accessibility on YouTube.

Sources: [TikTok content sharing guidelines](https://developers.tiktok.com/doc/content-sharing-guidelines),
[TikTok posting API overview](https://www.postpeer.dev/blog/tiktok-direct-posting-api-tutorial),
[Meta Reels publishing](https://developers.facebook.com/docs/video-api/guides/reels-publishing),
[Instagram media specs](https://www.ayrshare.com/docs/media-guidelines/instagram.md),
[YouTube Shorts via Data API](https://www.veed.io/learn/youtube-shorts-api),
[YouTube quota costs](https://developers.google.cn/youtube/v3/determine_quota_cost).
