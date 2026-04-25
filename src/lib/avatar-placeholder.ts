import "server-only";
import { getPlaiceholder } from "plaiceholder";

const fallbackBlur =
  "data:image/gif;base64,R0lGODlhAQABAPAAADMzM////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";

export async function getAvatarBlurDataURL(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return fallbackBlur;
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch {
    return fallbackBlur;
  }
}
