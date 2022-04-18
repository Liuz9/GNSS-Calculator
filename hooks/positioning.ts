import { car2geo, getAer, getEnuDifference } from "util/positioning";
import { rad2deg } from "util/units";

export const usePositionCalculator = (position: [number, number, number]) => {
  if (!position) return undefined;

  const [lat, lon, height] = car2geo(...position);

  return {
    x: position[0],
    y: position[1],
    z: position[2],
    latidude: rad2deg(lat),
    longitude: rad2deg(lon),
    height,
  };
};

export function useAerCalculator(
  position: [number, number, number],
  refPosition: [number, number, number]
) {
  if (!position || !refPosition) return undefined;

  const [elev, azi, slant] = getAer(...position, ...refPosition);

  return {
    elevation: rad2deg(elev),
    azimuth: rad2deg(azi),
    slant,
  };
}

export function useENUCalculator(
  position: [number, number, number],
  refPosition: [number, number, number]
) {
  if (!position || !refPosition) return undefined;

  const [deltaE, deltaN, deltaU] = getEnuDifference(
    ...position,
    ...refPosition
  );

  return {
    deltaE,
    deltaN,
    deltaU,
  };
}
