<template>
  <transition name="fade">
    <div class="ant-back-top" @click="handleBackTop" v-if="backTop">
      <slot></slot>
      <div class="ant-back-top-content" v-if="!isSlot">
        <i class="anticon anticon-to-top ant-back-top-icon"></i>
      </div>
    </div>
  </transition>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  import { scrollTop } from '../_util/util'
  export default {
    name: 'BackTop',
    props: {
      visibilityHeight: {
        type: Number,
        default: 400
      },
      duration: {
        type: Number,
        default: 1000
      }
    },
    data () {
      return {
        backTop: false,
        isSlot: this.$slots.default
      }
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll, false)
      window.addEventListener('resize', this.handleScroll, false)
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.handleScroll, false)
      window.removeEventListener('resize', this.handleScroll, false)
    },
    watch: {},
    methods: {
      handleBackTop () {
        const Top = document.documentElement.scrollTop || document.body.scrollTop
        scrollTop(window, Top, 0, this.duration)
        this.$emit('onClick')
      },
      handleScroll () {
        this.backTop = window.pageYOffset >= this.visibilityHeight
      }
    }
  }
</script>
