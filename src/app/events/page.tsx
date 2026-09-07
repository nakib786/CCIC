import type { Metadata } from "next";
import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import { getEvents } from "@/lib/wix";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past events at the Central Cariboo Islamic Center in Williams Lake, BC.",
};

export default async function EventsPage() {
  const events = await getEvents().catch(() => []);
  const upcoming = events.filter((e) => e.status === "UPCOMING" || e.status === "STARTED");
  const past = events
    .filter((e) => e.status === "ENDED")
    .sort((a, b) => (b.dateAndTimeSettings?.formatted?.dateAndTime ?? "").localeCompare(a.dateAndTimeSettings?.formatted?.dateAndTime ?? ""));

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="h1">Events</div>
          <div className="breadcrumb-nav"><Link href="/">Home</Link> <i className="fa-solid fa-angle-right"></i> Events</div>
        </div>
      </section>

      <section className="event-section pt-120 pb-80">
        <div className="floating-img-1 bounce-y"><img src="/assets/images/obj-img-3.png" alt="" /></div>
        <div className="floating-img-2 bounce-y"><img src="/assets/images/obj-img-4.png" alt="" /></div>
        <div className="container">
          <div className="sec-title text-center mb-60">
            <span className="sub-title section-eyebrow">What&apos;s On</span>
            <div className="h2 title">Upcoming Events</div>
          </div>
          {upcoming.length === 0 ? (
            <div className="empty-state">
              <i className="fa-regular fa-calendar-days"></i>
              <div className="h4 title mb-10">No events scheduled at the moment</div>
              <p className="text mb-20">
                We&apos;ll list dated events here as soon as they&apos;re confirmed on our Wix calendar. New announcements
                usually go up on social media first — follow along so you don&apos;t miss anything.
              </p>
              <div className="btn-box justify-content-center d-flex flex-wrap gap-2">
                <a href="https://www.instagram.com/ccic_bcma/" target="_blank" rel="noopener noreferrer" className="theme-btn btn-style-three">
                  <span className="btn-arrow-left"><InstagramIcon /></span><span className="btn-title">Instagram</span><span className="btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                </a>
                <a href="https://www.facebook.com/williamslakemuslims/" target="_blank" rel="noopener noreferrer" className="theme-btn btn-style-three">
                  <span className="btn-arrow-left"><FacebookIcon /></span><span className="btn-title">Facebook</span><span className="btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
                </a>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {upcoming.map((ev) => (
                <div className="col-md-6 col-lg-4" key={ev.id}>
                  <div className="causes-block give-block"><div className="inner-block">
                    <div className="image-box"><div className="image">{ev.mainImage?.url && <img src={ev.mainImage.url} alt={ev.title} />}</div></div>
                    <div className="content-box">
                      <div className="tag">{ev.dateAndTimeSettings?.formatted?.dateAndTime}</div>
                      <div className="h4 title">{ev.title}</div>
                      {ev.shortDescription && <p className="text">{ev.shortDescription}</p>}
                      {ev.location?.name && <p className="text">{ev.location.name}</p>}
                    </div>
                  </div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="pt-0 pb-120">
          <div className="container">
            <div className="sec-title text-center mb-50">
              <span className="sub-title section-eyebrow">A Look Back</span>
              <div className="h2 title">Past Events</div>
            </div>
            <div className="row g-4">
              {past.map((ev) => (
                <div className="col-md-6 col-lg-3" key={ev.id}>
                  <div className="causes-block give-block">
                    <div className="inner-block">
                      <div className="image-box"><div className="image">{ev.mainImage?.url && <img src={ev.mainImage.url} alt={ev.title} />}</div></div>
                      <div className="content-box">
                        <div className="tag">{ev.dateAndTimeSettings?.formatted?.dateAndTime}</div>
                        <div className="h4 title">{ev.title}</div>
                        {ev.shortDescription && <p className="text">{ev.shortDescription}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="our-causes pt-0 pb-120">
        <div className="container">
          <div className="sec-title text-center mb-50">
            <span className="sub-title section-eyebrow">Every Week</span>
            <div className="h2 title">Recurring Programs</div>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="causes-block give-block"><div className="inner-block">
                <div className="image-box"><div className="image"><img src="/assets/images/service-image1.jpg" alt="Jummah" /></div></div>
                <div className="content-box">
                  <div className="tag"><i className="fa-solid fa-mosque"></i> Weekly</div>
                  <div className="h4 title">Jummah Khutbah</div>
                  <p className="text">Congregational Friday prayer and khutbah — all are welcome to attend.</p>
                </div>
              </div></div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="causes-block give-block"><div className="inner-block">
                <div className="image-box"><div className="image"><img src="/assets/images/service-image2.jpg" alt="Arabic classes" /></div></div>
                <div className="content-box">
                  <div className="tag"><i className="fa-solid fa-book-open"></i> Ongoing</div>
                  <div className="h4 title">Arabic Classes</div>
                  <p className="text">Online (Zoom/Teams/WhatsApp) or in-person. <Link href="/about/#arabic-classes">Register your interest &rarr;</Link></p>
                </div>
              </div></div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="causes-block give-block"><div className="inner-block">
                <div className="image-box"><div className="image"><img src="/assets/images/service-image3.jpg" alt="Community" /></div></div>
                <div className="content-box">
                  <div className="tag"><i className="fa-solid fa-people-group"></i> Seasonal</div>
                  <div className="h4 title">Community &amp; Holiday Gatherings</div>
                  <p className="text">Special gatherings for Ramadan, the two Eids and other community occasions.</p>
                </div>
              </div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
