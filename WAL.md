# WAL — Project State Journal

## 2026-03-03 | Session

### Started
- TASK-004: Move the "hold to stop" option progress to the border of the button.

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
