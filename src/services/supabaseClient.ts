import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url?: string) => {
  try {
    return Boolean(url && url.startsWith('http') && !url.includes('YOUR_SUPABASE_URL'));
  } catch {
    return false;
  }
};

const supabaseUrl = isValidUrl(rawUrl)
  ? rawUrl!
  : 'https://placeholder.supabase.co';

const supabaseKey = (rawKey && !rawKey.includes('YOUR_SUPABASE_ANON_KEY'))
  ? rawKey
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MjAwMDAwMDAwMH0.dummykey';

if (!isValidUrl(rawUrl)) {
  console.warn("ClinIQ Notice: VITE_SUPABASE_URL is missing or using placeholder in .env. Running in demo mode.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
