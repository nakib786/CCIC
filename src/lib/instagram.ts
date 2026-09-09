// Server-only Instagram API (with Instagram Login) client. Pulls every
// photo and video/Reel from the CCIC Instagram Business account directly, so
// new uploads show up on the gallery automatically with no manual URL list
// to keep updating.
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

export type InstagramPhoto = {
  id: string;
  caption?: string;
  mediaUrl: string;
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

// Next.js dedupes identical fetch() calls (same URL) made during the same
// request, so getInstagramVideos() and getInstagramPhotos() calling this
// separately still only hits the Graph API once per page load.
async function fetchInstagramMedia(): Promise<GraphMediaItem[]> {
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
    return data.data ?? [];
  } catch (err) {
    console.error("Instagram Graph API request failed:", err);
    return [];
  }
}

/**
 * Every video and Reel currently on the account (Reels report
 * media_type "VIDEO" too, just with media_product_type "REELS"). Returns []
 * — rather than throwing — when the integration isn't configured yet or the
 * API call fails, so the gallery page simply omits the section.
 */
export async function getInstagramVideos(): Promise<InstagramVideo[]> {
  const media = await fetchInstagramMedia();
  return media
    .filter((item) => item.media_type === "VIDEO")
    .map((item) => ({
      id: item.id,
      caption: item.caption,
      mediaUrl: item.media_url,
      thumbnailUrl: item.thumbnail_url,
      permalink: item.permalink,
      timestamp: item.timestamp,
    }));
}

/**
 * Every photo post currently on the account, including multi-photo carousel
 * posts (shown via their cover image) — excludes videos/Reels. Skips any
 * item missing media_url rather than showing a broken image (this can
 * happen for the same copyright reasons documented on getInstagramVideos).
 */
export async function getInstagramPhotos(): Promise<InstagramPhoto[]> {
  const media = await fetchInstagramMedia();
  return media
    .filter((item) => (item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM") && item.media_url)
    .map((item) => ({
      id: item.id,
      caption: item.caption,
      mediaUrl: item.media_url,
      permalink: item.permalink,
      timestamp: item.timestamp,
    }));
}
