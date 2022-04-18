import {
  WGS84_ECCENTRICITY_SQUARED,
  WGS84_SEMI_MAJOR_AXIS,
} from "constants/geoid";
import {
  MAX_DELTA_ITER as CAR2GEO_MAX_DELTA_ITER,
  MAX_ITER as CAR2GEO_MAX_ITER,
} from "constants/precision";
import { parseLatitudeString } from "./formats";
import { deg2rad } from "./units";

export const geo2car = (lat: number, lon: number, h: number) => {
  if (Number.isNaN(lat) || Number.isNaN(lon) || Number.isNaN(h))
    return undefined;

  const N =
    WGS84_SEMI_MAJOR_AXIS /
    Math.sqrt(1 - WGS84_ECCENTRICITY_SQUARED * Math.sin(lat) ** 2);

  const x = (N + h) * Math.cos(lat) * Math.cos(lon);
  const y = (N + h) * Math.cos(lat) * Math.sin(lon);
  const z = ((1 - WGS84_ECCENTRICITY_SQUARED) * N + h) * Math.sin(lat);

  return [x, y, z] as const;
};

export const car2geo = (x: number, y: number, z: number) => {
  if (Number.isNaN(x) || Number.isNaN(y) || Number.isNaN(z))
    return [Number.NaN, Number.NaN, Number.NaN];

  if (x === 0 && y === 0) {
    return [0, (Math.sign(z) * Math.PI) / 2, Math.abs(z)] as const;
  }

  const lon = Math.atan2(y, x);
  const p = Math.sqrt(x ** 2 + y ** 2);
  let lati = Math.atan(z / p / (1 - WGS84_ECCENTRICITY_SQUARED));
  let iter = 0;

  let latiPrev;
  let Ni;
  let hi;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    latiPrev = lati;
    Ni =
      WGS84_SEMI_MAJOR_AXIS /
      Math.sqrt(1 - WGS84_ECCENTRICITY_SQUARED * Math.sin(latiPrev) ** 2);
    hi = p / Math.cos(latiPrev) - Ni;
    lati = Math.atan(
      z / p / (1 - (Ni / (Ni + hi)) * WGS84_ECCENTRICITY_SQUARED)
    );
    if (Math.abs(lati - latiPrev) < CAR2GEO_MAX_DELTA_ITER) {
      break;
    }
    iter += 1;
    if (iter > CAR2GEO_MAX_ITER) {
      break;
    }
  }

  return [lati, lon, hi] as const;
};

export const getEnuDifference = (
  x: number,
  y: number,
  z: number,
  xRef: number,
  yRef: number,
  zRef: number
) => {
  const [latRef, lonRef] = car2geo(xRef, yRef, zRef);

  const deltaX = x - xRef;
  const deltaY = y - yRef;
  const deltaZ = z - zRef;

  const deltaE = -Math.sin(lonRef) * deltaX + Math.cos(lonRef) * deltaY;
  const deltaN =
    -Math.cos(lonRef) * Math.sin(latRef) * deltaX -
    Math.sin(lonRef) * Math.sin(latRef) * deltaY +
    Math.cos(latRef) * deltaZ;
  const deltaU =
    Math.cos(lonRef) * Math.cos(latRef) * deltaX +
    Math.sin(lonRef) * Math.cos(latRef) * deltaY +
    Math.sin(latRef) * deltaZ;

  return [deltaE, deltaN, deltaU] as const;
};

export const getAer = (
  x: number,
  y: number,
  z: number,
  xRef: number,
  yRef: number,
  zRef: number
) => {
  const slant = Math.sqrt((x - xRef) ** 2 + (y - yRef) ** 2 + (z - zRef) ** 2);

  if (!slant) return [0, 0, 0];

  const [deltaE, deltaN, deltaU] = getEnuDifference(x, y, z, xRef, yRef, zRef);

  const elevation = Math.asin(deltaU / slant);
  const azimuth = Math.atan2(deltaE, deltaN);

  return [elevation, azimuth, slant] as const;
};

export const getPositionFromGeodeticString = (
  latitudeString: string,
  longitudeString: string,
  height: number
) => {
  const latitude = deg2rad(parseLatitudeString(latitudeString));
  const longitude = deg2rad(parseLatitudeString(longitudeString));

  return geo2car(latitude, longitude, height);
};
