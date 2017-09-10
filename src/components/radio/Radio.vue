<template>
  <label :class="classes">
    <span :class="radioClasses">
      <input type="radio"
             :name="radioName"
             class="ant-radio-input"
             :disabled="disabled"
             :value="radioValue"
             :checked="select"
             @click="handlerChecked"
      >
      <span class="ant-radio-inner"></span>
    </span>
    <span><slot></slot></span>
  </label>
</template>

<style lang="less" src="./style/index.less"></style>

<script>
  import Mixin from './_mixin'
  export default {
    name: 'Radio',
    mixins: [ Mixin ],
    computed: {
      classes () {
        return {
          'ant-radio-wrapper': true,
          'ant-radio-wrapper-checked': this.select,
          'ant-radio-wrapper-disabled': this.disabled
        }
      },
      radioClasses () {
        return {
          'ant-radio': true,
          'ant-radio-checked': this.select,
          'ant-radio-disabled': this.disabled
        }
      }
    }
  }
</script>
