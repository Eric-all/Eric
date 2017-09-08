<template>
<div :class="classes">
  <slot></slot>
</div>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  import { isPreset } from '../_util/util'
  export default {
    name: 'ButtonGroup',
    props: {
      size: {
        type: String,
        validator (val) {
          return isPreset(val, ['large', 'small'])
        }
      }
    },
    computed: {
      classes () {
        return {
          'ant-btn-group': true,
          [`ant-btn-group-${this.size}`]: this.size
        }
      }
    }
  }
</script>
