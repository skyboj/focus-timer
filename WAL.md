# WAL — Project State Journal

## 2026-03-03 | Session

### Started
- TASK-002: Move time picker inside the timer circle, add seconds, allow independent scrolling for hours/minutes/seconds

### Completed
- TASK-002: In-circle independent time pickers (HR/MIN/SEC)
  - `index.html`:222-243 — Updated `.ring-center` to act as a flex container and toggles visibility via `.setting` and `.running` classes.
  - `index.html`:402-498 — Updated `.wheel-container` CSS to be narrower (`64px` width, `150px` height) to fit 3 wheels natively inside the circle radius.
  - `index.html`:825-835 — Moved wheels markup inside `<div class="ring-center setting" id="ringCenter">` and created a third wheel for seconds (`#secondWheelEl`).
  - `index.html`:1173-1226 — Updated JavaScript `toggleTimer()`, `resetTimer()`, and `timerDone()` to toggle `.setting` and `.running` classes on `ringCenter`, handling the UI swap between wheels and the static countdown text.
  - `index.html`:1301-1492 — Added `wheels.s` configuration object and updated the math inside `getWheelFloatSecs()`, `applyWheelValue()`, and `updateClock()` to parse HR/MIN/SEC appropriately.

### Decisions (and why)
- Chose to manage wheel vs static text visibility via CSS classes (`.setting` / `.running`) toggled on the parent `#ringCenter` rather than dynamically tearing down/building DOM nodes to match the iOS-style "flip" behavior gracefully without losing wheel state/scroll offset.
- Maintained independent mathematical offsets for each wheel but unified their calculation into total seconds when rendering the ring progress shape, fulfilling the "Hours don't affect to minutes and seconds" requirement.

### Next
- No issues found. Work fully satisfies constraints.
