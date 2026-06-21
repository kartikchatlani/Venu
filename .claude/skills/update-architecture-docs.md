---
name: update-architecture-docs
description: Refreshes docs/architecture.md with new screenshots of every tab and overlay, then commits. Run this any time UI or code changes to keep the visual reference current.
---

# Update Architecture Docs

When this skill is invoked, do the following steps in order. Do not skip any.

## 1. Ensure the dev server is running

Check if localhost:5173 is responding. If not, start it:
```bash
npm run dev &
```
Wait for "Local: http://localhost:5173" to appear before continuing.

## 2. Navigate to the app

Use Playwright to go to `http://localhost:5173`. If there's a login screen (Auth), note it but proceed — capture auth screen separately if visible.

## 3. Capture screenshots of every major view

Save all screenshots to `docs/screenshots/`. **Overwrite existing files** — these are always the latest.

For each tab, reset scroll to top first:
```js
for (const e of document.querySelectorAll('*')) {
  const s = window.getComputedStyle(e);
  if (s.overflowY === 'auto' || s.overflowY === 'scroll') { e.scrollTop = 0; break; }
}
```

| Filename | How to get there |
|---|---|
| `tab-home.png` | Default / click Home tab (first icon) |
| `tab-home-scroll.png` | Home tab, then scroll to ~480px |
| `tab-explore.png` | Click Explore tab (second icon) |
| `tab-guide.png` | Click Guide tab (third icon) |
| `tab-calendar.png` | Click Calendar tab (fourth icon) |
| `tab-profile.png` | Click Profile tab (fifth icon) |
| `overlay-bottom-sheet.png` | Home tab → click "Get Tickets" on hero show |
| `overlay-notifications.png` | Close bottom sheet → click bell icon in header |

## 4. Update docs/architecture.md

The screenshots in the **UI Screenshot Index** section reference relative paths like `screenshots/tab-home.png`. Those paths don't change — the files are already wired up. No edits to the markdown are needed unless new views were added to the app.

If new tabs or overlays were added since the last update, add new entries following the existing pattern:
```markdown
### [Name] — `src/path/to/File.jsx`

[One-line description of what this view shows]

![Alt text](screenshots/filename.png)
```

## 5. Commit

```bash
git add docs/screenshots/ docs/architecture.md
git commit -m "docs: refresh architecture screenshots"
```

## Done

Report what was captured and note any views that couldn't be reached (e.g., auth-gated, overlay that wouldn't open).
