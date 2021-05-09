<template>
  <main id="app">
    <router-view v-if="dataLoaded" v-bind="{}" />
    <span v-else>loading</span>
  </main>
</template>

<script>
import gsap, { Power2 } from 'gsap';
import { getDimensions } from '@/utils/window.js';
import { getProjects } from '@/utils/api.js';
// import _ from 'underscore';

export default {
  data: () => ({
    dataLoaded: false,
  }),
  computed: {
    slides() {
      return document.querySelectorAll('.slide');
    },
  },
  methods: {
    createEvents() {
      window.addEventListener('mousemove', this.onMouseMove.bind(this));
      window.addEventListener('mousedown', this.onMouseDown.bind(this));
      window.addEventListener('mouseup', this.onMouseUp.bind(this));
      window.addEventListener('wheel', this.onWheel.bind(this));
    },
    rmEvents() {
      window.removeEventListener('mousemove', this.onMouseMove.bind(this));
      window.removeEventListener('mousedown', this.onMouseDown.bind(this));
      window.removeEventListener('mouseup', this.onMouseUp.bind(this));
      window.removeEventListener('wheel', this.onWheel.bind(this));
    },
    onWheel({ deltaX, deltaY }) {
      this.dragVelocity.x -= (deltaY || deltaX) * this.scrollFactor;
    },
    onMouseMove({ clientX, clientY }) {
      if (this.mouse.down) {
        this.dragVelocity.x = clientX - this.mouse.x;
        this.dragVelocity.y = clientY - this.mouse.y;
      }
      this.mouse.x = clientX;
      this.mouse.y = clientY;
    },
    onMouseDown({ clientX, clientY }) {
      if (!this.mouse.down) {
        this.mouse.down = true;
        this.mouse.downPos = { x: clientX, y: clientY };
        this.dragVelocity.x = 0;
        this.dragVelocity.y = 0;
      }
    },
    onMouseUp() {
      this.mouse.down = false;
    },
    updateScrollIndex() {
      const nearest = [...this.slides].reduce(
        ({ smallestDst, slide }, el) => {
          if (Math.abs(smallestDst) < 200) {
            return { smallestDst, slide };
          }
          const { x, width } = el.getBoundingClientRect();
          const d = x + width / 2 - getDimensions().center.x;
          let dst, s;
          if (Math.abs(d) < Math.abs(smallestDst)) {
            dst = d;
            s = el;
          } else {
            dst = smallestDst;
            s = slide;
          }
          return {
            slide: s,
            smallestDst: dst,
          };
        },
        {
          slide: this.slides[0],
          smallestDst: getDimensions().width,
        },
      );
      console.dir(nearest.slide.id);
      this.scrollIndex = nearest.slide.id.split('projectSlide')[1];
    },
    scrollToNearestProject() {
      // get nearest project pos
    },
    applyCameraDrag() {
      this.translatePos.y += this.dragVelocity.y;
      this.translatePos.x += this.dragVelocity.x;
      if (!this.mouse.down) {
        this.dragVelocity.x *= this.dragFriction;
        this.dragVelocity.y *= this.dragFriction;
      }

      // this.$store.commit('setScrollY', this.translatePos.y);
    },
    animate() {
      this.frameId = window.requestAnimationFrame(this.animate.bind(this));
      this.applyCameraDrag();
    },
    setTranslatePos(pos) {
      const newPos = { ...this.translatePos, ...pos };
      gsap.to(this.translatePos, {
        ...newPos,
        duration: this.animationDuration,
        ease: Power2.easeOut,
      });
    },
    async loadData() {
      const projects = await getProjects();
      console.log(projects);
      this.$store.commit('setProjects', projects);
      this.$nextTick(() => {
        this.dataLoaded = true;
      });
    },
    updateDims() {
      this.$store.commit('setPageDimensions', getDimensions());
    },
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateDims);
  },
  created() {
    this.loadData();
    window.addEventListener('resize', this.updateDims);
  },
};
</script>
