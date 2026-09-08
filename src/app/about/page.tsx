import type { Metadata } from "next";
import Link from "next/link";
import ArabicClassesForm from "@/components/ArabicClassesForm";
import BoardGrid from "@/components/BoardGrid";
import { getBoardMembers } from "@/lib/wix";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the Central Cariboo Islamic Center's mission, vision, board and Arabic classes program in Williams Lake, BC.",
};

const SERVICES = [
  { img: "service-image1.jpg", title: "Prayer Gatherings", text: "Regular prayers and special events for major Islamic holidays." },
  { img: "service-image2.jpg", title: "Educational Programs", text: "Qur'anic studies, Arabic language classes and Islamic history." },
  { img: "service-image3.jpg", title: "Community Events", text: "Social gatherings and charity drives throughout the year." },
  { img: "service-image4.jpg", title: "Youth Programs", text: "Programs designed to engage younger generations." },
];

export default async function AboutPage() {
  const board = await getBoardMembers().catch(() => []);
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="h1">About Us</div>
          <div className="breadcrumb-nav"><Link href="/">Home</Link> <i className="fa-solid fa-angle-right"></i> About</div>
        </div>
      </section>

      <section className="about-section pt-120">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-xl-6 col-lg-9 image-column">
              <div className="inner-column">
                <div className="image-box">
                  <figure className="image overlay-anim"><img src="/assets/images/about-image1.jpg" alt="Community" /></figure>
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
                  <span className="sub-title section-eyebrow">Who We Are</span>
                  <div className="h2 title">A Chapter of the BC Muslim Association</div>
                  <p className="text mt-20">
                    The Central Cariboo Islamic Center (CCIC) is wholeheartedly dedicated to fostering a sense of unity,
                    support and understanding among Muslims and the wider community in Williams Lake, BC. We provide an
                    inclusive environment where individuals can come together to practice their faith and engage in
                    meaningful community activities — guided always by peace, compassion and respect for all individuals.
                    We currently gather at a rented venue while we work toward building a permanent masjid and Islamic
                    Learning Centre for the Cariboo region.
                  </p>
                </div>
                <div className="about-tab">
                  <ul className="nav nav-tabs" id="missionVisionTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="mission-tab" data-bs-toggle="tab" data-bs-target="#mission" type="button" role="tab">
                        Our Mission
                        <svg className="icon" width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 9C7.5 2 2.66667 0.833333 0 0H16C10 0 8.5 5.5 8 9Z" fill="#144E97" /></svg>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="vision-tab" data-bs-toggle="tab" data-bs-target="#vision" type="button" role="tab">
                        Our Vision
                        <svg className="icon" width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 9C7.5 2 2.66667 0.833333 0 0H16C10 0 8.5 5.5 8 9Z" fill="#144E97" /></svg>
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="missionVisionTabContent">
                    <div className="tab-pane fade show active" id="mission" role="tabpanel">
                      <div className="about-block">
                        <div className="inner-box">
                          To establish an inclusive environment where individuals can come together to practice their
                          faith, guided by the principles of the Qur&apos;an and Sunnah, and to build unity, support and
                          understanding among Muslims and the wider Cariboo community.
                        </div>
                        <img src="/assets/images/about-border.png" alt="" />
                      </div>
                    </div>
                    <div className="tab-pane fade" id="vision" role="tabpanel">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="land-ack-section pt-120">
        <div className="container">
          <div className="land-ack-box bg-soft">
            <div className="row g-4 align-items-center">
              <div className="col-lg-4 col-md-5">
                <div className="land-ack-image">
                  <img src="/assets/images/firstNation.png" alt="Symbols of First Nations heritage — totem pole, tipi, hand drum and inukshuk" />
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <span className="sub-title section-eyebrow">In Recognition</span>
                <div className="h2 title mt-10 mb-20">Land Acknowledgement</div>
                <p className="text">
                  The Central Cariboo Islamic Center gathers, worships and serves on the traditional and ancestral
                  territory of the Secwepemc (Shuswap) Nation — home to the T&apos;exelcemc (Williams Lake First
                  Nation) and neighbouring the Xat&apos;sull First Nation (Soda Creek). We are grateful for the
                  opportunity to live, learn and build community on this land, and we honour the Secwepemc peoples&apos;
                  enduring stewardship and connection to this territory, which spans thousands of years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section pt-120">
        <div className="outer-container">
          <div className="container">
            <div className="sec-title text-center mb-50">
              <span className="sub-title section-eyebrow">What We Offer</span>
              <div className="h2 title">Programs &amp; Community Services</div>
            </div>
            <div className="row g-4">
              {SERVICES.map((svc) => (
                <div className="col-md-6 col-xl-3" key={svc.title}>
                  <div className="service-block"><div className="inner-box">
                    <div className="image-box">
                      <figure className="image"><img src={`/assets/images/${svc.img}`} alt={svc.title} /></figure>
                      <img className="image-bg" src="/assets/images/service-image-bg.png" alt="" />
                      <img className="image-bg hover-bg" src="/assets/images/service-image-bg-hover.png" alt="" />
                    </div>
                    <div className="content"><div className="h4 title">{svc.title}</div><p className="text">{svc.text}</p></div>
                    <div className="item-shape"><img src="/assets/images/service-item-shape.png" alt="" /></div>
                  </div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="sec-shape1"><img src="/assets/images/service-shape.png" alt="" /></div>
          <div className="sec-shape2"><img src="/assets/images/service-shape2.png" alt="" /></div>
        </div>
      </section>

      <section className="our-causes pt-120 pb-120" id="arabic-classes">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="sec-title text-center mb-40">
                <span className="sub-title section-eyebrow">Learn With Us</span>
                <div className="h2 title">Arabic Classes</div>
                <p className="text mt-20">
                  Delivered online (Zoom, Teams or WhatsApp) or in person. Register your interest below and our team
                  will follow up with schedule details.
                </p>
              </div>
              <ArabicClassesForm />
            </div>
          </div>
        </div>
      </section>

      <section className="team-section pt-0 pb-120">
        <div className="container">
          <div className="sec-title text-center mb-50">
            <span className="sub-title section-eyebrow">Our People</span>
            <div className="h2 title">Board &amp; Volunteers</div>
          </div>
          <BoardGrid members={board} />
        </div>
      </section>
    </>
  );
}
