import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOT static export: the site needs live server-side data (Wix Events,
  // board members, donation total) and a real server endpoint for the
  // Arabic Classes form submission (which needs WIX_CLIENT_SECRET to stay
  // server-side, never shipped to the browser). vinext/Workers deploys this
  // as a real server, so default (non-"export") output is correct here.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "static.wixstatic.com" }],
  },
  trailingSlash: true,
};

export default nextConfig;
