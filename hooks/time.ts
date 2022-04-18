import moment from "moment";
import { useMemo } from "react";
import { MILLISECONDS_IN_SECOND } from "constants/time";
import {
  getBdsTime,
  getGalTime,
  getGloN4,
  getGloNA,
  getGpsTime,
  getHourCode,
  getJulianDate,
  getMJD,
  getMJD2000,
  getRINEX,
  getTimeOfDay,
  getTimeOfWeek,
  getUnixTime,
  getWeekNumber,
} from "util/dates";
import { getLeapSeconds } from "util/leapSeconds";

export const useTimeCalculator = (date: Date) => {
  const result = useMemo(
    () => ({
      weekNumber: getWeekNumber(date),
      timeOfWeek: getTimeOfWeek(date),
      dateUTC: moment(date).utc().format("YYYY-MM-DD"),
      timeUTC: moment(date).utc().format("HH:mm:ss"),
      dayOfYear: moment(date).utc().dayOfYear(),
      weekOfYear: moment(date).utc().weeks(),
      timeOfDay: getTimeOfDay(date),
      dayOfWeek: date.getUTCDay(),
      hourCode: getHourCode(date),
      julianDate: getJulianDate(date),
      mjd: getMJD(date),
      mjd2000: getMJD2000(date),
      leapSec: getLeapSeconds(date),
      gpsTime: getGpsTime(date) / MILLISECONDS_IN_SECOND,
      galTime: getGalTime(date) / MILLISECONDS_IN_SECOND,
      bdsTime: getBdsTime(date) / MILLISECONDS_IN_SECOND,
      unixTime: getUnixTime(date) / MILLISECONDS_IN_SECOND,
      gloN4: getGloN4(date),
      gloNa: getGloNA(date),
      rinex: getRINEX(date),
    }),
    [date]
  );

  return result;
};

export default useTimeCalculator;
