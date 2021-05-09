<template>
  <div class="slide" data-scroll-section>
    <Door>
      <div
        :class="{
          selected,
          'img-container': true,
          hide: hideTitle,
          open: hideTitle && selected,
        }"
      >
        <img
          data-scroll
          data-scroll-speed="-1"
          data-scroll-delay=".5"
          :src="thumbnail"
          alt=""
        />
      </div>
    </Door>
    <div class="project-title-container">
      <h1
        data-scroll
        :class="{ hide: hideTitle, selected }"
        data-scroll-speed="4"
      >
        {{ formatType(category.type) }}
      </h1>
    </div>
  </div>
</template>

<script>
import Door from '@/components/ui/Door.vue';
import { formatType } from '@/utils/string.js';

export default {
  name: 'ProjectSlide',
  props: ['category', 'index', 'hideTitle', 'scrollIndex'],
  components: {
    Door,
  },
  computed: {
    thumbnail() {
      return this.category.thumbnail.original;
    },
    selected() {
      return this.scrollIndex === this.index;
    },
  },
  methods: {
    formatType(type) {
      return formatType(type);
    },
  },
};
</script>

<style lang="sass">
.slide
  height: 100%
  width: max-content
  text-align: center
  padding: 5 * $unit
  position: relative
  z-index: 1

  .img-container
    z-index: 2
    transform: scale(1)
    transition: transform .6s ease-in-out

    &.open
      transform: scale(calc((10 / (10 / 3 * 1.7))))



    &.hide:not(.selected)
      // transition: transform .6s ease-in-out
      transform: translateY(100vh) !important

    &.selected
      // transition: transform .6s ease-in-out

      img
        filter: grayscale(1) brightness(1)

      &:hover
        transition: transform .6s ease-in-out

        img
          filter: grayscale(0) !important

  .project-title-container
    position: absolute
    width: calc(100vw / 3)
    top: 0
    bottom: 0
    display: flex
    align-items: center
    justify-content: center
    pointer-events: none
    z-index: 15
    // mix-blend-mode: difference
    -webkit-backface-visibility: visible

    h1
      z-index: 9
      width: max-content
      position: relative
      white-space: nowrap
      margin: 0
      opacity: 1
      transition: opacity .4s ease-out 0s, filter .3s linear 0S

      &.hide
        opacity: 0

      &.selected
        filter: saturate(1.5)

  &:first-child
    padding-left: calc(50vw - 100vw / 6)

    .project-title-container
      right: 5 * $unit

  &:last-child
    padding-right: calc(50vw - 100vw / 6)

    .project-title-container
      left: 5 * $unit
</style>
