import {
  MINUTES_IN_DEGREE,
  SECONDS_IN_DEGREE,
  SECONDS_IN_MINUTE,
} from "../constants/angles";
import { DECIMAL_PLACES_FOR_SECONDS } from "../constants/precision";

export const rad2deg = (radians: number) => {
  return (radians * 180.0) / Math.PI;
};

export const deg2rad = (degrees: number) => {
  return (degrees * Math.PI) / 180.0;
};

export const deg2hms = (
  deg: number,
  precision: number = DECIMAL_PLACES_FOR_SECONDS
) => {
  if (Number.isNaN(deg)) return [Number.NaN, Number.NaN, Number.NaN];

  let h = Math.floor(deg);
  let m = Math.floor(deg * MINUTES_IN_DEGREE) % MINUTES_IN_DEGREE;
  let s = (deg * SECONDS_IN_DEGREE) % SECONDS_IN_MINUTE;

  if (Number.parseFloat(s.toFixed(precision)) === 60.0) {
    m += 1;
    s = 0;
  }

  if (m === 60) {
    h += 1;
    m = 0;
  }

  return [h, m, s] as const;
};

export const hms2deg = (h: number, m: number, s: number) => {
  if (Number.isNaN(h) || Number.isNaN(m) || Number.isNaN(s)) return Number.NaN;

  return h + m / MINUTES_IN_DEGREE + s / SECONDS_IN_DEGREE;
};
