import { NextResponse } from "next/server";
import { getTodayGregorianDate, getTodayHijriDate, getTodayPrayerTimes } from "@/lib/prayerTimes";

// Public JSON feed of today's salah times and Hijri date for Williams Lake,
// BC — computed with the same method IslamicFinder lists for this location
// (islamicfinder.org/world/canada/6182212/williams-lake-prayer-times: ISNA,
// 15°/15° Fajr/Isha, standard Asr, Umm al-Qura Hijri calendar). Served from
// our own data so the site has no runtime dependency on a third party.
export async function GET() {
  const now = new Date();
  const body = {
    location: {
      name: "Williams Lake, BC, Canada",
      latitude: 52.1432,
      longitude: -122.1447,
      timezone: "America/Vancouver",
    },
    method: {
      name: "Islamic Society of North America (ISNA)",
      fajrAngle: 15,
      ishaAngle: 15,
      asr: "Standard (Shafi)",
      hijriCalendar: "Umm al-Qura",
    },
    source: {
      name: "IslamicFinder",
      url: "https://www.islamicfinder.org/world/canada/6182212/williams-lake-prayer-times/",
      note: "Method and Hijri date verified against IslamicFinder's Williams Lake page; times are computed locally, not fetched live.",
    },
    date: {
      gregorian: getTodayGregorianDate(now),
      hijri: getTodayHijriDate(now),
    },
    times: getTodayPrayerTimes(now),
  };

  return NextResponse.json(body, {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=300" },
  });
}
