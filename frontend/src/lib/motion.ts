export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

export const subtleScale = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.015,
    y: -6,
    transition: { duration: 0.24, ease: 'easeOut' as const },
  },
};

export const makeFloat = (distance: number, duration: number, delay = 0) => ({
  y: [0, -distance, 0, distance * 0.4, 0],
  x: [0, distance * 0.18, 0, -distance * 0.12, 0],
  rotate: [0, 1, 0, -1, 0],
  transition: {
    duration,
    delay,
    repeat: Infinity,
    repeatType: 'mirror' as const,
    ease: 'easeInOut' as const,
  },
});
