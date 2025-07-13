import * as cheerio from "cheerio";

export async function scrapeBlog(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0", // helps bypass some anti-bot protections
      },
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    let content = "";

    // Prefer article tag
    if ($("article").length > 0) {
      content = $("article").text();
    } else {
      // fallback: try getting meaningful paragraphs
      const paragraphs = $("p")
        .map((_, el) => $(el).text())
        .get()
        .filter((text) => text.length > 50); // filter out very short texts like footers
      content = paragraphs.join("\n\n");
    }

    return content.trim();
  } catch (error) {
    console.error("❌ Failed to scrape:", error);
    return "Failed to scrape blog.";
  }
}
