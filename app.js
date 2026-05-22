// ─── Page metadata for known URLs ───────────────────────
const PAGES = {
  'home.page':           { icon: '🌐', title: 'Homepage' },
  'google.com':          { icon: '🔍', title: 'Google' },
  'youtube.com':         { icon: '▶️',  title: 'YouTube' },
  'github.com':          { icon: '🐙', title: 'GitHub' },
  'twitter.com':         { icon: '🐦', title: 'Twitter' },
  'reddit.com':          { icon: '🤖', title: 'Reddit' },
  'stackoverflow.com':   { icon: '📚', title: 'Stack Overflow' },
  'netflix.com':         { icon: '🎬', title: 'Netflix' },
  'amazon.com':          { icon: '📦', title: 'Amazon' },
};

function getPage(url) {
  const key = url.replace(/^https?:\/\//, '').toLowerCase().trim();
  return PAGES[key] || { icon: '📄', title: url };
}

// ─── DOM refs ────────────────────────────────────────────
const backBtn     = document.getElementById('back-btn');
const fwdBtn      = document.getElementById('fwd-btn');
const urlBar      = document.getElementById('url-bar');
const goBtn       = document.getElementById('go-btn');
const pageContent = document.getElementById('page-content');
const nodesRow    = document.getElementById('nodes-row');
const histList    = document.getElementById('history-list');

// ─── Init linked list ────────────────────────────────────
const bh = new BrowserHistory('home.page');

// ─── Render: page area ───────────────────────────────────
function renderPage(url) {
  const p = getPage(url);

  // Restart animation
  pageContent.style.animation = 'none';
  void pageContent.offsetWidth;
  pageContent.style.animation = '';

  pageContent.innerHTML = `
    <div class="page-icon">${p.icon}</div>
    <div class="page-title">${p.title}</div>
    <div class="page-url">${url}</div>
  `;

  urlBar.value = url === 'home.page' ? '' : url;
}

// ─── Render: linked list visualizer ─────────────────────
function renderViz() {
  const nodes = bh.getAllNodes();
  nodesRow.innerHTML = '';

  nodes.forEach((node, i) => {
    const isCurr       = node === bh.curr;
    const isForwardDead = isForwardOf(node);

    // Arrow between nodes
    if (i > 0) {
      const arrow = document.createElement('div');
      arrow.className = 'arrow';
      arrow.innerHTML = `
        <div class="arr-line${isForwardDead ? ' dead' : ''}"></div>
        <div class="arr-sub">⇄</div>
      `;
      nodesRow.appendChild(arrow);
    }

    // Node box
    const wrap = document.createElement('div');
    wrap.className = 'node-wrap';

    const box = document.createElement('div');
    box.className = 'node-box'
      + (isCurr        ? ' curr' : '')
      + (isForwardDead ? ' dead' : '');

    const label = node.url.length > 12
      ? node.url.substring(0, 10) + '…'
      : node.url;

    box.innerHTML = `
      ${isCurr ? `<div class="curr-tag"><span>curr</span><div class="curr-arrow"></div></div>` : ''}
      <div class="node-url">${label}</div>
      <div class="node-ptrs">
        ${node.prev ? '← prev' : 'NULL'} · ${node.next ? 'next →' : 'NULL'}
      </div>
    `;

    wrap.appendChild(box);
    nodesRow.appendChild(wrap);
  });

  // History pills
  histList.innerHTML = '';
  nodes.forEach(node => {
    const pill = document.createElement('div');
    pill.className = 'hist-pill' + (node === bh.curr ? ' active' : '');
    pill.textContent = node.url.length > 18
      ? node.url.substring(0, 16) + '…'
      : node.url;
    histList.appendChild(pill);
  });

  // Button states
  backBtn.disabled = !bh.canBack();
  fwdBtn.disabled  = !bh.canForward();
}

// Helper: is this node forward of curr?
function isForwardOf(node) {
  let n = bh.curr.next;
  while (n) { if (n === node) return true; n = n.next; }
  return false;
}

// ─── Visit a URL ─────────────────────────────────────────
function visit(url) {
  url = url.trim();
  if (!url) return;
  bh.visit(url);
  renderPage(url);
  renderViz();
}

// ─── Event listeners ─────────────────────────────────────
goBtn.addEventListener('click', () => visit(urlBar.value));

urlBar.addEventListener('keydown', e => {
  if (e.key === 'Enter') visit(urlBar.value);
});

backBtn.addEventListener('click', () => {
  if (!bh.canBack()) return;
  renderPage(bh.back(1));
  renderViz();
});

fwdBtn.addEventListener('click', () => {
  if (!bh.canForward()) return;
  renderPage(bh.forward(1));
  renderViz();
});

// ─── Initial render ───────────────────────────────────────
renderPage('home.page');
renderViz();
