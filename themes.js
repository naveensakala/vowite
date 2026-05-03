// Shared theme loader — fetches from Supabase and caches
window.vowiteThemes = null;

async function loadThemes() {
  if (window.vowiteThemes) return window.vowiteThemes;
  const SUPABASE_URL = 'https://kopmbvpvgclrnchrdpty.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcG1idnB2Z2Nscm5jaHJkcHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1Njg5MDMsImV4cCI6MjA5MzE0NDkwM30.xFt_YA109wDqI6KOIXHWC4Xy2WdNO5Tnacd2_jO4MP4';
  const res = await fetch(`${SUPABASE_URL}/rest/v1/themes?select=*&is_active=eq.true&order=sort_order`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  const data = await res.json();
  window.vowiteThemes = {};
  (data || []).forEach(t => { window.vowiteThemes[t.id] = t; });
  return window.vowiteThemes;
}