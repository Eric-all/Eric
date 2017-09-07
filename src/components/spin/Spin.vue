<template>
  <div class="ant-spin" :class="classes" v-if="!isSlot">
    <span class="ant-spin-dot">
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </span>
    <div class="ant-spin-text" v-if="tip">{{ tip }}</div>
  </div>

  <div class="ant-spin-nested-loading" v-else>
    <div>
      <div class="ant-spin" :class="classes">
        <span class="ant-spin-dot">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
        <div class="ant-spin-text" v-if="tip">{{ tip }}</div>
      </div>
    </div>
    <div class="ant-spin-container" :class="{'ant-spin-blur': this.spinning}">
      <slot></slot>
    </div>
  </div>

</template>

<style lang="less" src="./style/index.less"></style>

<script>
  import { isPreset } from '../_util/util'
  export default {
    name: 'Spin',
    props: {
      size: {
        type: String,
        validator (value) {
          return isPreset(value, ['large', 'small', 'default'])
        }
      },
      spinning: {
        type: Boolean,
        default: true
      },
      tip: String
    },
    data () {
      return {
        isSlot: this.$slots.default !== undefined
      }
    },
    computed: {
      classes () {
        return {
          'ant-spin-spinning': this.spinning,
          [`ant-spin-${this.size}`]: this.size
        }
      }
    }
  }
</script>
