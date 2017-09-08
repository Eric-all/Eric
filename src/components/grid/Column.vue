<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  export default {
    name: 'Column',
    props: {
      span: Number,
      order: {
        type: Number,
        default: 0
      },
      offset: {
        type: Number,
        default: 0
      },
      push: {
        type: Number,
        default: 0
      },
      pull: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        gutter: false,
        styles: {}
      }
    },
    computed: {
      classes () {
        return {
          [`ant-col-${this.span}`]: this.span !== undefined,
          'gutter-row': this.gutter,
          [`ant-col-offset-${this.offset}`]: this.offset,
          [`ant-col-push-${this.push}`]: this.push,
          [`ant-col-pull-${this.pull}`]: this.pull
        }
      }
    }
  }
</script>
