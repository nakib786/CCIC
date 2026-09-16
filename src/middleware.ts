import { NextResponse, type NextRequest } from "next/server";

// Next.js 16 deprecated the `middleware` file/export name in favor of
// `proxy` (see node_modules/next/dist/docs/.../file-conventions/proxy.md).
// Not migrated yet: this site deploys via vinext (a beta Cloudflare
// adapter), and its compatibility with the new `proxy` convention hasn't
// been verified — revisit once vinext confirms support or this warning
// becomes a hard error.

// Domain migration: theccic.ca is now the canonical domain (see SITE_URL in
// @/lib/site) but new.theccic.ca stays live and pointed at this same Worker
// (see wrangler.jsonc routes) purely to 301 every request over to the new
// domain — this is what carries indexed pages/backlinks/AI citations of the
// subdomain over cleanly instead of breaking them.
const OLD_HOST = "new.theccic.ca";
const NEW_ORIGIN = "https://theccic.ca";

// Advertise machine-readable discovery docs via the HTTP Link header (RFC
// 8288) so agents that never parse HTML can still find them. This has to be
// set in middleware rather than next.config.ts's headers() — on vinext
// (the Cloudflare adapter this site builds with), the config-headers step
// silently drops this value on any page that also gets a framework-injected
// Link header (e.g. the homepage's CSS preload link); confirmed locally via
// `vinext build` + `wrangler dev` that / lost it while /about/ (no
// competing Link header) kept it. Setting it in middleware instead avoids
// that code path entirely.
export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  if (host === OLD_HOST) {
    const target = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, NEW_ORIGIN);
    return NextResponse.redirect(target, 301);
  }

  const response = NextResponse.next();
  response.headers.append("Link", '</llms.txt>; rel="llms.txt", </sitemap.xml>; rel="sitemap"');
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
