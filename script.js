/* ==================================================================
   SCRIPT.JS — Soft Neumorphic Financial Dashboard
   Modular Vanilla JS with IIFE pattern
   ================================================================== */

/* ==================================================================
   1) SIDEBAR TOGGLE (Mobile)
   ================================================================== */
(function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const openBtn = document.getElementById('sidebarOpenBtn');
  const closeBtn = document.getElementById('sidebarCloseBtn');

  if (!sidebar) return;

  function open() {
    sidebar.classList.add('open');
    overlay?.classList.remove('opacity-0', 'pointer-events-none');
    overlay?.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    sidebar.classList.remove('open');
    overlay?.classList.add('opacity-0', 'pointer-events-none');
    overlay?.classList.remove('opacity-100');
    document.body.style.overflow = '';
  }

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      sidebar.classList.remove('open');
      overlay?.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  });
})();

/* ==================================================================
   2) PROFILE DROPDOWN
   ================================================================== */
(function initProfileDropdown() {
  const wrap = document.getElementById('profileWrap');
  const btn = document.getElementById('profileBtn');
  const menu = document.getElementById('profileMenu');

  if (!btn || !menu) return;

  function toggle() {
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden', isOpen);
    menu.classList.toggle('opacity-0', isOpen);
    menu.classList.toggle('scale-95', isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  }

  function closeMenu() {
    menu.classList.add('hidden', 'opacity-0', 'scale-95');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });

  document.addEventListener('click', (e) => {
    if (!wrap?.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ==================================================================
   3) MODAL: Tambah Transaksi
   ================================================================== */
(function initModal() {
  const modal = document.getElementById('modal');
  const backdrop = document.getElementById('modalBackdrop');
  const card = document.getElementById('modalCard');
  const form = document.getElementById('txnForm');

  const openers = [
    document.getElementById('addTxnBtnHeader'),
    document.getElementById('addTxnBtnTable')
  ].filter(Boolean);

  const closers = [
    document.getElementById('modalCloseBtn'),
    document.getElementById('modalCancelBtn')
  ].filter(Boolean);

  if (!modal) return;

  function open() {
    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
      backdrop?.classList.replace('opacity-0', 'opacity-100');
      card?.classList.remove('opacity-0', 'translate-y-4', 'scale-95');
      card?.classList.add('opacity-100', 'translate-y-0', 'scale-100');
    });
    document.body.style.overflow = 'hidden';
  }

  function close() {
    backdrop?.classList.replace('opacity-100', 'opacity-0');
    card?.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
    card?.classList.add('opacity-0', 'translate-y-4', 'scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 200);
  }

  openers.forEach((b) => b.addEventListener('click', open));
  closers.forEach((b) => b.addEventListener('click', close));
  backdrop?.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Transaksi berhasil ditambahkan (prototype).');
    form.reset();
    close();
  });
})();

/* ==================================================================
   4) MOCK BAR CHART (Arus Kas)
   ================================================================== */
(function initMockChart() {
  const chart = document.getElementById('mockChart');
  const labels = document.getElementById('mockChartLabels');

  if (!chart) return;

  const data = [
    { d: '07', i: 0.55, o: 0.30 },
    { d: '08', i: 0.40, o: 0.25 },
    { d: '09', i: 0.65, o: 0.35 },
    { d: '10', i: 0.50, o: 0.55 },
    { d: '11', i: 0.70, o: 0.40 },
    { d: '12', i: 0.85, o: 0.45 },
    { d: '13', i: 0.60, o: 0.30 },
    { d: '14', i: 0.75, o: 0.50 },
    { d: '15', i: 0.95, o: 0.40 },
    { d: '16', i: 0.80, o: 0.60 },
    { d: '17', i: 0.65, o: 0.35 },
    { d: '18', i: 0.90, o: 0.55 }
  ];

  chart.innerHTML = '';
  if (labels) labels.innerHTML = '';

  data.forEach((row, idx) => {
    const pair = document.createElement('div');
    pair.className = 'h-full flex items-end justify-center gap-1';

    const inBar = document.createElement('div');
    inBar.className = 'bar w-2 sm:w-3 rounded-t-md bg-emerald-500';
    inBar.style.height = (row.i * 100) + '%';
    inBar.style.setProperty('--h', row.i);
    inBar.style.animationDelay = (idx * 40) + 'ms';
    inBar.title = 'Pemasukan';

    const outBar = document.createElement('div');
    outBar.className = 'bar w-2 sm:w-3 rounded-t-md bg-rose-400';
    outBar.style.height = (row.o * 100) + '%';
    outBar.style.setProperty('--h', row.o);
    outBar.style.animationDelay = (idx * 40 + 80) + 'ms';
    outBar.title = 'Pengeluaran';

    pair.append(inBar, outBar);
    chart.appendChild(pair);

    if (labels) {
      const lbl = document.createElement('div');
      lbl.className = 'text-center text-xs text-slate-400';
      lbl.textContent = row.d;
      labels.appendChild(lbl);
    }
  });
})();

/* ==================================================================
   5) RECENT TRANSACTIONS TABLE
   ================================================================== */
(function initTxnTable() {
  const tbody = document.getElementById('txnTableBody');
  if (!tbody) return;

  const transactions = [
    { date: '18 Mei 2026', desc: 'Invoice klien PT Nusantara', cat: 'Pendapatan Klien', status: 'Lunas', amount: 17500000 },
    { date: '17 Mei 2026', desc: 'Pembelian ATK & supplies', cat: 'Operasional', status: 'Selesai', amount: -845000 },
    { date: '17 Mei 2026', desc: 'Gaji tim freelance — proyek A', cat: 'Gaji & Upah', status: 'Selesai', amount: -3200000 },
    { date: '16 Mei 2026', desc: 'Pembayaran sewa server', cat: 'Pemeliharaan', status: 'Tertunda', amount: -1250000 },
    { date: '15 Mei 2026', desc: 'Refund vendor catering', cat: 'Operasional', status: 'Selesai', amount: 480000 },
    { date: '14 Mei 2026', desc: 'Penjualan paket konsultasi', cat: 'Pendapatan Klien', status: 'Lunas', amount: 6800000 }
  ];

  function formatCurrency(n) {
    const sign = n >= 0 ? '+' : '-';
    const abs = Math.abs(n).toLocaleString('id-ID');
    return `${sign} Rp ${abs}`;
  }

  function getStatusBadge(status) {
    const map = {
      'Lunas': 'badge-success',
      'Selesai': 'badge-neutral',
      'Tertunda': 'badge-danger'
    };
    return `<span class="badge ${map[status] || 'badge-neutral'}">
              <span class="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
              ${status}
            </span>`;
  }

  tbody.innerHTML = transactions.map((t) => {
    const isIncome = t.amount >= 0;
    const amountClass = isIncome ? 'text-emerald-600' : 'text-rose-500';
    const iconPath = isIncome
      ? '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>'
      : '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>';
    const iconBg = isIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500';

    return `
      <tr class="table-row-hover">
        <td class="py-4 px-5 whitespace-nowrap text-slate-400 text-sm">${t.date}</td>
        <td class="py-4 px-5">
          <div class="flex items-center gap-3">
            <span class="icon-card-shadow flex-shrink-0 grid place-items-center w-9 h-9 rounded-xl ${iconBg}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" 
                   stroke="currentColor" stroke-width="1.5" stroke-linecap="round" 
                   stroke-linejoin="round" class="w-4 h-4">${iconPath}</svg>
            </span>
            <span class="font-medium text-slate-800">${t.desc}</span>
          </div>
        </td>
        <td class="py-4 px-5 text-slate-500 text-sm">${t.cat}</td>
        <td class="py-4 px-5">${getStatusBadge(t.status)}</td>
        <td class="py-4 px-5 text-right font-semibold tabular-nums ${amountClass}">${formatCurrency(t.amount)}</td>
      </tr>
    `;
  }).join('');
})();

/* ==================================================================
   6) SIDEBAR NAV ACTIVE STATE
   ================================================================== */
(function initNavActive() {
  const links = document.querySelectorAll('[data-nav]');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      links.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
})();

/* ==================================================================
   7) STAGGERED CARD ANIMATION
   ================================================================== */
(function initCardAnimations() {
  const cards = document.querySelectorAll('.stat-card');
  cards.forEach((card, idx) => {
    card.style.animationDelay = (idx * 100) + 'ms';
  });
})();

/* ==================================================================
   8) THEME TOGGLE (Dark / Light)
   ================================================================== */
(function initThemeToggle() {
  const btn = document.getElementById('themeToggleBtn');
  const iconSun = document.getElementById('themeIconSun');
  const iconMoon = document.getElementById('themeIconMoon');
  const root = document.documentElement;

  if (!btn) return;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      iconSun?.classList.remove('hidden');
      iconMoon?.classList.add('hidden');
    } else {
      iconSun?.classList.add('hidden');
      iconMoon?.classList.remove('hidden');
    }
  }

  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
})();
