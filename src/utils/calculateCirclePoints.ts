export function calculateCirclePoints(
  count: number,
  radius: number,
  offsetDeg = 0
) {
  const angleStep = (2 * Math.PI) / count;
  const offsetRad = (offsetDeg * Math.PI) / 180;

  return Array.from({ length: count }, (_, i) => {
    const angle = angleStep * i - Math.PI / 2 + offsetRad;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
      angle,
    };
  });
}
