<template>
  <i :class="classes"></i>
</template>

<style lang="less" src="../style/index.less"></style>

<script>
  export default {
    name: 'Icon',
    props: {
      name: {
        type: String,
        required: true
      },
      spin: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return {
          'anticon': true,
          [`anticon-${this.name}`]: this.name,
          'anticon-spin': this.spin
        }
      }
    }
  }
</script>
