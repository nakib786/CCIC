// Server-only Instagram API (with Instagram Login) client. Pulls every
// video/Reel from the CCIC Instagram Business account directly, so new
// uploads show up on the gallery automatically with no manual URL list to
// keep updating — unlike a plain oEmbed of hand-picked post links.
//
// Uses cache: "no-store" (matching wixFetch in wix.ts) rather than a
// revalidate window: this keeps the gallery page dynamic (server-rendered
// per request) instead of statically prerendered at build time. A static
// page would freeze whatever this call returned at build time into the HTML
// forever — including an empty [] if the build environment's network/DNS
// can't reach graph.instagram.com, which silently hides the section with no
// way to recover short of a full rebuild from a working environment.
//
// This uses "Instagram API with Instagram Login" (app dashboard: Instagram >
// API setup with Instagram login), NOT the older Facebook-Login-based
// Instagram Graph API — the two use different token types and host URLs.
// Requests here MUST go to graph.instagram.com, not graph.facebook.com, or
// every call fails with "Invalid OAuth access token - Cannot parse access
// token" even though the token itself is valid.
//
// Setup required (one-time, outside this codebase, done via the Meta App
// Dashboard's "API setup with Instagram login" flow):
//   1. Add the @ccic_bcma Instagram account as an Instagram Tester on the
//      app, and accept that invite from the Instagram account itself
//      (Settings > Apps and websites > Tester Invites).
//   2. Generate a long-lived access token for that account from
//      "2. Generate access tokens" in the same dashboard page.
//   3. Set INSTAGRAM_ACCESS_TOKEN (the long-lived token) and INSTAGRAM_USER_ID
//      (the Instagram-scoped user id shown next to the account) as server
//      secrets.
//   4. Long-lived tokens expire after ~60 days — refresh before expiry via
//      GET https://graph.instagram.com/refresh_access_token
//        ?grant_type=ig_refresh_token&access_token=<CURRENT_LONG_LIVED_TOKEN>
import "server-only";

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const USER_ID = process.env.INSTAGRAM_USER_ID;
const GRAPH_API_VERSION = "v21.0";

export type InstagramVideo = {
  id: string;
  caption?: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  timestamp: string;
};

type GraphMediaItem = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

/**
 * Every video and Reel currently on the account (Reels report
 * media_type "VIDEO" too, just with media_product_type "REELS"). Returns []
 * — rather than throwing — when the integration isn't configured yet or the
 * API call fails, so the gallery page simply omits the section.
 */
export async function getInstagramVideos(): Promise<InstagramVideo[]> {
  if (!ACCESS_TOKEN || !USER_ID) return [];

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const url = `https://graph.instagram.com/${GRAPH_API_VERSION}/${USER_ID}/media?fields=${fields}&access_token=${ACCESS_TOKEN}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.error(`Instagram Graph API failed: ${res.status} ${await res.text()}`);
      return [];
    }

    const data = (await res.json()) as { data: GraphMediaItem[] };
    return data.data
      .filter((item) => item.media_type === "VIDEO")
      .map((item) => ({
        id: item.id,
        caption: item.caption,
        mediaUrl: item.media_url,
        thumbnailUrl: item.thumbnail_url,
        permalink: item.permalink,
        timestamp: item.timestamp,
      }));
  } catch (err) {
    console.error("Instagram Graph API request failed:", err);
    return [];
  }
}
