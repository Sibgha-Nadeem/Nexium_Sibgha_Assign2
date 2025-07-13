export function fakeSummary(text: string): string {
  if (!text) return "No content to summarize.";

  const sentences = text.split(/[.?!]\s/); // split by sentence
  const summary = sentences.slice(0, 3).join(". ") + "."; // first 3 sentences
  return summary;
}
