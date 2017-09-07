<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  export default {
    name: 'Collapse',
    props: {
      active: [String, Number],
      accordion: {
        type: Boolean,
        default: false
      },
      borderless: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return {
          'ant-collapse': true,
          'ant-collapse-borderless': this.borderless
        }
      }
    },
    mounted () {
      if (this.active) {
        this.$children.forEach((child, index) => {
          if (child.name === this.active) {
            child.show = true
          }
        })
      }
    },
    methods: {
      setActiveStatus (val) {
        if (this.accordion) {
          this.$children.forEach((child, index) => {
            if (child.name !== val) {
              child.show = false
            }
          })
        }
      }
    }
  }
</script>
