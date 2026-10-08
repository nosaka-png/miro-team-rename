# Miro Team Rename

A small Miro board app (Web SDK v2) that replaces team labels such as "Aチーム" / "A-1" with new names across the current board.
All processing happens in the browser inside Miro; no board content is sent anywhere else.

- `index.html` – opens the panel when the toolbar icon is clicked
- `app.html` – the panel UI
- `rename.js` – replacement logic (`node test.js` runs the tests)
