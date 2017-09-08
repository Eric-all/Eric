<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  export default {
    name: 'Row',
    props: {
      gutter: Number,
      flex: {
        type: Boolean,
        default: false
      },
      align: {
        type: String,
        default: 'top'
      },
      justify: {
        type: String,
        default: 'start'
      }
    },
    data () {
      return {
        gutterStyle: {}
      }
    },
    computed: {
      classes () {
        return {
          'ant-row': !this.flex,
          'ant-row-flex': this.flex,
          [`ant-row-flex-${this.justify}`]: this.flex && this.justify,
          [`ant-row-flex-${this.align}`]: this.flex && this.align
        }
      },
      styles () {
        if (this.gutter > 0) {
          return {
            marginLeft: this.gutter / -2 + 'px',
            marginRight: this.gutter / -2 + 'px'
          }
        }
      }
    },
    watch: {
      gutter (val) {
        this.setChildGutter(val)
      }
    },
    methods: {
      setChildGutter (val) {
        this.$children.forEach((child, i) => {
          if (val > 0) {
            child.gutter = true
            child.styles = {
              paddingLeft: val / 2 + 'px',
              paddingRight: val / 2 + 'px'
            }
          } else {
            child.gutter = false
            child.styles = {}
          }
        })
      }
    }
  }
</script>
