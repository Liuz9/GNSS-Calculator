import { DECIMAL_PLACES_FOR_SECONDS } from "constants/precision";
import { deg2hms, hms2deg } from "./units";

export const formatLatitudeString = (latitude: number) => {
  if (Number.isNaN(latitude)) return undefined;

  const [degrees, minutes, seconds] = deg2hms(latitude);

  const direction = latitude >= 0 ? "N" : "S";

  return `${degrees.toString().padStart(2, "0")}º ${minutes
    .toString()
    .padStart(2, "0")}' ${seconds
    .toFixed(DECIMAL_PLACES_FOR_SECONDS)
    .padStart(DECIMAL_PLACES_FOR_SECONDS + 3, "0")}" ${direction}`;
};

export const formatLongitudeString = (longitude: number) => {
  if (Number.isNaN(longitude)) return undefined;

  const [degrees, minutes, seconds] = deg2hms(longitude);

  const direction = longitude >= 0 ? "E" : "W";

  return `${degrees.toString().padStart(3, "0")}º ${minutes
    .toString()
    .padStart(2, "0")}' ${seconds
    .toFixed(DECIMAL_PLACES_FOR_SECONDS)
    .padStart(DECIMAL_PLACES_FOR_SECONDS + 3, "0")}" ${direction}`;
};

export const parseLatitudeString = (latitudeString: string) => {
  const degrees = Number.parseInt(latitudeString.substring(0, 2), 10);
  const minutes = Number.parseInt(latitudeString.substring(4, 6), 10);
  const seconds = Number.parseFloat(
    latitudeString.substring(8, 8 + DECIMAL_PLACES_FOR_SECONDS + 3)
  );

  if (Number.isNaN(degrees) || Number.isNaN(minutes) || Number.isNaN(seconds))
    return Number.NaN;

  const sign = latitudeString[latitudeString.length - 1] === "S" ? -1 : 1;

  return sign * hms2deg(degrees, minutes, seconds);
  return 5.0;
};

export const parseLongitudeString = (longitudeString: string) => {
  const degrees = Number.parseInt(longitudeString.substring(0, 3), 10);
  const minutes = Number.parseInt(longitudeString.substring(5, 7), 10);
  const seconds = Number.parseFloat(
    longitudeString.substring(9, 9 + DECIMAL_PLACES_FOR_SECONDS + 3)
  );

  if (Number.isNaN(degrees) || Number.isNaN(minutes) || Number.isNaN(seconds))
    return Number.NaN;

  const sign = longitudeString[longitudeString.length - 1] === "W" ? -1 : 1;

  return sign * hms2deg(degrees, minutes, seconds);
};
