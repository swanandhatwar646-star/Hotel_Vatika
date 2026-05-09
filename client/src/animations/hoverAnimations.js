export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  hover: {
    scale: 1.02,
    y: -6,
    boxShadow: '0 20px 60px rgba(200, 167, 106, 0.2)',
    transition: { duration: 0.35, ease: 'easeOut' },
  },
}

export const imageZoomHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.08,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.97 },
}

export const linkHover = {
  rest: { scaleX: 0 },
  hover: {
    scaleX: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}
