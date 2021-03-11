export const xyToRgb = (xy: [number, number], brigthness: number): number[] => {
  if (xy.length !== 2)
    throw new Error("xy parameter must be an array and contain both x and y values");

  const x = xy[0];
  const y = xy[1];
  const z = 1 - x - y;

  // calculate XYZ values
  const Y = brigthness / 255.0;
  const X = (Y / y) * x;
  const Z = (Y / y) * z;

  //convert XYZ to rgb with wide range d65 conversion
  let r = X * 1.656492 - Y * 0.354851 - Z * 0.255038;
  let g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
  let b = X * 0.051713 - Y * 0.121364 + Z * 1.01153;

  //reverse gamma correction
  r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, 1.0 / 2.4) - 0.055;
  g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, 1.0 / 2.4) - 0.055;
  b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, 1.0 / 2.4) - 0.055;

  let maxVal = Math.max(r, g, b);

  //correct the rgb values based on max value
  r = r / maxVal;
  g = g / maxVal;
  b = b / maxVal;

  // transform 0 - 1 values to represent 1-255 values.
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  return [r, g, b];
};

export const numbersToRgbString = (colorNumbers: number[]): string => `rgb${colorNumbers.join()}`;
