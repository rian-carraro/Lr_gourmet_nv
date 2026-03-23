
const SUPABASE_URL = 'https://cqulylfnlavpgpmyzjev.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdWx5bGZubGF2cGdwbXl6amV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjc5OTUsImV4cCI6MjA4OTg0Mzk5NX0.mqUDphkH3oOXkvfVbEVZadaXPUDj5sBQLY7y25DYMlU';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

export default db;
