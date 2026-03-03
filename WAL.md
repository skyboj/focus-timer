# WAL — Project State Journal

## 2026-03-03 | Session

### Started
- TASK-005: Match the pause button icon with the stop button icon.

### Completed
- TASK-005: Matched pause button icon
  - `index.html`:928-932 — Replaced the `⏸` (U+23F8 Double Vertical Bar) with `▮▮` (U+25AE Black Vertical Rectangle twice) inside the `#focusPauseBtn` markup so it perfectly matches the geometrical shape and scale of the stop button `■`.
  - `index.html`:1252-1260 — Updated `playBtn.innerHTML` state machine so that when the timer pauses/resumes, it uses the geometrical text sequence rather than the emoji character.

### Decisions (and why)
- Chose `▮▮` text replacements rather than writing inline SVG code because the stop button uses text (`■`) and inherits text color transition stylings perfectly. `▮▮` visually aligns with `■` precisely via the `DM Mono` monospace font configuration while avoiding OS-specific emoji rendering side-effects.

### Next
- None. Task successfully matched the iconography across buttons.

### Completed
- TASK-004: Hold progress on stop button border
  - `index.html`:712-731 — Replaced `.hold-svg` CSS and removed `.hold-ring-wrap` circle styles, replacing with `.hold-svg` set to `-1px` absolute positioning to trace the exact border shape.
  - `index.html`:965-967 — Updated the markup in `#focusStopBtn` to use the dynamic `width=100%` svg with an injected `rect`.
  - `index.html`:1042-1066 — Updated `startHold()` logic to measure the button's `offsetWidth`, `offsetHeight`, and computed `borderRadius` dynamically when pressed. The `rect` coordinates and `viewBox` are calculated sequentially to obtain absolute pixel tracing limits using `getTotalLength()`.

### Decisions (and why)
- Used a dynamically resizing SVG `<rect>` tracked via `getTotalLength()` rather than adjusting CSS `border-width` or conic gradients. The SVG overlay approach properly retains full control of the stroke progress using JS `strokeDashoffset`, hugging any border-radius configuration the CSS might push during window scaling, which standard CSS gradients struggle with round corners.
- Extracted exact corner radius mapping using `getComputedStyle(focusStopBtn).borderRadius` so the Javascript handles scale queries automatically without duplicating CSS logic.

### Next
- No issues found. Work fully satisfies constraints.

## 2026-03-03 | Session

### Completed
- TASK-003: Separated setup wheels from the timer ring
  - `index.html`:moved `.wheel-row` out of `.ring-center` and wrapped it in a new `.setup-section`.
  - `index.html`:updated the `.ring-wrap` opacity to default to `0` and `visibility: hidden;` initially.
  - `index.html`:updated `.setup-section` height and layout to be the primary view when standing by.
  - `index.html`:modified `toggleTimer()` and `resetTimer()` to toggle the `.running` class directly on `appEl` so the CSS transitions smoothly handle fading in the timer ring and fading out the wheels.

### Decisions (and why)
- Used `.app.running` CSS rules with `opacity` and `visibility: hidden` delays rather than purely `display: none`. This allows the wheels to glide smoothly downward and fade out while the timer fades in, avoiding an abrupt clipping jump from inline layout reflows.
- `visibility: hidden` and `pointer-events: none` were required on top of `opacity: 0` so the wheels don't accidentally intercept touchscreen drags while the clock is ticking overtop of them.

### Next
- No issues found. Both clock and wheels behave perfectly on toggle.
