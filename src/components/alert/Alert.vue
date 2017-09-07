<template>
  <transition name="ant-alert-slide-up">
    <div :class="classes" v-if="show">
      <i class="anticon ant-alert-icon" :class="iconClasses" v-if="icon"></i>
      <span class="ant-alert-message">
        {{ message }}
    </span>
      <span class="ant-alert-description">
        <slot></slot>
    </span>
      <a class="ant-alert-close-icon" v-if="close" @click="handlerClose">
        <i class="anticon anticon-cross" v-if="!text"></i>
        <span v-else>{{ text }}</span>
      </a>
    </div>
  </transition>
</template>


<style lang="less" src="./style/index.less"></style>

<script>
  import { isPreset } from '../_util/util'
  export default {
    name: 'Alert',
    props: {
      type: {
        type: String,
        required: true,
        validator (value) {
          return isPreset(value, ['success', 'info', 'warning', 'error'])
        }
      },
      close: {
        type: Boolean,
        default: false
      },
      text: String,
      message: {
        type: String,
        required: true
      },
      icon: {
        type: Boolean,
        default: true
      },
      banner: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        show: true,
        description: this.$slots.default
      }
    },
    methods: {
      handlerClose (e) {
        this.show = false
        this.$emit('onClose', this.show, e)
      },
      typeIcon (type) {
        let icon
        switch (type) {
          case 'success':
            icon = 'check-circle'
            break
          case 'info':
            icon = 'info-circle'
            break
          case 'error':
            icon = 'cross-circle'
            break
          case 'warning':
            icon = 'exclamation-circle'
            break
          default:
            icon = 'default'
        }
        return icon
      }
    },
    computed: {
      classes () {
        return {
          'ant-alert': true,
          [`ant-alert-${this.type}`]: this.type,
          'ant-alert-no-icon': !this.icon,
          'ant-alert-with-description': this.description !== undefined,
          'ant-alert-banner': this.banner
        }
      },
      iconClasses () {
        return {
          [`anticon-${this.typeIcon(this.type)}`]: this.icon && this.description === undefined,
          [`anticon-${this.typeIcon(this.type)}-o`]: this.icon && this.description !== undefined
        }
      }
    }
  }
</script>
