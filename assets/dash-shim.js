// Kleine laag die de dashboard-pagina los van Claude laat draaien:
// laadt de gegevens uit deze repository en tekent de onderdelen opnieuw als er iets verandert.
(function () {
  const SOURCES = {
    vermeldingen: { url: 'data/vermeldingen.json', type: 'json' },
    bg_wvdm2026: { url: 'assets/bg-wvdm2026.jpg?v=2', type: 'dataurl' },
    logo: { url: 'assets/logo.svg', type: 'dataurl' },
    logo_wvdm2026: { url: 'assets/logo-wvdm2026.svg', type: 'dataurl' },
    logo_mediamasters: { url: 'assets/logo-mediamasters.png', type: 'dataurl' },
    ph1: { url: 'assets/placeholder-1.jpg', type: 'dataurl' },
    ph2: { url: 'assets/placeholder-2.jpg', type: 'dataurl' },
    ph3: { url: 'assets/placeholder-3.jpg', type: 'dataurl' },
    ph4: { url: 'assets/placeholder-4.jpg', type: 'dataurl' },
  };
  window.NM_EMBED = true; // op de eigen site: klik op een Instagram-tegel opent de officiële Instagram-weergave
  window.NM_IMAGES = true; // op de eigen site: uitgelichte afbeeldingen van websites tonen
  const VERVERS_MINUTEN = 15; // gegevens opnieuw ophalen terwijl de pagina open staat
  const store = {};
  const calcs = {};
  const draws = {};
  const mounted = new WeakMap();

  function load(id, force) {
    if (store[id] && !force) return;
    const s = SOURCES[id];
    if (!s) { store[id] = { status: 'missing', data: [] }; return; }
    if (!store[id]) store[id] = { status: 'loading', data: [] };
    const url = s.type === 'json' ? s.url + '?t=' + Date.now() : s.url;
    fetch(url, { cache: s.type === 'json' ? 'no-store' : 'default' })
      .then((r) => { if (!r.ok) throw new Error(r.status + ' ' + r.statusText); return s.type === 'json' ? r.json() : r.blob(); })
      .then((d) => s.type === 'dataurl'
        ? new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(d); })
        : d)
      .then((d) => { store[id] = { status: 'ok', data: d }; redraw(); })
      .catch((e) => { if (!force) { store[id] = { status: 'error', data: [], message: String(e) }; redraw(); } });
  }

  function data(id) {
    const c = calcs[id];
    if (c) {
      const ins = c.inputs.map(data);
      if (ins.some((x) => x.status === 'loading')) return { status: 'loading', data: [] };
      const bad = ins.find((x) => x.status !== 'ok');
      if (bad) return { status: bad.status, data: [] };
      try { return { status: 'ok', data: c.fn(...ins.map((x) => x.data)) }; }
      catch (e) { console.error(e); return { status: 'error', data: [], message: String(e) }; }
    }
    load(id);
    return store[id];
  }

  function runDraw(name) {
    const d = draws[name];
    if (!d) return;
    document.querySelectorAll('[data-draw="' + name + '"]').forEach((el) => {
      if (el.closest('[hidden]')) return;
      try {
        if (typeof d === 'function') { d(el); return; }
        if (!mounted.has(el)) mounted.set(el, { v: d.mount ? d.mount(el) : undefined });
        if (d.update) d.update(el, mounted.get(el).v);
      } catch (e) { console.error(e); }
    });
  }
  function redraw() { Object.keys(draws).forEach(runDraw); }

  window.dash = {
    data,
    calc: (id, o) => { calcs[id] = o; },
    draw: (name, fn) => { if (fn === undefined) { runDraw(name); return; } draws[name] = fn; },
    loader: () => {},
    onData: () => {},
    colors: ['#5aa9ff', '#f472b6', '#fbbf24', '#34d399', '#c084fc'],
    params: () => ({}), setParams: () => {}, resetParams: () => {}, setLink: () => {}, refresh: () => {},
  };

  document.addEventListener('DOMContentLoaded', () => {
    redraw();
    let w = window.innerWidth;
    window.addEventListener('resize', () => { if (Math.abs(window.innerWidth - w) > 20) { w = window.innerWidth; redraw(); } });
    document.querySelectorAll('.nm-onderwerp').forEach((s) => s.addEventListener('change', () => setTimeout(redraw, 0)));
    setInterval(() => load('vermeldingen', true), VERVERS_MINUTEN * 60 * 1000);
  });
})();
