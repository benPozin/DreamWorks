import { createClient } from "@supabase/supabase-js";

// These come from your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// One shared connection for the whole app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
