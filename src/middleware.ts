import { NextResponse } from "next/server";

// Next.js 16 deprecated the `middleware` file/export name in favor of
// `proxy` (see node_modules/next/dist/docs/.../file-conventions/proxy.md).
// Not migrated yet: this site deploys via vinext (a beta Cloudflare
// adapter), and its compatibility with the new `proxy` convention hasn't
// been verified — revisit once vinext confirms support or this warning
// becomes a hard error.

// Domain migration to theccic.ca is prepared but not cut over yet (DNS on
// theccic.ca still points at the old Wix site) — new.theccic.ca stays the
// working domain for now. Re-add the new.theccic.ca -> theccic.ca 301 (see
// git history around the "prepare theccic.ca domain cutover" commit) once
// DNS is actually flipped.

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
