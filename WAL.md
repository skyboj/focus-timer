# WAL — Project State Journal

## 2026-03-03 | Session

### Started
- TASK-003: Separate time wheel picker from the clock circle, create a setup screen view.

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
