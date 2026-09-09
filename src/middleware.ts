import { NextResponse } from "next/server";

// Advertise machine-readable discovery docs via the HTTP Link header (RFC
// 8288) so agents that never parse HTML can still find them. This has to be
// set in middleware rather than next.config.ts's headers() — on vinext
// (the Cloudflare adapter this site builds with), the config-headers step
// silently drops this value on any page that also gets a framework-injected
// Link header (e.g. the homepage's CSS preload link); confirmed locally via
// `vinext build` + `wrangler dev` that / lost it while /about/ (no
// competing Link header) kept it. Setting it in middleware instead avoids
// that code path entirely.
export function middleware() {
  const response = NextResponse.next();
  response.headers.append("Link", '</llms.txt>; rel="llms.txt", </sitemap.xml>; rel="sitemap"');
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
