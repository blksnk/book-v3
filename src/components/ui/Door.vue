<template>
  <article
    data-scroll
    :class="{
      door: true,
      open,
    }"
  >
    <slot></slot>
  </article>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="sass">
.door
  width: calc(100vw / 3)
  min-width: 400px
  height: 100%
  border-top-left-radius: calc(100vw / 6)
  border-top-right-radius: calc(100vw / 6)
  overflow: hidden
  position: relative

  div
    background-color: $teal
    display: flex
    height: 100%
    width: 100%
    align-items: center
    justify-content: center
    z-index: 2
    position: relative



  img
    -webkit-backface-visibility: visible
    // mix-blend-mode: lighten
    object-fit: cover
    object-position: center center
    height: 100%
    min-width: 170%
    pointer-events: none
    transition: filter .6s ease-in-out 0s, mix-blend-mode .6s ease-out,
    filter: grayscale(1) brightness(.5)
    position: relative

  &:hover img
    filter: grayscale(1) brightness(1)
    // mix-blend-mode: normal
    transition: filter .2s ease-in
</style>
