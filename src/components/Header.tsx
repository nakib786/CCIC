"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/events/", label: "Events" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/donate/", label: "Donate" },
];

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function NavList({ pathname, onLinkClick }: { pathname: string; onLinkClick?: () => void }) {
  return (
    <ul className="navigation clearfix">
      {NAV_LINKS.map((link) => (
        <li key={link.href} className={isCurrent(pathname, link.href) ? "current" : ""}>
          <Link href={link.href} onClick={onLinkClick}>{link.label}</Link>
        </li>
      ))}
      <li className="dropdown">
        <a href="#">Resources</a>
        <ul>
          <li><a href="http://quran.williamslakemuslims.ca" target="_blank" rel="noopener noreferrer">Qur&apos;an Recitations</a></li>
          <li><Link href="/about/#arabic-classes" onClick={onLinkClick}>Arabic Classes</Link></li>
        </ul>
        <div className="dropdown-btn"><i className="fa fa-angle-down"></i></div>
      </li>
      <li className={isCurrent(pathname, "/contact/") ? "current" : ""}>
        <Link href="/contact/" onClick={onLinkClick}>Contact</Link>
      </li>
    </ul>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-visible", mobileOpen);
  }, [mobileOpen]);

  // Close the mobile menu on navigation. Adjusted during render (React's
  // documented pattern for "reset state when a prop changes") rather than in
  // an effect, so it doesn't trigger a cascading extra render.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <header className="main-header header-style-one">
      <div className="outer-container">
        <div className="header-lower">
          <div className="inner-container">
            <div className="main-box">
              <div className="logo-box">
                <div className="logo">
                  <Link href="/">
                    <Image src="/assets/images/BCMA_Logo.jpg" alt="BC Muslim Association — Central Cariboo Islamic Center" width={200} height={200} priority />
                  </Link>
                </div>
              </div>
              <div className="nav-outer">
                <nav className="nav main-menu">
                  <NavList pathname={pathname} />
                </nav>
              </div>
              <div className="action-box">
                <div className="contact-widget">
                  <a href="https://www.google.com/maps/search/?api=1&query=1000+Huckvale+Pl%2C+Williams+Lake%2C+BC+V2G+4L2" target="_blank" rel="noopener noreferrer">
                    <i className="icon fa-solid fa-location-dot"></i> <span>1000 Huckvale Pl, Williams Lake</span>
                  </a>
                  <a href="mailto:cariboo.secretary@thebcma.com">
                    <i className="icon fa-solid fa-envelope"></i> <span>cariboo.secretary@thebcma.com</span>
                  </a>
                </div>
                <Link href="/donate/" className="btn-style-five">Donate Now</Link>
                <div className="mobile-nav-toggler" onClick={() => setMobileOpen(true)}>
                  <div className="shape-line-img"><i className="fas fa-bars"></i></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu">
        <div className="menu-backdrop" onClick={() => setMobileOpen(false)}></div>
        <nav className="menu-box">
          <div className="upper-box">
            <div className="nav-logo">
              <Link href="/"><Image src="/assets/images/BCMA_Logo.jpg" alt="BCMA logo" width={160} height={160} /></Link>
            </div>
            <div className="close-btn" onClick={() => setMobileOpen(false)}><i className="icon fa fa-times"></i></div>
          </div>
          <NavList pathname={pathname} onLinkClick={() => setMobileOpen(false)} />
          <ul className="contact-list-one">
            <li>
              <i className="icon fa-solid fa-envelope"></i>
              <span className="title">Send Email</span>
              <div className="text"><a href="mailto:cariboo.secretary@thebcma.com">cariboo.secretary@thebcma.com</a></div>
            </li>
          </ul>
          <ul className="social-links">
            <li>
              <a href="https://www.facebook.com/williamslakemuslims/" target="_blank" rel="noopener noreferrer">
                <FacebookIcon className="icon" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/ccic_bcma/" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="icon" />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sticky Header */}
      <div className={`sticky-header${scrolled ? " fixed-header" : ""}`}>
        <div className="auto-container">
          <div className="inner-container">
            <div className="logo">
              <Link href="/"><Image src="/assets/images/BCMA_Logo.jpg" alt="BCMA logo" width={160} height={160} /></Link>
            </div>
            <div className="nav-outer">
              <nav className="main-menu">
                <div className="navbar-collapse show collapse clearfix">
                  <NavList pathname={pathname} />
                </div>
              </nav>
              <div className="mobile-nav-toggler" onClick={() => setMobileOpen(true)}>
                <span className="icon lnr-icon-bars"><i className="fas fa-bars"></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
