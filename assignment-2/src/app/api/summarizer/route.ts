// app/api/summarize/route.ts

import { NextRequest, NextResponse } from "next/server";
import { scrapeBlog } from "@/lib/scrape";
import { fakeSummary } from "@/lib/summarize";
import { translateToUrdu } from "@/lib/translate";
import { saveToMongo } from "@/lib/mongo";
import { saveToSupabase } from "@/lib/supabase";


export async function POST(req: NextRequest) {
  try {
    console.log("✅ API HIT");
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // 1. Scrape the blog text
    const blogText = await scrapeBlog(url);
    if (!blogText) {
  return NextResponse.json({ error: "No blog content found" }, { status: 400 });
}

    // 2. Generate a fake summary from blog text
      // 5. Return the translated summary
const englishSummary = fakeSummary(blogText);            // English summary
const urduSummary = translateToUrdu(englishSummary);     // Urdu translation with your dictionary

    // 4. Save to databases
    await saveToMongo({ url, blogText });
    await saveToSupabase(url, urduSummary);

return NextResponse.json({
  summary: englishSummary,
  translation: urduSummary,
});


  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Failed to summarize" }, { status: 500 });
  }
}
