export function getClientPosition(e) {
  const { touches } = e;

  if (touches && touches.length) {
    const finger = touches[0];
    return {
      x: finger.clientX,
      // y: finger.clientY,
    };
  }

  return {
    x: e.clientX,
    // y: e.clientY,
  };
}
