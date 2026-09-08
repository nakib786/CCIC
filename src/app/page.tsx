import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import CopyChip from "@/components/CopyChip";
import FaqAccordion from "@/components/FaqAccordion";
import InspirationSlider from "@/components/InspirationSlider";
import BannerRipple from "@/components/BannerRipple";
import HomeContactForm from "@/components/HomeContactForm";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import { getBoardMembers, getContactFormFields, getDonationTotal } from "@/lib/wix";
import { getTodayHijriDate, getTodayPrayerTimes } from "@/lib/prayerTimes";
import BoardGrid from "@/components/BoardGrid";
import ScrollReveal from "@/components/ScrollReveal";

const PRAYER_ICONS: Record<string, ReactNode> = {
  Fajr: (
    <svg width="31" height="30" viewBox="0 0 31 30" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M25.02 15.299c0-5.268-4.269-9.548-9.526-9.548s-9.526 4.28-9.526 9.548c0 .667.069 1.311.195 1.944-1.882.506-3.707 1.161-5.474 1.978.172.552.378 1.081.608 1.599C3.73 26.227 9.147 30 15.46 30c6.312 0 11.741-3.773 14.163-9.191.229-.518.436-1.059.608-1.611-1.756-.805-3.569-1.449-5.429-1.955.126-.621.195-1.277.195-1.944h.023ZM7.678 15.299c0-4.314 3.501-7.834 7.816-7.834s7.816 3.509 7.816 7.834c0 .529-.057 1.035-.149 1.53-2.49-.541-5.05-.829-7.667-.829s-5.176.277-7.667.829c-.103-.495-.149-1.013-.149-1.53ZM7.54 6.936 4.614 4.003 3.409 5.211l2.972 2.979c.356-.448.734-.874 1.159-1.254ZM28.004 5.222 26.799 4.015 23.643 7.178c.402.403.781.84 1.125 1.3l3.236-3.255ZM16.332 3.819V0h-1.71v3.819c.287-.023.563-.035.85-.035s.574.012.86.035ZM3.902 15.38c0-.311.012-.621.035-.932H0v1.714h3.937c-.012-.253-.023-.517-.023-.782ZM27.006 14.448c.023.31.034.621.034.931 0 .265 0 .518-.023.782H31v-1.714h-3.994Z" />
    </svg>
  ),
  Zuhr: (
    <svg width="31" height="30" viewBox="0 0 31 30" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M15.494 5.763c-5.256 0-9.526 4.279-9.526 9.548s4.27 9.548 9.526 9.548 9.526-4.279 9.526-9.548-4.27-9.548-9.526-9.548Zm0 17.381c-4.304 0-7.816-3.508-7.816-7.833s3.501-7.834 7.816-7.834 7.816 3.509 7.816 7.834-3.501 7.833-7.816 7.833ZM6.393 22.408l-2.973 2.979 1.205 1.208 2.927-2.933a9.9 9.9 0 0 1-1.159-1.254ZM23.643 23.443l3.156 3.163 1.205-1.208-3.236-3.244c-.344.46-.711.897-1.125 1.3ZM14.622 26.342V30h1.71v-3.658a9.9 9.9 0 0 1-1.71 0ZM3.948 16.162a9.8 9.8 0 0 1-.035-.851c0-.287.012-.575.035-.851H0v1.714h3.948ZM7.54 6.936 4.614 4.003 3.409 5.211 6.381 8.19c.356-.448.734-.874 1.159-1.254ZM28.004 5.222l-1.205-1.207-3.156 3.163c.402.403.781.84 1.125 1.3l3.236-3.256ZM16.332 4.268V0h-1.71v4.268a9.9 9.9 0 0 1 1.71 0ZM27.017 14.448h-.011c.023.287.034.575.034.851s-.011.564-.034.851H31v-1.714h-3.983Z" />
    </svg>
  ),
  Asr: (
    <svg width="31" height="30" viewBox="0 0 31 30" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M6.248 17.447c.436-.622.929-1.198 1.479-1.716 0-.138-.011-.276-.011-.414 0-4.319 3.497-7.843 7.807-7.843s7.807 3.512 7.807 7.843c0 .138 0 .276-.011.414.55.518 1.043 1.094 1.479 1.716.161-.679.241-1.393.241-2.13 0-5.263-4.265-9.559-9.516-9.559s-9.516 4.284-9.516 9.559c0 .726.08 1.44.241 2.13ZM7.578 6.944 4.655 4.008 3.451 5.217 6.42 8.2c.356-.449.734-.875 1.158-1.255ZM28.019 5.229l-1.204-1.209-3.153 3.167c.402.403.78.84 1.124 1.3l3.233-3.258ZM16.36 3.823V0h-1.708v3.823a9.8 9.8 0 0 1 1.708 0ZM3.944 15.397c0-.311.011-.622.034-.933H.046v1.716h3.932c-.012-.253-.023-.518-.023-.783ZM27.022 14.465c.023.31.034.622.034.932 0 .265 0 .519-.023.784h3.978v-1.716h-3.989ZM25.039 24.069v-.046c0-5.274-4.265-9.558-9.516-9.558s-9.516 4.284-9.516 9.558v.046C3.646 24.3 1.536 25.405 0 27.063v2.949c1.181-2.315 3.474-3.962 6.168-4.239.252-.023.516-.034.768-.034.332 0 .653.023.974.057a9.7 9.7 0 0 1-.207-1.739v-.034c0-4.319 3.497-7.843 7.807-7.843s7.807 3.512 7.807 7.843v.034c0 .599-.069 1.186-.206 1.739.321-.034.642-.057.974-.057.264 0 .516.011.78.034 2.66.265 4.93 1.878 6.122 4.147v-2.914c-1.536-1.624-3.622-2.706-5.961-2.948Z" />
    </svg>
  ),
  Maghrib: (
    <svg width="31" height="30" viewBox="0 0 31 30" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M25.02 15.299c0-5.257-4.269-9.548-9.526-9.548S5.968 10.031 5.968 15.299c0 .667.069 1.311.195 1.944-1.882.506-3.707 1.173-5.474 1.978.172.552.378 1.081.608 1.599C3.73 26.227 9.147 30 15.46 30c6.312 0 11.741-3.773 14.163-9.191.229-.518.436-1.059.608-1.611-1.756-.805-3.569-1.461-5.429-1.955.126-.621.195-1.277.195-1.944h.023ZM19.764 23.834l-4.293 4.901-4.361-4.958-4.132-4.705c.494-.126.988-.253 1.482-.368 2.284-.506 4.637-.759 7.035-.759s4.751.265 7.035.759c.47.103.952.218 1.411.345l-4.189 4.785h.012ZM15.494 16.012c-2.605 0-5.176.276-7.667.828-.103-.494-.149-1.012-.149-1.53 0-4.314 3.501-7.834 7.816-7.834s7.816 3.509 7.816 7.834c0 .529-.046 1.035-.149 1.53-2.49-.541-5.05-.828-7.667-.828ZM7.54 6.936 4.614 4.003 3.409 5.211 6.381 8.19c.356-.448.734-.874 1.159-1.254ZM28.004 5.222l-1.205-1.207-3.156 3.163c.402.403.781.84 1.125 1.3l3.236-3.256ZM16.332 3.819V0h-1.71v3.819a9.8 9.8 0 0 1 1.71 0ZM3.902 15.38c0-.311.012-.621.035-.932H0v1.714h3.937c-.012-.253-.023-.517-.023-.782ZM27.006 14.448c.023.31.034.621.034.931 0 .265 0 .518-.023.782H31v-1.714h-3.994Z" />
    </svg>
  ),
  Isha: (
    <svg width="31" height="30" viewBox="0 0 31 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="currentColor">
        <path d="M16.0451 14.8636C16.0451 12.0092 17.6175 9.49593 19.9474 8.16538C20.5327 7.82421 21.164 7.56265 21.8411 7.39206C21.2558 6.94854 20.6246 6.57326 19.9474 6.26621C18.7538 5.73171 17.4339 5.43604 16.0451 5.43604C10.7886 5.43604 6.51904 9.66651 6.51904 14.875C6.51904 20.0835 10.7886 24.314 16.0451 24.314C17.4339 24.314 18.7538 24.0183 19.9474 23.4838C20.6246 23.1767 21.2558 22.8015 21.8411 22.3579C21.1755 22.1874 20.5327 21.9144 19.9474 21.5846C17.6175 20.2427 16.0451 17.7408 16.0451 14.8864V14.8636ZM16.0451 22.6081C11.7412 22.6081 8.22915 19.1396 8.22915 14.8636C8.22915 10.5877 11.7297 7.11913 16.0451 7.11913C16.7453 7.11913 17.4224 7.21011 18.0651 7.38069C15.8041 9.10927 14.335 11.8159 14.335 14.8636C14.335 17.9114 15.7926 20.618 18.0651 22.3466C17.4224 22.5172 16.7453 22.6081 16.0451 22.6081Z" />
        <path d="M6.39277 21.8915L3.42017 24.8369L4.62528 26.031L7.55197 23.1311C7.13879 22.7444 6.74856 22.3236 6.39277 21.8801V21.8915Z" />
        <path d="M23.6431 22.915L26.7993 26.0424L28.0044 24.8483L24.7678 21.6414C24.4235 22.0962 24.0562 22.5284 23.6431 22.9264V22.915Z" />
        <path d="M14.6221 26.2244V30H16.3322V26.2244C16.0452 26.2471 15.7698 26.2585 15.4829 26.2585C15.1959 26.2585 14.909 26.2585 14.6335 26.2244H14.6221Z" />
        <path d="M3.94817 15.7165C3.92521 15.4322 3.91374 15.1593 3.91374 14.875C3.91374 14.5907 3.92521 14.3064 3.94817 14.0334H0V15.7279H3.94817V15.7165Z" />
        <path d="M3.40869 4.9015L6.38129 7.84692C6.73709 7.4034 7.11584 6.98263 7.54049 6.59597L4.6138 3.69604L3.40869 4.89013V4.9015Z" />
        <path d="M28.0044 4.90136L26.7993 3.70728L23.6431 6.83464C24.0448 7.23267 24.4235 7.66482 24.7678 8.11971L28.0044 4.91273V4.90136Z" />
        <path d="M14.6221 3.77559C14.909 3.75284 15.1845 3.74147 15.4714 3.74147C15.7583 3.74147 16.0453 3.74147 16.3207 3.77559V0H14.6106V3.77559H14.6221Z" />
        <path d="M27.0173 14.0219H27.0059C27.0288 14.3062 27.0403 14.5791 27.0403 14.8634C27.0403 15.1477 27.0288 15.432 27.0059 15.705H30.9999V14.0105H27.0173V14.0219Z" />
      </g>
    </svg>
  ),
};

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

// Real pixel dimensions of each service icon photo — lets next/image reserve
// the correct aspect ratio up front (no layout shift) instead of guessing.
const SERVICE_IMG_SIZE: Record<string, { width: number; height: number }> = {
  "service-image1.jpg": { width: 183, height: 183 },
  "service-image2.jpg": { width: 183, height: 180 },
  "service-image3.jpg": { width: 183, height: 178 },
  "service-image4.jpg": { width: 183, height: 183 },
};

const QUOTES = [
  { text: "“The mosques of Allah are only to be maintained by those who believe in Allah and the Last Day...”", source: "Qur'an, Surah At-Tawbah 9:18" },
  { text: "“And hold firmly to the rope of Allah all together and do not become divided.”", source: "Qur'an, Surah Aal-e-Imran 3:103" },
  { text: "“Whoever builds a mosque for Allah, Allah will build for him a house like it in Paradise.”", source: "Hadith, Sahih al-Bukhari & Muslim" },
  { text: "“The believers, in their mutual kindness, compassion and sympathy, are just like one body.”", source: "Hadith, Sahih al-Bukhari & Muslim" },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default async function HomePage() {
  const board = await getBoardMembers().catch(() => []);
  const donation = await getDonationTotal().catch(() => null);
  const contactFields = await getContactFormFields().catch(() => undefined);
  const prayerTimes = getTodayPrayerTimes();
  const hijriDate = getTodayHijriDate();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {/* ===== Banner ===== */}
      <section className="banner-section">
        <div className="outer-box">
          <div className="leaf"><img className="animation__arryUpDown" src="/assets/images/banner-leaf.png" alt="" /></div>
          <div className="inner-box">
            <div className="row g-5 align-items-end">
              <div className="col-xl-8">
                <div className="banner-content">
                  <span className="sub-title">Bismillahir Rahmanir Rahim</span>
                  <h1 className="h1 title">A Peaceful Place to Pray, Learn &amp; Belong</h1>
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
                    <Image src="/assets/images/banner-image.jpg" alt="Masjid interior" width={328} height={527} priority />
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
                  <figure className="image overlay-anim"><Image src="/assets/images/about-image1.jpg" alt="Community gathering" width={552} height={506} sizes="(max-width: 1199px) 90vw, 552px" /></figure>
                  <div className="image-bg"><img src="/assets/images/about-image1-shape.png" alt="" /></div>
                </div>
                <div className="image-box image-box-two">
                  <figure className="image overlay-anim"><Image src="/assets/images/service-image1.jpg" alt="Community in prayer" width={183} height={183} /></figure>
                  <div className="image-bg"><img src="/assets/images/about-image2-shape.png" alt="" /></div>
                </div>
                <div className="shape"><img className="animation__arryUpDown" src="/assets/images/about-leaf.png" alt="" /></div>
              </div>
            </div>
            <div className="col-xl-6 content-column">
              <div className="inner-column">
                <div className="sec-title mb-40">
                  <span className="sub-title section-eyebrow">Welcome to CCIC</span>
                  <h2 className="h2 title">Serving the Williams Lake <br /> Muslim Community</h2>
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
                <h2 className="h2 title">Ways You Can Give</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="causes-block give-block">
                <div className="inner-block">
                  <div className="image-box logo-frame"><div className="image logo-badge"><Image src="/assets/images/paypal-logo.svg" alt="PayPal" width={124} height={33} /></div></div>
                  <div className="content-box">
                    <div className="tag"><i className="fa-solid fa-credit-card"></i> PayPal</div>
                    <h3 className="h4 title">Give securely online through our BCMA PayPal account</h3>
                    <p className="text">The fastest way to give — one-time or recurring, any amount, processed directly by the BC Muslim Association.</p>
                    <a href="https://www.paypal.com/donate/?hosted_button_id=VD5SQYWVZGLWU" target="_blank" rel="noopener noreferrer" className="btn-style-six">Donate via PayPal</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="causes-block give-block">
                <div className="inner-block">
                  <div className="image-box logo-frame"><div className="image logo-badge"><Image src="/assets/images/interac-logo.png" alt="Interac e-Transfer" width={500} height={500} /></div></div>
                  <div className="content-box">
                    <div className="tag"><i className="fa-solid fa-money-bill-transfer"></i> Interac e-Transfer</div>
                    <h3 className="h4 title">Send your donation directly by e-Transfer</h3>
                    <p className="text">Quick and secure. Send to the email below — no security question needed for registered BCMA accounts.</p>
                    <CopyChip value="etransfer.cariboo@thebcma.com" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="causes-block give-block">
                <div className="inner-block">
                  <div className="image-box logo-frame"><div className="image"><Image src="/assets/images/donation-money-vector-flat-illustration.jpg" alt="Cheque or bank transfer" fill sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw" style={{ objectFit: "cover" }} /></div></div>
                  <div className="content-box">
                    <div className="tag"><i className="fa-solid fa-hand-holding-dollar"></i> Cash / Cheque / Bank Transfer</div>
                    <h3 className="h4 title">Prefer to give in person or by cheque?</h3>
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
            <h2 className="h2 title">Daily Prayers &amp; Jummah</h2>
            <p className="text">Stay connected with your daily prayers. Our masjid doors are <br /> always open to worshippers.</p>
            <p className="text mb-0"><strong>{hijriDate.formatted}</strong> — Williams Lake, BC</p>
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
                    {PRAYER_ICONS[name]}
                    <h3 className="h5 title">{name}</h3>
                  </div>
                  <div className="content"><div className="h6 title">{time}</div></div>
                </div>
              </div>
            ))}
            <div className="col-lg-5 col-md-6">
              <div className="time-block mx-lg-auto">
                <div className="icon">
                  <svg width="30" height="39" viewBox="0 0 30 39" xmlns="http://www.w3.org/2000/svg" strokeLinejoin="round" strokeLinecap="round">
                    <path d="M13.962 12.319c.49 1.198 2.163 1.332 2.912.272l.721-1.019 1.576-.115.371-2.434s.705-.462 1.247-1.403L11.079 3.146c-.969 1.557-.786 3.097-.786 3.097L9.042 8.724l4.659 2.779c.078.313.167.583.261.816Z" fill="#C7DC49" stroke="#10551F" strokeWidth=".738" />
                    <path d="M28.995 29.754c-.448-.687-1.226-1.089-2.052-1.089l-7.518-1.108c-.949.467-2.015.826-2.015.826s1.279 6.54-14.99 9.342c.366.166.768.258 1.187.258h18.209c8.307 0 6.67-1.545 7.537-4.583.515-1.803.272-2.681-.357-3.646Z" fill="#10551F" stroke="#10551F" strokeWidth=".738" />
                    <path d="M21.393 5.649c.07-.997-.238-1.993-.772-2.841C18.258-.949 14.094.754 14.094.754c-1.546.616-2.465 1.507-3.016 2.392l9.711 4.473c.296-.513.547-1.163.604-1.97Z" fill="#10551F" stroke="#10551F" strokeWidth=".738" />
                    <path d="M24.656 21.778c.921-.739 1.467-1.432 1.776-2.049.449-.898-.656-1.777-1.429-1.138-.609.504-1.239.758-1.893.729l1.548 2.458Z" fill="#C7DC49" stroke="#10551F" strokeWidth=".738" />
                    <path d="M13.761 10.256s-.217.685-.061 1.246" stroke="#10551F" strokeWidth=".738" />
                    <path d="M14.002 33.754h9.106" stroke="#C7DC49" strokeWidth=".738" />
                    <path d="M17.411 28.383s1.066-.359 2.015-.827c3.569-2.112 5.354-5.581 5.354-5.581l-1.808-2.871-5.98 4.111-2.782-8.957-.51-2.756-4.659-2.779s-2.138.387-4.847 3.798C1.728 15.628.693 28.113.385 32.821c-.077 1.178.127 2.352.592 3.438.285.664.808 1.178 1.444 1.466 16.269-2.803 14.99-9.342 14.99-9.342Z" fill="#10551F" stroke="#10551F" strokeWidth=".738" />
                    <path d="M8.004 20.32 12.08 27.98c.556 1.045 1.662 1.698 2.854 1.647 1.093-.048 2.566-.347 4.612-1.332" stroke="#C7DC49" strokeWidth=".738" />
                  </svg>
                  <h3 className="h5 title">Jummah</h3>
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
            <p className="text mb-0">
              Source:{" "}
              <a href="https://www.islamicfinder.org/world/canada/6182212/williams-lake-prayer-times/" target="_blank" rel="noopener noreferrer">
                IslamicFinder — Williams Lake Prayer Times
              </a>
              . Calculation: Islamic Society of North America (ISNA), 15°/15° Fajr &amp; Isha angles, standard (Shafi) Asr, Umm al-Qura Hijri calendar.
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
                    <h2 className="h2 title">Our Programs &amp; Services</h2>
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
                  <ScrollReveal delay={i * 120}>
                    <div className="service-block">
                      <div className="inner-box">
                        <div className="image-box">
                          <figure className="image"><Image src={`/assets/images/${svc.img}`} alt="" {...SERVICE_IMG_SIZE[svc.img]} /></figure>
                          <img className="image-bg" src="/assets/images/service-image-bg.png" alt="" />
                          <img className="image-bg hover-bg" src="/assets/images/service-image-bg-hover.png" alt="" />
                        </div>
                        <div className="content">
                          <h3 className="h4 title">{svc.title}</h3>
                          <p className="text">{svc.text}</p>
                          <Link href={svc.href} className="btn-more"><i className="fa-solid fa-arrow-right"></i></Link>
                        </div>
                        <div className="item-shape"><img src="/assets/images/service-item-shape.png" alt="" /></div>
                      </div>
                    </div>
                  </ScrollReveal>
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
            <h2 className="h2 title">Upcoming Events &amp; Activities</h2>
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
          {[0, 1, 2].map((i) => (
            <div className="marquee-group" key={i}>
              {["Jummah Every Friday", "Donate Now", "Arabic Classes", "Follow @ccic_bcma", "New to Islam? Ask Us"].map((t) => (
                <div className="text" key={t}>{t}</div>
              ))}
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
            <h2 className="h2 title">Board &amp; Volunteers</h2>
          </div>
          <BoardGrid members={board} />
        </div>
      </section>

      {/* ===== Support CTA ===== */}
      <section className="donation-section">
        <div className="outer-container">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="donation-image"><Image src="/assets/images/donation-image.jpg" alt="CCIC community gathering" fill sizes="(max-width: 480px) 90vw, 480px" style={{ objectFit: "cover" }} /></div>
              </div>
              <div className="col-lg-5 d-flex align-items-center">
                <div className="donation-content">
                  <span className="sub-title section-eyebrow">Building Fund</span>
                  <h2 className="h2 title mt-10">Help Us Build a Permanent Home</h2>
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
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="faqs-section-home1 pt-120 pb-120">
        <div className="floating-img-1 bounce-y"><img src="/assets/images/obj-img-6.png" alt="" /></div>
        <div className="container">
          <div className="sec-title text-center mb-50">
            <span className="h6 sub-title section-eyebrow">FAQs</span>
            <h2 className="h2 title">Have Questions? Find Your Answers Here</h2>
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
            <h2 className="h2 title">Guidance from the Qur&apos;an &amp; Sunnah</h2>
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
            <div className="row g-4">
              <div className="col-lg-5 content-column">
                <div className="inner-column">
                  <div className="sec-title mb-40">
                    <span className="sub-title section-eyebrow">Contact With Us</span>
                    <h2 className="h2 title">Feel Free to Write Us Anytime</h2>
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
                <HomeContactForm fields={contactFields} />
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
                    <div><p className="text text-nowrap"><a href="mailto:cariboo.secretary@thebcma.com">cariboo.secretary@thebcma.com</a></p></div>
                  </div></div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="contact-block"><div className="inner-box">
                    <div className="contact-icons">
                      <a href="https://www.instagram.com/ccic_bcma/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
                      <a href="https://www.facebook.com/williamslakemuslims/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon /></a>
                    </div>
                    <div>
                      <p className="text"><a href="https://www.instagram.com/ccic_bcma/" target="_blank" rel="noopener noreferrer">@ccic_bcma</a></p>
                      <p className="text"><a href="https://www.facebook.com/williamslakemuslims/" target="_blank" rel="noopener noreferrer">Williams Lake Muslims</a></p>
                    </div>
                  </div></div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="contact-block"><div className="inner-box after-none">
                    <i className="fa-solid fa-location-dot"></i>
                    <div>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=1000+Huckvale+Pl%2C+Williams+Lake%2C+BC+V2G+4L2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="text">1000 Huckvale Pl,</p>
                        <p className="text">Williams Lake, BC V2G 4L2</p>
                      </a>
                    </div>
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
