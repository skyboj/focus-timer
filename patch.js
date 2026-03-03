const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// --- 1. Move Wheels back to wheel-section ---
content = content.replace(
`        <div class="ring-center setting" id="ringCenter">
          <div class="time-display" id="timeDisplay">05:00</div>
          
          <div class="wheel-row">
            <div class="wheel-col">
              <div class="wheel-container" id="hourWheelEl">
                <div class="wheel-drum" id="hourDrum"></div>
                <div class="wheel-highlight"></div>
                <div class="wheel-fade wheel-fade-top"></div>
                <div class="wheel-fade wheel-fade-bottom"></div>
              </div>
              <span class="wheel-unit">hr</span>
            </div>

            <span style="font-size:24px; font-weight:300; margin-top:-18px; opacity: 0.3;">:</span>

            <div class="wheel-col">
              <div class="wheel-container" id="minuteWheelEl">
                <div class="wheel-drum" id="minuteDrum"></div>
                <div class="wheel-highlight"></div>
                <div class="wheel-fade wheel-fade-top"></div>
                <div class="wheel-fade wheel-fade-bottom"></div>
              </div>
              <span class="wheel-unit">min</span>
            </div>

            <span style="font-size:24px; font-weight:300; margin-top:-18px; opacity: 0.3;">:</span>

            <div class="wheel-col">
              <div class="wheel-container" id="secondWheelEl">
                <div class="wheel-drum" id="secondDrum"></div>
                <div class="wheel-highlight"></div>
                <div class="wheel-fade wheel-fade-top"></div>
                <div class="wheel-fade wheel-fade-bottom"></div>
              </div>
              <span class="wheel-unit">sec</span>
            </div>
          </div>

          <div class="time-label" id="timeLabel">ready</div>
        </div>`,
`        <div class="ring-center">
          <div class="time-display" id="timeDisplay">05:00</div>
          <div class="time-label" id="timeLabel">ready</div>
        </div>`);

content = content.replace(
`      <div class="bottom-section">
        <div class="controls">`,
`      <!-- The setup view -->
      <div class="setup-section" id="setupSection">
        <div class="wheel-row">
          <div class="wheel-col">
            <div class="wheel-container" id="hourWheelEl">
              <div class="wheel-drum" id="hourDrum"></div>
              <div class="wheel-highlight"></div>
              <div class="wheel-fade wheel-fade-top"></div>
              <div class="wheel-fade wheel-fade-bottom"></div>
            </div>
            <span class="wheel-unit">hr</span>
          </div>

          <span style="font-size:32px; font-weight:300; margin-top:-18px; opacity: 0.3;">:</span>

          <div class="wheel-col">
            <div class="wheel-container" id="minuteWheelEl">
              <div class="wheel-drum" id="minuteDrum"></div>
              <div class="wheel-highlight"></div>
              <div class="wheel-fade wheel-fade-top"></div>
              <div class="wheel-fade wheel-fade-bottom"></div>
            </div>
            <span class="wheel-unit">min</span>
          </div>

          <span style="font-size:32px; font-weight:300; margin-top:-18px; opacity: 0.3;">:</span>

          <div class="wheel-col">
            <div class="wheel-container" id="secondWheelEl">
              <div class="wheel-drum" id="secondDrum"></div>
              <div class="wheel-highlight"></div>
              <div class="wheel-fade wheel-fade-top"></div>
              <div class="wheel-fade wheel-fade-bottom"></div>
            </div>
            <span class="wheel-unit">sec</span>
          </div>
        </div>
      </div>

      <div class="bottom-section">
        <div class="controls">`);

// --- 2. CSS adjustments for toggle setup/running ---
content = content.replace(
`  .ring-center {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    /* pointer-events: none; is removed so wheels can accept touch */
    transition: transform 0.7s cubic-bezier(0.34, 1.3, 0.64, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  /* When timer is stopped, ring-center has Setting, running clock is hidden */
  .ring-center.setting .time-display { display: none; }
  /* When timer is running, the wheels row is hidden */
  .ring-center.running .wheel-row { display: none; }
  
  .app.focus-mode .ring-center {
    transform: translate(-50%, -50%) scale(1.07);
    pointer-events: none; /* Ignore touch in focus mode */
  }`,
`  .ring-center {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    pointer-events: none;
    transition: transform 0.7s cubic-bezier(0.34, 1.3, 0.64, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .app.focus-mode .ring-center {
    transform: translate(-50%, -50%) scale(1.07);
  }

  /* Ring Wrap fades out when setting up */
  .ring-wrap {
    transition: width 0.72s cubic-bezier(0.34, 1.3, 0.64, 1),
                height 0.72s cubic-bezier(0.34, 1.3, 0.64, 1),
                margin 0.65s ease, opacity 0.5s ease;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
  }

  /* Setup section shown when not running */
  .setup-section {
    width: 100%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.4s ease, transform 0.4s ease;
    position: relative;
    z-index: 10;
    margin-top: 10vh;
  }
  
  /* Running State Toggles */
  .app.running .ring-wrap {
    opacity: 1;
    pointer-events: auto;
    position: relative;
    top: auto; left: auto;
    transform: none;
  }
  .app.running .setup-section {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transform: scale(0.9);
  }`);

content = content.replace(
`  .wheel-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px; /* Tighter gap for hr/min/sec */
    pointer-events: auto; /* Re-enable scroll */
  }

  .wheel-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  /* Fit 3 wheels inside the ring */
  .wheel-container {
    position: relative;
    height: 150px; /* VISIBLE(3) × ITEM_H(50) */
    width: 64px;
    overflow: hidden;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
  }`,
`  .wheel-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    pointer-events: auto;
  }

  .wheel-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  /* Extracted wheels size */
  .wheel-container {
    position: relative;
    height: 220px; /* VISIBLE(5) × ITEM_H(44) */
    width: 70px;
    overflow: hidden;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
  }
  .wheel-container:active { cursor: grabbing; }`);

content = content.replace(
`  .wheel-item {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Mono', monospace;
    font-size: 28px;
    font-weight: 300;
    color: var(--text);
    user-select: none;
    -webkit-user-select: none;
  }

  .wheel-highlight {
    position: absolute;
    top: 50px; /* CENTER_OFF = (VISIBLE-1)/2 × ITEM_H */
    left: 2px; right: 2px;
    height: 50px;
    background: rgba(77, 255, 195, 0.05);
    border-top: 1px solid var(--mint-dim);
    border-bottom: 1px solid var(--mint-dim);
    border-radius: 8px;
    pointer-events: none;
    z-index: 1;
  }

  .wheel-fade {
    position: absolute;
    left: 0; right: 0;
    height: 50px; /* 1 × ITEM_H */
    pointer-events: none;
    z-index: 2;
  }`,
`  .wheel-item {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Mono', monospace;
    font-size: 32px;
    font-weight: 300;
    color: var(--text);
    user-select: none;
    -webkit-user-select: none;
  }

  .wheel-highlight {
    position: absolute;
    top: 88px; /* CENTER_OFF = (VISIBLE-1)/2 × ITEM_H */
    left: -6px; right: -6px;
    height: 44px;
    background: rgba(77, 255, 195, 0.05);
    border-top: 1px solid var(--mint-dim);
    border-bottom: 1px solid var(--mint-dim);
    border-radius: 8px;
    pointer-events: none;
    z-index: 1;
  }

  .wheel-fade {
    position: absolute;
    left: 0; right: 0;
    height: 88px; /* 2 × ITEM_H */
    pointer-events: none;
    z-index: 2;
  }`);

content = content.replace(
`    .app.focus-mode .ring-wrap {
      /* Stay in normal flow — no position:fixed so there is no jump.
       Flexbox + max-height animations smoothly drift the ring to center. */
      width: min(calc(100vw - 36px), calc(100svh - 180px));
      height: min(calc(100vw - 36px), calc(100svh - 180px));
      margin: 0;
    }`,
`    .app.focus-mode .ring-wrap {
      width: min(calc(100vw - 36px), calc(100svh - 180px));
      height: min(calc(100vw - 36px), calc(100svh - 180px));
      margin: 0;
      position: relative;
    }`);

content = content.replace(
`    @media (max-height: 650px) and (orientation: portrait) {
      .btn-play { width: 62px; height: 62px; font-size: 22px; }
      .btn-sec  { width: 44px; height: 44px; font-size: 16px; }
      .wheel-item { font-size: 22px; height: 40px; }
      .wheel-container { height: 120px; width: 54px; }
      .wheel-highlight { height: 40px; top: 40px; }
      .wheel-fade { height: 40px; }
      .focus-btn { height: clamp(54px, 8svh, 72px); }
    }`,
`    @media (max-height: 650px) and (orientation: portrait) {
      .btn-play { width: 62px; height: 62px; font-size: 22px; }
      .btn-sec  { width: 44px; height: 44px; font-size: 16px; }
      .wheel-item { font-size: 26px; height: 40px; }
      .wheel-container { height: 200px; width: 60px; }
      .wheel-highlight { height: 40px; top: 80px; }
      .wheel-fade { height: 80px; }
      .focus-btn { height: clamp(54px, 8svh, 72px); }
    }`);

content = content.replace(
`      .wheel-item { font-size: 20px; height: 36px; }
      .wheel-container { height: 108px; width: 48px; }
      .wheel-highlight { height: 36px; top: 36px; }
      .wheel-fade { height: 36px; }`,
`      .wheel-item { font-size: 24px; height: 36px; }
      .wheel-container { height: 180px; width: 50px; }
      .wheel-highlight { height: 36px; top: 72px; }
      .wheel-fade { height: 72px; }`);


// --- 3. Script edits: removing ring-center toggle ---
content = content.replace(
`    // ── DOM ───────────────────────────────────────
    const timeDisplay = document.getElementById('timeDisplay');
    const timeLabel = document.getElementById('timeLabel');
    const taskLabel = document.getElementById('taskLabel');
    const playBtn = document.getElementById('playBtn');
    const muteBtn = document.getElementById('muteBtn');
    const voicePill = document.getElementById('voicePill');
    const voiceMsg = document.getElementById('voiceMsg');
    const ringWrap = document.getElementById('ringWrap');
    const ringCenter = document.getElementById('ringCenter');
    const canvas = document.getElementById('ringCanvas');`,
`    // ── DOM ───────────────────────────────────────
    const timeDisplay = document.getElementById('timeDisplay');
    const timeLabel = document.getElementById('timeLabel');
    const taskLabel = document.getElementById('taskLabel');
    const playBtn = document.getElementById('playBtn');
    const muteBtn = document.getElementById('muteBtn');
    const voicePill = document.getElementById('voicePill');
    const voiceMsg = document.getElementById('voiceMsg');
    const ringWrap = document.getElementById('ringWrap');
    const canvas = document.getElementById('ringCanvas');`);

content = content.replace(
`      if (isRunning) {
        if (totalSeconds < 1) totalSeconds = remainingSeconds = 1; // min 1 sec limit when turning on
        playBtn.innerHTML = '⏸';
        playBtn.classList.remove('paused');
        ringCenter.classList.remove('setting');
        ringCenter.classList.add('running');
        timeLabel.textContent = currentPreset;`,
`      if (isRunning) {
        if (totalSeconds < 1) totalSeconds = remainingSeconds = 1; // min 1 sec limit when turning on
        playBtn.innerHTML = '⏸';
        playBtn.classList.remove('paused');
        appEl.classList.add('running');
        timeLabel.textContent = currentPreset;`);
        
content = content.replace(
`      window.speechSynthesis.cancel();
      playBtn.innerHTML = '▶';
      playBtn.classList.remove('paused');
      ringCenter.classList.add('setting');
      ringCenter.classList.remove('running');
      timeLabel.textContent = 'ready';`,
`      window.speechSynthesis.cancel();
      playBtn.innerHTML = '▶';
      playBtn.classList.remove('paused');
      appEl.classList.remove('running');
      timeLabel.textContent = 'ready';`);

content = content.replace(
`      stopBlink();
      releaseWakeLock();
      exitFocusMode();
      playBtn.innerHTML = '↺';
      ringCenter.classList.add('setting');
      ringCenter.classList.remove('running');
      timeLabel.textContent = 'done!';`,
`      stopBlink();
      releaseWakeLock();
      exitFocusMode();
      playBtn.innerHTML = '↺';
      appEl.classList.remove('running');
      timeLabel.textContent = 'done!';`);
      
content = content.replace(
`    const ITEM_H = getDynamicItemHeight();
    const VISIBLE = 3; // 3 items visible in center setup
    let CENTER_OFF = (VISIBLE - 1) / 2 * ITEM_H;`,
`    let ITEM_H = getDynamicItemHeight();
    const VISIBLE = 5; // Revert to 5 items shown
    let CENTER_OFF = (VISIBLE - 1) / 2 * ITEM_H;`);

fs.writeFileSync('index.html', content);
