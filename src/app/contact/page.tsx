import type { Metadata } from "next";
import Link from "next/link";
import HomeContactForm from "@/components/HomeContactForm";
import { InstagramIcon } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Central Cariboo Islamic Center in Williams Lake, BC.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="h1">Contact Us</div>
          <div className="breadcrumb-nav"><Link href="/">Home</Link> <i className="fa-solid fa-angle-right"></i> Contact</div>
        </div>
      </section>

      <section className="contact-section pt-120 pb-120">
        <div className="outer-container">
          <div className="container">
            <div className="row g-0">
              <div className="col-lg-5 content-column">
                <div className="inner-column">
                  <div className="sec-title mb-40">
                    <span className="sub-title section-eyebrow">Get In Touch</span>
                    <div className="h2 title">We&apos;d Love to Hear From You</div>
                  </div>
                  <div className="map-image">
                    <iframe
                      src="https://www.google.com/maps?q=1000+Huckvale+Pl,+Williams+Lake,+BC+V2G+4L2&output=embed"
                      width="100%"
                      height={420}
                      style={{ border: 0, display: "block" }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Map to Central Cariboo Islamic Center"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <HomeContactForm />
              </div>
            </div>
          </div>
          <div className="sec-bg"><img src="/assets/images/contact-image.jpg" alt="" /></div>
        </div>
        <div className="container">
          <div className="info-bar">
            <div className="inner-box">
              <div className="row g-4">
                <div className="col-lg-4 col-sm-6">
                  <div className="contact-block"><div className="inner-box">
                    <i className="fa-solid fa-envelope"></i>
                    <div><p className="text">cariboo.secretary@thebcma.com</p></div>
                  </div></div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="contact-block"><div className="inner-box">
                    <InstagramIcon />
                    <div>
                      <p className="text"><a href="https://www.instagram.com/ccic_bcma/" target="_blank" rel="noopener noreferrer">@ccic_bcma</a></p>
                      <p className="text"><a href="https://www.facebook.com/williamslakemuslims/" target="_blank" rel="noopener noreferrer">Williams Lake Muslims</a></p>
                    </div>
                  </div></div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="contact-block"><div className="inner-box after-none">
                    <i className="fa-solid fa-location-dot"></i>
                    <div><p className="text">1000 Huckvale Pl,</p><p className="text">Williams Lake, BC V2G 4L2</p></div>
                  </div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
