<template>
  <transition name="ant-tag-zoom">
    <div :class="classes" :style="backgroundColor" v-if="show">
      <span class="ant-tag-text"><slot></slot></span>
      <i class="anticon anticon-cross" v-if="close" @click="handleClose"></i>
    </div>
  </transition>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  import { isPreset } from '../_util/util'
  const arrList = ['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple']

  export default {
    name: 'Tag',
    props: {
      color: String,
      close: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        show: true,
        backgroundColor: this.setColor(this.color)
      }
    },
    computed: {
      classes () {
        return {
          'ant-tag': true,
          [`ant-tag-${this.color}`]: isPreset(this.color, arrList),
          'ant-tag-has-color': this.color && !isPreset(this.color, arrList)
        }
      }
    },
    watch: {
      color (val) {
        this.backgroundColor = this.setColor(val)
      }
    },
    methods: {
      handleClose () {
        this.show = !this.show
        this.$emit('onClose', this.show)
      },
      setColor (val) {
        return {
          backgroundColor: (val && !isPreset(val, arrList)) ? val : null
        }
      }
    }
  }
</script>
