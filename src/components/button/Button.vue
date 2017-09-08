<template>
  <button :type="htmlType" :class="classes" :disabled="disabled" @click="handlerClick">
    <icon :name="loading ? 'loading' : icon" v-if="icon || loading" :spin="loading"></icon>
    <span v-if="!shape"><slot></slot></span>
  </button>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  import { isPreset } from '../_util/util'
  import Icon from '../icon'
  export default {
    name: 'Button',
    components: {
      Icon
    },
    props: {
      type: {
        type: String,
        validator (val) {
          return isPreset(val, ['primary', 'dashed', 'danger'])
        }
      },
      htmlType: {
        type: String,
        default: 'button'
      },
      icon: String,
      shape: String,
      size: {
        type: String,
        validator (val) {
          return isPreset(val, ['large', 'small'])
        }
      },
      loading: {
        type: Boolean,
        default: false
      },
      ghost: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        timeout: '',
        delayTimeout: '',
        clicked: false
      }
    },
    beforeDestroy () {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout)
      }
    },
    computed: {
      classes () {
        return {
          'ant-btn': true,
          [`ant-btn-${this.type}`]: this.type,
          [`ant-btn-${this.shape}`]: this.shape,
          [`ant-btn-${this.size}`]: this.size,
          'ant-btn-loading': this.loading,
          'ant-btn-background-ghost': this.ghost,
          'ant-btn-icon-only': this.icon,
          'ant-btn-clicked': this.clicked
        }
      }
    },
    methods: {
      handlerClick (e) {
        this.clicked = true
        this.$emit('clicked')
        clearTimeout(this.timeout)
        /* eslint-disable no-return-assign */
        this.timeout = setTimeout(() => this.clicked = false, 500)
      }
    }
  }
</script>
