// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursorDot');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
});

(function animCursor() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  cursor.style.left = cx + 'px';
  cursor.style.top = cy + 'px';
  requestAnimationFrame(animCursor);
})();

// ── EYE SVG BUILDER ──
function makeEyeSVG(size, rot) {
  const reds = ['#c0183a', '#a01530', '#e8193f', '#8c1228'];
  const c = reds[Math.floor(Math.random() * reds.length)];
  const rx = size * .5, ry = size * .32;
  const ir = size * .18, hr = size * .06;
  return `<svg width="${size}" height="${size * .7}" viewBox="0 0 ${size} ${size * .7}" style="display:block">
    <ellipse cx="${size/2}" cy="${size*.35}" rx="${rx}" ry="${ry}" fill="${c}" opacity="0.88"/>
    <ellipse cx="${size/2}" cy="${size*.35}" rx="${rx*.68}" ry="${ry*.75}" fill="#fff" opacity="0.92"/>
    <circle cx="${size/2}" cy="${size*.35}" r="${ir}" fill="#080510"/>
    <circle cx="${size/2}" cy="${size*.35}" r="${ir*.6}" fill="${c}" opacity="0.65"/>
    <circle cx="${size/2 - size*.07}" cy="${size*.35 - size*.07}" r="${hr}" fill="#fff" opacity="0.8"/>
  </svg>`;
}

// ── GENERATE INTRO EYES ──
const field = document.getElementById('eyesField');
const vw = window.innerWidth, vh = window.innerHeight;
const count = Math.min(Math.floor(vw * vh / 11000), 90);
const eyeEls = [];

for (let i = 0; i < count; i++) {
  const sz = 28 + Math.random() * 85;
  const rot = (Math.random() - .5) * 42;
  const x = Math.random() * (vw - sz);
  const y = Math.random() * (vh - sz * .7);
  const delay = Math.random() * 1.9;

  const el = document.createElement('div');
  el.className = 'eye-sprite';
  el.style.cssText = `left:${x}px;top:${y}px;--rot:${rot}deg;animation-delay:${delay}s;animation-duration:${.3 + Math.random()*.25}s;`;
  el.innerHTML = makeEyeSVG(sz, rot);
  field.appendChild(el);
  eyeEls.push({ el, rot });
}

// After eyes appear — pulse them
setTimeout(() => {
  eyeEls.forEach(({ el, rot }) => {
    const dur = .55 + Math.random() * .65;
    el.style.animation = `eyePulse ${dur}s ease-in-out infinite`;
    el.style.setProperty('--rot', rot + 'deg');
  });
}, 2300);

// ── ENTER BUTTON ──
document.getElementById('enterBtn').addEventListener('click', () => {
  // Stagger fade eyes out
  eyeEls.forEach(({ el, rot }, i) => {
    setTimeout(() => {
      el.style.animation = 'eyeFade .75s ease forwards';
      el.style.setProperty('--rot', rot + 'deg');
    }, i * 7);
  });

  setTimeout(() => {
    const intro = document.getElementById('intro');
    intro.style.transition = 'opacity .8s ease';
    intro.style.opacity = '0';
    setTimeout(() => {
      intro.style.display = 'none';
      document.getElementById('site').classList.add('visible');
      document.getElementById('mainNav').classList.add('visible');
      drawBgEyes();
    }, 800);
  }, 1300);
});

// ── BACKGROUND CANVAS EYES ──
function drawBgEyes() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:.045;';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.insertBefore(canvas, document.getElementById('site'));
  const ctx = canvas.getContext('2d');

  function eye(x, y, r, rot, a) {
    ctx.save();
    ctx.globalAlpha = a;
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath(); ctx.ellipse(0, 0, r, r * .55, 0, 0, Math.PI * 2); ctx.fillStyle = '#c0183a'; ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, 0, r * .65, r * .38, 0, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
    ctx.beginPath(); ctx.arc(0, 0, r * .22, 0, Math.PI * 2); ctx.fillStyle = '#08050f'; ctx.fill();
    ctx.restore();
  }

  for (let i = 0; i < 28; i++) {
    eye(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      15 + Math.random() * 38,
      (Math.random() - .5) * 1.2,
      .35 + Math.random() * .65
    );
  }
}

// ── SCROLL REVEAL ──
const revEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: .1 });
revEls.forEach(el => obs.observe(el));
