<template>
  <section id="category-details">
    <div id="projects-container" ref="container" data-scroll-container>
      <div
        data-scroll
        v-for="(project, index) in category.projects"
        :class="{ project: true, transition: index === 0, hide: loaded }"
        :key="'project' + index"
      >
        <img :src="project.thumbnail.original" alt="" />
      </div>
    </div>
    <!-- <div id="transition" ref="transition" :class="{ 'fill-fixed': true }">
      <img :src="categoryThumbnail" alt="" />
    </div> -->
  </section>
</template>

<script>
import scrollMixin from '@/mixins/scroll.js';
import dimensionsMixin from '@/mixins/dimensions.js';
import gsap from 'gsap';

export default {
  data: () => ({
    loaded: false,
    scroll: null,
  }),
  mixins: [scrollMixin, dimensionsMixin],
  computed: {
    category() {
      return this.$store.state.categories[
        this.$store.state.activeCategoryIndex
      ];
    },
    categoryThumbnail() {
      return this.category.thumbnail.original;
    },
  },
  methods: {
    initTransition() {
      const p = this.$refs.container.querySelector('.transition img');
      const pRect = p.getBoundingClientRect();
      const r = this.pageDimensions.width / pRect.width;
      const centerOffset =
        (this.pageDimensions.width - pRect.width) / 2 - pRect.x;
      p.style.transform = `translateX(${centerOffset}px) scale(${r})`;
    },
    transitionOut() {
      const p = this.$refs.container.querySelector('.transition img');
      // p.style.transform = 'translateX(0px) scale(1)';

      gsap.to(p, {
        scale: 1,
        translateX: 0,
        duration: 0.6,
        onComplete: (e) => console.log(e),
      });
    },
  },
  mounted() {
    this.initTransition();
    setTimeout(() => {
      this.scroll = this.initLocomotive({
        el: this.$refs.container,
        direction: 'horizontal',
      });
      this.loaded = true;
      this.$nextTick(this.transitionOut);
    }, 600);
  },
};
</script>

<style lang="sass">
#category-details
  height: 100vh
  width: 100vw
  overflow: hidden

  #projects-container
    display: flex
    height: 100%
    width: 100%
    flex-direction: row
    justify-content: flex-start
    align-items: center

  .project
    height: 100%
    padding: 5 * $unit 2.5 * $unit

    &.transition.hide img
      transition-duration: transform .6s ease-in-out

    &:first-child
      padding-left: 5 * $unit

    &:last-child
      padding-right: 5 * $unit

    img
      height: 100%


  #transition
    width: 100%
    height: 100%
    transition: transform .6s ease-in
    z-index: 10

    &.hide
      pointer-events: none
      opacity: 0

    img
      width: 100%
      height: 100%
      object-fit: cover
      object-position: center center
      transform-origin: left
</style>
