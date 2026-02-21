import { LingoDotDevEngine } from "lingo.dev/sdk";

const apiKey = import.meta.env.VITE_LINGODOTDEV_API_KEY;

if (!apiKey) {
  console.warn("Lingo.dev API key not found in environment variables.");
}

export const lingo = new LingoDotDevEngine({
  apiKey: apiKey || "",
});
