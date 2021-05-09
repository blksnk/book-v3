export const getDimensions = () => {
  const width = window.innerWidth,
    height = window.innerHeight;

  return {
    width,
    height,
    center: {
      x: width / 2,
      y: height / 2,
    },
  };
};
