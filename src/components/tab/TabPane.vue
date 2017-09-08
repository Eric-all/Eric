<template>
  <div role="tabpanel" :aria-hidden="active" :class="classes">
    <slot></slot>
  </div>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  export default {
    name: 'TabPane',
    props: {
      name: {
        type: [String, Number],
        required: true
      },
      title: {
        type: String,
        required: true
      },
      icon: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        active: false
      }
    },
    computed: {
      classes () {
        return {
          'ant-tabs-tabpane': true,
          'ant-tabs-tabpane-active': this.active,
          'ant-tabs-tabpane-inactive': !this.active
        }
      }
    }
  }
</script>
