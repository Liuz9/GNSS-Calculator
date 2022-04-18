import moment from "moment";

import {
  ALPHABET,
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_SECOND,
  MILLISECONDS_IN_WEEK,
  START_BDS_TIME,
  START_GAL_TIME,
  START_GLO_LEAP,
  START_GPS_TIME,
  START_JULIAN_CALENDAR_UNIX_SECONDS,
  START_MJD_UNIX_SECONDS,
  START_UNIX_TIME,
} from "../constants/time";
import { getLeapSeconds } from "./leapSeconds";

export const getGpsTime = (date: Date) => {
  return date.getTime() - START_GPS_TIME.getTime();
};

export const getGalTime = (date: Date) => {
  return date.getTime() - START_GAL_TIME.getTime();
};

export const getBdsTime = (date: Date) => {
  return date.getTime() - START_BDS_TIME.getTime();
};

export const getUnixTime = (date: Date) => {
  return date.getTime() - START_UNIX_TIME.getTime();
};

export const getWeekNumber = (date: Date) => {
  return Math.floor(getGpsTime(date) / MILLISECONDS_IN_WEEK);
};

export const getTimeOfWeek = (date: Date) => {
  return (getGpsTime(date) % MILLISECONDS_IN_WEEK) / MILLISECONDS_IN_SECOND;
};

export const getTimeOfDay = (date: Date) => {
  const dateInitialDay = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      0,
      0,
      0
    )
  );
  return (date.getTime() - dateInitialDay.getTime()) / MILLISECONDS_IN_SECOND;
};

export const getGloN4 = (date: Date) => {
  return Math.floor((date.getUTCFullYear() - START_GLO_LEAP.getFullYear()) / 4);
};

export const getGloNA = (date: Date) => {
  const n4 = getGloN4(date);

  const init4YearPeriod = moment(START_GLO_LEAP)
    .add(n4 * 4, "year")
    .utc();

  return Math.floor(
    moment.duration(moment(date).diff(init4YearPeriod)).asDays() + 1
  );
};

export const getJulianDate = (date: Date) => {
  return (
    date.getTime() / MILLISECONDS_IN_DAY + START_JULIAN_CALENDAR_UNIX_SECONDS
  );
};

export const getMJD = (date: Date) => {
  return date.getTime() / MILLISECONDS_IN_DAY + START_MJD_UNIX_SECONDS;
};

export const getMJD2000 = (date: Date) => {
  return getMJD(date) - 51544;
};

export const getHourCode = (date: Date) => {
  return ALPHABET[date.getUTCHours()];
};

export const getRINEX = (date: Date) => {
  return moment(date).utc().format("> YYYY MM DD HH mm ss.SSSSSSS");
};

export const isValidDate = (date: Date) => {
  return date instanceof Date && !Number.isNaN(date);
};

export const getDateFromGpsData = (weekNumber: number, timeOfWeek: number) => {
  if (Number.isNaN(weekNumber) || Number.isNaN(weekNumber)) return undefined;

  const date = new Date(
    weekNumber * MILLISECONDS_IN_WEEK +
      timeOfWeek * MILLISECONDS_IN_SECOND +
      START_GPS_TIME.getTime()
  );

  if (!isValidDate(date)) return undefined;

  return date;
};

export const getDateFromGpsTime = (gpsTime: number) => {
  if (Number.isNaN(gpsTime)) return undefined;

  const date = new Date(
    gpsTime * MILLISECONDS_IN_SECOND + START_GPS_TIME.getTime()
  );

  if (!isValidDate(date)) return undefined;

  return date;
};

export const getDateFromGalTime = (galTime: number) => {
  if (Number.isNaN(galTime)) return undefined;

  const date = new Date(
    galTime * MILLISECONDS_IN_SECOND + START_GAL_TIME.getTime()
  );

  if (!isValidDate(date)) return undefined;

  return date;
};

export const getDateFromBdsTime = (bdsTime: number) => {
  if (Number.isNaN(bdsTime)) return undefined;

  const date = new Date(
    bdsTime * MILLISECONDS_IN_SECOND + START_BDS_TIME.getTime()
  );

  if (!isValidDate(date)) return undefined;

  return date;
};

export const getDateFromUnixTime = (unixTime: number) => {
  if (Number.isNaN(unixTime)) return undefined;

  const date = new Date(
    unixTime * MILLISECONDS_IN_SECOND + START_UNIX_TIME.getTime()
  );

  if (!isValidDate(date)) return undefined;

  return date;
};

export const getDateFromGloN = (n4: number, na: number, tod: number) => {
  if (Number.isNaN(n4) || Number.isNaN(na) || Number.isNaN(tod))
    return undefined;

  const date = moment
    .utc(START_GLO_LEAP)
    .add(n4 * 4, "year")
    .add(na - 1, "day")
    .add(tod, "second")
    .toDate();

  if (!isValidDate(date)) return undefined;

  return date;
};

export const getDateFromDayOfYear = (
  dayOfYear: number,
  dateUTC: string,
  timeUTC: string
) => {
  if (Number.isNaN(dayOfYear)) return undefined;

  const date = moment
    .utc(`${dateUTC} ${timeUTC}`, "YYYY-MM-DD HH:mm:ss")
    .dayOfYear(dayOfYear)
    .toDate();

  if (!isValidDate(date)) return undefined;

  return date;
};

export const getDateFromWeekOfYear = (
  weekOfYear: number,
  dateUTC: string,
  timeUTC: string
) => {
  if (Number.isNaN(weekOfYear)) return undefined;

  const date = moment
    .utc(`${dateUTC} ${timeUTC}`, "YYYY-MM-DD HH:mm:ss")
    .weeks(weekOfYear)
    .toDate();

  if (!isValidDate(date)) return undefined;

  return date;
};

export const getDateFromTimeOfDay = (timeOfDay: number, dateUTC: string) => {
  if (Number.isNaN(timeOfDay)) return undefined;

  const date = moment.utc(dateUTC, "YYYY-MM-DD").add(timeOfDay, "s").toDate();

  if (!isValidDate(date)) return undefined;

  return date;
};

export const getDateFromDayOfWeek = (
  dayOfWeek: number,
  dateUTC: string,
  timeUTC: string
) => {
  if (Number.isNaN(dayOfWeek)) return undefined;

  const date = moment
    .utc(`${dateUTC} ${timeUTC}`, "YYYY-MM-DD HH:mm:ss")
    .day(dayOfWeek)
    .toDate();

  if (!isValidDate(date)) return undefined;

  return date;
};

export const getDateFromHourCode = (
  hourCode: string,
  dateUTC: string,
  timeUTC: string
) => {
  const hour = ALPHABET.indexOf(hourCode);

  if (hour !== -1) {
    return moment
      .utc(`${dateUTC} ${timeUTC}`, "YYYY-MM-DD HH:mm:ss")
      .hours(hour)
      .toDate();
  }

  return undefined;
};

export const getDateFromJulianDate = (julianDate: number) => {
  if (Number.isNaN(julianDate)) return undefined;

  const date = new Date(
    (julianDate - START_JULIAN_CALENDAR_UNIX_SECONDS) * MILLISECONDS_IN_DAY
  );

  if (!isValidDate(date)) return undefined;

  return date;
};

export const getDateFromMJD = (mjd: number) => {
  if (Number.isNaN(mjd)) return undefined;

  const date = new Date((mjd - START_MJD_UNIX_SECONDS) * MILLISECONDS_IN_DAY);

  if (!isValidDate(date)) return undefined;

  return date;
};

export const getDateFromMJD2000 = (mjd2000: number) => {
  if (Number.isNaN(mjd2000)) return undefined;

  const date = new Date(
    (mjd2000 - START_MJD_UNIX_SECONDS + 51544) * MILLISECONDS_IN_DAY
  );

  if (!isValidDate(date)) return undefined;

  return date;
};

export const getDateFromUTC = (dateUTC: string, timeUTC: string) => {
  const date = moment
    .utc(`${dateUTC} ${timeUTC}`, "YYYY-MM-DD HH:mm:ss")
    .toDate();

  if (!isValidDate(date)) return undefined;

  return date;
};

export const getDateFromRINEX = (rinex: string) => {
  const date = moment.utc(rinex, "YYYY MM DD HH mm ss.SSSSSSS").toDate();

  if (!isValidDate(date)) return undefined;

  return date;
};

export const getLeapSecondsFromTAI = (date: Date) => {
  const leapsTAI = getLeapSeconds(date);
  const dateUTC = moment(date).subtract(leapsTAI, "seconds").utc().toDate();
  const leapsUTC = getLeapSeconds(dateUTC);
  const dateTAI = moment(date).add(leapsUTC, "seconds").utc().toDate();

  if (dateTAI.getTime() === date.getTime()) {
    return leapsTAI;
  }

  if (dateTAI.getTime() < date.getTime()) {
    return leapsTAI - 1;
  }

  return 0;
};
