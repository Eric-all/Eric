<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  import { isPreset } from '../_util/util'
  export default {
    name: 'RadioGroup',
    props: {
      name: {
        type: String,
        required: true
      },
      value: null,
      size: {
        type: String,
        validator (val) {
          return isPreset(val, ['large', 'small'])
        }
      }
    },
    mounted () {
      this.$children.forEach((child, index) => {
        child.radioName = this.name
        if (this.value === child.value) {
          child.select = true
        }
      })
    },
    methods: {
      handlerChecked (val) {
        this.$children.forEach((child, index) => {
          child.select = val.toString() === child.value
        })
      }
    },
    computed: {
      classes () {
        return {
          'ant-radio-group': true,
          [`ant-radio-group-${this.size}`]: this.size
        }
      }
    }
  }
</script>
