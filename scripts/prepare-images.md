# Preparing Real Frame Images

Follow these steps to integrate authentic eyewear / sunglasses images.

## 1. Collect Source Images

- Prefer studio shots with white or neutral background.
- Capture multiple angles (front, 45° left/right, side) at consistent resolution.
- Use PNG (lossless) – front-facing image should ideally be background removed (transparent).

## 2. File Structure (Place under `public/real`)

```
public/real/
  rb5154/
    front.png
    front-transparent.png
    thumb.png
    left.png
    right.png
    side.png
    mask.png (optional alpha mask)
  aviator/
    front.png
    thumb.png
    mask.png
```

## 3. Create Manifest

Copy `public/frames-manifest.sample.json` to `public/frames-manifest.json` and edit the paths you have.

Each key corresponds to the `id` field in `GlassesDataset.ts`.

Example:

```json
{
	"ray-ban-rb5154": {
		"thumb": "/real/rb5154/thumb.png",
		"front": "/real/rb5154/front-transparent.png",
		"side": "/real/rb5154/side.png"
	}
}
```

If `thumb` exists, it overrides `imageUrl` in cards automatically.

## 4. (Optional) Generate Thumbnails Automatically

You can manually create thumbs at ~300x120px canvas with transparent background.

## 5. Masks (Advanced)

Use a grayscale mask (white = frame, black = transparent) for occlusion when integrating with face landmarks later (temples behind head). Reference it via `mask` in manifest.

## 6. Adding New Dataset Items

Add a new object in `GlassesDataset.ts` with a unique `id` and create a matching folder & manifest entry.

## 7. Cache Busting

While iterating, append a query string to changed images in the manifest, e.g. `/real/rb5154/front.png?v=2`.

## 8. Production Deployment

Ensure `frames-manifest.json` is deployed (NOT ignored). The loader fetches with `cache: 'no-store'` to pick updates quickly; switch to a versioned URL for CDN caching if needed.

## 9. Validation Checklist

- [ ] `frames-manifest.json` present
- [ ] Each id matches dataset
- [ ] At least a `thumb` or `front` per frame
- [ ] Transparent PNG for overlay (front / transparent key)
- [ ] All paths load in browser directly

## 10. Next Steps (Optional Automation)

A Node script can be added to auto-generate thumbs & transparent variants using sharp. Let me know and I can scaffold it.
