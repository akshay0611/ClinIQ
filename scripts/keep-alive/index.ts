import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

async function keepAlive(): Promise<void> {
  // 1. Read check
  const { data: readData, error: readError } = await supabase
    .from('keep_alive')
    .select('count')
    .limit(1);

  if (readError) {
    console.error('Read check failed:', readError.message);
    process.exit(1);
  }
  console.log('Read check passed:', readData);

  // 2. Heartbeat write
  const { data: writeData, error: writeError } = await supabase
    .from('keep_alive')
    .insert({ source: 'github-actions' })
    .select()
    .single();

  if (writeError) {
    console.error('Heartbeat write failed:', writeError.message);
    process.exit(1);
  }
  console.log('Heartbeat written:', writeData);
}

keepAlive();
