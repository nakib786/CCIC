import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import EventRsvpForm from "@/components/EventRsvpForm";
import { SITE_NAME } from "@/lib/site";
import { getEventBySlug } from "@/lib/wix";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug).catch(() => null);
  if (!event) return {};
  return {
    title: event.title,
    description: event.shortDescription || `${event.title} at ${SITE_NAME}.`,
    alternates: { canonical: `/events/${slug}/` },
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug).catch(() => null);
  if (!event) notFound();

  const dateText = event.dateAndTimeSettings?.formatted?.dateAndTime;
  const locationText = event.location?.locationTbd ? "Location to be announced" : event.location?.name;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Events", path: "/events/" }, { name: event.title }]} />
      <section className="page-banner">
        <div className="container">
          <h1 className="h1">{event.title}</h1>
          <div className="breadcrumb-nav">
            <Link href="/">Home</Link> <i className="fa-solid fa-angle-right"></i> <Link href="/events/">Events</Link>{" "}
            <i className="fa-solid fa-angle-right"></i> {event.title}
          </div>
        </div>
      </section>

      <section className="event-section pt-120 pb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              {event.mainImage?.url && (
                <div className="event-detail-image mb-30">
                  <Image
                    src={event.mainImage.url}
                    alt={event.title}
                    fill
                    sizes="(max-width: 991px) 100vw, 58vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              {(dateText || locationText) && (
                <ul className="event-detail-meta mb-20">
                  {dateText && (
                    <li>
                      <i className="fa-solid fa-calendar-days"></i> {dateText}
                    </li>
                  )}
                  {locationText && (
                    <li>
                      <i className="fa-solid fa-location-dot"></i> {locationText}
                    </li>
                  )}
                </ul>
              )}
              {event.shortDescription && <p className="text">{event.shortDescription}</p>}
              <Link href="/events/" className="rsvp-back-link">
                <i className="fa-solid fa-arrow-left"></i> Back to all events
              </Link>
            </div>
            <div className="col-lg-5">
              <EventRsvpForm event={event} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
