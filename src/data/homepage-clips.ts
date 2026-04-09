// Auto-generated clip manifest for homepage video grid
// 54 clips compressed to 720p, no audio, max 12s each
const TOTAL_CLIPS = 50;

export const homepageClips: string[] = Array.from(
  { length: TOTAL_CLIPS },
  (_, i) => `/videos/clip-${String(i + 1).padStart(3, "0")}.mp4`
);

// Shuffle utility (Fisher-Yates)
export function shuffleClips(clips: string[]): string[] {
  const arr = [...clips];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
