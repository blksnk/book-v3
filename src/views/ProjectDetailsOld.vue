<template>
  <section id="project-details">
    <div id="viewer" ref="viewer" data-scroll-container>
      <div
        v-for="(img, index) in imagesToDisplay"
        data-scroll-section
        :key="'img' + index"
      >
        <img :id="'img' + index" :src="img" data-scroll alt="" />
      </div>
    </div>
    <div id="thumbnails" ref="thumbnails" data-scroll-container>
      <img
        v-for="(img, index) in imagesToDisplay"
        :id="'thumbnail' + index"
        :key="'thumbnail' + index"
        :src="img"
        data-scroll
        @click="() => scrollToImg(index)"
      />
    </div>
    <div id="box"></div>
  </section>
</template>

<script>
import scrollMixin from '@/mixins/scroll';
import { getDimensions } from '@/utils/window.js';

export default {
  name: 'ProjectDetails',
  mixins: [scrollMixin],
  data: () => ({
    imgIndex: 0,
    thumbnailScroll: null,
    viewerScroll: null,
    disableFollow: false,
    scrollIndex: 0,
  }),
  computed: {
    activeProject() {
      const { activeProjectIndex, projects } = this.$store.state;
      return projects[activeProjectIndex];
    },
    imagesToDisplay() {
      const { images, thumbnail } = this.activeProject;
      return [thumbnail, ...images];
    },
    currentImg() {
      return this.imagesToDisplay[this.imgIndex];
    },
    scrollRatio() {
      const { thumbnails, viewer } = this.$refs;
      const thumbnailsHeight = thumbnails.getBoundingClientRect().height;
      const viewerHeight = viewer.getBoundingClientRect().height;
      const ratio = (thumbnailsHeight - getDimensions().height) / viewerHeight;
      return ratio;
    },
  },
  watch: {
    scrollIndex(val) {
      if (!this.disableFollow) {
        this.thumbnailScroll.scrollTo(`#thumbnail${val}`, {
          offset: -getDimensions().center.y + 3.5 * 12,
        });
      }
    },
  },
  methods: {
    createScroll() {
      this.thumbnailScroll = this.initLocomotive({
        el: this.$refs.thumbnails,
        direction: 'vertical',
        offset: [0, '50%'],
      });

      this.viewerScroll = this.initLocomotive({
        el: this.$refs.viewer,
        direction: 'vertical',
      });
      this.viewerScroll.on('scroll', this.onScroll);
    },
    scrollToImg(index) {
      console.log('click');
      this.disableFollow = true;
      // scroll thumbs
      this.thumbnailScroll.scrollTo(`#thumbnail${index}`, {
        offset: -getDimensions().center.y + 3.5 * 12,
      });
      this.viewerScroll.scrollTo(`#img${index}`, {
        callback: () => {
          setTimeout(() => {
            this.disableFollow = false;
          }, 1500);
        },
      });
    },
    onScroll(e) {
      this.scrollIndex = Math.round(e.scroll.y / (getDimensions().height + 30));
    },
  },
  mounted() {
    this.createScroll();
    this.scrollToImg(0);
  },
};
</script>

<style lang="sass">
#project-details
  height: 100vh
  width: 100%
  overflow: hidden
  grid-column-gap: 5*$unit

  #box
    width: 7*$unit
    height: 5*$unit
    border: 1px solid $melon
    position: fixed
    top: calc(50vh - 2.5 * 12px)
    left: 4 * $unit
    pointer-events: none

  #thumbnails
    position: fixed
    top: 0
    left: 5* $unit
    width: 5* $unit
    display: flex
    flex-direction: column
    gap: $unit
    align-items: center
    padding-top: 50vh
    pointer-events: all
    padding-bottom: 50vh

    img
      width: 5 * $unit
      height: 7 * $unit
      object-fit: cover
      pointer-events: all




  #viewer
    padding-left: 15*$unit
    padding-right: 5*$unit
    display: flex
    flex-direction: column
    gap: $unit
    align-items: center
    justify-content: flex-start
    grid-column: 2 / 2
    pointer-events: none
    flex-wrap: nowrap

    div
      height: 100vh
      width: max-content
      display: block

    img
      height: 100vh
      pointer-events: none
      object-fit: cover
      max-width: 100%
</style>
