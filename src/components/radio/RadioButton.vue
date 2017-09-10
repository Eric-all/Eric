<template>
  <label :class="classes">
    <span :class="radioClasses">
      <input type="radio"
             :name="radioName"
             class="ant-radio-button-input"
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
    name: 'RadioButton',
    mixins: [ Mixin ],
    computed: {
      classes () {
        return {
          'ant-radio-button-wrapper': true,
          'ant-radio-button-wrapper-checked': this.select,
          'ant-radio-button-wrapper-disabled': this.disabled
        }
      },
      radioClasses () {
        return {
          'ant-radio-button': true,
          'ant-radio-button-checked': this.select,
          'ant-radio-button-disabled': this.disabled
        }
      }
    }
  }
</script>
