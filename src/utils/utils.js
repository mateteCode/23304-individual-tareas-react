function generateColor() {
  const colors = [
    "#ff7eb9",
    "#ff65a3",
    "#7afcff",
    "#feff9c",
    "#fff740",
    "#a1c8e9",
    "#d2d7ff",
    "#d6e3ff",
    "#ddf2ff",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export { generateColor };
