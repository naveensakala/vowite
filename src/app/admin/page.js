'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

// ─── Design tokens (match legacy exactly) ───────────────────────────────────
// Injected client-side only to avoid Next.js hydration mismatch
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

  .adm-root {
    --gold: #C9A84C;
    --gold-dark: #9C7A2E;
    --ivory: #FFFDF7;
    --espresso: #2C1A0E;
    --espresso-mid: #5C3D22;
    --border: rgba(201,168,76,0.2);
    font-family: 'DM Sans', sans-serif;
    background: #f8f5f0;
    color: var(--espresso);
    min-height: 100vh;
    display: flex;
  }

  /* SIDEBAR */
  .adm-sidebar {
    width: 220px;
    background: var(--espresso);
    min-height: 100vh;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
  }
  .adm-sidebar-logo {
    padding: 1.5rem;
    border-bottom: 0.5px solid rgba(255,255,255,0.08);
  }
  .adm-sidebar-logo img { height: 36px; width: auto; }
  .adm-sidebar-nav { padding: 1rem 0; flex: 1; overflow-y: auto; }
  .adm-nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 1.5rem;
    font-size: 13px;
    color: rgba(255,253,247,0.6);
    cursor: pointer;
    transition: all 0.2s;
    border-left: 3px solid transparent;
    user-select: none;
  }
  .adm-nav-item:hover { color: var(--ivory); background: rgba(255,255,255,0.04); }
  .adm-nav-item.active { color: var(--gold); border-left-color: var(--gold); background: rgba(201,168,76,0.06); }
  .adm-nav-icon { font-size: 16px; width: 20px; text-align: center; }
  .adm-sidebar-footer {
    padding: 1rem 1.5rem;
    border-top: 0.5px solid rgba(255,255,255,0.08);
  }
  .adm-btn-signout {
    width: 100%;
    background: transparent;
    border: 0.5px solid rgba(255,255,255,0.15);
    border-radius: 100px;
    padding: 8px;
    font-size: 12px;
    color: rgba(255,253,247,0.5);
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .adm-btn-signout:hover { border-color: var(--gold); color: var(--gold); }

  /* MAIN */
  .adm-main { flex: 1; overflow-y: auto; min-width: 0; }
  .adm-topbar {
    background: white;
    border-bottom: 0.5px solid var(--border);
    padding: 0 2rem;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .adm-topbar-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 500;
  }
  .adm-topbar-badge {
    background: rgba(201,168,76,0.1);
    border: 0.5px solid rgba(201,168,76,0.3);
    color: var(--gold-dark);
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 100px;
  }
  .adm-page { padding: 2rem; }

  /* LOADING */
  .adm-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;
    color: var(--espresso-mid);
    gap: 1rem;
  }
  .adm-spinner {
    width: 32px; height: 32px;
    border: 2px solid var(--border);
    border-top-color: var(--gold);
    border-radius: 50%;
    animation: adm-spin 0.8s linear infinite;
  }
  @keyframes adm-spin { to { transform: rotate(360deg); } }

  /* STAT CARDS */
  .adm-stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
    margin-bottom: 2rem;
  }
  .adm-stat-card {
    background: white;
    border: 0.5px solid var(--border);
    border-radius: 16px;
    padding: 1.25rem;
  }
  .adm-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 40px;
    font-weight: 600;
    color: var(--espresso);
    line-height: 1;
  }
  .adm-stat-lbl { font-size: 12px; color: var(--espresso-mid); margin-top: 4px; font-weight: 300; }

  /* TABLE CARD */
  .adm-table-card {
    background: white;
    border: 0.5px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 1.5rem;
  }
  .adm-table-header {
    padding: 1rem 1.5rem;
    border-bottom: 0.5px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .adm-table-title { font-size: 15px; font-weight: 500; color: var(--espresso); }
  .adm-table-wrap { overflow-x: auto; }
  .adm-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .adm-table th {
    text-align: left;
    padding: 10px 16px;
    font-size: 11px;
    font-weight: 500;
    color: var(--espresso-mid);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border-bottom: 0.5px solid var(--border);
    white-space: nowrap;
  }
  .adm-table td {
    padding: 10px 16px;
    border-bottom: 0.5px solid rgba(201,168,76,0.06);
    color: var(--espresso-mid);
    vertical-align: middle;
  }
  .adm-table tr:last-child td { border: none; }
  .adm-table tr:hover td { background: rgba(201,168,76,0.02); }
  .adm-empty { padding: 2rem; text-align: center; color: var(--espresso-mid); font-size: 13px; }

  /* BADGES */
  .adm-badge { display: inline-block; padding: 2px 8px; border-radius: 100px; font-size: 11px; font-weight: 500; }
  .adm-badge-green { background: rgba(76,175,130,0.1); color: #2e7d57; border: 0.5px solid rgba(76,175,130,0.2); }
  .adm-badge-gold { background: rgba(201,168,76,0.1); color: var(--gold-dark); border: 0.5px solid rgba(201,168,76,0.2); }
  .adm-badge-red { background: rgba(229,115,115,0.1); color: #c62828; border: 0.5px solid rgba(229,115,115,0.2); }
  .adm-badge-gray { background: rgba(92,61,34,0.08); color: var(--espresso-mid); border: 0.5px solid rgba(92,61,34,0.1); }

  /* BUTTONS */
  .adm-btn {
    padding: 5px 12px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    border: none;
  }
  .adm-btn-primary { background: var(--espresso); color: var(--ivory); }
  .adm-btn-primary:hover { background: var(--gold-dark); }
  .adm-btn-outline { background: transparent; color: var(--espresso); border: 0.5px solid var(--border) !important; }
  .adm-btn-outline:hover { border-color: var(--gold) !important; color: var(--gold-dark); }
  .adm-btn-danger { background: transparent; color: #c62828; border: 0.5px solid rgba(229,115,115,0.3) !important; }
  .adm-btn-danger:hover { background: rgba(229,115,115,0.08); }
  .adm-btn-link { background: transparent; color: var(--espresso); border: 0.5px solid var(--border) !important; text-decoration: none; display: inline-block; line-height: 1.4; }
  .adm-btn-link:hover { border-color: var(--gold) !important; color: var(--gold-dark); }

  /* TOGGLE */
  .adm-toggle {
    width: 36px; height: 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    position: relative;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .adm-toggle::after {
    content: '';
    position: absolute;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: white;
    top: 2px; right: 2px;
    transition: right 0.2s;
  }
  .adm-toggle.on { background: var(--gold); }
  .adm-toggle.off { background: rgba(92,61,34,0.15); }
  .adm-toggle.off::after { right: 18px; }

  /* FORMS */
  .adm-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
  .adm-form-field label { display: block; font-size: 12px; color: var(--espresso-mid); margin-bottom: 5px; font-weight: 500; }
  .adm-form-field input, .adm-form-field select, .adm-form-field textarea {
    width: 100%;
    padding: 9px 12px;
    border: 0.5px solid var(--border);
    border-radius: 10px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: var(--espresso);
    background: var(--ivory);
    outline: none;
  }
  .adm-form-field input:focus, .adm-form-field select:focus, .adm-form-field textarea:focus {
    border-color: var(--gold);
  }
  .adm-form-body { padding: 1.5rem; }
  .adm-form-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin-top: 1.5rem;
  }
  .adm-toggle-row { display: flex; align-items: center; gap: 8px; margin-bottom: 1.5rem; }
  .adm-toggle-label { font-size: 13px; color: var(--espresso-mid); }

  /* MODAL */
  .adm-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
  .adm-modal {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    width: 100%;
    max-width: 480px;
  }
  .adm-modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 1.5rem;
  }

  /* TOAST */
  .adm-toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: var(--espresso);
    color: var(--ivory);
    padding: 10px 20px;
    border-radius: 100px;
    font-size: 13px;
    z-index: 200;
    animation: adm-fadein 0.2s ease;
  }
  @keyframes adm-fadein { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

  @media (max-width: 768px) {
    .adm-sidebar { display: none; }
    .adm-stats-row { grid-template-columns: repeat(2, 1fr); }
    .adm-form-grid { grid-template-columns: 1fr; }
  }
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (n) => n?.toLocaleString('en-IN') ?? '—';
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN') : '—';

function Badge({ type, children }) {
  const cls = { green: 'adm-badge-green', gold: 'adm-badge-gold', red: 'adm-badge-red', gray: 'adm-badge-gray' }[type] || 'adm-badge-gray';
  return <span className={`adm-badge ${cls}`}>{children}</span>;
}

function Toggle({ on, onChange }) {
  return (
    <button
      className={`adm-toggle ${on ? 'on' : 'off'}`}
      onClick={() => onChange(!on)}
    />
  );
}

function TableCard({ title, action, children, empty }) {
  return (
    <div className="adm-table-card">
      <div className="adm-table-header">
        <div className="adm-table-title">{title}</div>
        {action}
      </div>
      <div className="adm-table-wrap">
        {empty
          ? <div className="adm-empty">No data yet.</div>
          : children}
      </div>
    </div>
  );
}

function StatCard({ num, label }) {
  return (
    <div className="adm-stat-card">
      <div className="adm-stat-num">{num}</div>
      <div className="adm-stat-lbl">{label}</div>
    </div>
  );
}

// ─── Page sections ────────────────────────────────────────────────────────────

function Overview() {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const [{ data: users }, { data: invites }, { data: rsvps }] = await Promise.all([
        supabase.from('couples').select('*'),
        supabase.from('invites').select('*').order('created_at', { ascending: false }),
        supabase.from('rsvps').select('*'),
      ]);
      setData({ users: users || [], invites: invites || [], rsvps: rsvps || [] });
    })();
  }, []);

  if (!data) return <div className="adm-loading"><div className="adm-spinner" /><span>Loading…</span></div>;

  const published = data.invites.filter(i => i.is_published).length;
  const recent = data.invites.slice(0, 10);

  return (
    <div className="adm-page">
      <div className="adm-stats-row">
        <StatCard num={data.users.length} label="Total users" />
        <StatCard num={data.invites.length} label="Invites created" />
        <StatCard num={published} label="Published" />
        <StatCard num={data.rsvps.length} label="Total RSVPs" />
      </div>
      <TableCard title="Recent invites" empty={recent.length === 0}>
        <table className="adm-table">
          <thead>
            <tr><th>Couple</th><th>Theme</th><th>Status</th><th>RSVP</th><th>Created</th></tr>
          </thead>
          <tbody>
            {recent.map(i => {
              const d = i.data || {};
              return (
                <tr key={i.id}>
                  <td>{d.name1 || '—'} &amp; {d.name2 || '—'}</td>
                  <td><Badge type="gold">{i.theme}</Badge></td>
                  <td><Badge type={i.is_published ? 'green' : 'gray'}>{i.is_published ? 'Published' : 'Draft'}</Badge></td>
                  <td>{i.rsvp_enabled ? '✓' : '—'}</td>
                  <td>{fmtDate(i.created_at)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}

function Themes({ toast }) {
  const [themes, setThemes] = useState(null);
  const [modal, setModal] = useState(null); // null | { mode:'add'|'edit', data:{} }

  const load = useCallback(async () => {
    const { data } = await supabase.from('themes').select('*').order('sort_order');
    setThemes(data || []);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleActive = async (id, val) => {
    setThemes(prev => prev.map(t => t.id === id ? { ...t, is_active: val } : t));
    await supabase.from('themes').update({ is_active: val }).eq('id', id);
  };

  const deleteTheme = async (id) => {
    if (!confirm('Delete this theme?')) return;
    await supabase.from('themes').delete().eq('id', id);
    toast('Theme deleted');
    load();
  };

  const saveTheme = async (formData) => {
    const { id, name, category, price, tag } = formData;
    if (!id || !name) { alert('Please fill in theme ID and name'); return; }
    const { error } = await supabase.from('themes').upsert({ id, name, category, price: parseInt(price) || 999, tag, is_active: true });
    if (error) { alert('Error: ' + error.message); return; }
    toast(modal.mode === 'add' ? 'Theme added' : 'Theme updated');
    setModal(null);
    load();
  };

  if (!themes) return <div className="adm-loading"><div className="adm-spinner" /><span>Loading…</span></div>;

  return (
    <div className="adm-page">
      <TableCard
        title="Themes"
        action={<button className="adm-btn adm-btn-primary" onClick={() => setModal({ mode: 'add', data: {} })}>+ Add theme</button>}
        empty={themes.length === 0}
      >
        <table className="adm-table">
          <thead>
            <tr><th>Theme</th><th>Category</th><th>Price</th><th>Tag</th><th>Active</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {themes.map(t => (
              <tr key={t.id}>
                <td><strong>{t.name}</strong></td>
                <td>{t.category}</td>
                <td>₹{fmt(t.price)}</td>
                <td><Badge type="gold">{t.tag}</Badge></td>
                <td><Toggle on={t.is_active} onChange={(v) => toggleActive(t.id, v)} /></td>
                <td style={{ display: 'flex', gap: 6 }}>
                  <button className="adm-btn adm-btn-outline" onClick={() => setModal({ mode: 'edit', data: { ...t } })}>Edit</button>
                  <button className="adm-btn adm-btn-danger" onClick={() => deleteTheme(t.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>

      {modal && (
        <ThemeModal
          mode={modal.mode}
          initial={modal.data}
          onSave={saveTheme}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

function ThemeModal({ mode, initial, onSave, onClose }) {
  const [form, setForm] = useState({
    id: initial.id || '',
    name: initial.name || '',
    category: initial.category || '',
    price: initial.price || '',
    tag: initial.tag || 'Popular',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="adm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="adm-modal">
        <div className="adm-modal-title">{mode === 'add' ? 'Add theme' : 'Edit theme'}</div>
        <div className="adm-form-grid">
          <div className="adm-form-field">
            <label>Theme ID</label>
            <input value={form.id} onChange={e => set('id', e.target.value)} placeholder="e.g. sindoor" disabled={mode === 'edit'} />
          </div>
          <div className="adm-form-field">
            <label>Display name</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Sindoor" />
          </div>
          <div className="adm-form-field">
            <label>Category</label>
            <input value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. North Indian Hindu" />
          </div>
          <div className="adm-form-field">
            <label>Price (₹)</label>
            <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="999" />
          </div>
          <div className="adm-form-field">
            <label>Tag</label>
            <select value={form.tag} onChange={e => set('tag', e.target.value)}>
              <option>Popular</option>
              <option>New</option>
              <option>Premium</option>
              <option>Classic</option>
              <option>Special</option>
            </select>
          </div>
        </div>
        <div className="adm-form-actions">
          <button className="adm-btn adm-btn-outline" onClick={onClose}>Cancel</button>
          <button className="adm-btn adm-btn-primary" onClick={() => onSave(form)}>Save theme</button>
        </div>
      </div>
    </div>
  );
}

function Orders() {
  const [invites, setInvites] = useState(null);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('invites').select('*').order('created_at', { ascending: false });
      setInvites(data || []);
    })();
  }, []);

  if (!invites) return <div className="adm-loading"><div className="adm-spinner" /><span>Loading…</span></div>;

  return (
    <div className="adm-page">
      <TableCard title="All orders" empty={invites.length === 0}>
        <table className="adm-table">
          <thead>
            <tr><th>Couple</th><th>Theme</th><th>Slug</th><th>RSVP</th><th>Published</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {invites.map(i => {
              const d = i.data || {};
              return (
                <tr key={i.id}>
                  <td>{d.name1 || '—'} &amp; {d.name2 || '—'}</td>
                  <td><Badge type="gold">{i.theme}</Badge></td>
                  <td style={{ fontSize: 11, color: 'var(--espresso-mid)' }}>{i.slug || '—'}</td>
                  <td><Badge type={i.rsvp_enabled ? 'green' : 'gray'}>{i.rsvp_enabled ? 'Yes' : 'No'}</Badge></td>
                  <td><Badge type={i.is_published ? 'green' : 'gray'}>{i.is_published ? 'Published' : 'Draft'}</Badge></td>
                  <td>{fmtDate(i.created_at)}</td>
                  <td>
                    {i.slug && (
                      <a href={`/invite/${i.slug}`} target="_blank" rel="noreferrer" className="adm-btn adm-btn-link">
                        View
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}

function Users() {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const [{ data: couples }, { data: invites }] = await Promise.all([
        supabase.from('couples').select('*').order('created_at', { ascending: false }),
        supabase.from('invites').select('couple_id'),
      ]);
      const hasInvite = new Set((invites || []).map(i => i.couple_id));
      setData({ couples: couples || [], hasInvite });
    })();
  }, []);

  if (!data) return <div className="adm-loading"><div className="adm-spinner" /><span>Loading…</span></div>;

  return (
    <div className="adm-page">
      <TableCard title="All users" empty={data.couples.length === 0}>
        <table className="adm-table">
          <thead>
            <tr><th>Email</th><th>Name</th><th>Joined</th><th>Invite</th><th>Admin</th></tr>
          </thead>
          <tbody>
            {data.couples.map(c => (
              <tr key={c.id}>
                <td>{c.email}</td>
                <td>{c.name || '—'}</td>
                <td>{fmtDate(c.created_at)}</td>
                <td><Badge type={data.hasInvite.has(c.id) ? 'green' : 'gray'}>{data.hasInvite.has(c.id) ? 'Yes' : 'No'}</Badge></td>
                <td>{c.is_admin ? <Badge type="gold">Admin</Badge> : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}

function Coupons({ toast }) {
  const [coupons, setCoupons] = useState(null);
  const [modal, setModal] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
    setCoupons(data || []);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleCoupon = async (id, val) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, is_active: val } : c));
    await supabase.from('coupons').update({ is_active: val }).eq('id', id);
  };

  const deleteCoupon = async (id) => {
    if (!confirm('Delete this coupon?')) return;
    await supabase.from('coupons').delete().eq('id', id);
    toast('Coupon deleted');
    load();
  };

  const saveCoupon = async ({ code, type, value, max }) => {
    if (!code || !value) { alert('Please fill in all fields'); return; }
    const { error } = await supabase.from('coupons').insert({
      code: code.toUpperCase(),
      discount_type: type,
      discount_value: parseInt(value) || 0,
      max_uses: parseInt(max) || 100,
    });
    if (error) { alert('Error: ' + error.message); return; }
    toast('Coupon created');
    setModal(false);
    load();
  };

  if (!coupons) return <div className="adm-loading"><div className="adm-spinner" /><span>Loading…</span></div>;

  return (
    <div className="adm-page">
      <TableCard
        title="Coupons"
        action={<button className="adm-btn adm-btn-primary" onClick={() => setModal(true)}>+ Add coupon</button>}
        empty={coupons.length === 0}
      >
        <table className="adm-table">
          <thead>
            <tr><th>Code</th><th>Discount</th><th>Used</th><th>Max uses</th><th>Active</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.id}>
                <td><strong>{c.code}</strong></td>
                <td>{c.discount_type === 'percent' ? `${c.discount_value}%` : `₹${c.discount_value}`}</td>
                <td>{c.used_count}</td>
                <td>{c.max_uses}</td>
                <td><Toggle on={c.is_active} onChange={(v) => toggleCoupon(c.id, v)} /></td>
                <td><button className="adm-btn adm-btn-danger" onClick={() => deleteCoupon(c.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>

      {modal && <CouponModal onSave={saveCoupon} onClose={() => setModal(false)} />}
    </div>
  );
}

function CouponModal({ onSave, onClose }) {
  const [form, setForm] = useState({ code: '', type: 'percent', value: '', max: '100' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="adm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="adm-modal">
        <div className="adm-modal-title">Add coupon</div>
        <div className="adm-form-grid">
          <div className="adm-form-field">
            <label>Coupon code</label>
            <input value={form.code} onChange={e => set('code', e.target.value)} placeholder="e.g. VOWITE20" />
          </div>
          <div className="adm-form-field">
            <label>Discount type</label>
            <select value={form.type} onChange={e => set('type', e.target.value)}>
              <option value="percent">Percent (%)</option>
              <option value="flat">Flat (₹)</option>
            </select>
          </div>
          <div className="adm-form-field">
            <label>Discount value</label>
            <input type="number" value={form.value} onChange={e => set('value', e.target.value)} placeholder="20" />
          </div>
          <div className="adm-form-field">
            <label>Max uses</label>
            <input type="number" value={form.max} onChange={e => set('max', e.target.value)} placeholder="100" />
          </div>
        </div>
        <div className="adm-form-actions">
          <button className="adm-btn adm-btn-outline" onClick={onClose}>Cancel</button>
          <button className="adm-btn adm-btn-primary" onClick={() => onSave(form)}>Save coupon</button>
        </div>
      </div>
    </div>
  );
}

function DoneForYou() {
  // DFY requests come via Formspree (contact form) — no DB table yet.
  // Shows a helpful placeholder until a dfy_orders table is added.
  return (
    <div className="adm-page">
      <div className="adm-table-card">
        <div className="adm-table-header">
          <div className="adm-table-title">Done-for-you orders</div>
        </div>
        <div className="adm-empty" style={{ padding: '3rem' }}>
          <div style={{ fontSize: 32, marginBottom: '0.75rem' }}>✍️</div>
          <div style={{ fontWeight: 500, marginBottom: '0.5rem', color: 'var(--espresso)' }}>No DFY orders table yet</div>
          <div style={{ fontSize: 12, maxWidth: 340, margin: '0 auto', lineHeight: 1.6 }}>
            Currently DFY requests arrive via the contact form (Formspree xykozdzq).
            To track them here, create a <code>dfy_orders</code> table in Supabase with columns:
            <br /><code>id, name, email, theme, package, notes, status, created_at</code>
            <br />and update the contact form to also insert a row.
          </div>
        </div>
      </div>
    </div>
  );
}

function Revenue() {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const [{ data: invites }, { data: themes }] = await Promise.all([
        supabase.from('invites').select('*').eq('is_published', true),
        supabase.from('themes').select('id,price'),
      ]);
      const priceMap = Object.fromEntries((themes || []).map(t => [t.id, t.price]));
      let total = 0, rsvpTotal = 0;
      const byTheme = {};
      (invites || []).forEach(i => {
        const base = priceMap[i.theme] || 999;
        const rsvp = i.rsvp_enabled ? 999 : 0;
        total += base + rsvp;
        if (i.rsvp_enabled) rsvpTotal += 999;
        if (!byTheme[i.theme]) byTheme[i.theme] = { count: 0, rev: 0 };
        byTheme[i.theme].count++;
        byTheme[i.theme].rev += base + rsvp;
      });
      setData({ invites: invites || [], total, rsvpTotal, byTheme });
    })();
  }, []);

  if (!data) return <div className="adm-loading"><div className="adm-spinner" /><span>Loading…</span></div>;

  return (
    <div className="adm-page">
      <div className="adm-stats-row">
        <StatCard num={`₹${fmt(data.total)}`} label="Total revenue" />
        <StatCard num={data.invites.length} label="Paid invites" />
        <StatCard num={`₹${fmt(data.rsvpTotal)}`} label="RSVP add-ons" />
        <StatCard num="₹0" label="Done-for-you" />
      </div>
      <TableCard title="Revenue by theme" empty={Object.keys(data.byTheme).length === 0}>
        <table className="adm-table">
          <thead>
            <tr><th>Theme</th><th>Invites sold</th><th>Revenue</th></tr>
          </thead>
          <tbody>
            {Object.entries(data.byTheme).map(([theme, d]) => (
              <tr key={theme}>
                <td><Badge type="gold">{theme}</Badge></td>
                <td>{d.count}</td>
                <td>₹{fmt(d.rev)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}

function Announcement({ toast }) {
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('themes').select('*').eq('id', '__announcement__').single();
      if (data) {
        setText(data.name || '');
        setLink(data.category || '');
        setActive(data.is_active || false);
      }
      setLoaded(true);
    })();
  }, []);

  const save = async () => {
    await supabase.from('themes').upsert({
      id: '__announcement__',
      name: text,
      category: link,
      is_active: active,
      price: 0,
      tag: '',
      sort_order: 999,
    });
    toast('Announcement saved!');
  };

  if (!loaded) return <div className="adm-loading"><div className="adm-spinner" /><span>Loading…</span></div>;

  return (
    <div className="adm-page">
      <div className="adm-table-card">
        <div className="adm-table-header">
          <div className="adm-table-title">Announcement banner</div>
        </div>
        <div className="adm-form-body">
          <div className="adm-form-field" style={{ marginBottom: '1rem' }}>
            <label>Banner message</label>
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="e.g. New Keerthana theme is live! 🎉"
            />
          </div>
          <div className="adm-form-field" style={{ marginBottom: '1rem' }}>
            <label>Link (optional)</label>
            <input
              value={link}
              onChange={e => setLink(e.target.value)}
              placeholder="https://vowite.vercel.app/themes/keerthana"
            />
          </div>
          <div className="adm-toggle-row">
            <Toggle on={active} onChange={setActive} />
            <span className="adm-toggle-label">Show banner on site</span>
          </div>
          <button className="adm-btn adm-btn-primary" onClick={save}>Save announcement</button>
        </div>
      </div>
    </div>
  );
}

// ─── Nav config ───────────────────────────────────────────────────────────────
const NAV = [
  { id: 'overview',  icon: '📊', label: 'Overview' },
  { id: 'themes',    icon: '🎨', label: 'Themes' },
  { id: 'orders',    icon: '📋', label: 'Orders' },
  { id: 'users',     icon: '👥', label: 'Users' },
  { id: 'coupons',   icon: '🎟', label: 'Coupons' },
  { id: 'dfy',       icon: '✍️', label: 'Done for you' },
  { id: 'revenue',   icon: '💰', label: 'Revenue' },
  { id: 'announce',  icon: '📢', label: 'Announcement' },
];

// ─── Root component ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [toast, setToastMsg] = useState(null);

  // Auth + admin check
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace('/auth'); return; }
      const { data: couple } = await supabase.from('couples').select('is_admin').eq('id', session.user.id).single();
      if (!couple?.is_admin) { router.replace('/'); return; }
      setReady(true);
    })();
  }, [router]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  const currentNav = NAV.find(n => n.id === activeTab);

  // Inject styles client-side only — avoids Next.js SSR hydration mismatch
  useEffect(() => {
    const el = document.createElement('style');
    el.id = 'adm-styles';
    el.textContent = css;
    if (!document.getElementById('adm-styles')) document.head.appendChild(el);
    return () => { document.getElementById('adm-styles')?.remove(); };
  }, []);

  if (!ready) {
    return (
      <div className="adm-root">
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="adm-loading">
            <div className="adm-spinner" />
            <span>Verifying access…</span>
          </div>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'overview':  return <Overview />;
      case 'themes':    return <Themes toast={showToast} />;
      case 'orders':    return <Orders />;
      case 'users':     return <Users />;
      case 'coupons':   return <Coupons toast={showToast} />;
      case 'dfy':       return <DoneForYou />;
      case 'revenue':   return <Revenue />;
      case 'announce':  return <Announcement toast={showToast} />;
      default:          return null;
    }
  };

  return (
    <>
      <div className="adm-root">

        {/* SIDEBAR */}
        <div className="adm-sidebar">
          <div className="adm-sidebar-logo">
            <a href="/"><img src="/images/logo-white.png" alt="Vowite" /></a>
          </div>
          <nav className="adm-sidebar-nav">
            {NAV.map(n => (
              <div
                key={n.id}
                className={`adm-nav-item${activeTab === n.id ? ' active' : ''}`}
                onClick={() => setActiveTab(n.id)}
              >
                <span className="adm-nav-icon">{n.icon}</span>
                {n.label}
              </div>
            ))}
          </nav>
          <div className="adm-sidebar-footer">
            <button className="adm-btn-signout" onClick={signOut}>Sign out</button>
          </div>
        </div>

        {/* MAIN */}
        <div className="adm-main">
          <div className="adm-topbar">
            <div className="adm-topbar-title">{currentNav?.label}</div>
            <div className="adm-topbar-badge">Admin</div>
          </div>
          {renderPage()}
        </div>

      </div>

      {toast && <div className="adm-toast">{toast}</div>}
    </>
  );
}