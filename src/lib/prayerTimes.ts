// Daily salah times for Williams Lake, BC, computed with the same
// method/angles the community already references at
// islamicfinder.org/world/canada/6182212/williams-lake-prayer-times —
// Islamic Society of North America (ISNA): Fajr/Isha at 15°, standard
// (Shafi) Asr. Computed locally so there's no third-party embed or API
// call on every page load.
import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from "adhan";

const WILLIAMS_LAKE = new Coordinates(52.1432, -122.1447);
const TIME_ZONE = "America/Vancouver";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});

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
