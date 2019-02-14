export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function getRgba(hexColor, opacity = 1) {
  const rgbColor = hexToRgb(hexColor);

  return rgbColor
    ? `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${opacity})`
    : 'rgba(255, 255, 255, 1)';
}
