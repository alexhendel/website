export async function loadMarkdownContent(
  locale: string,
  fileName: string
): Promise<string> {
  const response = await fetch(`/locales/${locale}/${fileName}.md`);
  if (!response.ok) {
    throw new Error(`Failed to load markdown file: ${fileName}`);
  }
  return await response.text();
}

export const markdownKeys = {
  all: ["markdown"] as const,
  content: (locale: string, fileName: string) =>
    [...markdownKeys.all, locale, fileName] as const,
};
