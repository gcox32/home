export function calculateReadTime(content: string, imageCount: number = 0): number {
  // Strip HTML tags and get raw text
  const text = content.replace(/<[^>]*>/g, '');
  
  // Count words (split by whitespace)
  const words = text.trim().split(/\s+/).length;
  
  // Calculate base reading time (words / 200 words per minute)
  const readingTime = words / 200;
  
  // Count code blocks
  const codeBlocks = (content.match(/<pre[^>]*>/g) || []).length;
  
  // Add time for images and code blocks
  const imageTime = imageCount * 0.2; // 12 seconds = 0.2 minutes per image
  const codeTime = codeBlocks * 1; // 1 minute per code block
  
  // Return total minutes rounded up
  return Math.ceil(readingTime + imageTime + codeTime);
} 