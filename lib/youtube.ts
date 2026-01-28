import { YoutubeTranscript } from "youtube-transcript";

// Theo's YouTube channel - only videos from this channel are allowed
export const THEO_CHANNEL_HANDLE = "@t3dotgg";
export const THEO_CHANNEL_NAME = "Theo - t3․gg";

export function extractVideoId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /^[a-zA-Z0-9_-]{11}$/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return match[1] || match[0];
        }
    }
    return null;
}

export function getYouTubeThumbnail(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export async function getYouTubeTranscript(videoId: string): Promise<string> {
    try {
        const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
        return transcriptItems.map((item) => item.text).join(" ");
    } catch (error) {
        console.error("Error fetching transcript:", error);
        throw new Error(
            "Could not fetch transcript. Make sure the video has captions enabled."
        );
    }
}

export async function getVideoMetadata(videoId: string): Promise<{ title: string; authorName: string; authorUrl: string }> {
    // Use oEmbed API to get video title and author info (no API key required)
    try {
        const response = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );

        if (!response.ok) {
            throw new Error("Could not fetch video metadata");
        }

        const data = await response.json();
        return {
            title: data.title,
            authorName: data.author_name || "",
            authorUrl: data.author_url || ""
        };
    } catch (error) {
        console.error("Error fetching video metadata:", error);
        return { title: "Untitled Video", authorName: "", authorUrl: "" };
    }
}

// Check if the video is from Theo's channel
export function isTheoChannel(authorUrl: string): boolean {
    // Theo's channel URL patterns
    const theoPatterns = [
        /youtube\.com\/@t3dotgg/i,
        /youtube\.com\/c\/t3dotgg/i,
        /youtube\.com\/channel\/UCbRP3c757lWg9M-U7TyEkXA/i, // Theo's channel ID
    ];

    return theoPatterns.some(pattern => pattern.test(authorUrl));
}
