var colors = require('nice-color-palettes');

export function generateRating (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Return a list of colors given the amount of categories
export function generateColorsArray(amount) {
  const neededPallets = Math.ceil(amount / 5)
  return colors.slice(0, neededPallets).flat()
}