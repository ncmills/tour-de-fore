import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

export const supabase =
  url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
