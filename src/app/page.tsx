import Link from "next/link";
import CopyChip from "@/components/CopyChip";
import FaqAccordion from "@/components/FaqAccordion";
import InspirationSlider from "@/components/InspirationSlider";
import BannerRipple from "@/components/BannerRipple";
import HomeContactForm from "@/components/HomeContactForm";
import { InstagramIcon } from "@/components/SocialIcons";
import { getBoardMembers, getDonationTotal } from "@/lib/wix";
import { getTodayPrayerTimes } from "@/lib/prayerTimes";
import BoardGrid from "@/components/BoardGrid";

const FAQ_ITEMS = [
  {
    q: "What services does the Islamic Center provide?",
    a: "We offer daily prayers and Friday Jummah, Qur'anic studies and Arabic language classes, Islamic history education, youth programs, and community and charity events throughout the year.",
  },
  {
    q: "Can non-Muslims visit or ask questions about Islam?",
    a: "Yes, absolutely. Visitors are always welcome. Please dress modestly, and feel free to reach out to us beforehand so we can help make your visit comfortable and answer any questions.",
  },
  {
    q: "Do you offer Islamic classes or Qur'an education?",
    a: "Yes. We offer Arabic classes delivered online (Zoom, Teams or WhatsApp) or in person, plus a Qur'an recitation resource. Contact us or visit our Arabic Classes page to register.",
  },
  {
    q: "How can I give Zakat or Sadaqah?",
    a: "You can give through PayPal, Interac e-Transfer, or by cash/cheque/bank transfer — see our Donate page for details. Your Zakat and Sadaqah support our building fund, programs and community services.",
  },
  {
    q: "How can I contact the Islamic Center?",
    a: "Email us at cariboo.secretary@thebcma.com, message us on Instagram (@ccic_bcma) or Facebook (Williams Lake Muslims), or use the contact form on our Contact page.",
  },
];

const QUOTES = [
  { text: "“The mosques of Allah are only to be maintained by those who believe in Allah and the Last Day...”", source: "Qur'an, Surah At-Tawbah 9:18" },
  { text: "“And hold firmly to the rope of Allah all together and do not become divided.”", source: "Qur'an, Surah Aal-e-Imran 3:103" },
  { text: "“Whoever builds a mosque for Allah, Allah will build for him a house like it in Paradise.”", source: "Hadith, Sahih al-Bukhari & Muslim" },
  { text: "“The believers, in their mutual kindness, compassion and sympathy, are just like one body.”", source: "Hadith, Sahih al-Bukhari & Muslim" },
];

export default async function HomePage() {
  const board = await getBoardMembers().catch(() => []);
  const donation = await getDonationTotal().catch(() => null);
  const prayerTimes = getTodayPrayerTimes();
  return (
    <>
      {/* ===== Banner ===== */}
      <section className="banner-section">
        <div className="outer-box">
          <div className="leaf"><img className="animation__arryUpDown" src="/assets/images/banner-leaf.png" alt="" /></div>
          <div className="inner-box">
            <div className="row g-5 align-items-end">
              <div className="col-xl-8">
                <div className="banner-content">
                  <span className="sub-title">Bismillahir Rahmanir Rahim</span>
                  <div className="h1 title">A Peaceful Place to Pray, Learn &amp; Belong</div>
                  <p className="text mt-20" style={{ maxWidth: 560 }}>
                    The Central Cariboo Islamic Center — a chapter of the BC Muslim Association — welcomes the Muslim
                    community of Williams Lake for prayer, learning and fellowship.
                  </p>
                  <div className="btn-box mt-30">
                    <a className="theme-btn btn-style-one mr-10 mb-2 mb-sm-0" href="#about">
                      <span className="btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                      <span className="btn-title">Discover More </span>
                      <span className="btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                    <a className="theme-btn btn-style-two" href="http://quran.williamslakemuslims.ca" target="_blank" rel="noopener noreferrer">
                      <span className="btn-arrow-left"><i className="fa-solid fa-play"></i></span>
                      <span className="btn-title">Listen to the Qur&apos;an </span>
                      <span className="btn-arrow-right"><i className="fa-solid fa-play"></i></span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="banner-image bounce-y">
                  <figure className="image overlay-anim">
                    <img src="/assets/images/banner-image.jpg" alt="Masjid interior" />
                  </figure>
                  <div className="image-bg"><img src="/assets/images/banner-image-bg.png" alt="" /></div>
                </div>
              </div>
            </div>
          </div>
          <BannerRipple />
          <div className="shape1"><img src="/assets/images/banner-shape1.png" alt="" /></div>
          <div className="shape2"><img src="/assets/images/banner-shape2.png" alt="" /></div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="about-section pt-120" id="about">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-xl-6 col-lg-9 image-column">
              <div className="inner-column">
                <div className="image-box">
                  <figure className="image overlay-anim"><img src="/assets/images/about-image1.jpg" alt="Community gathering" /></figure>
                  <div className="image-bg"><img src="/assets/images/about-image1-shape.png" alt="" /></div>
                </div>
                <div className="image-box image-box-two">
                  <figure className="image overlay-anim"><img src="/assets/images/service-image1.jpg" alt="Community in prayer" /></figure>
                  <div className="image-bg"><img src="/assets/images/about-image2-shape.png" alt="" /></div>
                </div>
                <div className="shape"><img className="animation__arryUpDown" src="/assets/images/about-leaf.png" alt="" /></div>
              </div>
            </div>
            <div className="col-xl-6 content-column">
              <div className="inner-column">
                <div className="sec-title mb-40">
                  <span className="sub-title section-eyebrow">Welcome to CCIC</span>
                  <div className="h2 title">Serving the Williams Lake <br /> Muslim Community</div>
                  <p className="text mt-20">
                    The Central Cariboo Islamic Center (CCIC) — a chapter of the BC Muslim Association — is
                    wholeheartedly dedicated to fostering a sense of unity, support and understanding among Muslims
                    and the wider community. We provide an inclusive environment where individuals can come together
                    to practice their faith and take part in meaningful community activities.
                  </p>
                </div>
                <div className="about-tab">
                  <ul className="nav nav-tabs" id="missionVisionTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="mission-tab" data-bs-toggle="tab" data-bs-target="#mission" type="button" role="tab" aria-selected="true">
                        Our Mission
                        <svg className="icon" width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 9C7.5 2 2.66667 0.833333 0 0H16C10 0 8.5 5.5 8 9Z" fill="#144E97" /></svg>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="vision-tab" data-bs-toggle="tab" data-bs-target="#vision" type="button" role="tab" aria-selected="false" tabIndex={-1}>
                        Our Vision
                        <svg className="icon" width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 9C7.5 2 2.66667 0.833333 0 0H16C10 0 8.5 5.5 8 9Z" fill="#144E97" /></svg>
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="missionVisionTabContent">
                    <div className="tab-pane fade show active" id="mission" role="tabpanel" aria-labelledby="mission-tab">
                      <div className="about-block">
                        <div className="inner-box">
                          To establish an inclusive environment where individuals can come together to practice their
                          faith, guided by the principles of the Qur&apos;an and Sunnah, and to build unity, support and
                          understanding among Muslims and the wider Cariboo community.
                        </div>
                        <img src="/assets/images/about-border.png" alt="" />
                      </div>
                    </div>
                    <div className="tab-pane fade" id="vision" role="tabpanel" aria-labelledby="vision-tab">
                      <div className="about-block">
                        <div className="inner-box">
                          A masjid that welcomes every worshipper with peace, compassion and respect for all
                          individuals — a lasting home for prayer, learning and service for the Muslim community of
                          Williams Lake and the wider Cariboo region.
                        </div>
                        <img src="/assets/images/about-border.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-30">
                  <Link className="theme-btn btn-style-one" href="/about/">
                    <span className="btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                    <span className="btn-title">More About Us </span>
                    <span className="btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Ways to Give ===== */}
      <section className="our-causes pt-120" id="give">
        <div className="floating-img-1 bounce-y"><img src="/assets/images/obj-img-1.png" alt="" /></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="sec-title text-center mb-60">
                <span className="sub-title section-eyebrow">Sadaqah &amp; Zakat</span>
                <div className="h2 title">Ways You Can Give</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="causes-block give-block">
                <div className="inner-block">
                  <div className="image-box"><div className="image"><img src="/assets/images/causes-1.jpg" alt="PayPal donation" /></div></div>
                  <div className="content-box">
                    <div className="tag"><i className="fa-solid fa-credit-card"></i> PayPal</div>
                    <div className="h4 title">Give securely online through our BCMA PayPal account</div>
                    <p className="text">The fastest way to give — one-time or recurring, any amount, processed directly by the BC Muslim Association.</p>
                    <a href="https://www.paypal.com/donate/?hosted_button_id=VD5SQYWVZGLWU" target="_blank" rel="noopener noreferrer" className="btn-style-six">Donate via PayPal</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="causes-block give-block">
                <div className="inner-block">
                  <div className="image-box"><div className="image"><img src="/assets/images/causes-2.jpg" alt="Interac e-Transfer" /></div></div>
                  <div className="content-box">
                    <div className="tag"><i className="fa-solid fa-money-bill-transfer"></i> Interac e-Transfer</div>
                    <div className="h4 title">Send your donation directly by e-Transfer</div>
                    <p className="text">Quick and secure. Send to the email below — no security question needed for registered BCMA accounts.</p>
                    <CopyChip value="etransfer.cariboo@thebcma.com" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="causes-block give-block">
                <div className="inner-block">
                  <div className="image-box"><div className="image"><img src="/assets/images/causes-3.jpg" alt="Cheque or bank transfer" /></div></div>
                  <div className="content-box">
                    <div className="tag"><i className="fa-solid fa-hand-holding-dollar"></i> Cash / Cheque / Bank Transfer</div>
                    <div className="h4 title">Prefer to give in person or by cheque?</div>
                    <p className="text">Contact our secretary for cheque mailing instructions or direct bank transfer details.</p>
                    <a href="mailto:cariboo.secretary@thebcma.com?subject=Donation%20by%20cheque%20%2F%20bank%20transfer" className="btn-style-six">Email Us</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Daily Prayers ===== */}
      <section className="time-section" id="prayer">
        <div className="floating-img-1 bounce-y"><img src="/assets/images/obj-img-2.png" alt="" /></div>
        <div className="container">
          <div className="sec-title text-center mb-60">
            <span className="sub-title section-eyebrow">Salah</span>
            <div className="h2 title">Daily Prayers &amp; Jummah</div>
            <p className="text">Stay connected with your daily prayers. Our masjid doors are <br /> always open to worshippers.</p>
          </div>
        </div>
        <div className="outer-box">
          <div className="row justify-content-center">
            {[
              { name: "Fajr", time: prayerTimes.fajr },
              { name: "Zuhr", time: prayerTimes.dhuhr },
              { name: "Asr", time: prayerTimes.asr },
              { name: "Maghrib", time: prayerTimes.maghrib },
              { name: "Isha", time: prayerTimes.isha },
            ].map(({ name, time }) => (
              <div className="col-lg-4 col-md-6" key={name}>
                <div className="time-block">
                  <div className="icon">
                    <svg width="31" height="30" viewBox="0 0 31 30" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M25.02 15.299c0-5.268-4.269-9.548-9.526-9.548s-9.526 4.28-9.526 9.548c0 .667.069 1.311.195 1.944-1.882.506-3.707 1.161-5.474 1.978.172.552.378 1.081.608 1.599C3.73 26.227 9.147 30 15.46 30c6.312 0 11.741-3.773 14.163-9.191.229-.518.436-1.059.608-1.611-1.756-.805-3.569-1.449-5.429-1.955.126-.621.195-1.277.195-1.944h.023Z" /></svg>
                    <div className="h5 title">{name}</div>
                  </div>
                  <div className="content"><div className="h6 title">{time}</div></div>
                </div>
              </div>
            ))}
            <div className="col-lg-5 col-md-6">
              <div className="time-block mx-lg-auto">
                <div className="icon">
                  <svg width="30" height="39" viewBox="0 0 30 39" xmlns="http://www.w3.org/2000/svg" strokeLinejoin="round" strokeLinecap="round">
                    <path d="M13.962 12.319c.49 1.198 2.163 1.332 2.912.272l.721-1.019 1.576-.115.371-2.434s.705-.462 1.247-1.403L11.079 3.146c-.969 1.557-.786 3.097-.786 3.097L9.042 8.724l4.659 2.779c.078.313.167.583.261.816Z" fill="#F9B024" stroke="#144E97" strokeWidth=".738" />
                    <path d="M28.995 29.754c-.448-.687-1.226-1.089-2.052-1.089l-7.518-1.108c-.949.467-2.015.826-2.015.826s1.279 6.54-14.99 9.342c.366.166.768.258 1.187.258h18.209c8.307 0 6.67-1.545 7.537-4.583.515-1.803.272-2.681-.357-3.646Z" fill="#144E97" stroke="#144E97" strokeWidth=".738" />
                  </svg>
                  <div className="h5 title">Jummah</div>
                </div>
                <div className="content"><div className="h6 title">Every Friday</div></div>
              </div>
            </div>
          </div>
          <div className="prayer-note">
            <div className="h6 title">Adhan times above are calculated daily for Williams Lake — iqamah (congregation start) is a few minutes after and is posted at the masjid and on our social pages</div>
            <p className="text mb-0">
              Follow <a href="https://www.instagram.com/ccic_bcma/" target="_blank" rel="noopener noreferrer">@ccic_bcma on Instagram</a> or{" "}
              <a href="https://www.facebook.com/williamslakemuslims/" target="_blank" rel="noopener noreferrer">Williams Lake Muslims on Facebook</a>, or{" "}
              <a href="mailto:cariboo.secretary@thebcma.com">email us</a> for the exact iqamah schedule.
            </p>
          </div>
        </div>
        <div className="sec-bg"><img src="/assets/images/time-bg.png" alt="" /></div>
      </section>

      {/* ===== Services ===== */}
      <section className="service-section">
        <div className="outer-container">
          <div className="container">
            <div className="sec-title-flex mb-50">
              <div className="row g-4 align-items-end justify-content-between">
                <div className="col-lg-6">
                  <div className="sec-title">
                    <span className="sub-title section-eyebrow">Services</span>
                    <div className="h2 title">Our Programs &amp; Services</div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <p className="text">We offer a range of programs to strengthen faith, serve the community and inspire the next generation.</p>
                </div>
              </div>
            </div>
            <div className="row g-4">
              {[
                { img: "service-image1.jpg", title: <>Daily Prayers <br /> &amp; Jummah</>, text: "Congregational prayers throughout the week and Friday khutbah for our community.", href: "/about/" },
                { img: "service-image2.jpg", title: <>Islamic <br /> Education</>, text: "Qur'an classes, Arabic lessons and Islamic studies for children and adults.", href: "/about/#arabic-classes" },
                { img: "service-image3.jpg", title: <>Youth <br /> Programs</>, text: "Mentorship and activities that engage the next generation in faith and community.", href: "/about/" },
                { img: "service-image4.jpg", title: <>Community <br /> &amp; Charity</>, text: "Social gatherings and charity drives supporting those in need across the Cariboo.", href: "/donate/" },
              ].map((svc, i) => (
                <div className="col-md-6 col-xl-3" key={i}>
                  <div className="service-block">
                    <div className="inner-box">
                      <div className="image-box">
                        <figure className="image"><img src={`/assets/images/${svc.img}`} alt="" /></figure>
                        <img className="image-bg" src="/assets/images/service-image-bg.png" alt="" />
                        <img className="image-bg hover-bg" src="/assets/images/service-image-bg-hover.png" alt="" />
                      </div>
                      <div className="content">
                        <div className="h4 title">{svc.title}</div>
                        <p className="text">{svc.text}</p>
                        <Link href={svc.href} className="btn-more"><i className="fa-solid fa-arrow-right"></i></Link>
                      </div>
                      <div className="item-shape"><img src="/assets/images/service-item-shape.png" alt="" /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sec-shape1"><img src="/assets/images/service-shape.png" alt="" /></div>
          <div className="sec-shape2"><img src="/assets/images/service-shape2.png" alt="" /></div>
        </div>
      </section>

      {/* ===== Events ===== */}
      <section className="event-section pt-120 pb-80" id="events">
        <div className="floating-img-1 bounce-y"><img src="/assets/images/obj-img-3.png" alt="" /></div>
        <div className="floating-img-2 bounce-y"><img src="/assets/images/obj-img-4.png" alt="" /></div>
        <div className="container">
          <div className="sec-title text-center mb-60">
            <span className="sub-title section-eyebrow">What&apos;s On</span>
            <div className="h2 title">Upcoming Events &amp; Activities</div>
            <p className="text">Join us in our upcoming gatherings and activities to strengthen faith and unity.</p>
          </div>
          <div className="text-center">
            <Link href="/events/" className="theme-btn btn-style-one">
              <span className="btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
              <span className="btn-title">See Upcoming Events </span>
              <span className="btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Marquee ===== */}
      <section className="marquee-section">
        <div className="marquee">
          {[
            ["Jummah Every Friday", "Donate Now", "Arabic Classes"],
            ["Follow @ccic_bcma", "Jummah Every Friday", "New to Islam? Ask Us"],
            ["Donate Now", "Arabic Classes", "Follow @ccic_bcma"],
          ].map((group, i) => (
            <div className="marquee-group" key={i}>
              {group.map((t) => <div className="text" key={t}>{t}</div>)}
            </div>
          ))}
        </div>
      </section>

      {/* ===== Board & Volunteers ===== */}
      <section className="team-section pt-120 pb-120">
        <div className="floating-img-1 bounce-y"><img src="/assets/images/obj-img-5.png" alt="" /></div>
        <div className="container">
          <div className="sec-title text-center mb-50">
            <span className="sub-title section-eyebrow">Our People</span>
            <div className="h2 title">Board &amp; Volunteers</div>
          </div>
          <BoardGrid members={board} />
        </div>
      </section>

      {/* ===== Support CTA ===== */}
      <section className="donation-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="donation-image"><img src="/assets/images/donation-image.jpg" alt="CCIC community gathering" /></div>
            </div>
            <div className="col-lg-5 d-flex align-items-center">
              <div className="donation-content">
                <span className="sub-title section-eyebrow">Building Fund</span>
                <div className="h2 title mt-10">Help Us Build a Permanent Home</div>
                <p className="text mt-20">
                  Muslims in the Central Cariboo don&apos;t yet have a dedicated place of worship — we currently borrow
                  space at St. Andrew&apos;s United Church for Friday prayers and community life. Your donations bring
                  us closer to a permanent masjid and Islamic Learning Centre for Williams Lake.
                </p>
                {donation && donation.target > 0 && (
                  <div className="mt-20">
                    <div className="progress" style={{ height: 10, borderRadius: 999, background: "#e6e6e6", overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${Math.min(100, (donation.raised / donation.target) * 100)}%`,
                          height: "100%",
                          background: "#F9B024",
                        }}
                      />
                    </div>
                    <p className="text mt-10 mb-0">
                      <strong>${donation.raised.toLocaleString()}</strong> raised of a ${donation.target.toLocaleString()} goal
                    </p>
                  </div>
                )}
                <Link href="/donate/" className="theme-btn btn-style-one mt-20">
                  <span className="btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                  <span className="btn-title">Give Now </span>
                  <span className="btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="sec-bg"><img src="/assets/images/donation-bg.png" alt="" /></div>
        <div className="sec-shape"><img src="/assets/images/donation-shape.png" alt="" /></div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="faqs-section-home1 pt-120 pb-120">
        <div className="floating-img-1 bounce-y"><img src="/assets/images/obj-img-6.png" alt="" /></div>
        <div className="container">
          <div className="sec-title text-center mb-50">
            <span className="h6 sub-title section-eyebrow">FAQs</span>
            <div className="h2 title">Have Questions? Find Your Answers Here</div>
          </div>
          <div className="row">
            <div className="col-lg-10 mx-lg-auto">
              <div className="faq-content-1">
                <FaqAccordion items={FAQ_ITEMS} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Inspiration ===== */}
      <section className="testimonial-section-two pt-100 pb-100">
        <div className="outer-box">
          <div className="sec-title text-center">
            <span className="h6 sub-title section-eyebrow">Words to Live By</span>
            <div className="h2 title">Guidance from the Qur&apos;an &amp; Sunnah</div>
          </div>
          <div className="container mt-40">
            <InspirationSlider quotes={QUOTES} />
          </div>
        </div>
      </section>

      {/* ===== Contact strip ===== */}
      <section className="contact-section pb-120">
        <div className="outer-container">
          <div className="container">
            <div className="row g-0">
              <div className="col-lg-5 content-column">
                <div className="inner-column">
                  <div className="sec-title mb-40">
                    <span className="sub-title section-eyebrow">Contact With Us</span>
                    <div className="h2 title">Feel Free to Write Us Anytime</div>
                  </div>
                  <div className="map-image">
                    <iframe
                      src="https://www.google.com/maps?q=1000+Huckvale+Pl,+Williams+Lake,+BC+V2G+4L2&output=embed"
                      width="100%"
                      height={360}
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
                    <div><p className="text">@ccic_bcma</p><p className="text">Williams Lake Muslims (Facebook)</p></div>
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
