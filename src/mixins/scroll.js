import Locomotive from 'locomotive-scroll';

export default {
  methods: {
    initLocomotive(options = {}) {
      return new Locomotive({
        smooth: true,
        gestureDirection: 'both',
        multiplier: 1.6,
        getSpeed: true,
        ...options,
      });
    },
  },
};
