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

## 2. Read the codebase to determine what to capture

Before taking any screenshots, scan the source to build an accurate picture of what currently exists. Do not rely on the existing screenshot list in `docs/architecture.md` — it may be stale.

```bash
# See all page and component files
ls src/pages/
ls src/components/
ls src/hooks/
```

Then read `src/App.jsx` to understand:
- Which tabs exist and what component each maps to (`const pages = { ... }`)
- Which overlays are rendered at the App level (bottom sheets, panels, modals)
- How tabs are switched (look for `activeTab` state and `TabBar`)

Read `src/components/index.jsx` (or equivalent) to find the `TabBar` definition — the tab icons and IDs tell you exactly which tabs exist and in what order.

From this, produce a **capture plan**: a list of screenshots to take, with filenames and how to reach each view. Use the naming convention `tab-<name>.png` for tabs, `overlay-<name>.png` for overlays, and `tab-<name>-scroll.png` for scrolled states.

Example capture plan output (yours will differ based on what the code actually has):
```
tab-home.png          → click Home tab (1st icon), scroll to top
tab-home-scroll.png   → Home tab, scroll to ~480px
tab-explore.png       → click Explore tab (2nd icon)
tab-guide.png         → click Guide tab (3rd icon)
tab-calendar.png      → click Calendar tab (4th icon)
tab-profile.png       → click Profile tab (5th icon)
overlay-bottom-sheet.png → click an event card to open detail sheet
overlay-notifications.png → click bell icon in header
```

If the code has changed (new tabs, removed tabs, new overlays), adjust the plan accordingly.

## 3. Navigate to the app and capture screenshots

Use Playwright to go to `http://localhost:5173`. If there's a login screen, note it and capture it as `screen-auth.png`.

Save all screenshots to `docs/screenshots/`. **Overwrite existing files** — these are always the latest.

For each tab, reset scroll to top before capturing:
```js
for (const e of document.querySelectorAll('*')) {
  const s = window.getComputedStyle(e);
  if (s.overflowY === 'auto' || s.overflowY === 'scroll') { e.scrollTop = 0; break; }
}
```

Work through the capture plan from Step 2. If a view can't be reached (e.g., requires specific data, auth-gated), note it and skip rather than blocking.

## 4. Update docs/architecture.md

Compare the screenshots you just captured against the **UI Screenshot Index** section in `docs/architecture.md`:

- **New view exists in code but not in the doc** → add a new section following the existing pattern:
  ```markdown
  ### [Tab/Overlay Name] — `src/path/to/File.jsx`

  [One-line description of what this view shows]

  ![Alt text](screenshots/filename.png)
  ```
- **View was removed from the code** → remove its section from the doc and delete the stale screenshot file
- **View exists in both and screenshot was refreshed** → no markdown change needed, the file overwrite handles it

Also update the Mermaid diagrams if the tab structure changed (new tabs added to Diagram 2, new pages in Diagram 1, etc.).

## 5. Commit

```bash
git add docs/screenshots/ docs/architecture.md
git commit -m "docs: refresh architecture screenshots"
```

## Done

Report what was captured and note any views that couldn't be reached (e.g., auth-gated, overlay that wouldn't open).
