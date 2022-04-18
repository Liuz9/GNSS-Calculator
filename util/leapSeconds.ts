export const getLeapSeconds = (date: Date) => {
  const value = date.valueOf();
  if (value >= Date.UTC(1900, 0, 1) + 3692217600000) {
    return 37;
  }
  if (value >= Date.UTC(1900, 0, 1) + 3644697600000) {
    return 36;
  }

  if (value >= Date.UTC(1900, 0, 1) + 3550089600000) {
    return 35;
  }
  if (value >= Date.UTC(1900, 0, 1) + 3439756800000) {
    return 34;
  }
  if (value >= Date.UTC(1900, 0, 1) + 3345062400000) {
    return 33;
  }
  if (value >= Date.UTC(1900, 0, 1) + 3124137600000) {
    return 32;
  }
  if (value >= Date.UTC(1900, 0, 1) + 3076704000000) {
    return 31;
  }
  if (value >= Date.UTC(1900, 0, 1) + 3029443200000) {
    return 30;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2982009600000) {
    return 29;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2950473600000) {
    return 28;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2918937600000) {
    return 27;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2871676800000) {
    return 26;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2840140800000) {
    return 25;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2776982400000) {
    return 24;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2698012800000) {
    return 23;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2634854400000) {
    return 22;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2603318400000) {
    return 21;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2571782400000) {
    return 20;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2524521600000) {
    return 19;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2492985600000) {
    return 18;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2461449600000) {
    return 17;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2429913600000) {
    return 16;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2398291200000) {
    return 15;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2366755200000) {
    return 14;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2335219200000) {
    return 13;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2303683200000) {
    return 12;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2287785600000) {
    return 11;
  }
  if (value >= Date.UTC(1900, 0, 1) + 2272060800000) {
    return 10;
  }
  return 0;
};
