import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function saveToSupabase(url: string, summary: string) {
  const { error } = await supabase.from("summaries").insert([
    {
      url,
      summary,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Supabase Error:", error);
    throw error;
  }
}
