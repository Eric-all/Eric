<template>
  <span :class="classes" tabindex="0" @click="handleChecked">
    <span class="ant-switch-inner"></span>
  </span>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  export default {
    name: 'Switch',
    props: {
      checked: {
        type: Boolean,
        default: false
      },
      disable: {
        type: Boolean,
        default: false
      },
      size: {
        type: Boolean,
        default: false
      },
      onChange: Function
    },
    data () {
      return {
        toggle: this.checked
      }
    },
    computed: {
      classes () {
        return {
          'ant-switch': true,
          'ant-switch-checked': this.toggle,
          'ant-switch-disabled': this.disable,
          'ant-switch-small': this.size
        }
      }
    },
    methods: {
      handleChecked () {
        if (this.disable) return
        this.toggle = !this.toggle
        this.$emit('onChange', this.toggle)
      }
    }
  }
</script>
