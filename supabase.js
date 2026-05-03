const SUPABASE_URL = 'https://kopmbvpvgclrnchrdpty.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcG1idnB2Z2Nscm5jaHJkcHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1Njg5MDMsImV4cCI6MjA5MzE0NDkwM30.xFt_YA109wDqI6KOIXHWC4Xy2WdNO5Tnacd2_jO4MP4';

const supabaseScript = document.createElement('script');
supabaseScript.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
supabaseScript.onload = () => {
  window.sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  if(window.onSupabaseReady) window.onSupabaseReady();
};
document.head.appendChild(supabaseScript);