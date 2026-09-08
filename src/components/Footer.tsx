import Link from "next/link";
import Image from "next/image";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import SubscribeForm from "@/components/SubscribeForm";

export default function Footer() {
  return (
    <footer className="footer-one">
      <div className="container">
        <div className="inner-box">
          <div className="logo">
            <Link href="/"><Image src="/assets/images/BCMA_Logo.jpg" alt="BCMA logo" width={200} height={200} /></Link>
          </div>
          <p className="text">
            Central Cariboo Islamic Center is a chapter of the BC Muslim Association, dedicated to fostering
            unity, faith and service in Williams Lake and the Cariboo region.
          </p>
          <ul className="menu-list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about/">About</Link></li>
            <li><Link href="/events/">Events</Link></li>
            <li><Link href="/gallery/">Gallery</Link></li>
            <li><Link href="/donate/">Donate</Link></li>
            <li><Link href="/contact/">Contact</Link></li>
          </ul>
          <ul className="social-list">
            <li>
              <a href="https://www.facebook.com/williamslakemuslims/" target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/ccic_bcma/" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </a>
            </li>
          </ul>
          <SubscribeForm />
        </div>
      </div>
      <div className="bottom-bar">
        <div className="container">
          <p className="copyright-text">
            © {new Date().getFullYear()} <Link href="/">Central Cariboo Islamic Center</Link> — BC Muslim Association. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
