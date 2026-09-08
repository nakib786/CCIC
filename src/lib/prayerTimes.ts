// Daily salah times and Hijri date for Williams Lake, BC, computed with the
// same method/angles the community already references at
// islamicfinder.org/world/canada/6182212/williams-lake-prayer-times —
// Islamic Society of North America (ISNA): Fajr/Isha at 15°, standard
// (Shafi) Asr, Umm al-Qura Hijri calendar (verified to match IslamicFinder's
// listed date). Computed locally so there's no third-party embed or API
// call on every page load — this module backs our own /api/prayer-times.
import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from "adhan";

const WILLIAMS_LAKE = new Coordinates(52.1432, -122.1447);
const TIME_ZONE = "America/Vancouver";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});

const gregorianFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const hijriPartsFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  calendar: "islamic-umalqura",
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  "Jumada al-Awwal",
  "Jumada al-Thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
];

function calculationParams() {
  const params = CalculationMethod.NorthAmerica();
  params.madhab = Madhab.Shafi;
  return params;
}

export type DailyPrayerTimes = {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

export type HijriDate = {
  day: number;
  month: number;
  monthName: string;
  year: number;
  formatted: string;
};

export function getTodayPrayerTimes(now: Date = new Date()): DailyPrayerTimes {
  const times = new PrayerTimes(WILLIAMS_LAKE, now, calculationParams());
  return {
    fajr: timeFormatter.format(times.fajr),
    sunrise: timeFormatter.format(times.sunrise),
    dhuhr: timeFormatter.format(times.dhuhr),
    asr: timeFormatter.format(times.asr),
    maghrib: timeFormatter.format(times.maghrib),
    isha: timeFormatter.format(times.isha),
  };
}

export function getTodayHijriDate(now: Date = new Date()): HijriDate {
  const parts = hijriPartsFormatter.formatToParts(now);
  const day = Number(parts.find((p) => p.type === "day")?.value);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const year = Number(parts.find((p) => p.type === "year")?.value);
  const monthName = HIJRI_MONTHS[month - 1] ?? "";
  return { day, month, year, monthName, formatted: `${day} ${monthName}, ${year} AH` };
}

export function getTodayGregorianDate(now: Date = new Date()): string {
  return gregorianFormatter.format(now);
}
