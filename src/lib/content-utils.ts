/**
 * Content Utilities
 * Helper functions for processing Strapi content
 */

// Extract plain text from Strapi blocks JSON
export function extractTextFromBlocks(blocks: unknown): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  const texts: string[] = [];

  for (const block of blocks) {
    if (typeof block === 'object' && block !== null) {
      const b = block as Record<string, unknown>;
      
      // Extract from children array
      if (Array.isArray(b.children)) {
        for (const child of b.children) {
          if (typeof child === 'object' && child !== null) {
            const c = child as Record<string, unknown>;
            if (typeof c.text === 'string') {
              texts.push(c.text);
            }
          }
        }
      }
    }
  }

  return texts.join(' ').trim();
}

// Truncate text to specified length
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}
