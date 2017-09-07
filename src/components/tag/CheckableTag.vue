<template>
  <div :class="classes" @click="handleClickChecked"><slot></slot></div>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  export default {
    name: 'CheckableTag',
    props: {
      checked: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        toggle: this.checked
      }
    },
    computed: {
      classes () {
        return {
          'ant-tag': true,
          'ant-tag-checkable': true,
          'ant-tag-checkable-checked': this.toggle
        }
      }
    },
    methods: {
      handleClickChecked () {
        this.toggle = !this.toggle
        this.$emit('onChange', this.toggle)
      }
    }
  }
</script>
