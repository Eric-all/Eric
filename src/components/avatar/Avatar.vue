<template>
  <span class="ant-avatar" :class="classes">
    <i class="anticon anticon-user" v-if="!src"></i>
    <img :src="src" v-else>
  </span>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  import { isPreset } from '../_util/util'
  export default {
    name: 'Avatar',
    props: {
      shape: {
        type: String,
        validator (value) {
          return isPreset(value, ['circle', 'square'])
        },
        default: 'circle'
      },
      size: {
        type: String,
        validator (value) {
          return isPreset(value, ['large', 'small', 'default'])
        }
      },
      src: String
    },
    computed: {
      classes () {
        return {
          [`ant-avatar-${this.size}`]: this.size,
          [`ant-avatar-${this.shape}`]: this.shape,
          'ant-avatar-image': this.src,
          'ant-avatar-icon': !this.src
        }
      }
    }
  }
</script>
