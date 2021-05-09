<template>
  <section id="projects">
    <!-- <div
      id="transition-overlay"
      :class="{ show: showOverlay, 'fill-fixed': true }"
    ></div> -->
    <ClippedImg id="transition-img" :src="activeThumb" :open="showOverlay" />
    <div id="slider" ref="slider" data-scroll-container>
      <ProjectSlide
        v-for="(category, index) in categories"
        :key="'projectSlide' + index"
        :id="'projectSlide' + index"
        v-bind="{
          category,
          index,
          hideTitle,
          scrollIndex,
        }"
        @click="({ target }) => onProjectClick(index, target)"
      ></ProjectSlide>
    </div>
  </section>
</template>

<script>
import scrollMixin from '@/mixins/scroll';
// import gsap from 'gsap';

import ProjectSlide from '@/components/ProjectSlide.vue';
import ClippedImg from '@/components/ClippedImg.vue';
// import Door from '@/components/ui/Door.vue';
import { getDimensions } from '@/utils/window.js';

export default {
  name: 'Categories',
  components: {
    ProjectSlide,
    ClippedImg,
  },
  data: () => ({
    showAll: false,
    showOverlay: false,
    scrollIndex: 0,
    scroll: null,
    scrollSnapping: false,
    scrollSpeed: 0,
    hideTitle: false,
  }),
  mixins: [scrollMixin],
  computed: {
    projects() {
      return this.activeCategory.projects;
    },
    dimensions() {
      return this.getDimensions();
    },
    activeProject() {
      return this.projects[this.$store.state.activeProjectIndex];
    },
    categories() {
      return this.$store.state.categories;
    },
    activeCategory() {
      return this.categories[this.$store.state.activeCategoryIndex];
    },
    activeThumb() {
      return this.categories[this.scrollIndex].thumbnail.original;
    },
    openProject() {
      return this.$store.state.openProject;
    },
  },
  methods: {
    onProjectClick(index, target) {
      if (index === this.scrollIndex && !this.showOverlay) {
        this.$store.commit('setActiveCategoryIndex', index);
        this.$store.commit('setOpenProject', true);
        this.scroll.stop();
        this.hideTitle = true;
        this.centerProject(target, () => {
          this.showOverlay = true;
          setTimeout(() => {
            this.redirectToCategory();
          }, 600);
        });
      } else {
        this.centerProject(target);
        this.hideTitle = false;
        this.scroll.start();

        this.showOverlay = false;
      }
    },
    redirectToCategory() {
      const { type } = this.activeCategory;
      const url = `/category/${type}`;
      this.$router.push(url);
    },
    centerProject(target, callback) {
      console.log('center project');
      const offset =
        -getDimensions().center.x + target.getBoundingClientRect().width / 2;
      this.scroll.scrollTo(target, {
        offset,
        duration: 600,
        callback,
      });
    },
    createScroll() {
      this.scroll = this.initLocomotive({
        el: this.$refs.slider,
        direction: 'horizontal',
        multiplier: 1.6,
      });
      this.scroll.on('scroll', this.onScroll);
    },
    onScroll(e) {
      this.calcScrollIndex(e);
      const speed = Math.ceil(Math.abs(e.speed));
      // console.log(speed);

      // if (speed < this.scrollSpeed && speed < 0.5 && !this.scrollSnapping) {
      //   this.scrollSnapping = true;
      //   const target = this.$refs.slider.querySelector(
      //     `#projectSlide${this.scrollIndex}`,
      //   );
      //   this.centerProject(target, () => {
      //     this.scrollSnapping = false;
      //   });
      // }
      // if (speed > this.scrollSpeed && speed > 0.05 && this.scrollSnapping) {
      //   this.scrollSnapping = false;
      // }
      // cache last speed value
      this.scrollSpeed = Math.round(speed);
    },

    calcScrollIndex(e) {
      const divident = getDimensions().width / 3 + 60;
      this.scrollIndex = Math.round(e.scroll.x / divident);
    },
  },
  mounted() {
    console.log();
    this.createScroll();
    this.showOverlay = false;
  },
  beforeUnmount() {
    console.log('unmount');
    this.scroll.destroy();
  },
};
</script>

<style lang="sass">
#projects
  height: 100%
  width: 100%
  overflow: hidden
  padding: 0

  #slider
    height: 100%
    width: max-content
    display: flex
    transition: transform .6s ease-in-out

    &.open
      transform: scale(3)

  #transition-overlay
    background-color: $green-desat
    opacity: 0
    transition: opacity .6s
    pointer-events: none
    z-index: 2

    &.show
      opacity: 1

  #transition-img
    position: fixed
    top: 0
    left: 0
    width: 100%

    z-index: 10
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: center
</style>
