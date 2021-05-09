<template>
  <div class="clipped-img" ref="container" :class="{ open }">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clip">
          <circle :r="r" :cx="w * 1.5" :cy="w / 2 + 60" />
          <rect
            :x="w"
            :y="r + 60"
            :width="w"
            :height="h - r - 120"
            fill=""
            stroke=""
            stroke-width=""
          />
        </clipPath>
      </defs>
    </svg>
    <img :src="src" alt="" />
  </div>
</template>

<script>
import dimensionMixin from '@/mixins/dimensions.js';
export default {
  props: ['src', 'open'],
  mixins: [dimensionMixin],
  computed: {
    r() {
      return this.w / 2;
    },
    h() {
      return this.pageDimensions.height;
    },
    w() {
      return this.pageDimensions.width / 3;
    },
    transform() {
      const s = this.open ? 1 : 2;
      return `scale(${s})`;
    },
    viewbox() {
      return `${this.w} ${this.h}`;
    },
    imgTransform() {
      const { width } = this.pageDimensions;
      const minX = ((width / 3) * 1.7) / width;
      const x = this.open ? 1 : minX;
      return `scale(${x})`;
    },
  },
};
</script>

<style lang="sass">
.clipped-img
  width: 100%
  height: 100%
  pointer-events: none
  opacity: 0

  svg
    width: 100%
    height: 100%

    clipPath
      transform: scale(calc((10 / (10 / 3 * 1.7)) / 2))
      // transform: scale(1)
      transition: transform .6s ease-in
      transform-origin: center center

  img
    position: absolute
    top: 0
    left: 0
    object-fit: cover
    clip-path: url(#clip)
    width: 100vw
    height: 100vh
    transition: transform .6s ease-in-out

  &.open
    opacity: 1

    clipPath
      transform: scale(3.05)
</style>
