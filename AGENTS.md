# AGENTS

## Repo type
- Static frontend prototype. 3 files at root: `index.html`, `style.css`, `script.js`.
- No `package.json`, lockfile, build, bundler, backend, tests, CI, or README.
- HTML `lang="id"`. Mixed ID/EN copy; currency via `Intl` `id-ID` in `script.js:217`.

## Run / verify
- Open `index.html` directly in a browser. No dev server, lint, typecheck, or test commands exist.
- Manual smoke check after edits: mobile sidebar toggle (overlay + Esc + resize >=768 auto-close), profile dropdown (outside-click + Esc), Add Transaction modal (header + table openers, backdrop click, Esc, submit shows `alert` then resets), mock bar chart renders 12 bars, recent transactions table renders 6 rows.

## Stack
- Tailwind via CDN: `https://cdn.tailwindcss.com` (no config, no JIT safelist → class names must be literal strings, no dynamic concatenation).
- Inter from Google Fonts.
- Custom CSS in `style.css`: design tokens in `:root`, neu utility classes (`.neu-card`, `.neu-flat`, `.neu-inset`, `.neu-pressed`, `.neu-btn`, `.neu-btn-primary`, `.neu-input`), animations (`.animate-fade-in-up`, `.animate-float`, `.dot-pulse`, `.bar`), badges (`.badge`, `.badge-success`, `.badge-danger`, `.badge-neutral`), table hover (`.table-row-hover`), scrollbar (`.nice-scroll`).
- Vanilla JS in `script.js`, modular IIFEs (7): Sidebar, Profile Dropdown, Modal, Mock Chart, Txn Table, Nav Active, Card Animations. Add new features as new IIFEs.
- Inline SVG icons only, `stroke-width` 1.5 or 2. No icon library.
- External: `ui-avatars.com` for avatar images.

## Color tokens (verified in `style.css`)
- Page/surface bg `--color-page: #F0F4F8` (also `--c-bg`, `--c-surface`).
- Sidebar bg `--color-sidebar: #DCE7F5` (utility `.bg-sidebar`).
- Primary `--color-primary: #7C9EB2` (used by `.neu-btn-primary`, focus ring, active nav text).
- Success `#10B981` / strong `#059669` / soft `#ecfdf5`.
- Danger `#F43F5E` / strong `#be123c` / soft `#fff1f2`.
- Note: HTML still hardcodes legacy navy `#1E3A5F` in inline Tailwind utilities (e.g. `text-[#1E3A5F]`, `bg-slate-900/30`). Treat those as accents, not the primary token.

## Conventions
- Use neu utility classes from `style.css` for shadows. Do not rebuild neu shadows ad‑hoc with Tailwind arbitrary values.
- Background colors: prefer utilities `.bg-page` / `.bg-sidebar` / `.bg-surface` over hardcoded hex. Neu shadows are tuned to `#F0F4F8`; changing page bg requires updating `--shadow-neu*` vars to keep the effect.
- Animations: use predefined classes; bars need `style.setProperty('--h', value)` (consumed by `@keyframes growBar`).
- Stagger: Card Animations IIFE auto-sets `animation-delay` on every `.stat-card` (`script.js:280`). Do not set inline delays on those; use a different class for one-offs.
- Active nav: anchors use `data-nav="..."`; click handler in `initNavActive` (`script.js:265`) toggles `.active`. Add new nav links the same way.

## Element IDs the JS depends on
- Sidebar: `#sidebar`, `#sidebarOverlay`, `#sidebarOpenBtn`, `#sidebarCloseBtn`.
- Profile: `#profileWrap`, `#profileBtn`, `#profileMenu`.
- Modal: `#modal`, `#modalBackdrop`, `#modalCard`, `#txnForm`, `#modalCloseBtn`, `#modalCancelBtn`. Modal openers are picked up by id only: `#addTxnBtnHeader`, `#addTxnBtnTable` (`script.js:94`). New trigger → add the matching id or extend the `openers` array.
- Chart: `#mockChart`, `#mockChartLabels` (12 cols, mock data array inline).
- Table: `#txnTableBody` (rows injected by `initTxnTable`, mock data inline).

## Gotchas
- Tailwind CDN: no purge, no config file. Avoid runtime-built class strings.
- Form submit only `alert`s and resets — no real persistence anywhere.
- Modal close uses a 200ms `setTimeout` before adding `hidden`; matches CSS transitions in `style.css:230-237`.
- Sidebar resize listener auto-closes at `>=768px`; keep that breakpoint in sync with the `md:` Tailwind utilities.

## Working rules
- Edit HTML/CSS/JS in their own files; keep JS modular IIFEs.
- Preserve the soft Neumorphic look. No flat shadowless components, no harsh dark shadows.
- Do not add a package manager, build tool, framework, or backend without explicit user request.
- Do not commit unless asked.
